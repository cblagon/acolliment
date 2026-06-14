DROP POLICY IF EXISTS "Anyone can insert events" ON public.page_events;

CREATE POLICY "Anyone can insert valid events"
  ON public.page_events FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(session_id) BETWEEN 8 AND 64
    AND length(path) BETWEEN 1 AND 200
    AND (user_id IS NULL OR user_id = auth.uid())
  );