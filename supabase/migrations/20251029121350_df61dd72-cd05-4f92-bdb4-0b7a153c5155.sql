-- Create role enum
CREATE TYPE public.user_role AS ENUM ('super_admin', 'secretary', 'editor', 'section_editor', 'reviewer', 'author', 'reader');

-- Create manuscript status enum
CREATE TYPE public.manuscript_status AS ENUM ('draft', 'submitted', 'under_review', 'revision_requested', 'revised', 'accepted', 'rejected', 'published');

-- Create review decision enum  
CREATE TYPE public.review_decision AS ENUM ('accept', 'minor_revision', 'major_revision', 'reject');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role public.user_role NOT NULL DEFAULT 'reader',
  institution TEXT,
  orcid TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Create issues table (journal volumes/numbers)
CREATE TABLE public.issues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  volume INTEGER NOT NULL,
  number INTEGER NOT NULL,
  year INTEGER NOT NULL,
  title TEXT,
  published_date DATE,
  is_current BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(volume, number, year)
);

ALTER TABLE public.issues ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Issues are viewable by everyone"
  ON public.issues FOR SELECT
  USING (true);

CREATE POLICY "Only admins and editors can manage issues"
  ON public.issues FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() 
      AND role IN ('super_admin', 'editor')
    )
  );

-- Create manuscripts table
CREATE TABLE public.manuscripts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  abstract TEXT NOT NULL,
  keywords TEXT[],
  subject_area TEXT NOT NULL,
  manuscript_type TEXT NOT NULL,
  submitting_author_id UUID NOT NULL REFERENCES public.profiles(id),
  status public.manuscript_status NOT NULL DEFAULT 'draft',
  manuscript_file_path TEXT,
  cover_letter TEXT,
  suggested_reviewers TEXT,
  funding_statement TEXT,
  conflict_statement TEXT,
  submission_date TIMESTAMPTZ,
  assigned_editor_id UUID REFERENCES public.profiles(id),
  issue_id UUID REFERENCES public.issues(id),
  serial_id TEXT,
  doi TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.manuscripts ENABLE ROW LEVEL SECURITY;

-- Manuscript policies
CREATE POLICY "Authors can view own manuscripts"
  ON public.manuscripts FOR SELECT
  USING (
    submitting_author_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid()
      AND role IN ('super_admin', 'secretary', 'editor', 'section_editor')
    )
  );

CREATE POLICY "Authors can create manuscripts"
  ON public.manuscripts FOR INSERT
  WITH CHECK (submitting_author_id = auth.uid());

CREATE POLICY "Authors can update own draft manuscripts"
  ON public.manuscripts FOR UPDATE
  USING (
    submitting_author_id = auth.uid() AND status = 'draft'
    OR EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid()
      AND role IN ('super_admin', 'secretary', 'editor', 'section_editor')
    )
  );

-- Create manuscript_authors table (co-authors)
CREATE TABLE public.manuscript_authors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  manuscript_id UUID NOT NULL REFERENCES public.manuscripts(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  institution TEXT NOT NULL,
  orcid TEXT,
  is_corresponding BOOLEAN DEFAULT false,
  author_order INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.manuscript_authors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Manuscript authors viewable with manuscript"
  ON public.manuscript_authors FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.manuscripts m
      WHERE m.id = manuscript_id
      AND (
        m.submitting_author_id = auth.uid()
        OR m.status = 'published'
        OR EXISTS (
          SELECT 1 FROM public.profiles p
          WHERE p.id = auth.uid()
          AND p.role IN ('super_admin', 'secretary', 'editor', 'section_editor')
        )
      )
    )
  );

CREATE POLICY "Authors can manage own manuscript authors"
  ON public.manuscript_authors FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.manuscripts m
      WHERE m.id = manuscript_id
      AND m.submitting_author_id = auth.uid()
    )
  );

-- Create reviews table
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  manuscript_id UUID NOT NULL REFERENCES public.manuscripts(id) ON DELETE CASCADE,
  reviewer_id UUID NOT NULL REFERENCES public.profiles(id),
  status TEXT NOT NULL DEFAULT 'pending',
  decision public.review_decision,
  comments_to_author TEXT,
  comments_to_editor TEXT,
  score_novelty INTEGER CHECK (score_novelty BETWEEN 1 AND 5),
  score_methodology INTEGER CHECK (score_methodology BETWEEN 1 AND 5),
  score_clarity INTEGER CHECK (score_clarity BETWEEN 1 AND 5),
  submitted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Reviewers can view assigned reviews"
  ON public.reviews FOR SELECT
  USING (
    reviewer_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid()
      AND role IN ('super_admin', 'secretary', 'editor', 'section_editor')
    )
  );

CREATE POLICY "Reviewers can update assigned reviews"
  ON public.reviews FOR UPDATE
  USING (reviewer_id = auth.uid());

-- Create published_articles table
CREATE TABLE public.published_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  manuscript_id UUID NOT NULL REFERENCES public.manuscripts(id) ON DELETE CASCADE,
  issue_id UUID NOT NULL REFERENCES public.issues(id),
  pages TEXT,
  published_date DATE NOT NULL,
  pdf_path TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.published_articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published articles are viewable by everyone"
  ON public.published_articles FOR SELECT
  USING (true);

-- Create trigger function for updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Add triggers
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_manuscripts_updated_at
  BEFORE UPDATE ON public.manuscripts
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();