import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const SESSION_KEY = "apren-session-id";
const GEO_KEY = "apren-geo-v1";

type Geo = {
  city: string | null;
  region: string | null;
  country: string | null;
  lat: number | null;
  lng: number | null;
};

function getSessionId(): string {
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID().replace(/-/g, "").slice(0, 24);
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

async function getGeo(): Promise<Geo> {
  const cached = sessionStorage.getItem(GEO_KEY);
  if (cached) {
    try { return JSON.parse(cached) as Geo; } catch { /* ignore */ }
  }
  const empty: Geo = { city: null, region: null, country: null, lat: null, lng: null };
  try {
    const res = await fetch("https://ipapi.co/json/");
    if (!res.ok) return empty;
    const d = await res.json();
    const geo: Geo = {
      city: d.city ?? null,
      region: d.region ?? null,
      country: d.country_name ?? null,
      lat: typeof d.latitude === "number" ? d.latitude : null,
      lng: typeof d.longitude === "number" ? d.longitude : null,
    };
    sessionStorage.setItem(GEO_KEY, JSON.stringify(geo));
    return geo;
  } catch {
    return empty;
  }
}

export function usePageTracking() {
  const location = useLocation();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    const path = location.pathname + location.search;
    if (lastPath.current === path) return;
    lastPath.current = path;

    const send = async () => {
      try {
        const [{ data: { user } }, geo] = await Promise.all([
          supabase.auth.getUser(),
          getGeo(),
        ]);

        let centre: string | null = null;
        if (user) {
          const { data: prof } = await supabase
            .from("profiles")
            .select("centre")
            .eq("id", user.id)
            .maybeSingle();
          centre = (prof as any)?.centre ?? null;
        }

        await supabase.from("page_events").insert({
          path: path.slice(0, 200),
          session_id: getSessionId(),
          user_id: user?.id ?? null,
          referrer: document.referrer ? document.referrer.slice(0, 200) : null,
          language: navigator.language?.slice(0, 16) ?? null,
          user_agent: navigator.userAgent?.slice(0, 200) ?? null,
          centre,
          city: geo.city,
          region: geo.region,
          country: geo.country,
          lat: geo.lat,
          lng: geo.lng,
        });
      } catch {
        // silent — tracking is non-critical
      }
    };
    send();
  }, [location.pathname, location.search]);
}
