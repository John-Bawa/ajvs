import { createOpenAI } from "npm:@ai-sdk/openai";
import { streamText } from "npm:ai";
import { createLovableAiGatewayRunIdFetch, getLovableAiGatewayRunId } from "../_shared/run-id.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-lovable-aig-run-id, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  "Access-Control-Expose-Headers": "X-Lovable-AIG-Run-ID",
};
const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1";
const MODEL = "openai/gpt-6-astra";

type Article = {
  id: number;
  title: string;
  authors?: { fullName: string }[];
  pages?: string;
  datePublished?: string;
  galleys?: { label: string; file: { url: string } }[];
};
type IssueEntry = { issue: { id: number; title?: string; year?: number }; articles: Article[] };

const json = (body: unknown, status = 200, extra: HeadersInit = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, ...extra, "Content-Type": "application/json", "Cache-Control": "no-store" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  let query = "";
  try {
    const body = await req.json();
    query = typeof body?.query === "string" ? body.query.trim() : "";
  } catch { /* handled below */ }
  if (query.length < 3) return json({ error: "Please describe your research topic in a few words." }, 400);
  query = query.slice(0, 1000);

  const apiKey = Deno.env.get("LOVABLE_API_KEY");
  if (!apiKey) return json({ error: "AI search is not configured." }, 500);

  // Load live OJS publication data through the existing sanitized proxy.
  const proxyRes = await fetch(`${Deno.env.get("SUPABASE_URL")}/functions/v1/ojs-proxy?type=issues`, {
    headers: { apikey: Deno.env.get("SUPABASE_ANON_KEY") ?? "" },
  });
  if (!proxyRes.ok) return json({ error: "Could not load AJVS publications from OJS right now." }, 502);
  const data = await proxyRes.json();
  const issues: IssueEntry[] = Array.isArray(data?.issues) ? data.issues : [];

  const catalog = new Map<number, { article: Article; issue: IssueEntry["issue"] }>();
  for (const entry of issues) for (const a of entry.articles ?? []) catalog.set(a.id, { article: a, issue: entry.issue });
  if (catalog.size === 0) return json({ summary: "", matches: [], syncedAt: data?.syncedAt, total: 0 });

  const listing = [...catalog.values()]
    .map(({ article, issue }) =>
      `[${article.id}] ${article.title} — ${(article.authors ?? []).map((x) => x.fullName).join(", ")} (${issue.title ?? ""})`)
    .join("\n");

  const system = `You help readers find relevant articles in the African Journal of Veterinary Sciences (AJVS).
Only use the article list provided. Never invent articles, findings, or IDs. Judge relevance from titles and authors only; do not claim details not present.
Return ONLY a JSON object: {"summary": string, "matches": [{"id": number, "relevance": "high"|"medium"|"low", "explanation": string}]}.
Include at most 6 matches, ordered by relevance, each explanation 1-2 sentences. If nothing is relevant, return an empty matches array and say so in the summary (1-2 sentences).`;

  const runIdFetch = createLovableAiGatewayRunIdFetch(getLovableAiGatewayRunId(req));
  const provider = createOpenAI({
    baseURL: GATEWAY_URL,
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: runIdFetch.fetch,
  });

  let text = "";
  try {
    const result = streamText({
      model: provider.responses(MODEL),
      system,
      prompt: `Reader's research topic:\n${query}\n\nAJVS articles:\n${listing}`,
      abortSignal: req.signal,
      providerOptions: {
        openai: {
          forceReasoning: true,
          reasoningEffort: "low",
          reasoningSummary: "auto",
          store: false,
          include: ["reasoning.encrypted_content"],
        },
      },
    });
    text = await result.text;
  } catch (error) {
    if (req.signal.aborted) return new Response(null, { status: 499, headers: corsHeaders });
    const status = (error as { statusCode?: number })?.statusCode;
    console.error("research-finder AI error", status, error);
    if (status === 429) return json({ error: "The AI search is busy. Please try again in a moment." }, 429);
    if (status === 402) return json({ error: "AI credits are exhausted for this site. Please try again later." }, 402);
    if (status === 403) return json({ error: "AI search is currently unavailable." }, 403);
    return json({ error: "AI search failed. Please try again." }, 502);
  }

  const runHeaders: HeadersInit = runIdFetch.getRunId() ? { "X-Lovable-AIG-Run-ID": runIdFetch.getRunId()! } : {};
  let parsed: { summary?: unknown; matches?: unknown } = {};
  try {
    const m = text.match(/\{[\s\S]*\}/);
    parsed = m ? JSON.parse(m[0]) : {};
  } catch { parsed = {}; }

  const matches = (Array.isArray(parsed.matches) ? parsed.matches : [])
    .flatMap((m: { id?: unknown; relevance?: unknown; explanation?: unknown }) => {
      const entry = catalog.get(Number(m?.id));
      if (!entry) return [];
      const relevance = ["high", "medium", "low"].includes(String(m.relevance)) ? String(m.relevance) : "medium";
      return [{
        article: entry.article,
        issueTitle: entry.issue.title ?? "",
        relevance,
        explanation: String(m.explanation ?? "").slice(0, 500),
      }];
    })
    .slice(0, 6);

  return json({
    summary: typeof parsed.summary === "string" ? parsed.summary.slice(0, 800) : "",
    matches,
    total: catalog.size,
    syncedAt: data?.syncedAt ?? new Date().toISOString(),
  }, 200, runHeaders);
});
