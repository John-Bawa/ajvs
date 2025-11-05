import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Calendar, BookOpen, Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

import TopBar from "@/components/layout/TopBar";

const Archives = () => {
  const [issues, setIssues] = useState<any[]>([]);
  const [articles, setArticles] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArchives();
  }, []);

  const fetchArchives = async () => {
    try {
      const { data: issuesData, error: issuesError } = await supabase
        .from("issues")
        .select("*")
        .order("year", { ascending: false })
        .order("number", { ascending: false });

      if (issuesError) throw issuesError;

      const { data: articlesData, error: articlesError } = await supabase
        .from("published_articles")
        .select(`
          *,
          manuscript:manuscripts(
            id,
            title,
            abstract,
            keywords,
            manuscript_authors(
              full_name,
              orcid
            )
          ),
          issue:issues(
            volume,
            number,
            year
          )
        `)
        .order("published_date", { ascending: false });

      if (articlesError) throw articlesError;

      setIssues(issuesData || []);
      setArticles(articlesData || []);
    } catch (error) {
      console.error("Error fetching archives:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredArticles = articles.filter((article) => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    const title = article.manuscript?.title?.toLowerCase() || "";
    const abstract = article.manuscript?.abstract?.toLowerCase() || "";
    const keywords = article.manuscript?.keywords?.join(" ").toLowerCase() || "";
    const authors = article.manuscript?.manuscript_authors?.map((a: any) => a.full_name.toLowerCase()).join(" ") || "";
    
    return title.includes(searchLower) || 
           abstract.includes(searchLower) || 
           keywords.includes(searchLower) ||
           authors.includes(searchLower);
  });

  const groupedArticles = issues.map((issue) => ({
    issue,
    articles: filteredArticles.filter(
      (article) => article.issue_id === issue.id
    ),
  }));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-hero">
      <TopBar />
      <Header />
      
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Journal Archives
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Browse all published issues and articles of AJVS
            </p>
          </div>

          {/* Search */}
          <div className="glass rounded-2xl p-6 mb-12">
            <div className="flex items-center gap-4">
              <Search className="w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by title, author, keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 border-0 bg-transparent focus-visible:ring-0"
              />
            </div>
          </div>

          {/* Archives by Issue */}
          <div className="space-y-8">
            {groupedArticles.map(({ issue, articles: issueArticles }) => (
              <div key={issue.id} className="glass rounded-2xl p-8 hover-lift">
                <div className="flex items-center justify-between mb-6 pb-6 border-b border-border/50">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl gradient-royal flex items-center justify-center">
                      <BookOpen className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-serif font-bold">
                        {issue.title || `Volume ${issue.volume}, Issue ${issue.number}`}
                      </h2>
                      <div className="flex items-center gap-2 text-muted-foreground mt-1">
                        <Calendar className="w-4 h-4" />
                        <span>{issue.year}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Articles</div>
                    <div className="text-2xl font-bold text-primary">{issueArticles.length}</div>
                  </div>
                </div>

                {issueArticles.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    No articles published in this issue yet
                  </p>
                ) : (
                  <div className="space-y-4">
                    {issueArticles.map((article) => (
                      <Card key={article.id} className="hover-lift border-border/50">
                        <CardContent className="p-6">
                          <h3 className="text-lg font-serif font-bold mb-2">
                            {article.manuscript?.title || "Untitled"}
                          </h3>
                          
                          <div className="flex flex-wrap gap-2 mb-3">
                            {article.manuscript?.manuscript_authors?.slice(0, 3).map((author: any, idx: number) => (
                              <span key={idx} className="text-sm text-muted-foreground">
                                {author.full_name}
                                {idx < article.manuscript.manuscript_authors.length - 1 && ","}
                              </span>
                            ))}
                            {article.manuscript?.manuscript_authors?.length > 3 && (
                              <span className="text-sm text-muted-foreground italic">
                                et al.
                              </span>
                            )}
                          </div>

                          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                            {article.manuscript?.abstract}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              {article.pages && <span>Pages: {article.pages}</span>}
                              {article.manuscript?.doi && <span>DOI: {article.manuscript.doi}</span>}
                            </div>
                            <div className="flex gap-2">
                              <Link to={`/article/${article.manuscript?.id}`}>
                                <Button variant="outline" size="sm">View</Button>
                              </Link>
                              <Button size="sm" className="gap-2">
                                <Download className="w-4 h-4" />
                                PDF
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {groupedArticles.every(({ articles }) => articles.length === 0) && (
              <Card className="glass p-12 text-center">
                <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                <p className="text-muted-foreground">
                  {searchTerm ? "Try adjusting your search terms" : "Archives will appear here once articles are published"}
                </p>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Archives;
