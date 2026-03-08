export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  featured_image: string | null;
  category_id: string | null;
  author_id: string;
  status: 'draft' | 'published' | 'scheduled';
  seo_title: string | null;
  meta_description: string | null;
  keywords: string[] | null;
  og_image: string | null;
  reading_time: number;
  published_at: string | null;
  scheduled_at: string | null;
  created_at: string;
  updated_at: string;
  // Joined relations
  blog_categories?: BlogCategory | null;
  profiles?: { full_name: string } | null;
  blog_post_tags?: { blog_tags: BlogTag }[];
}

export interface BlogPostFormData {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured_image: string | null;
  category_id: string | null;
  status: 'draft' | 'published' | 'scheduled';
  post_type: string;
  seo_title: string;
  meta_description: string;
  keywords: string[];
  og_image: string | null;
  scheduled_at: string | null;
  tag_ids: string[];
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .replace(/^-+|-+$/g, '');
}

export function calculateReadingTime(content: string): number {
  const text = content.replace(/<[^>]*>/g, '');
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}
