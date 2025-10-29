-- CRITICAL SECURITY FIX: Move roles to separate table to prevent privilege escalation

-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('super_admin', 'secretary', 'editor', 'section_editor', 'reviewer', 'author', 'reader');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  created_by UUID REFERENCES auth.users(id),
  UNIQUE (user_id, role)
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create function to check if user has any of multiple roles
CREATE OR REPLACE FUNCTION public.has_any_role(_user_id UUID, _roles app_role[])
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = ANY(_roles)
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles
  FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Admins can view all roles"
  ON public.user_roles
  FOR SELECT
  USING (public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Admins can manage all roles"
  ON public.user_roles
  FOR ALL
  USING (public.has_role(auth.uid(), 'super_admin'))
  WITH CHECK (public.has_role(auth.uid(), 'super_admin'));

-- Drop all policies that depend on profiles.role column
DROP POLICY IF EXISTS "Only admins and editors can manage issues" ON public.issues;
DROP POLICY IF EXISTS "Authors can view own manuscripts" ON public.manuscripts;
DROP POLICY IF EXISTS "Authors can update own draft manuscripts" ON public.manuscripts;
DROP POLICY IF EXISTS "Manuscript authors viewable with manuscript" ON public.manuscript_authors;
DROP POLICY IF EXISTS "Reviewers can view assigned reviews" ON public.reviews;

-- Now we can drop the role column from profiles
ALTER TABLE public.profiles DROP COLUMN IF EXISTS role;

-- Recreate policies using new role system
CREATE POLICY "Only admins and editors can manage issues"
  ON public.issues
  FOR ALL
  USING (public.has_any_role(auth.uid(), ARRAY['super_admin', 'editor']::app_role[]));

CREATE POLICY "Authors can view own manuscripts"
  ON public.manuscripts
  FOR SELECT
  USING (
    submitting_author_id = auth.uid() 
    OR public.has_any_role(auth.uid(), ARRAY['super_admin', 'secretary', 'editor', 'section_editor']::app_role[])
  );

CREATE POLICY "Authors can update own draft manuscripts"
  ON public.manuscripts
  FOR UPDATE
  USING (
    (submitting_author_id = auth.uid() AND status = 'draft') 
    OR public.has_any_role(auth.uid(), ARRAY['super_admin', 'secretary', 'editor', 'section_editor']::app_role[])
  );

CREATE POLICY "Manuscript authors viewable with manuscript"
  ON public.manuscript_authors
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM manuscripts m
      WHERE m.id = manuscript_authors.manuscript_id
        AND (
          m.submitting_author_id = auth.uid()
          OR m.status = 'published'
          OR public.has_any_role(auth.uid(), ARRAY['super_admin', 'secretary', 'editor', 'section_editor']::app_role[])
        )
    )
  );

CREATE POLICY "Reviewers can view assigned reviews"
  ON public.reviews
  FOR SELECT
  USING (
    reviewer_id = auth.uid() 
    OR public.has_any_role(auth.uid(), ARRAY['super_admin', 'secretary', 'editor', 'section_editor']::app_role[])
  );

-- Create payments table for Paystack integration
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  manuscript_id UUID REFERENCES public.manuscripts(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'NGN',
  paystack_reference TEXT UNIQUE,
  paystack_access_code TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  payment_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own payments"
  ON public.payments
  FOR SELECT
  USING (
    user_id = auth.uid() 
    OR public.has_any_role(auth.uid(), ARRAY['super_admin', 'secretary']::app_role[])
  );

CREATE POLICY "Users can create own payments"
  ON public.payments
  FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can manage payments"
  ON public.payments
  FOR ALL
  USING (public.has_any_role(auth.uid(), ARRAY['super_admin', 'secretary']::app_role[]));

-- Create announcements table
CREATE TABLE public.announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'general',
  published BOOLEAN DEFAULT false,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published announcements viewable by everyone"
  ON public.announcements
  FOR SELECT
  USING (published = true);

CREATE POLICY "Editors can manage announcements"
  ON public.announcements
  FOR ALL
  USING (public.has_any_role(auth.uid(), ARRAY['super_admin', 'editor', 'secretary']::app_role[]));

-- Create triggers for updated_at
CREATE TRIGGER update_payments_updated_at
  BEFORE UPDATE ON public.payments
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_announcements_updated_at
  BEFORE UPDATE ON public.announcements
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Migrate existing role data from profiles to user_roles (if any users exist)
-- Insert default reader role for all existing users
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'reader'::app_role
FROM auth.users
ON CONFLICT (user_id, role) DO NOTHING;