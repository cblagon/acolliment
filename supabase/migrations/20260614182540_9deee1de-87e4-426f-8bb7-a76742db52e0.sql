CREATE TABLE public.page_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  session_id text NOT NULL,
  path text NOT NULL,
  referrer text,
  language text,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX page_events_created_at_idx ON public.page_events (created_at DESC);
CREATE INDEX page_events_user_id_idx ON public.page_events (user_id);
CREATE INDEX page_events_session_id_idx ON public.page_events (session_id);

GRANT INSERT ON public.page_events TO anon, authenticated;
GRANT SELECT ON public.page_events TO authenticated;
GRANT ALL ON public.page_events TO service_role;

ALTER TABLE public.page_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert events"
  ON public.page_events FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins read all events"
  ON public.page_events FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));