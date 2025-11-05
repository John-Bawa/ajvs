import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Megaphone, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";
import DOMPurify from "dompurify";
import { getOJSLink } from "@/config/ojs";

const News = () => {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const { data, error } = await supabase
        .from("announcements")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setAnnouncements(data || []);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    } finally {
      setLoading(false);
    }
  };

  const getAnnouncementTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      general: "bg-secondary",
      call_for_papers: "bg-primary/20 text-primary",
      conference: "bg-banner/20 text-banner",
      editorial: "bg-accent/20 text-accent",
    };
    return colors[type] || colors.general;
  };

  const getAnnouncementTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      general: "General",
      call_for_papers: "Call for Papers",
      conference: "Conference",
      editorial: "Editorial",
    };
    return labels[type] || "Announcement";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-hero">
      <Header />
      
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              News & Announcements
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
              Stay updated with the latest news from AJVS
            </p>
            <a 
              href={getOJSLink('ANNOUNCEMENTS')} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button size="lg" className="gap-2">
                View All Announcements on OJS
                <ExternalLink className="w-4 h-4" />
              </Button>
            </a>
          </div>

          {/* OJS Announcements Widget */}
          <Card className="shadow-card border-border/50 mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Megaphone className="w-6 h-6 text-primary" />
                Latest Official Announcements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <iframe 
                src={getOJSLink('ANNOUNCEMENTS')}
                style={{ border: 'none', width: '100%', minHeight: '600px', maxWidth: '100%' }}
                title="AJVS Official Announcements"
                className="rounded-md bg-background"
              />
            </CardContent>
          </Card>

          {announcements.length === 0 ? (
            <Card className="glass p-12 text-center">
              <Megaphone className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No Announcements Yet</h3>
              <p className="text-muted-foreground">
                Check back soon for the latest news and updates from AJVS
              </p>
            </Card>
          ) : (
            <div className="space-y-6">
              {announcements.map((announcement) => (
                <Card key={announcement.id} className="glass-hover overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <Badge className={getAnnouncementTypeColor(announcement.type)}>
                          {getAnnouncementTypeLabel(announcement.type)}
                        </Badge>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {formatDistanceToNow(new Date(announcement.created_at), {
                              addSuffix: true,
                            })}
                          </span>
                        </div>
                      </div>

                      <h2 className="text-2xl font-serif font-bold mb-4">
                        {announcement.title}
                      </h2>

                      <div 
                        className="prose prose-sm max-w-none text-muted-foreground"
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(announcement.content) }}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Sample Featured Announcements (Placeholder) */}
          {announcements.length === 0 && (
            <div className="grid md:grid-cols-2 gap-6 mt-12">
              <Card className="glass-hover">
                <CardContent className="p-6">
                  <Badge className="mb-4">Call for Papers</Badge>
                  <h3 className="font-serif font-bold text-lg mb-2">
                    Special Issue: One Health in Africa
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    We invite submissions for our special issue focusing on One Health approaches to disease control in Africa. Deadline: September 30, 2025.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>Posted 2 days ago</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-hover">
                <CardContent className="p-6">
                  <Badge className="mb-4 bg-banner/20 text-banner">Conference</Badge>
                  <h3 className="font-serif font-bold text-lg mb-2">
                    AJVS Symposium 2025
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Join us for the inaugural AJVS Veterinary Sciences Symposium in Jos, Nigeria. Early bird registration now open!
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>Posted 1 week ago</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-hover">
                <CardContent className="p-6">
                  <Badge className="mb-4 bg-accent/20 text-accent">Editorial</Badge>
                  <h3 className="font-serif font-bold text-lg mb-2">
                    New Section Editors Appointed
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    AJVS welcomes new section editors for Wildlife Medicine and Veterinary Public Health. Read more about our expanded editorial board.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>Posted 2 weeks ago</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-hover">
                <CardContent className="p-6">
                  <Badge className="mb-4">General</Badge>
                  <h3 className="font-serif font-bold text-lg mb-2">
                    AJVS Now Indexed in AJOL
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    We are pleased to announce that AJVS is now indexed in African Journals Online (AJOL), increasing our visibility across Africa.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>Posted 3 weeks ago</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default News;
