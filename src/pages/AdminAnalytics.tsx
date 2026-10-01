import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { format, subDays } from "date-fns";
import { BarChart3, CalendarDays, ExternalLink, FileText, MousePointerClick, Users } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useUserRoles } from "@/hooks/useUserRoles";
import { toast } from "sonner";

type InterestEvent = { event_type: string; source: string; created_at: string };

export default function AdminAnalytics() {
  const { user } = useAuth();
  const { roles, loading: rolesLoading } = useUserRoles(user);
  const navigate = useNavigate();
  const [events, setEvents] = useState<InterestEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const isAdmin = roles.some((role) => ["super_admin", "editor", "secretary"].includes(role));

  useEffect(() => {
    if (rolesLoading) return;
    if (!isAdmin) {
      navigate("/", { replace: true });
      return;
    }

    const load = async () => {
      setLoading(true);
      const since = subDays(new Date(), 29).toISOString();
      const { data, error } = await supabase.from("author_interest_events").select("event_type, source, created_at").gte("created_at", since).order("created_at", { ascending: true });
      if (error) toast.error("Author interest data could not be loaded");
      setEvents((data as InterestEvent[] | null) ?? []);
      setLoading(false);
    };
    void load();
  }, [isAdmin, navigate, rolesLoading]);

  const daily = useMemo(() => {
    const days = Array.from({ length: 30 }, (_, index) => {
      const date = subDays(new Date(), 29 - index);
      return { key: format(date, "yyyy-MM-dd"), date: format(date, "MMM d"), visits: 0, clicks: 0 };
    });
    const byDate = new Map(days.map((day) => [day.key, day]));
    events.forEach((event) => {
      const day = byDate.get(format(new Date(event.created_at), "yyyy-MM-dd"));
      if (!day) return;
      if (event.event_type === "author_portal_view") day.visits += 1;
      if (event.event_type === "ojs_submit_click") day.clicks += 1;
    });
    return days;
  }, [events]);

  const sources = useMemo(() => {
    const grouped = new Map<string, { source: string; visits: number; clicks: number }>();
    events.forEach((event) => {
      const row = grouped.get(event.source) ?? { source: event.source, visits: 0, clicks: 0 };
      if (event.event_type === "author_portal_view") row.visits += 1;
      if (event.event_type === "ojs_submit_click") row.clicks += 1;
      grouped.set(event.source, row);
    });
    return [...grouped.values()].sort((a, b) => b.visits + b.clicks - a.visits - a.clicks);
  }, [events]);

  const visits = events.filter((event) => event.event_type === "author_portal_view").length;
  const clicks = events.filter((event) => event.event_type === "ojs_submit_click").length;
  const rate = visits > 0 ? Math.round((clicks / visits) * 100) : 0;

  if (loading || rolesLoading) return <div className="min-h-screen bg-background"><Header /><main className="flex min-h-[60vh] items-center justify-center"><div className="h-10 w-10 animate-spin rounded-full border-b-2 border-primary" /></main><Footer /></div>;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs items={[{ label: "Blog Management", href: "/admin/blog" }, { label: "Author Interest" }]} />
      <main className="py-8 sm:py-12"><div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div><p className="text-xs font-bold uppercase text-primary">Last 30 days</p><h1 className="mt-1 flex items-center gap-2 text-3xl font-serif font-bold"><BarChart3 className="h-7 w-7 text-primary" />Author interest</h1><p className="mt-2 text-muted-foreground">Portal visits and clicks through to the official OJS submission page.</p></div>
          <Button asChild variant="outline"><Link to="/admin/blog"><FileText className="h-4 w-4" />Blog management</Link></Button>
        </div>
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {[{ label: "Portal visits", value: visits, icon: Users }, { label: "OJS submit clicks", value: clicks, icon: MousePointerClick }, { label: "Interest rate", value: `${rate}%`, icon: ExternalLink }].map(({ label, value, icon: Icon }) => <Card key={label}><CardContent className="flex items-center gap-4 p-5"><div className="flex h-11 w-11 items-center justify-center bg-primary/10"><Icon className="h-5 w-5 text-primary" /></div><div><p className="text-2xl font-bold">{value}</p><p className="text-sm text-muted-foreground">{label}</p></div></CardContent></Card>)}
        </div>
        <section className="mb-8 border border-border bg-card p-4 sm:p-6" aria-labelledby="daily-heading">
          <div className="mb-6"><h2 id="daily-heading" className="flex items-center gap-2 text-xl font-serif font-bold"><CalendarDays className="h-5 w-5 text-primary" />Interest by date</h2><p className="text-sm text-muted-foreground">Daily activity over the latest 30-day window.</p></div>
          <div className="h-80 w-full"><ResponsiveContainer width="100%" height="100%"><BarChart data={daily} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}><CartesianGrid strokeDasharray="3 3" vertical={false} /><XAxis dataKey="date" tick={{ fontSize: 11 }} interval={4} /><YAxis allowDecimals={false} /><Tooltip /><Legend /><Bar dataKey="visits" name="Portal visits" fill="hsl(var(--primary))" radius={[2, 2, 0, 0]} /><Bar dataKey="clicks" name="OJS clicks" fill="hsl(var(--accent))" radius={[2, 2, 0, 0]} /></BarChart></ResponsiveContainer></div>
        </section>
        <section className="border border-border bg-card" aria-labelledby="source-heading">
          <div className="border-b border-border p-5 sm:p-6"><h2 id="source-heading" className="text-xl font-serif font-bold">Interest by source</h2><p className="text-sm text-muted-foreground">Visits show the referral or campaign source; clicks show the button location.</p></div>
          <Table><TableHeader><TableRow><TableHead>Source</TableHead><TableHead className="text-right">Visits</TableHead><TableHead className="text-right">OJS clicks</TableHead></TableRow></TableHeader><TableBody>{sources.length > 0 ? sources.map((row) => <TableRow key={row.source}><TableCell className="font-medium">{row.source.replace(/_/g, " ")}</TableCell><TableCell className="text-right">{row.visits}</TableCell><TableCell className="text-right">{row.clicks}</TableCell></TableRow>) : <TableRow><TableCell colSpan={3} className="py-10 text-center text-muted-foreground">No author-interest activity has been recorded yet.</TableCell></TableRow>}</TableBody></Table>
        </section>
      </div></main>
      <Footer />
    </div>
  );
}