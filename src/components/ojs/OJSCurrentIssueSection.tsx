import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ExternalLink, AlertCircle } from "lucide-react";
import { fetchCurrentIssue, OJSArticle, OJSIssue } from "@/services/ojsApi";
import { OJSArticleCard } from "./OJSArticleCard";
import { getOJSLink } from "@/config/ojs";
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

export const OJSCurrentIssueSection = () => {
  const [issue, setIssue] = useState<OJSIssue | null>(null);
  const [articles, setArticles] = useState<OJSArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
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
        } else {
          setError('The current issue is temporarily unavailable here. You can still view it on the AJVS journal portal.');
        }
      } catch (err) {
        console.error('Error loading current issue:', err);
        setError('The current issue is temporarily unavailable here. You can still view it on the AJVS journal portal.');
      } finally {
        setLoading(false);
      }
    };

    loadCurrentIssue();
  }, []);

  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const visibleArticles = articles.slice(startIndex, startIndex + ARTICLES_PER_PAGE);

  const goToPage = (page: number) => {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="flex flex-col items-start gap-3">
          <span>{error}</span>
          <Button asChild variant="outline" size="sm">
            <a href={getOJSLink('CURRENT_ISSUE')} target="_blank" rel="noopener noreferrer">
              View Issue 1 <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* Issue Header */}
      {issue && (
        <div className="bg-card/50 rounded-lg p-6 border border-border/50">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <h3 className="text-2xl font-serif font-bold mb-2">
                {issue.title || `Volume ${issue.volume}, Number ${issue.number} (${issue.year})`}
              </h3>
              {issue.datePublished && (
                <p className="text-muted-foreground">
                  Published: {new Date(issue.datePublished).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              )}
            </div>
            <Button asChild variant="outline">
              <a href={getOJSLink('CURRENT_ISSUE')} target="_blank" rel="noopener noreferrer">
                View Full Issue
                <ExternalLink className="ml-2 w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      )}

      {/* Articles Grid */}
      {articles.length > 0 ? (
        <>
          <div className="flex flex-col gap-1 border-b border-border pb-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <span>
              Showing {startIndex + 1}–{Math.min(startIndex + ARTICLES_PER_PAGE, articles.length)} of {articles.length} articles
            </span>
            <span>Ordered by page number</span>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {visibleArticles.map((article, index) => (
              <OJSArticleCard key={article.id} article={article} index={index} />
            ))}
          </div>
          {totalPages > 1 && (
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
