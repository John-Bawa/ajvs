import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, Megaphone, Newspaper, FileText } from "lucide-react";
import { format } from "date-fns";
import type { BlogPost } from "@/types/blog";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

const typeConfig: Record<string, { label: string; icon: typeof FileText; className: string }> = {
  article: { label: "Article", icon: FileText, className: "bg-primary/10 text-primary" },
  news: { label: "News", icon: Newspaper, className: "bg-accent/10 text-accent" },
  announcement: { label: "Announcement", icon: Megaphone, className: "bg-secondary text-secondary-foreground" },
};

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const publishedDate = post.published_at ? format(new Date(post.published_at), 'MMM d, yyyy') : '';
  const authorName = post.profiles?.full_name || 'AJVS Editorial';
  const postType = (post as any).post_type || 'article';
  const typeInfo = typeConfig[postType] || typeConfig.article;

  if (featured) {
    return (
      <Link to={`/blog/${post.slug}`}>
        <Card className="overflow-hidden border-border/50 hover:shadow-elegant transition-smooth group">
          <div className="grid md:grid-cols-2 gap-0">
            {post.featured_image && (
              <div className="aspect-[16/10] md:aspect-auto overflow-hidden">
                <img
                  src={post.featured_image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            )}
            <CardContent className="p-6 md:p-8 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary" className={`w-fit text-xs border-none ${typeInfo.className}`}>
                  {typeInfo.label}
                </Badge>
                {post.blog_categories && (
                  <Badge variant="outline" className="w-fit text-xs">
                    {post.blog_categories.name}
                  </Badge>
                )}
              </div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-3 group-hover:text-primary transition-smooth leading-tight">
                {post.title}
              </h2>
              {post.excerpt && (
                <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">{post.excerpt}</p>
              )}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" />{authorName}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{publishedDate}</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.reading_time} min read</span>
              </div>
            </CardContent>
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link to={`/blog/${post.slug}`}>
      <Card className="overflow-hidden border-border/50 hover:shadow-elegant transition-smooth group h-full flex flex-col">
        {post.featured_image && (
          <div className="aspect-[16/10] overflow-hidden">
            <img
              src={post.featured_image}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>
        )}
        <CardContent className="p-5 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-2.5">
            <Badge variant="secondary" className={`w-fit text-xs border-none ${typeInfo.className}`}>
              {typeInfo.label}
            </Badge>
            {post.blog_categories && (
              <Badge variant="outline" className="w-fit text-xs">
                {post.blog_categories.name}
              </Badge>
            )}
          </div>
          <h3 className="text-lg font-serif font-bold text-foreground mb-2 group-hover:text-primary transition-smooth leading-snug line-clamp-2">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2 flex-1">{post.excerpt}</p>
          )}
          <div className="flex items-center gap-3 text-xs text-muted-foreground mt-auto pt-3 border-t border-border/30">
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{publishedDate}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.reading_time} min</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
