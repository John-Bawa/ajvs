import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { FileText, Calendar, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Manuscripts = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [manuscripts, setManuscripts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
        return;
      }
      setUser(session.user);
    });
  }, [navigate]);

  useEffect(() => {
    if (user) {
      fetchManuscripts();
    }
  }, [user]);

  const fetchManuscripts = async () => {
    try {
      const { data, error } = await supabase
        .from("manuscripts")
        .select("*")
        .eq("submitting_author_id", user?.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setManuscripts(data || []);
    } catch (error: any) {
      console.error("Error fetching manuscripts:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      draft: "secondary",
      submitted: "default",
      under_review: "default",
      revision_requested: "outline",
      accepted: "default",
      rejected: "destructive",
      published: "default",
    };

    return (
      <Badge variant={variants[status] || "default"}>
        {status.replace("_", " ").toUpperCase()}
      </Badge>
    );
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
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-serif font-bold mb-2">My Manuscripts</h1>
              <p className="text-muted-foreground">View and manage your manuscript submissions</p>
            </div>
            <Link to="/submit">
              <Button>Submit New Manuscript</Button>
            </Link>
          </div>

          {manuscripts.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">No manuscripts yet</h3>
                <p className="text-muted-foreground mb-6">
                  Start by submitting your first manuscript
                </p>
                <Link to="/submit">
                  <Button>Submit Manuscript</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {manuscripts.map((manuscript) => (
                <Card key={manuscript.id} className="shadow-card hover:shadow-elegant transition-smooth">
                  <CardHeader>
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{manuscript.title}</CardTitle>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <FileText className="w-4 h-4" />
                            {manuscript.manuscript_type.replace("_", " ")}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(manuscript.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      {getStatusBadge(manuscript.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {manuscript.abstract}
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      {manuscript.status === "draft" && (
                        <Button variant="outline" size="sm">
                          Continue Editing
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Manuscripts;
