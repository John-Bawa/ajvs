
-- Add post_type column to blog_posts
ALTER TABLE public.blog_posts 
ADD COLUMN post_type text NOT NULL DEFAULT 'article';

-- Migrate existing announcements into blog_posts
INSERT INTO public.blog_posts (title, slug, content, excerpt, status, published_at, post_type, author_id, created_at, updated_at)
SELECT 
  a.title,
  lower(regexp_replace(regexp_replace(a.title, '[^\w\s-]', '', 'g'), '\s+', '-', 'g')),
  a.content,
  left(regexp_replace(a.content, '<[^>]*>', '', 'g'), 200),
  CASE WHEN a.published = true THEN 'published' ELSE 'draft' END,
  CASE WHEN a.published = true THEN a.created_at ELSE NULL END,
  'announcement',
  COALESCE(a.created_by, (SELECT id FROM auth.users LIMIT 1)),
  a.created_at,
  a.updated_at
FROM public.announcements a
WHERE NOT EXISTS (
  SELECT 1 FROM public.blog_posts bp WHERE bp.title = a.title AND bp.post_type = 'announcement'
);
