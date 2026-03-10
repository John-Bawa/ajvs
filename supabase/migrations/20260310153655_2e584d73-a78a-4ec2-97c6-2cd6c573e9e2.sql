
CREATE TABLE public.calendar_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  event_date DATE NOT NULL,
  end_date DATE,
  event_type TEXT NOT NULL DEFAULT 'general',
  color TEXT DEFAULT '#2563eb',
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  is_public BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.calendar_events ENABLE ROW LEVEL SECURITY;

-- Everyone can view public events
CREATE POLICY "Public events viewable by everyone"
ON public.calendar_events
FOR SELECT
TO public
USING (is_public = true);

-- Admins can view all events
CREATE POLICY "Admins can view all events"
ON public.calendar_events
FOR SELECT
TO authenticated
USING (has_any_role(auth.uid(), ARRAY['super_admin'::app_role, 'editor'::app_role, 'secretary'::app_role]));

-- Admins can manage events
CREATE POLICY "Admins can insert events"
ON public.calendar_events
FOR INSERT
TO authenticated
WITH CHECK (has_any_role(auth.uid(), ARRAY['super_admin'::app_role, 'editor'::app_role, 'secretary'::app_role]));

CREATE POLICY "Admins can update events"
ON public.calendar_events
FOR UPDATE
TO authenticated
USING (has_any_role(auth.uid(), ARRAY['super_admin'::app_role, 'editor'::app_role, 'secretary'::app_role]));

CREATE POLICY "Admins can delete events"
ON public.calendar_events
FOR DELETE
TO authenticated
USING (has_any_role(auth.uid(), ARRAY['super_admin'::app_role, 'editor'::app_role, 'secretary'::app_role]));
