import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { FileText, Users, DollarSign, BookOpen, BarChart3 } from "lucide-react";
import { AnalyticsCharts } from "@/components/admin/AnalyticsCharts";
import { ReviewerReminders } from "@/components/admin/ReviewerReminders";
import { PaymentReceipts } from "@/components/admin/PaymentReceipts";
import { BulkEmailDialog } from "@/components/admin/BulkEmailDialog";

export default function EditorDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState({
    totalManuscripts: 0,
    pendingReview: 0,
    underReview: 0,
    accepted: 0,
    totalPayments: 0,
    pendingPayments: 0,
  });
  const [manuscripts, setManuscripts] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [analyticsData, setAnalyticsData] = useState({
    submissionsByMonth: [] as Array<{ month: string; count: number }>,
    statusDistribution: [] as Array<{ name: string; value: number }>,
    reviewDurations: [] as Array<{ manuscript: string; days: number }>,
    acceptanceRate: 0,
  });

  useEffect(() => {
    checkAuthAndFetch();
  }, []);

  const checkAuthAndFetch = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
      return;
    }

    setUser(session.user);

    // Check if user has editor role
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id);

    const userRoles = roles?.map(r => r.role) || [];
    const isEditor = userRoles.some(r => ['super_admin', 'editor', 'secretary'].includes(r));
    
    if (!isEditor) {
      navigate("/dashboard");
      return;
    }

    await fetchDashboardData();
  };

  const fetchDashboardData = async () => {
    try {
      // Fetch all manuscripts for analytics
      const { data: allManuscripts } = await supabase
        .from("manuscripts")
        .select("*, profiles(full_name), reviews(status, submitted_at, created_at)")
        .order("created_at", { ascending: false });

      const { data: manuscriptsData } = await supabase
        .from("manuscripts")
        .select("*, profiles(full_name)")
        .order("created_at", { ascending: false })
        .limit(10);

      const { data: paymentsData } = await supabase
        .from("payments")
        .select("*")
        .eq("status", "completed");

      setManuscripts(manuscriptsData || []);
      setPayments(paymentsData || []);

      // Calculate stats
      const totalPayments = paymentsData?.reduce((sum, p) => sum + Number(p.amount), 0) || 0;
      const pendingPayments = paymentsData?.filter(p => p.status === "pending").length || 0;

      setStats({
        totalManuscripts: allManuscripts?.length || 0,
        pendingReview: allManuscripts?.filter(m => m.status === "submitted").length || 0,
        underReview: allManuscripts?.filter(m => m.status === "under_review").length || 0,
        accepted: allManuscripts?.filter(m => m.status === "accepted").length || 0,
        totalPayments,
        pendingPayments,
      });

      // Process analytics data
      processAnalytics(allManuscripts || []);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const processAnalytics = (manuscripts: any[]) => {
    // Submissions by month (last 12 months)
    const monthsData: { [key: string]: number } = {};
    const now = new Date();
    for (let i = 11; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
      monthsData[key] = 0;
    }

    manuscripts.forEach(m => {
      const date = new Date(m.created_at);
      const key = date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
      if (monthsData[key] !== undefined) {
        monthsData[key]++;
      }
    });

    const submissionsByMonth = Object.entries(monthsData).map(([month, count]) => ({
      month,
      count,
    }));

    // Status distribution
    const statusCounts: { [key: string]: number } = {};
    manuscripts.forEach(m => {
      const status = m.status.replace('_', ' ').charAt(0).toUpperCase() + m.status.slice(1).replace('_', ' ');
      statusCounts[status] = (statusCounts[status] || 0) + 1;
    });

    const statusDistribution = Object.entries(statusCounts).map(([name, value]) => ({
      name,
      value,
    }));

    // Review durations
    const reviewDurations = manuscripts
      .filter(m => m.reviews && m.reviews.length > 0)
      .map(m => {
        const review = m.reviews[0];
        if (review.submitted_at) {
          const days = Math.floor(
            (new Date(review.submitted_at).getTime() - new Date(review.created_at).getTime()) /
            (1000 * 60 * 60 * 24)
          );
          return {
            manuscript: m.title.substring(0, 20) + '...',
            days,
          };
        }
        return null;
      })
      .filter(Boolean) as Array<{ manuscript: string; days: number }>;

    // Acceptance rate
    const completedReviews = manuscripts.filter(m => 
      m.status === 'accepted' || m.status === 'rejected'
    );
    const acceptedCount = manuscripts.filter(m => m.status === 'accepted').length;
    const acceptanceRate = completedReviews.length > 0
      ? Math.round((acceptedCount / completedReviews.length) * 100)
      : 0;

    setAnalyticsData({
      submissionsByMonth,
      statusDistribution,
      reviewDurations,
      acceptanceRate,
    });
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      draft: "secondary",
      submitted: "default",
      under_review: "default",
      accepted: "outline",
      rejected: "destructive",
    };
    return <Badge variant={variants[status] || "default"}>{status.replace("_", " ")}</Badge>;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-serif font-bold">Editorial Dashboard</h1>
            <BulkEmailDialog />
          </div>

          {/* Tabs for different sections */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="reminders">Reminders</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Stats Grid */}
              <div className="grid md:grid-cols-4 gap-6">
                <Card className="glass-card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Submissions</p>
                      <p className="text-3xl font-bold">{stats.totalManuscripts}</p>
                    </div>
                    <FileText className="w-8 h-8 text-primary" />
                  </div>
                </Card>
                <Card className="glass-card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Pending Review</p>
                      <p className="text-3xl font-bold">{stats.pendingReview}</p>
                    </div>
                    <BookOpen className="w-8 h-8 text-amber-500" />
                  </div>
                </Card>
                <Card className="glass-card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Under Review</p>
                      <p className="text-3xl font-bold">{stats.underReview}</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-500" />
                  </div>
                </Card>
                <Card className="glass-card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Accepted</p>
                      <p className="text-3xl font-bold">{stats.accepted}</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-green-500" />
                  </div>
                </Card>
              </div>

              {/* Recent Manuscripts */}
              <Card className="glass-card p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif font-bold">Recent Submissions</h2>
              <Button variant="outline">View All</Button>
            </div>
            {loading ? (
              <p>Loading...</p>
            ) : manuscripts.length === 0 ? (
              <p className="text-muted-foreground">No submissions yet.</p>
            ) : (
              <div className="space-y-4">
                {manuscripts.map((manuscript) => (
                  <Card key={manuscript.id} className="p-4 hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{manuscript.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Author: {manuscript.profiles?.full_name} | Type: {manuscript.manuscript_type}
                        </p>
                        <p className="text-sm line-clamp-2">{manuscript.abstract}</p>
                      </div>
                      <div className="ml-4 flex flex-col items-end gap-2">
                        {getStatusBadge(manuscript.status)}
                        <Button size="sm">Manage</Button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-4 pt-4 border-t">
                      <p className="text-xs text-muted-foreground">
                        Submitted: {new Date(manuscript.created_at).toLocaleDateString()}
                      </p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Assign Reviewer</Button>
                        <Button size="sm" variant="outline">Send Decision</Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <AnalyticsCharts
                submissionsByMonth={analyticsData.submissionsByMonth}
                statusDistribution={analyticsData.statusDistribution}
                reviewDurations={analyticsData.reviewDurations}
                acceptanceRate={analyticsData.acceptanceRate}
              />
            </TabsContent>

            <TabsContent value="reminders">
              <ReviewerReminders />
            </TabsContent>

            <TabsContent value="payments">
              <PaymentReceipts payments={payments} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
