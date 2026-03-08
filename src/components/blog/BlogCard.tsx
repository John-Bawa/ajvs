import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User } from "lucide-react";
import { format } from "date-fns";
import type { BlogPost } from "@/types/blog";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const publishedDate = post.published_at ? format(new Date(post.published_at), 'MMM d, yyyy') : '';
  const authorName = post.profiles?.full_name || 'AJVS Editorial';

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
              {post.blog_categories && (
                <Badge variant="secondary" className="w-fit mb-3 text-xs bg-primary/10 text-primary border-none">
                  {post.blog_categories.name}
                </Badge>
              )}
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
          {post.blog_categories && (
            <Badge variant="secondary" className="w-fit mb-2.5 text-xs bg-primary/10 text-primary border-none">
              {post.blog_categories.name}
            </Badge>
          )}
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
