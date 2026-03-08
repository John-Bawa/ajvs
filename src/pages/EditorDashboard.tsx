import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import TopBar from "@/components/layout/TopBar";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, Link } from "react-router-dom";
import { FileText, PlusCircle, LogOut, Newspaper } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useUserRoles } from "@/hooks/useUserRoles";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function EditorDashboard() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: rolesLoading } = useUserRoles(user);
  const [stats, setStats] = useState({ totalPosts: 0, publishedPosts: 0, draftPosts: 0 });
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!rolesLoading && user && !isAdmin) {
      toast.error("You don't have access to the admin dashboard");
      navigate("/");
    }
  }, [isAdmin, rolesLoading, user, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchData();
    }
  }, [user, isAdmin]);

  const fetchData = async () => {
    try {
      const { data: posts } = await supabase
        .from("blog_posts")
        .select("id, title, status, published_at, created_at")
        .order("created_at", { ascending: false })
        .limit(5);

      setRecentPosts(posts || []);
      
      const allPosts = posts || [];
      setStats({
        totalPosts: allPosts.length,
        publishedPosts: allPosts.filter(p => p.status === "published").length,
        draftPosts: allPosts.filter(p => p.status === "draft").length,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out successfully");
    navigate("/");
  };

  if (authLoading || rolesLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-serif font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground mt-1">Manage blog posts and site content</p>
            </div>
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Link to="/admin/blog/editor">
              <Card className="p-6 hover:shadow-elegant transition-shadow cursor-pointer border-border/50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <PlusCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">New Post</h3>
                    <p className="text-sm text-muted-foreground">Create a blog post</p>
                  </div>
                </div>
              </Card>
            </Link>

            <Link to="/admin/blog">
              <Card className="p-6 hover:shadow-elegant transition-shadow cursor-pointer border-border/50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Newspaper className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Manage Posts</h3>
                    <p className="text-sm text-muted-foreground">Edit & publish posts</p>
                  </div>
                </div>
              </Card>
            </Link>

            <Card className="p-6 border-border/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{stats.totalPosts} Posts</h3>
                  <p className="text-sm text-muted-foreground">
                    {stats.publishedPosts} published · {stats.draftPosts} drafts
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Recent Posts */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-serif font-bold">Recent Posts</h2>
              <Link to="/admin/blog">
                <Button variant="outline" size="sm">View All</Button>
              </Link>
            </div>
            {recentPosts.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No posts yet. Create your first blog post!
              </p>
            ) : (
              <div className="space-y-3">
                {recentPosts.map((post) => (
                  <Link key={post.id} to={`/admin/blog/editor/${post.id}`}>
                    <div className="flex justify-between items-center p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <div>
                        <p className="font-medium">{post.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(post.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        post.status === 'published' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {post.status}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
