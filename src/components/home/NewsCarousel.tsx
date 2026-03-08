import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight, ArrowRight, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  const [startIndex, setStartIndex] = useState(0);
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
        .limit(6);
      if (data) setItems(data as NewsItem[]);
      setLoading(false);
    };
    fetchLatest();
  }, []);

  const itemsToShow = 3;

  const nextSlide = () => {
    if (items.length > 0) setStartIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    if (items.length > 0) setStartIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const getVisibleItems = () => {
    const visible = [];
    for (let i = 0; i < Math.min(itemsToShow, items.length); i++) {
      visible.push(items[(startIndex + i) % items.length]);
    }
    return visible;
  };

  if (loading) {
    return (
      <section className="py-12 sm:py-16 md:py-20 bg-secondary/20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="py-12 sm:py-16 md:py-20 bg-secondary/20">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <Newspaper className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
          <h2 className="text-2xl font-serif font-bold mb-2">Latest from AJVS</h2>
          <p className="text-muted-foreground">No posts yet. Check back soon!</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-2">
              Latest from AJVS
            </h2>
            <p className="text-muted-foreground">
              News, announcements, and articles
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={prevSlide} className="rounded-full h-10 w-10">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Link to="/blog">
              <Button variant="link" className="text-primary">View All</Button>
            </Link>
            <Button variant="outline" size="icon" onClick={nextSlide} className="rounded-full h-10 w-10">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border mb-8" />

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {getVisibleItems().map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group"
            >
              <Link to={`/blog/${item.slug}`} className="block">
                {/* Type Badge */}
                <Badge variant="secondary" className="mb-3 text-xs">
                  {typeLabel[item.post_type] || "Article"}
                </Badge>

                {/* Title */}
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {item.title}
                </h3>

                {/* Excerpt */}
                {item.excerpt && (
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {item.excerpt}
                  </p>
                )}

                {/* Date */}
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                  <Calendar className="h-4 w-4" />
                  <span>{format(new Date(item.published_at), "MMMM d, yyyy")}</span>
                </div>

                {/* Read More */}
                <span className="text-sm font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read More <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
