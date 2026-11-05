import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ExternalLink, AlertCircle, RefreshCw } from "lucide-react";
import { fetchCurrentIssue, OJSArticle, OJSIssue } from "@/services/ojsApi";
import { OJSArticleCard } from "./OJSArticleCard";
import { getOJSLink } from "@/config/ojs";
const issueOneCover = { url: "/images/ajvs-volume-1-issue-1-cover.jpeg" };
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ARTICLES_PER_PAGE = 12;

const getFirstPageNumber = (pages?: string): number => {
  const firstNumber = pages?.match(/\d+/)?.[0];
  return firstNumber ? Number.parseInt(firstNumber, 10) : Number.MAX_SAFE_INTEGER;
};

interface OJSCurrentIssueSectionProps {
  compact?: boolean;
}

export const OJSCurrentIssueSection = ({ compact = false }: OJSCurrentIssueSectionProps) => {
  const [issue, setIssue] = useState<OJSIssue | null>(null);
  const [articles, setArticles] = useState<OJSArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [syncedAt, setSyncedAt] = useState<string | null>(null);

  const loadCurrentIssue = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchCurrentIssue();
        
        if (data) {
          setIssue(data.issue);
          setArticles(
            [...data.articles].sort((first, second) => {
              const pageDifference = getFirstPageNumber(first.pages) - getFirstPageNumber(second.pages);
              return pageDifference || first.id - second.id;
            }),
          );
          setCurrentPage(1);
          setSyncedAt(data.syncedAt);
        } else {
          setError('We could not refresh the current issue from OJS. The official issue remains available on the AJVS journal portal.');
        }
      } catch (err) {
        console.error('Error loading current issue:', err);
        setError('We could not refresh the current issue from OJS. The official issue remains available on the AJVS journal portal.');
      } finally {
        setLoading(false);
      }
  };

  useEffect(() => {
    loadCurrentIssue();
  }, []);

  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const visibleArticles = compact
    ? articles.slice(0, 5)
    : articles.slice(startIndex, startIndex + ARTICLES_PER_PAGE);
  const IssueHeading = compact ? "h3" : "h2";
  const showIssueOneCover = issue?.id === 1 || (String(issue?.volume) === "1" && String(issue?.number) === "1");

  const goToPage = (page: number) => {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <Alert className="border-highlight/50 bg-highlight/10 text-foreground [&>svg]:text-highlight-foreground">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="space-y-3">
          <div>
            <p className="font-semibold text-foreground">Current issue refresh unavailable</p>
            <p className="mt-1 text-muted-foreground">{error}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline" size="sm">
              <a href={getOJSLink('CURRENT_ISSUE')} target="_blank" rel="noopener noreferrer">
                View current issue on OJS <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={loadCurrentIssue}>
              <RefreshCw className="h-4 w-4" /> Try again
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-5">
      {/* Issue Header */}
      {issue && (
        <div className="border-b border-border pb-5">
          <div className={showIssueOneCover ? "grid gap-6 sm:grid-cols-[150px_minmax(0,1fr)] sm:items-start" : ""}>
            {showIssueOneCover && (
              <a
                href={getOJSLink('CURRENT_ISSUE')}
                target="_blank"
                rel="noopener noreferrer"
                className="group mx-auto block w-full max-w-[180px] sm:mx-0"
              >
                <img
                  src={issueOneCover.url}
                  alt="Cover of African Journal of Veterinary Sciences, Volume 1, Number 1 (2026)"
                  className="aspect-[3/4] w-full border border-border object-cover transition-colors duration-150 group-hover:border-accent"
                  loading="lazy"
                />
                <span className="mt-2 flex items-center justify-center gap-1 text-xs font-semibold text-primary sm:justify-start">
                  View issue <ExternalLink className="h-3 w-3" />
                </span>
              </a>
            )}
            <div className="flex min-w-0 flex-col justify-between gap-5 sm:flex-row sm:items-start">
              <div>
              <IssueHeading className="mb-2 font-serif text-2xl font-semibold">
                {issue.volume && issue.number
                  ? `Volume ${issue.volume}, Issue ${issue.number}${issue.year ? ` (${issue.year})` : ""}`
                  : issue.title}
              </IssueHeading>
              <p className="meta-text flex flex-wrap gap-x-3 gap-y-1">
                {issue.datePublished && (
                  <span>
                    Published {new Date(issue.datePublished).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                )}
                <span>{articles.length} {articles.length === 1 ? "article" : "articles"}</span>
              </p>
              </div>
              <Button asChild variant="outline" className="shrink-0 rounded-sm">
                <a href={getOJSLink('CURRENT_ISSUE')} target="_blank" rel="noopener noreferrer">
                  View full issue
                  <ExternalLink className="!size-3 opacity-70" aria-hidden />
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Articles Grid */}
      {articles.length > 0 ? (
        <>
          <div className="flex flex-col gap-1 border-b border-border pb-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <span>
              {compact ? `Showing 1–${visibleArticles.length} of ${articles.length} articles` : `Showing ${startIndex + 1}–${Math.min(startIndex + ARTICLES_PER_PAGE, articles.length)} of ${articles.length} articles`}
            </span>
            <span>Ordered by page number</span>
          </div>
          <div className="divide-y divide-border border-b border-border">
            {visibleArticles.map((article, index) => (
              <OJSArticleCard key={article.id} article={article} index={index} />
            ))}
          </div>
          {!compact && totalPages > 1 && (
            <Pagination aria-label="Current issue article pages">
              <PaginationContent className="flex-wrap justify-center">
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    aria-disabled={currentPage === 1}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : undefined}
                    onClick={(event) => {
                      event.preventDefault();
                      goToPage(currentPage - 1);
                    }}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, index) => {
                  const page = index + 1;
                  return (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#"
                        isActive={page === currentPage}
                        aria-label={`Show articles ${(page - 1) * ARTICLES_PER_PAGE + 1}–${Math.min(page * ARTICLES_PER_PAGE, articles.length)}`}
                        onClick={(event) => {
                          event.preventDefault();
                          goToPage(page);
                        }}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    aria-disabled={currentPage === totalPages}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : undefined}
                    onClick={(event) => {
                      event.preventDefault();
                      goToPage(currentPage + 1);
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      ) : (
        <Alert>
          <AlertDescription>
            No articles have been published in the current issue yet.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};
