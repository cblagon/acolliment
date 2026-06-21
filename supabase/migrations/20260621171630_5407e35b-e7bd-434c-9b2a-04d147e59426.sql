-- Explicitly deny client access to contact_rate_limit; only service_role (edge functions) should access it
REVOKE ALL ON public.contact_rate_limit FROM anon, authenticated;

CREATE POLICY "No client access to rate limit table"
ON public.contact_rate_limit
AS RESTRICTIVE
FOR ALL
TO anon, authenticated
USING (false)
WITH CHECK (false);