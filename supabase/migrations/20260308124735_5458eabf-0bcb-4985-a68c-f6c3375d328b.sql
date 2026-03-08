
-- Blog Categories
CREATE TABLE public.blog_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Blog Tags
CREATE TABLE public.blog_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Blog Posts
CREATE TABLE public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  content text NOT NULL DEFAULT '',
  excerpt text,
  featured_image text,
  category_id uuid REFERENCES public.blog_categories(id) ON DELETE SET NULL,
  author_id uuid NOT NULL,
  status text NOT NULL DEFAULT 'draft',
  seo_title text,
  meta_description text,
  keywords text[],
  og_image text,
  reading_time integer DEFAULT 0,
  published_at timestamptz,
  scheduled_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Blog Post Tags Junction
CREATE TABLE public.blog_post_tags (
  post_id uuid NOT NULL REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  tag_id uuid NOT NULL REFERENCES public.blog_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- Validation trigger for blog post status
CREATE OR REPLACE FUNCTION public.validate_blog_post_status()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF NEW.status NOT IN ('draft', 'published', 'scheduled') THEN
    RAISE EXCEPTION 'Invalid blog post status: %', NEW.status;
  END IF;
  IF NEW.status = 'published' AND NEW.published_at IS NULL THEN
    NEW.published_at := now();
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER validate_blog_post_status_trigger
  BEFORE INSERT OR UPDATE ON public.blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_blog_post_status();

-- Updated at trigger
CREATE TRIGGER blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Enable RLS
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_post_tags ENABLE ROW LEVEL SECURITY;

-- Blog Categories policies
CREATE POLICY "Categories viewable by everyone" ON public.blog_categories
  FOR SELECT USING (true);
CREATE POLICY "Admins can manage categories" ON public.blog_categories
  FOR ALL USING (public.has_any_role(auth.uid(), ARRAY['super_admin'::app_role, 'editor'::app_role, 'secretary'::app_role]))
  WITH CHECK (public.has_any_role(auth.uid(), ARRAY['super_admin'::app_role, 'editor'::app_role, 'secretary'::app_role]));

-- Blog Tags policies
CREATE POLICY "Tags viewable by everyone" ON public.blog_tags
  FOR SELECT USING (true);
CREATE POLICY "Admins can manage tags" ON public.blog_tags
  FOR ALL USING (public.has_any_role(auth.uid(), ARRAY['super_admin'::app_role, 'editor'::app_role, 'secretary'::app_role]))
  WITH CHECK (public.has_any_role(auth.uid(), ARRAY['super_admin'::app_role, 'editor'::app_role, 'secretary'::app_role]));

-- Blog Posts policies
CREATE POLICY "Published posts viewable by everyone" ON public.blog_posts
  FOR SELECT USING (
    (status = 'published' AND published_at IS NOT NULL AND published_at <= now())
    OR
    (status = 'scheduled' AND scheduled_at IS NOT NULL AND scheduled_at <= now())
  );
CREATE POLICY "Admins can view all posts" ON public.blog_posts
  FOR SELECT USING (public.has_any_role(auth.uid(), ARRAY['super_admin'::app_role, 'editor'::app_role, 'secretary'::app_role]));
CREATE POLICY "Admins can insert posts" ON public.blog_posts
  FOR INSERT WITH CHECK (public.has_any_role(auth.uid(), ARRAY['super_admin'::app_role, 'editor'::app_role, 'secretary'::app_role]));
CREATE POLICY "Admins can update posts" ON public.blog_posts
  FOR UPDATE USING (public.has_any_role(auth.uid(), ARRAY['super_admin'::app_role, 'editor'::app_role, 'secretary'::app_role]));
CREATE POLICY "Admins can delete posts" ON public.blog_posts
  FOR DELETE USING (public.has_any_role(auth.uid(), ARRAY['super_admin'::app_role, 'editor'::app_role, 'secretary'::app_role]));

-- Blog Post Tags policies
CREATE POLICY "Post tags viewable by everyone" ON public.blog_post_tags
  FOR SELECT USING (true);
CREATE POLICY "Admins can manage post tags" ON public.blog_post_tags
  FOR ALL USING (public.has_any_role(auth.uid(), ARRAY['super_admin'::app_role, 'editor'::app_role, 'secretary'::app_role]))
  WITH CHECK (public.has_any_role(auth.uid(), ARRAY['super_admin'::app_role, 'editor'::app_role, 'secretary'::app_role]));

-- Storage bucket for blog images
INSERT INTO storage.buckets (id, name, public) VALUES ('blog-images', 'blog-images', true);

CREATE POLICY "Blog images publicly accessible" ON storage.objects
  FOR SELECT USING (bucket_id = 'blog-images');
CREATE POLICY "Admins can upload blog images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'blog-images'
    AND public.has_any_role(auth.uid(), ARRAY['super_admin'::app_role, 'editor'::app_role, 'secretary'::app_role])
  );
CREATE POLICY "Admins can update blog images" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'blog-images'
    AND public.has_any_role(auth.uid(), ARRAY['super_admin'::app_role, 'editor'::app_role, 'secretary'::app_role])
  );
CREATE POLICY "Admins can delete blog images" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'blog-images'
    AND public.has_any_role(auth.uid(), ARRAY['super_admin'::app_role, 'editor'::app_role, 'secretary'::app_role])
  );

-- Default categories
INSERT INTO public.blog_categories (name, slug, description) VALUES
  ('Research News', 'research-news', 'Latest research developments and findings'),
  ('Journal Updates', 'journal-updates', 'News and updates about the journal'),
  ('Events', 'events', 'Conferences, seminars, and academic events'),
  ('Announcements', 'announcements', 'Official announcements from the editorial team');
