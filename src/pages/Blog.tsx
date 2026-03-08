import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { SEOHead } from "./SEOHead";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Newspaper, Megaphone, FileText, BookOpen } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { BlogCard } from "@/components/blog/BlogCard";
import type { BlogPost, BlogCategory } from "@/types/blog";
import { motion } from "framer-motion";

const POST_TYPES = [
  { value: null, label: "All", icon: BookOpen },
  { value: "article", label: "Articles", icon: FileText },
  { value: "news", label: "News", icon: Newspaper },
  { value: "announcement", label: "Announcements", icon: Megaphone },
] as const;

export default function Blog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeType, setActiveType] = useState<string | null>(
    searchParams.get("type") || null
  );

  useEffect(() => {
    fetchCategories();
    fetchPosts();
  }, []);

  useEffect(() => {
    const typeParam = searchParams.get("type");
    if (typeParam && ["article", "news", "announcement"].includes(typeParam)) {
      setActiveType(typeParam);
    }
  }, [searchParams]);

  const fetchCategories = async () => {
    const { data } = await supabase.from('blog_categories').select('*').order('name');
    if (data) setCategories(data as unknown as BlogCategory[]);
  };

  const fetchPosts = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('blog_posts')
      .select('*, blog_categories(*), blog_post_tags(blog_tags(*))')
      .eq('status', 'published')
      .not('published_at', 'is', null)
      .lte('published_at', new Date().toISOString())
      .order('published_at', { ascending: false });
    if (data) setPosts(data as unknown as BlogPost[]);
    setLoading(false);
  };

  const handleTypeChange = (type: string | null) => {
    setActiveType(type);
    if (type) {
      setSearchParams({ type });
    } else {
      setSearchParams({});
    }
  };

  const filtered = posts.filter(p => {
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) ||
      (p.excerpt || '').toLowerCase().includes(search.toLowerCase());
    const matchCategory = !activeCategory || p.category_id === activeCategory;
    const matchType = !activeType || (p as any).post_type === activeType;
    return matchSearch && matchCategory && matchType;
  });

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="News & Blog"
        description="Read the latest news, announcements, research updates, and articles from the African Journal of Veterinary Sciences."
        canonicalUrl="https://africanjournalvetsci.org/blog"
        keywords={["AJVS blog", "veterinary news", "research updates", "journal announcements"]}
        breadcrumbs={[
          { name: "Home", url: "https://africanjournalvetsci.org" },
          { name: "News & Blog", url: "https://africanjournalvetsci.org/blog" }
        ]}
      />
      <Header />
      <Breadcrumbs />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Newspaper className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">News & Blog</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Latest updates, announcements, research highlights, and articles from AJVS
            </p>
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-10 h-11 rounded-full border-border/60"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Type + Category Tabs */}
      <div className="border-b border-border/30 bg-background sticky top-16 z-30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-none">
            {/* Post Type Filters */}
            {POST_TYPES.map(t => {
              const Icon = t.icon;
              return (
                <Button
                  key={t.label}
                  variant={activeType === t.value ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleTypeChange(t.value)}
                  className="rounded-full flex-shrink-0 gap-1.5"
                >
                  <Icon className="w-3.5 h-3.5" />
                  {t.label}
                </Button>
              );
            })}
            
            {/* Separator */}
            {categories.length > 0 && (
              <div className="h-5 w-px bg-border/50 mx-1 flex-shrink-0" />
            )}

            {/* Category Filters */}
            {categories.map(c => (
              <Button
                key={c.id}
                variant={activeCategory === c.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveCategory(activeCategory === c.id ? null : c.id)}
                className="rounded-full flex-shrink-0"
              >
                {c.name}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Posts */}
      <main className="flex-1 py-10 sm:py-14">
        <div className="container mx-auto px-4 sm:px-6">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <Newspaper className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">No articles found</h2>
              <p className="text-muted-foreground">Check back soon for new content.</p>
            </div>
          ) : (
            <>
              {/* Featured Post */}
              {featured && (
                <motion.div
                  className="mb-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <BlogCard post={featured} featured />
                </motion.div>
              )}

              {/* Post Grid */}
              {rest.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map((post, i) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                    >
                      <BlogCard post={post} />
                    </motion.div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
