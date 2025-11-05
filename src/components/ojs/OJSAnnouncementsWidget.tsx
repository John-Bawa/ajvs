import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Megaphone, ExternalLink } from "lucide-react";
import { getOJSLink } from "@/config/ojs";

export const OJSAnnouncementsWidget = () => {
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
        <iframe 
          src={getOJSLink('ANNOUNCEMENTS')}
          style={{ border: 'none', width: '100%', height: '400px' }}
          title="AJVS Announcements"
          className="rounded-md"
        />
      </CardContent>
    </Card>
  );
};
