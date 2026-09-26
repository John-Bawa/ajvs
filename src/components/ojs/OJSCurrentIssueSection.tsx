import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ExternalLink, AlertCircle } from "lucide-react";
import { fetchCurrentIssue, OJSArticle, OJSIssue } from "@/services/ojsApi";
import { OJSArticleCard } from "./OJSArticleCard";
import { getOJSLink } from "@/config/ojs";

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
