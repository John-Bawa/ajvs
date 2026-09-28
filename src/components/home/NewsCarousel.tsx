import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Newspaper } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface NewsItem {
  id: string;
  title: string;
  excerpt: string | null;
  slug: string;
  published_at: string;
  post_type: string;
}

const typeLabel: Record<string, string> = {
  article: "Article",
  news: "News",
  announcement: "Announcement",
};

export function NewsCarousel() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatest = async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("id, title, excerpt, slug, published_at, post_type")
        .eq("status", "published")
        .not("published_at", "is", null)
        .lte("published_at", new Date().toISOString())
        .order("published_at", { ascending: false })
        .limit(4);
      if (data) setItems(data as NewsItem[]);
      setLoading(false);
    };
    fetchLatest();
  }, []);

  return (
    <section className="border-b border-border bg-secondary/25 py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-7 flex items-end justify-between gap-4 border-b border-border pb-4">
          <div>
            <p className="mb-2 text-xs font-bold uppercase text-primary">Journal notices</p>
            <h2 className="font-serif text-3xl font-semibold">News & Announcements</h2>
          </div>
          <Link to="/blog" className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-primary hover:underline">View all <ArrowRight className="h-4 w-4" /></Link>
        </div>

        {loading ? (
          <div className="h-28 animate-pulse bg-muted" />
        ) : items.length > 0 ? (
          <div className="grid gap-x-8 md:grid-cols-2">
            {items.map((item) => (
              <article key={item.id} className="border-b border-border py-5">
                <div className="mb-2 flex items-center gap-3 text-xs font-semibold uppercase text-muted-foreground">
                  <span className="text-primary">{typeLabel[item.post_type] || "Article"}</span>
                  <span className="inline-flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{format(new Date(item.published_at), "d MMMM yyyy")}</span>
                </div>
                <h3 className="text-lg font-semibold leading-snug"><Link to={`/blog/${item.slug}`} className="hover:text-primary">{item.title}</Link></h3>
                {item.excerpt && <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{item.excerpt}</p>}
              </article>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-3 border-b border-border py-6 text-sm text-muted-foreground"><Newspaper className="h-5 w-5" /> No journal notices are available yet.</div>
        )}
      </div>
    </section>
  );
}