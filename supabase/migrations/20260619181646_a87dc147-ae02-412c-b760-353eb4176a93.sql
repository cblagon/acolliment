
ALTER TABLE public.centre_visits
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'approved'
    CHECK (status IN ('approved','hidden'));

CREATE INDEX IF NOT EXISTS centre_visits_status_idx ON public.centre_visits(status);

-- Drop old permissive policies and rewrite
DROP POLICY IF EXISTS "Anyone can view centre visits" ON public.centre_visits;
DROP POLICY IF EXISTS "Anyone can add a centre visit" ON public.centre_visits;
DROP POLICY IF EXISTS "Admins can delete centre visits" ON public.centre_visits;

-- Public sees only approved
CREATE POLICY "Public sees approved centre visits"
  ON public.centre_visits FOR SELECT
  USING (status = 'approved');

-- Admins see everything
CREATE POLICY "Admins see all centre visits"
  ON public.centre_visits FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can update (hide/unhide)
CREATE POLICY "Admins can update centre visits"
  ON public.centre_visits FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete
CREATE POLICY "Admins can delete centre visits"
  ON public.centre_visits FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- No INSERT policy for anon/authenticated → forces inserts through the edge function (service_role).

-- Revoke direct insert from anon/authenticated to be explicit
REVOKE INSERT ON public.centre_visits FROM anon, authenticated;

-- IP rate-limit log
CREATE TABLE IF NOT EXISTS public.centre_visits_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip text NOT NULL,
  centre_visit_id uuid REFERENCES public.centre_visits(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS centre_visits_log_ip_created_idx
  ON public.centre_visits_log(ip, created_at DESC);

GRANT ALL ON public.centre_visits_log TO service_role;

ALTER TABLE public.centre_visits_log ENABLE ROW LEVEL SECURITY;

-- Only admins can read the log; no one else (service_role bypasses RLS)
CREATE POLICY "Admins can read log"
  ON public.centre_visits_log FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
