CREATE TABLE public.author_interest_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL CHECK (event_type IN ('author_portal_view', 'ojs_submit_click')),
  source text NOT NULL CHECK (char_length(source) BETWEEN 1 AND 80),
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.author_interest_events TO anon, authenticated;
GRANT SELECT, INSERT ON public.author_interest_events TO service_role;
GRANT SELECT ON public.author_interest_events TO authenticated;

ALTER TABLE public.author_interest_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Visitors can record author interest"
ON public.author_interest_events
FOR INSERT
TO anon, authenticated
WITH CHECK (
  event_type IN ('author_portal_view', 'ojs_submit_click')
  AND char_length(source) BETWEEN 1 AND 80
);

CREATE POLICY "Journal admins can view author interest"
ON public.author_interest_events
FOR SELECT
TO authenticated
USING (
  public.has_any_role(
    auth.uid(),
    ARRAY['super_admin'::public.app_role, 'editor'::public.app_role, 'secretary'::public.app_role]
  )
);

CREATE INDEX author_interest_events_created_at_idx
ON public.author_interest_events (created_at DESC);

CREATE INDEX author_interest_events_type_source_idx
ON public.author_interest_events (event_type, source);