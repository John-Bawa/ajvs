import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { FileText, PlusCircle, Users, BookOpen, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user?.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error: any) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Signed out successfully");
      navigate("/");
    } catch (error: any) {
      toast.error("Error signing out");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const isAuthor = profile?.role === "author";
  const isEditor = ["super_admin", "editor", "section_editor", "secretary"].includes(profile?.role);
  const isReviewer = profile?.role === "reviewer";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          {/* Welcome Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-serif font-bold mb-2">
                Welcome, {profile?.full_name || "User"}
              </h1>
              <p className="text-muted-foreground">
                {profile?.institution && `${profile.institution} • `}
                {profile?.role && profile.role.replace("_", " ").charAt(0).toUpperCase() + profile.role.slice(1).replace("_", " ")}
              </p>
            </div>
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {isAuthor && (
              <Link to="/submit">
                <Card className="shadow-card transition-smooth hover:shadow-elegant cursor-pointer border-border/50 h-full">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <PlusCircle className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle>Submit Manuscript</CardTitle>
                    <CardDescription>Start a new manuscript submission</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            )}

            <Link to="/manuscripts">
              <Card className="shadow-card transition-smooth hover:shadow-elegant cursor-pointer border-border/50 h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>My Manuscripts</CardTitle>
                  <CardDescription>View and manage your submissions</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            {isReviewer && (
              <Link to="/reviews">
                <Card className="shadow-card transition-smooth hover:shadow-elegant cursor-pointer border-border/50 h-full">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle>Review Assignments</CardTitle>
                    <CardDescription>View pending review requests</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            )}

            {isEditor && (
              <Link to="/editorial">
                <Card className="shadow-card transition-smooth hover:shadow-elegant cursor-pointer border-border/50 h-full">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <BookOpen className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle>Editorial Dashboard</CardTitle>
                    <CardDescription>Manage submissions and workflow</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            )}
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest manuscripts and actions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-8">
                No recent activity to display
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
