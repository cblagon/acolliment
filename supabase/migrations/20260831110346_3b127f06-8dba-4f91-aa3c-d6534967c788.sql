CREATE OR REPLACE FUNCTION public.visitor_locations()
RETURNS TABLE (city text, country text, lat double precision, lng double precision, sessions bigint)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    COALESCE(max(city), '—') AS city,
    COALESCE(max(country), '') AS country,
    round(avg(lat)::numeric, 2)::double precision AS lat,
    round(avg(lng)::numeric, 2)::double precision AS lng,
    count(DISTINCT session_id) AS sessions
  FROM public.page_events
  WHERE lat IS NOT NULL AND lng IS NOT NULL
  GROUP BY round(lat::numeric, 1), round(lng::numeric, 1)
$$;

GRANT EXECUTE ON FUNCTION public.visitor_locations() TO anon, authenticated;