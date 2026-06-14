import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const SESSION_KEY = "apren-session-id";

function getSessionId(): string {
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID().replace(/-/g, "").slice(0, 24);
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
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
        const { data: { user } } = await supabase.auth.getUser();
        await supabase.from("page_events").insert({
          path: path.slice(0, 200),
          session_id: getSessionId(),
          user_id: user?.id ?? null,
          referrer: document.referrer ? document.referrer.slice(0, 200) : null,
          language: navigator.language?.slice(0, 16) ?? null,
          user_agent: navigator.userAgent?.slice(0, 200) ?? null,
        });
      } catch {
        // silent — tracking is non-critical
      }
    };
    send();
  }, [location.pathname, location.search]);
}
