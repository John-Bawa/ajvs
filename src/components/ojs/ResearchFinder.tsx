import { FormEvent, useState } from "react";
import { AlertCircle, ExternalLink, FileText, Loader2, Microscope } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { OJSArticle, getArticlePdfUrl, getArticleUrl } from "@/services/ojsApi";

type Match = { article: OJSArticle; issueTitle: string; relevance: "high" | "medium" | "low"; explanation: string };
type FinderResult = { summary: string; matches: Match[]; total: number; syncedAt: string };

const relevanceVariant = { high: "default", medium: "secondary", low: "outline" } as const;

export const ResearchFinder = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<FinderResult | null>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (query.trim().length < 3 || loading) return;
    setLoading(true);
    setError(null);
    const { data, error: fnError } = await supabase.functions.invoke("research-finder", { body: { query } });
    if (fnError) {
      let message = "AI search failed. Please try again.";
      try {
        const body = await (fnError as { context?: Response }).context?.json();
        if (body?.error) message = body.error;
      } catch { /* keep default */ }
      setError(message);
      setResult(null);
    } else {
      setResult(data as FinderResult);
    }
    setLoading(false);
  };

  return (
    <section aria-labelledby="research-finder-title" className="mt-8 border border-border bg-card p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <Microscope className="mt-1 h-5 w-5 shrink-0 text-primary" />
        <div>
          <h2 id="research-finder-title" className="font-serif text-2xl font-semibold">Find articles for your research</h2>
          <p className="mt-1 text-sm text-muted-foreground">Describe a topic or research question. AI-powered matching compares it with live AJVS publications from OJS and explains why each article may be relevant.</p>
        </div>
      </div>
      <form onSubmit={submit} className="mt-4 space-y-3">
        <Textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. Antimicrobial resistance in poultry production in Nigeria"
          maxLength={1000}
          rows={3}
          aria-label="Research topic or question"
        />
        <div className="flex flex-wrap items-center gap-3">
          <Button type="submit" disabled={loading || query.trim().length < 3} className="rounded-sm">
            {loading ? <><Loader2 className="animate-spin" /> Searching publications…</> : "Find relevant articles"}
          </Button>
          <span className="text-xs text-muted-foreground">Suggestions are based on article titles and authors. Always read the full article.</span>
        </div>
      </form>

      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {result && !error && (
        <div className="mt-6 border-t border-border pt-5">
          {result.summary && <p className="text-sm">{result.summary}</p>}
          <p className="mt-1 text-xs text-muted-foreground">
            Compared against {result.total} published articles · synced {new Date(result.syncedAt).toLocaleString()}
          </p>
          {result.matches.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">No closely related AJVS articles were found. Try broader terms or browse the archive below.</p>
          ) : (
            <ol className="mt-4 divide-y divide-border">
              {result.matches.map(({ article, issueTitle, relevance, explanation }) => {
                const pdf = getArticlePdfUrl(article);
                return (
                  <li key={article.id} className="py-4">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <Badge variant={relevanceVariant[relevance]} className="capitalize">{relevance} relevance</Badge>
                      {issueTitle && <span>{issueTitle}</span>}
                    </div>
                    <h3 className="mt-2 font-semibold leading-snug">
                      <a href={getArticleUrl(article)} target="_blank" rel="noopener noreferrer" className="hover:text-primary">{article.title}</a>
                    </h3>
                    {article.authors?.length ? <p className="mt-1 text-sm text-muted-foreground">{article.authors.map((a) => a.fullName).join(", ")}</p> : null}
                    <p className="mt-2 text-sm">{explanation}</p>
                    <div className="mt-2 flex gap-4 text-sm font-semibold text-primary">
                      <a href={getArticleUrl(article)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:underline">Article <ExternalLink className="h-3.5 w-3.5" /></a>
                      {pdf && <a href={pdf} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:underline"><FileText className="h-3.5 w-3.5" /> PDF</a>}
                    </div>
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      )}
    </section>
  );
};
