
ALTER TABLE public.page_events
  ADD COLUMN IF NOT EXISTS centre text,
  ADD COLUMN IF NOT EXISTS city text,
  ADD COLUMN IF NOT EXISTS region text,
  ADD COLUMN IF NOT EXISTS country text,
  ADD COLUMN IF NOT EXISTS lat double precision,
  ADD COLUMN IF NOT EXISTS lng double precision;

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS centre text;
