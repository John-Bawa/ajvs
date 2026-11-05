import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SITE_URL = "https://africanjournalvetsci.org";
const OJS_BASE_URL = "https://journal.africanjournalvetsci.org/index.php/ajvs";

// Simple in-memory rate limiter (resets on cold start)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS_PER_WINDOW = 100;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  record.count++;
  return true;
}

type FeedArticle = {
  id: number;
  title: string;
  abstract?: string;
  authors?: { fullName: string }[];
  datePublished?: string;
  pages?: string;
};

type FeedIssue = {
  issue: { id: number; title?: string; volume?: number; number?: string; year?: number; datePublished?: string };
  articles: FeedArticle[];
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get IP for rate limiting
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";

    // Check rate limit
    if (!checkRateLimit(ip)) {
      console.warn(`Rate limit exceeded for RSS feed request from IP: ${ip}`);
      return new Response(
        JSON.stringify({ error: "Rate limit exceeded. Maximum 100 requests per hour." }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 429,
        }
      );
    }

    console.log(`RSS feed request from IP: ${ip}`);

    // Read live publication data from OJS through the sanitized proxy.
    // OJS remains the single source of truth — nothing is stored locally.
    const proxyRes = await fetch(
      `${Deno.env.get("SUPABASE_URL")}/functions/v1/ojs-proxy?type=issues&abstracts=1`,
      { headers: { apikey: Deno.env.get("SUPABASE_ANON_KEY") ?? "" } }
    );
    if (!proxyRes.ok) throw new Error(`ojs-proxy returned ${proxyRes.status}`);
    const data = await proxyRes.json();
    const issues: FeedIssue[] = Array.isArray(data?.issues) ? data.issues : [];

    const rss = generateRssFeed(issues);

    return new Response(rss, {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/rss+xml",
        "Cache-Control": "public, max-age=3600", // Cache for 1 hour
      },
    });
  } catch (error: any) {
    console.error("Error generating RSS feed:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});

function generateRssFeed(issues: FeedIssue[]): string {
  const buildDate = new Date().toUTCString();

  const items = issues.flatMap(({ issue, articles }) =>
    articles.map((article) => {
      const authors = (article.authors ?? []).map((a) => a.fullName).join(", ");
      const articleUrl = `${OJS_BASE_URL}/article/view/${article.id}`;
      const pubDate = article.datePublished || issue.datePublished;
      const source = `African Journal of Veterinary Sciences${issue.volume ? `, Vol. ${issue.volume}` : ""}${issue.number ? ` No. ${issue.number}` : ""}${issue.year ? ` (${issue.year})` : ""}`;

      return `
    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${articleUrl}</link>
      <description>${escapeXml(article.abstract || "")}</description>
      <author>${escapeXml(authors)}</author>
      ${pubDate ? `<pubDate>${new Date(pubDate).toUTCString()}</pubDate>` : ""}
      <guid isPermaLink="true">${articleUrl}</guid>
      <source url="${SITE_URL}">
        <title>${escapeXml(source)}</title>
      </source>
    </item>`;
    })
  ).join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>African Journal of Veterinary Sciences</title>
    <link>${SITE_URL}</link>
    <description>Latest research articles from the African Journal of Veterinary Sciences (AJVS), University of Jos</description>
    <language>en</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <pubDate>${buildDate}</pubDate>
    <ttl>1440</ttl>
    ${items}
  </channel>
</rss>`;
}

function escapeXml(text: string): string {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
