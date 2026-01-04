import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ExternalLink, AlertCircle } from "lucide-react";
import { fetchCurrentIssue, OJSArticle, OJSIssue } from "@/services/ojsApi";
import { OJSArticleCard } from "./OJSArticleCard";
import { getOJSLink } from "@/config/ojs";
import { formatNigerianDate, formatVolumeIssue } from "@/lib/nigerianFormat";
export const OJSCurrentIssueSection = () => {
  const [issue, setIssue] = useState<OJSIssue | null>(null);
  const [articles, setArticles] = useState<OJSArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCurrentIssue = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchCurrentIssue();
        
        if (data) {
          setIssue(data.issue);
          setArticles(data.articles);
        } else {
          setError('Unable to load current issue. Please try again later.');
        }
      } catch (err) {
        console.error('Error loading current issue:', err);
        setError('Failed to fetch current issue content.');
      } finally {
        setLoading(false);
      }
    };

    loadCurrentIssue();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
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
                {issue.title || formatVolumeIssue(issue.volume, issue.number, issue.year)}
              </h3>
              {issue.datePublished && (
                <p className="text-muted-foreground">
                  Published: {formatNigerianDate(issue.datePublished, { style: 'medium' })}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((article, index) => (
            <OJSArticleCard key={article.id} article={article} index={index} />
          ))}
        </div>
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
