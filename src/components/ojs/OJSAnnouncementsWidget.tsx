import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Megaphone, ExternalLink, Calendar } from "lucide-react";
import { getOJSLink } from "@/config/ojs";
import { useEffect, useState } from "react";
import { fetchAnnouncements, OJSAnnouncement } from "@/services/ojsApi";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Badge } from "@/components/ui/badge";
import DOMPurify from "dompurify";

export const OJSAnnouncementsWidget = () => {
  const [announcements, setAnnouncements] = useState<OJSAnnouncement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnnouncements = async () => {
      const data = await fetchAnnouncements();
      setAnnouncements(data.slice(0, 3)); // Show only 3 announcements
      setLoading(false);
    };
    loadAnnouncements();
  }, []);

  return (
    <Card className="shadow-card border-border/50">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Megaphone className="w-5 h-5 text-primary" />
          Latest Announcements
        </CardTitle>
        <a 
          href={getOJSLink('ANNOUNCEMENTS')} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm text-primary hover:text-primary/80 flex items-center gap-1 transition-smooth"
        >
          View All <ExternalLink className="w-3 h-3" />
        </a>
      </CardHeader>
      <CardContent>
        {loading ? (
          <LoadingSpinner />
        ) : announcements.length > 0 ? (
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="border-b border-border/50 pb-4 last:border-0 last:pb-0">
                <h4 className="font-semibold mb-2">{announcement.title}</h4>
                <div 
                  className="text-sm text-muted-foreground mb-2 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(announcement.description) }}
                />
                <Badge variant="secondary" className="text-xs">
                  <Calendar className="w-3 h-3 mr-1" />
                  {new Date(announcement.datePosted).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </Badge>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4 space-y-3">
            <div className="w-10 h-10 mx-auto rounded-full bg-muted flex items-center justify-center">
              <Megaphone className="w-5 h-5 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-sm">
              No announcements at the moment. Check back soon for updates!
            </p>
            <a 
              href={getOJSLink('ANNOUNCEMENTS')} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors"
            >
              Visit announcements page <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
