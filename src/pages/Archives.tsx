import { useEffect, useMemo, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import TopBar from "@/components/layout/TopBar";
import { SEOHead } from "./SEOHead";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { OJSArticleCard } from "@/components/ojs/OJSArticleCard";
import { fetchArchive, OJSArchiveIssue, OJSArticle } from "@/services/ojsApi";
import { getOJSLink } from "@/config/ojs";
import { AlertCircle, Clock3, ExternalLink, Search, SlidersHorizontal } from "lucide-react";

const ARTICLES_PER_PAGE = 12;

type ArchiveEntry = {
  article: OJSArticle;
  issue: OJSArchiveIssue["issue"];
};

const Archives = () => {
  const [archiveIssues, setArchiveIssues] = useState<OJSArchiveIssue[]>([]);
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("all");
  const [issueId, setIssueId] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [syncedAt, setSyncedAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadArchive = async () => {
    setLoading(true);
    setError(false);
    const data = await fetchArchive();
    if (data) {
      setArchiveIssues(data.issues);
      setSyncedAt(data.syncedAt);
    } else {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadArchive();
  }, []);

  const years = useMemo(() => Array.from(new Set(archiveIssues.map(({ issue }) => issue.year).filter((value): value is number => Boolean(value)))).sort((a, b) => b - a), [archiveIssues]);

  const entries = useMemo<ArchiveEntry[]>(() => archiveIssues.flatMap(({ issue, articles }) => articles.map((article) => ({ article, issue }))), [archiveIssues]);

  const filteredEntries = useMemo(() => {
    const search = query.trim().toLocaleLowerCase();
    return entries.filter(({ article, issue }) => {
      const matchesSearch = !search || article.title.toLocaleLowerCase().includes(search) || article.authors?.some((author) => author.fullName.toLocaleLowerCase().includes(search));
      const matchesYear = year === "all" || String(issue.year) === year;
      const matchesIssue = issueId === "all" || String(issue.id) === issueId;
      return matchesSearch && matchesYear && matchesIssue;
    });
  }, [entries, issueId, query, year]);

  const totalPages = Math.max(1, Math.ceil(filteredEntries.length / ARTICLES_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const pageEntries = filteredEntries.slice((safePage - 1) * ARTICLES_PER_PAGE, safePage * ARTICLES_PER_PAGE);
  const hasFilters = Boolean(query || year !== "all" || issueId !== "all");

  const updateFilter = (update: () => void) => {
    update();
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setQuery("");
    setYear("all");
    setIssueId("all");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead title="Archives" description="Search and browse published AJVS articles by year, issue, and author." canonicalUrl="https://africanjournalvetsci.org/archives" />
      <TopBar />
      <Header />
      <Breadcrumbs />
      <main className="flex-1 py-10 sm:py-14">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <header className="max-w-3xl border-b border-border pb-7">
            <p className="mb-2 text-sm font-semibold uppercase text-primary">AJVS Publications</p>
            <h1 className="font-serif text-4xl font-bold sm:text-5xl">Journal Archive</h1>
            <p className="mt-3 text-lg text-muted-foreground">Search published articles by title or author, then narrow the results by year and issue.</p>
          </header>

          {loading ? (
            <div className="flex min-h-64 items-center justify-center"><LoadingSpinner /></div>
          ) : error ? (
            <Alert className="mt-8 border-highlight/50 bg-highlight/10 text-foreground [&>svg]:text-highlight-foreground">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="space-y-3">
                <div><p className="font-semibold text-foreground">Archive refresh unavailable</p><p className="mt-1 text-muted-foreground">We could not retrieve the archive from OJS. The official AJVS archive remains available on the journal portal.</p></div>
                <div className="flex flex-wrap gap-2"><Button asChild variant="outline" size="sm"><a href={getOJSLink("ARCHIVES")} target="_blank" rel="noopener noreferrer">Open OJS archive <ExternalLink className="ml-2 h-4 w-4" /></a></Button><Button type="button" variant="ghost" size="sm" onClick={loadArchive}>Try again</Button></div>
              </AlertDescription>
            </Alert>
          ) : (
            <>
              <section aria-label="Archive filters" className="mt-8 border-y border-border bg-secondary/25 py-5">
                <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_180px_240px_auto] md:items-end">
                  <label className="space-y-2"><span className="text-sm font-semibold">Title or author</span><span className="relative block"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input value={query} onChange={(event) => updateFilter(() => setQuery(event.target.value))} placeholder="Search published articles" className="pl-9" /></span></label>
                  <label className="space-y-2"><span className="text-sm font-semibold">Year</span><Select value={year} onValueChange={(value) => updateFilter(() => setYear(value))}><SelectTrigger><SelectValue placeholder="All years" /></SelectTrigger><SelectContent><SelectItem value="all">All years</SelectItem>{years.map((item) => <SelectItem key={item} value={String(item)}>{item}</SelectItem>)}</SelectContent></Select></label>
                  <label className="space-y-2"><span className="text-sm font-semibold">Issue</span><Select value={issueId} onValueChange={(value) => updateFilter(() => setIssueId(value))}><SelectTrigger><SelectValue placeholder="All issues" /></SelectTrigger><SelectContent><SelectItem value="all">All issues</SelectItem>{archiveIssues.map(({ issue }) => <SelectItem key={issue.id} value={String(issue.id)}>{issue.title || `Volume ${issue.volume}, Number ${issue.number}`}</SelectItem>)}</SelectContent></Select></label>
                  <Button type="button" variant="outline" onClick={clearFilters} disabled={!hasFilters}><SlidersHorizontal className="mr-2 h-4 w-4" />Reset</Button>
                </div>
              </section>

              <div className="flex flex-col gap-2 border-b border-border py-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                <p><span className="font-semibold text-foreground">{filteredEntries.length}</span> {filteredEntries.length === 1 ? "article" : "articles"} found</p>
                {syncedAt && <p className="flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5" />Last synced from OJS: {new Date(syncedAt).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}</p>}
              </div>

              {pageEntries.length ? (
                <div className="divide-y divide-border border-b border-border">
                  {pageEntries.map(({ article, issue }, index) => <div key={`${issue.id}-${article.id}`}><p className="pt-5 text-xs font-semibold uppercase text-muted-foreground">{issue.title || `Volume ${issue.volume}, Number ${issue.number}`} · {issue.year}</p><OJSArticleCard article={article} index={(safePage - 1) * ARTICLES_PER_PAGE + index} /></div>)}
                </div>
              ) : (
                <Alert className="mt-6"><AlertDescription><p className="font-semibold">No matching articles</p><p className="mt-1 text-muted-foreground">Try a different title, author, year, or issue.</p>{hasFilters && <Button type="button" variant="link" className="mt-2 h-auto p-0" onClick={clearFilters}>Clear all filters</Button>}</AlertDescription></Alert>
              )}

              {totalPages > 1 && <Pagination className="mt-8" aria-label="Archive result pages"><PaginationContent className="flex-wrap"><PaginationItem><PaginationPrevious href="#" aria-disabled={safePage === 1} className={safePage === 1 ? "pointer-events-none opacity-50" : undefined} onClick={(event) => { event.preventDefault(); setCurrentPage(safePage - 1); }} /></PaginationItem>{Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => <PaginationItem key={page}><PaginationLink href="#" isActive={page === safePage} aria-label={`Show archive page ${page}`} onClick={(event) => { event.preventDefault(); setCurrentPage(page); }}>{page}</PaginationLink></PaginationItem>)}<PaginationItem><PaginationNext href="#" aria-disabled={safePage === totalPages} className={safePage === totalPages ? "pointer-events-none opacity-50" : undefined} onClick={(event) => { event.preventDefault(); setCurrentPage(safePage + 1); }} /></PaginationItem></PaginationContent></Pagination>}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Archives;