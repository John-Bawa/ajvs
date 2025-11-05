import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, ExternalLink } from "lucide-react";
import { getOJSLink } from "@/config/ojs";

export const OJSCurrentIssueWidget = () => {
  return (
    <Card className="shadow-card border-border/50">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <BookOpen className="w-5 h-5 text-primary" />
          Current Issue Articles
        </CardTitle>
        <a 
          href={getOJSLink('CURRENT_ISSUE')} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm text-primary hover:text-primary/80 flex items-center gap-1 transition-smooth"
        >
          View Full Issue <ExternalLink className="w-3 h-3" />
        </a>
      </CardHeader>
      <CardContent>
        <iframe 
          src={`${getOJSLink('CURRENT_ISSUE')}?format=rss`}
          style={{ border: 'none', width: '100%', height: '400px' }}
          title="Current Issue - AJVS"
          className="rounded-md"
        />
      </CardContent>
    </Card>
  );
};
