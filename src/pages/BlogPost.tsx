import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { SEOHead } from "./SEOHead";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, ArrowLeft, Tag } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { BlogCard } from "@/components/blog/BlogCard";
import type { BlogPost as BlogPostType } from "@/types/blog";
import { format } from "date-fns";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [related, setRelated] = useState<BlogPostType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) fetchPost(slug);
  }, [slug]);

  const fetchPost = async (slug: string) => {
    setLoading(true);
    const { data } = await supabase
      .from('blog_posts')
      .select('*, blog_categories(*), blog_post_tags(blog_tags(*))')
      .eq('slug', slug)
      .single();

    if (data) {
      const p = data as unknown as BlogPostType;
      setPost(p);
      // Fetch related posts in same category
      if (p.category_id) {
        const { data: rel } = await supabase
          .from('blog_posts')
          .select('*, blog_categories(*), blog_post_tags(blog_tags(*))')
          .eq('status', 'published')
          .eq('category_id', p.category_id)
          .neq('id', p.id)
          .lte('published_at', new Date().toISOString())
          .order('published_at', { ascending: false })
          .limit(3);
        if (rel) setRelated(rel as unknown as BlogPostType[]);
      }
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Article not found</h1>
            <Link to="/blog" className="text-primary hover:underline">← Back to Blog</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const publishedDate = post.published_at ? format(new Date(post.published_at), 'MMMM d, yyyy') : '';
  const authorName = post.profiles?.full_name || 'AJVS Editorial';
  const tags = post.blog_post_tags?.map(pt => pt.blog_tags) || [];

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title={post.seo_title || post.title}
        description={post.meta_description || post.excerpt || ''}
        canonicalUrl={`https://africanjournalvetsci.org/blog/${post.slug}`}
        keywords={post.keywords || []}
        breadcrumbs={[
          { name: "Home", url: "https://africanjournalvetsci.org" },
          { name: "Blog", url: "https://africanjournalvetsci.org/blog" },
          { name: post.title, url: `https://africanjournalvetsci.org/blog/${post.slug}` },
        ]}
      />
      <Header />
      <Breadcrumbs items={[
        { label: "Blog", href: "/blog" },
        { label: post.title },
      ]} />

      <article className="flex-1">
        {/* Article Header */}
        <div className="bg-gradient-to-b from-secondary/30 to-background py-10 sm:py-14">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Link to="/blog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-smooth mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Blog
              </Link>
              
              {post.blog_categories && (
                <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-none">
                  {post.blog_categories.name}
                </Badge>
              )}
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground mb-5 leading-tight">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><User className="w-4 h-4" />{authorName}</span>
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{publishedDate}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{post.reading_time} min read</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Featured Image */}
        {post.featured_image && (
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl -mt-2 mb-8">
            <motion.img
              src={post.featured_image}
              alt={post.title}
              className="w-full rounded-xl shadow-lg object-cover max-h-[500px]"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
          </div>
        )}

        {/* Article Content */}
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl pb-12">
          <div
            className="prose prose-lg max-w-none text-foreground
              prose-headings:font-serif prose-headings:text-foreground
              prose-p:text-foreground prose-p:leading-relaxed
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground
              prose-strong:text-foreground
              prose-img:rounded-lg prose-img:shadow-md"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
          />

          {/* Tags */}
          {tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-border/40">
              <div className="flex items-center gap-2 flex-wrap">
                <Tag className="w-4 h-4 text-muted-foreground" />
                {tags.map(tag => (
                  <Badge key={tag.id} variant="outline" className="text-xs">
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Related Articles */}
        {related.length > 0 && (
          <section className="bg-secondary/20 py-12 sm:py-16">
            <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
              <h2 className="text-2xl font-serif font-bold mb-8">Related Articles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map(p => (
                  <BlogCard key={p.id} post={p} />
                ))}
              </div>
            </div>
          </section>
        )}
      </article>

      <Footer />
    </div>
  );
}
