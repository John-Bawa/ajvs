-- Fix 1: Protect email addresses by creating a public view
CREATE OR REPLACE VIEW public.profiles_public AS
SELECT id, full_name, institution, orcid, bio, created_at, updated_at
FROM public.profiles;

GRANT SELECT ON public.profiles_public TO authenticated;

-- Restrict direct profiles table access
DROP POLICY IF EXISTS "Authenticated users can view profiles without emails" ON public.profiles;

CREATE POLICY "Restricted profiles table access"
  ON public.profiles
  FOR SELECT
  USING (
    auth.uid() = id 
    OR has_any_role(auth.uid(), ARRAY['super_admin', 'secretary', 'editor']::app_role[])
  );

-- Fix 2: Add INSERT policy for user registration
CREATE POLICY "Users can insert own profile"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create automatic profile creation trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Fix 3: Add INSERT policy for review assignments
CREATE POLICY "Editorial staff can create review assignments"
  ON public.reviews
  FOR INSERT
  WITH CHECK (
    has_any_role(auth.uid(), ARRAY[
      'super_admin',
      'editor',
      'section_editor',
      'secretary'
    ]::app_role[])
  );