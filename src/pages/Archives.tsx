import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Calendar, BookOpen, Download, ExternalLink, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import TopBar from "@/components/layout/TopBar";
import { SEOHead } from "./SEOHead";
import { fetchAllIssues, fetchIssueArticles, OJSArticle, OJSIssue, getArticleUrl, getArticlePdfUrl } from "@/services/ojsApi";
import DOMPurify from "dompurify";

const Archives = () => {
  const [issues, setIssues] = useState<OJSIssue[]>([]);
  const [articlesMap, setArticlesMap] = useState<Map<number, OJSArticle[]>>(new Map());
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchArchives();
  }, []);

  const fetchArchives = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch all issues from OJS
      const issuesData = await fetchAllIssues();
      
      if (!issuesData || issuesData.length === 0) {
        setError('No archived issues available yet. Please check back soon.');
        setLoading(false);
        return;
      }

      setIssues(issuesData);

      // Fetch articles for each issue
      const articlesPromises = issuesData.map(issue => fetchIssueArticles(issue.id));
      const articlesResults = await Promise.all(articlesPromises);

      const newArticlesMap = new Map<number, OJSArticle[]>();
      issuesData.forEach((issue, index) => {
        newArticlesMap.set(issue.id, articlesResults[index] || []);
      });

      setArticlesMap(newArticlesMap);
    } catch (error) {
      console.error('Error fetching archives:', error);
      setError('Failed to load archives. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const getFilteredIssuesWithArticles = () => {
    if (!searchTerm) {
      return issues.map(issue => ({
        issue,
        articles: articlesMap.get(issue.id) || []
      }));
    }

    const searchLower = searchTerm.toLowerCase();
    return issues.map(issue => {
      const issueArticles = articlesMap.get(issue.id) || [];
      const filteredArticles = issueArticles.filter(article => {
        const title = article.title?.toLowerCase() || '';
        const abstract = article.abstract?.toLowerCase() || '';
        const authors = article.authors?.map(a => a.fullName).join(' ').toLowerCase() || '';
        
        return title.includes(searchLower) || 
               abstract.includes(searchLower) || 
               authors.includes(searchLower);
      });

      return {
        issue,
        articles: filteredArticles
      };
    });
  };

  const groupedArticles = getFilteredIssuesWithArticles();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-hero">
        <TopBar />
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-hero">
        <SEOHead
          title="Archives"
          description="Browse all published issues and articles in the AJVS archives. Access peer-reviewed veterinary research publications."
          canonicalUrl="https://africanjournalvetsci.org/archives"
        />
        <TopBar />
        <Header />
        <main className="flex-1 py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                Journal Archives
              </h1>
            </div>
            <Alert variant="destructive" className="glass">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-hero">
      <SEOHead
        title="Archives"
        description="Browse all published issues and articles in the AJVS archives. Access peer-reviewed veterinary research publications."
        canonicalUrl="https://africanjournalvetsci.org/archives"
      />
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
            {groupedArticles.length === 0 ? (
              <Alert className="glass">
                <AlertDescription>
                  {searchTerm 
                    ? 'No articles found matching your search criteria.' 
                    : 'No publications available yet. Please check back soon.'}
                </AlertDescription>
              </Alert>
            ) : (
              groupedArticles.map(({ issue, articles: issueArticles }) => (
                <div key={issue.id} className="glass rounded-2xl p-8 hover-lift">
                  <div className="flex items-center justify-between mb-6 pb-6 border-b border-border/50">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl bg-primary/20 dark:bg-primary/30 flex items-center justify-center">
                        <BookOpen className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-serif font-bold">
                          {issue.title || `Volume ${issue.volume}, Number ${issue.number}`}
                        </h2>
                        <div className="flex items-center gap-2 text-muted-foreground mt-1">
                          <Calendar className="w-4 h-4" />
                          <span>{issue.year || new Date(issue.datePublished || '').getFullYear()}</span>
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
                              {article.title}
                            </h3>
                            
                            {article.authors && article.authors.length > 0 && (
                              <div className="flex flex-wrap gap-2 mb-3">
                                {article.authors.slice(0, 3).map((author, idx) => (
                                  <span key={idx} className="text-sm text-muted-foreground">
                                    {author.fullName}
                                    {idx < Math.min(article.authors!.length, 3) - 1 && ","}
                                  </span>
                                ))}
                                {article.authors.length > 3 && (
                                  <span className="text-sm text-muted-foreground italic">
                                    et al.
                                  </span>
                                )}
                              </div>
                            )}

                            {article.abstract && (
                              <div 
                                className="text-sm text-muted-foreground line-clamp-2 mb-4"
                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.abstract) }}
                              />
                            )}

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                {article.pages && <span>Pages: {article.pages}</span>}
                                {article.doi && <span>DOI: {article.doi}</span>}
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" asChild>
                                  <a href={getArticleUrl(article)} target="_blank" rel="noopener noreferrer">
                                    View <ExternalLink className="ml-1 w-3 h-3" />
                                  </a>
                                </Button>
                                {getArticlePdfUrl(article) && (
                                  <Button size="sm" className="gap-2" asChild>
                                    <a href={getArticlePdfUrl(article)!} target="_blank" rel="noopener noreferrer">
                                      <Download className="w-4 h-4" />
                                      PDF
                                    </a>
                                  </Button>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Archives;
