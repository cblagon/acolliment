import "https://deno.land/std@0.224.0/dotenv/load.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const PER_HOUR = 5;
const PER_DAY = 15;

function getIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for") ?? "";
  const ip = fwd.split(",")[0].trim();
  return ip || req.headers.get("cf-connecting-ip") || req.headers.get("x-real-ip") || "unknown";
}

function clean(v: unknown, max: number): string | null {
  if (typeof v !== "string") return null;
  const t = v.trim();
  if (!t) return null;
  return t.slice(0, max);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json();
    const centre = clean(body.centre, 120);
    if (!centre || centre.length < 2) {
      return new Response(JSON.stringify({ error: "El nom del centre és obligatori." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const city = clean(body.city, 120);
    const country = clean(body.country, 120);
    const lat = typeof body.lat === "number" ? body.lat : null;
    const lng = typeof body.lng === "number" ? body.lng : null;

    const ip = getIp(req);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Rate-limit checks
    const now = Date.now();
    const hourAgo = new Date(now - 60 * 60 * 1000).toISOString();
    const dayAgo = new Date(now - 24 * 60 * 60 * 1000).toISOString();

    const { count: hourCount } = await supabase
      .from("centre_visits_log")
      .select("id", { count: "exact", head: true })
      .eq("ip", ip)
      .gte("created_at", hourAgo);

    if ((hourCount ?? 0) >= PER_HOUR) {
      return new Response(
        JSON.stringify({ error: `Has enviat moltes entrades en poca estona. Torna-ho a provar més tard.` }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const { count: dayCount } = await supabase
      .from("centre_visits_log")
      .select("id", { count: "exact", head: true })
      .eq("ip", ip)
      .gte("created_at", dayAgo);

    if ((dayCount ?? 0) >= PER_DAY) {
      return new Response(
        JSON.stringify({ error: `S'ha assolit el límit diari d'enviaments des d'aquesta connexió.` }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Duplicate guard: same centre + ip in last 24h
    const { count: dupCount } = await supabase
      .from("centre_visits")
      .select("id", { count: "exact", head: true })
      .ilike("centre", centre)
      .gte("created_at", dayAgo);

    if ((dupCount ?? 0) > 0) {
      // Still log the attempt to prevent loops
      await supabase.from("centre_visits_log").insert({ ip });
      return new Response(
        JSON.stringify({ error: "Aquest centre ja s'ha afegit recentment. Gràcies!" }),
        { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const { data: inserted, error: insErr } = await supabase
      .from("centre_visits")
      .insert({ centre, city, country, lat, lng, status: "approved" })
      .select("id")
      .single();

    if (insErr) throw insErr;

    await supabase.from("centre_visits_log").insert({ ip, centre_visit_id: inserted.id });

    return new Response(JSON.stringify({ ok: true, id: inserted.id }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
