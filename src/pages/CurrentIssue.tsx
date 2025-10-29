import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { BookOpen, Calendar, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const CurrentIssue = () => {
  const [currentIssue, setCurrentIssue] = useState<any>(null);
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCurrentIssue();
  }, []);

  const fetchCurrentIssue = async () => {
    try {
      // Get current issue
      const { data: issue, error: issueError } = await supabase
        .from("issues")
        .select("*")
        .eq("is_current", true)
        .single();

      if (issueError) throw issueError;
      setCurrentIssue(issue);

      if (issue) {
        // Get published articles for this issue
        const { data: publishedArticles, error: articlesError } = await supabase
          .from("published_articles")
          .select(`
            *,
            manuscripts (
              id,
              title,
              abstract,
              keywords,
              subject_area,
              doi
            )
          `)
          .eq("issue_id", issue.id);

        if (articlesError) throw articlesError;
        setArticles(publishedArticles || []);
      }
    } catch (error: any) {
      console.error("Error fetching current issue:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Issue Header */}
          {currentIssue ? (
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="text-base px-4 py-1">Current Issue</Badge>
              </div>
              <h1 className="text-4xl font-serif font-bold mb-4">
                Volume {currentIssue.volume}, Number {currentIssue.number} ({currentIssue.year})
              </h1>
              {currentIssue.title && (
                <h2 className="text-2xl text-muted-foreground mb-4">{currentIssue.title}</h2>
              )}
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>
                  Published:{" "}
                  {currentIssue.published_date
                    ? new Date(currentIssue.published_date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "Upcoming"}
                </span>
              </div>
            </div>
          ) : (
            <div className="mb-12">
              <h1 className="text-4xl font-serif font-bold mb-4">Current Issue</h1>
              <p className="text-muted-foreground">No issue published yet</p>
            </div>
          )}

          {/* Articles */}
          {articles.length > 0 ? (
            <div className="space-y-8">
              {articles.map((article: any) => (
                <Card key={article.id} className="shadow-card hover:shadow-elegant transition-smooth">
                  <CardHeader>
                    <div className="flex items-start gap-4 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-2xl mb-2">
                          {article.manuscripts?.title || "Untitled"}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          Pages {article.pages || "TBD"} •{" "}
                          {article.manuscripts?.subject_area?.replace("_", " ") || "General"}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {article.manuscripts?.abstract || "No abstract available"}
                    </p>
                    {article.manuscripts?.keywords && article.manuscripts.keywords.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.manuscripts.keywords.map((keyword: string, index: number) => (
                          <Badge key={index} variant="secondary">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-2">
                      <Link to={`/article/${article.manuscripts?.id}`}>
                        <span className="text-primary hover:underline font-medium">
                          View Full Article →
                        </span>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : currentIssue ? (
            <Card>
              <CardContent className="py-12 text-center">
                <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">No articles yet</h3>
                <p className="text-muted-foreground">
                  Articles will appear here once they are published in this issue
                </p>
              </CardContent>
            </Card>
          ) : null}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CurrentIssue;
