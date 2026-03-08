-- Fix blog_posts RLS: Drop restrictive SELECT policies and recreate as permissive
DROP POLICY IF EXISTS "Published posts viewable by everyone" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins can view all posts" ON public.blog_posts;

-- Recreate as PERMISSIVE (default) so either condition allows access
CREATE POLICY "Published posts viewable by everyone"
  ON public.blog_posts FOR SELECT
  USING (
    (status = 'published' AND published_at IS NOT NULL AND published_at <= now())
    OR (status = 'scheduled' AND scheduled_at IS NOT NULL AND scheduled_at <= now())
  );

CREATE POLICY "Admins can view all posts"
  ON public.blog_posts FOR SELECT
  TO authenticated
  USING (has_any_role(auth.uid(), ARRAY['super_admin'::app_role, 'editor'::app_role, 'secretary'::app_role]));

-- Fix blog_posts INSERT/UPDATE/DELETE to be permissive too
DROP POLICY IF EXISTS "Admins can insert posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins can update posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins can delete posts" ON public.blog_posts;

CREATE POLICY "Admins can insert posts"
  ON public.blog_posts FOR INSERT
  TO authenticated
  WITH CHECK (has_any_role(auth.uid(), ARRAY['super_admin'::app_role, 'editor'::app_role, 'secretary'::app_role]));

CREATE POLICY "Admins can update posts"
  ON public.blog_posts FOR UPDATE
  TO authenticated
  USING (has_any_role(auth.uid(), ARRAY['super_admin'::app_role, 'editor'::app_role, 'secretary'::app_role]));

CREATE POLICY "Admins can delete posts"
  ON public.blog_posts FOR DELETE
  TO authenticated
  USING (has_any_role(auth.uid(), ARRAY['super_admin'::app_role, 'editor'::app_role, 'secretary'::app_role]));

-- Also fix blog_categories, blog_tags, blog_post_tags restrictive policies
DROP POLICY IF EXISTS "Categories viewable by everyone" ON public.blog_categories;
DROP POLICY IF EXISTS "Admins can manage categories" ON public.blog_categories;

CREATE POLICY "Categories viewable by everyone"
  ON public.blog_categories FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage categories"
  ON public.blog_categories FOR ALL
  TO authenticated
  USING (has_any_role(auth.uid(), ARRAY['super_admin'::app_role, 'editor'::app_role, 'secretary'::app_role]))
  WITH CHECK (has_any_role(auth.uid(), ARRAY['super_admin'::app_role, 'editor'::app_role, 'secretary'::app_role]));

DROP POLICY IF EXISTS "Tags viewable by everyone" ON public.blog_tags;
DROP POLICY IF EXISTS "Admins can manage tags" ON public.blog_tags;

CREATE POLICY "Tags viewable by everyone"
  ON public.blog_tags FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage tags"
  ON public.blog_tags FOR ALL
  TO authenticated
  USING (has_any_role(auth.uid(), ARRAY['super_admin'::app_role, 'editor'::app_role, 'secretary'::app_role]))
  WITH CHECK (has_any_role(auth.uid(), ARRAY['super_admin'::app_role, 'editor'::app_role, 'secretary'::app_role]));

DROP POLICY IF EXISTS "Post tags viewable by everyone" ON public.blog_post_tags;
DROP POLICY IF EXISTS "Admins can manage post tags" ON public.blog_post_tags;

CREATE POLICY "Post tags viewable by everyone"
  ON public.blog_post_tags FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage post tags"
  ON public.blog_post_tags FOR ALL
  TO authenticated
  USING (has_any_role(auth.uid(), ARRAY['super_admin'::app_role, 'editor'::app_role, 'secretary'::app_role]))
  WITH CHECK (has_any_role(auth.uid(), ARRAY['super_admin'::app_role, 'editor'::app_role, 'secretary'::app_role]));