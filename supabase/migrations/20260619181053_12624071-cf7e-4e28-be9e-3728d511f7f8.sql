
CREATE TABLE IF NOT EXISTS public.centre_visits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  centre text NOT NULL,
  city text,
  country text,
  lat double precision,
  lng double precision,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.centre_visits TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.centre_visits TO authenticated;
GRANT ALL ON public.centre_visits TO service_role;

ALTER TABLE public.centre_visits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view centre visits"
  ON public.centre_visits FOR SELECT
  USING (true);

CREATE POLICY "Anyone can add a centre visit"
  ON public.centre_visits FOR INSERT
  WITH CHECK (
    length(trim(centre)) BETWEEN 2 AND 120
    AND (city IS NULL OR length(city) <= 120)
    AND (country IS NULL OR length(country) <= 120)
  );

CREATE POLICY "Admins can delete centre visits"
  ON public.centre_visits FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
