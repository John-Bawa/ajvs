import { ExternalLink } from "lucide-react";
import { getOJSLink } from "@/config/ojs";
import { useEffect, useState } from "react";
import { fetchAnnouncements, OJSAnnouncement } from "@/services/ojsApi";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
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

  const stripDates = (html: string) =>
    html.replace(/\b\d{4}-\d{2}-\d{2}\b/g, "").replace(/\(\s*\)/g, "");

  return (
    <section aria-labelledby="announcements-heading">
      <div className="mb-2 flex items-center justify-between border-b border-border pb-2">
        <h2 id="announcements-heading" className="font-sans text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Latest announcements
        </h2>
        <a
          href={getOJSLink('ANNOUNCEMENTS')}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs font-medium text-accent hover:underline"
        >
          View all <ExternalLink className="h-3 w-3" aria-hidden />
        </a>
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : announcements.length > 0 ? (
        <ul className="divide-y divide-border">
          {announcements.map((announcement) => (
            <li key={announcement.id} className="py-3">
              <p className="meta-text mb-1">
                {new Date(announcement.datePosted).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
              </p>
              <h3 className="font-sans text-sm font-semibold leading-snug">{announcement.title}</h3>
              <div
                className="mt-1 line-clamp-2 text-sm text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(stripDates(announcement.description)) }}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="py-3 text-sm text-muted-foreground">
          No announcements at the moment.{" "}
          <a href={getOJSLink('ANNOUNCEMENTS')} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
            Visit the announcements page
          </a>
        </p>
      )}
    </section>
  );
};
