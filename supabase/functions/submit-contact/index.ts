import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json(405, { error: "Mètode no permès" });

  let payload: any;
  try {
    payload = await req.json();
  } catch {
    return json(400, { error: "JSON invàlid" });
  }

  const {
    nom,
    correu,
    assumpte,
    missatge,
    honeypot,
    challenge_a,
    challenge_b,
    challenge_answer,
    started_at,
  } = payload ?? {};

  // Honeypot: bots omplen camps invisibles
  if (typeof honeypot === "string" && honeypot.trim().length > 0) {
    return json(200, { ok: true }); // fingim èxit
  }

  // Temps mínim emplenant (1.5s)
  if (typeof started_at === "number" && Date.now() - started_at < 1500) {
    return json(429, { error: "Sembla automatitzat. Torna-ho a provar." });
  }

  // Repte matemàtic
  const a = Number(challenge_a);
  const b = Number(challenge_b);
  const ans = Number(challenge_answer);
  if (!Number.isFinite(a) || !Number.isFinite(b) || !Number.isFinite(ans) || a + b !== ans) {
    return json(400, { error: "El codi de seguretat no és correcte." });
  }

  // Validació
  const errors: string[] = [];
  const norm = (s: unknown, max: number) =>
    typeof s === "string" ? s.trim().slice(0, max) : "";
  const N = norm(nom, 100);
  const C = norm(correu, 200).toLowerCase();
  const A = norm(assumpte, 200);
  const M = norm(missatge, 4000);
  if (N.length < 2) errors.push("Nom massa curt");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(C)) errors.push("Correu invàlid");
  if (A.length < 3) errors.push("Assumpte massa curt");
  if (M.length < 10) errors.push("Missatge massa curt");
  // Detecció bàsica de spam (massa URLs)
  const urlCount = (M.match(/https?:\/\//gi) || []).length;
  if (urlCount > 2) errors.push("Massa enllaços al missatge");
  if (errors.length) return json(400, { error: errors.join(". ") });

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("cf-connecting-ip") ||
    "unknown";
  const ua = req.headers.get("user-agent") ?? "";

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  // Rate limit: màx 3 missatges per IP cada hora
  const WINDOW_MS = 60 * 60 * 1000;
  const MAX_PER_WINDOW = 3;
  const { data: rl } = await supabase
    .from("contact_rate_limit")
    .select("count, window_start")
    .eq("ip_address", ip)
    .maybeSingle();

  const now = Date.now();
  if (rl) {
    const started = new Date(rl.window_start).getTime();
    if (now - started < WINDOW_MS) {
      if (rl.count >= MAX_PER_WINDOW) {
        return json(429, {
          error: "Has enviat massa missatges. Torna-ho a provar més tard.",
        });
      }
      await supabase
        .from("contact_rate_limit")
        .update({ count: rl.count + 1 })
        .eq("ip_address", ip);
    } else {
      await supabase
        .from("contact_rate_limit")
        .update({ count: 1, window_start: new Date().toISOString() })
        .eq("ip_address", ip);
    }
  } else {
    await supabase.from("contact_rate_limit").insert({ ip_address: ip, count: 1 });
  }

  const { error: insertErr } = await supabase.from("contact_messages").insert({
    nom: N,
    correu_electronic: C,
    assumpte: A,
    missatge: M,
    ip_address: ip,
    user_agent: ua,
  });
  if (insertErr) {
    console.error("Insert error:", insertErr);
    return json(500, { error: "No s'ha pogut enviar el missatge." });
  }

  // Intent d'enviament per email (si l'email infra està configurat)
  try {
    await supabase.functions.invoke("send-transactional-email", {
      body: {
        templateName: "contact-notification",
        recipientEmail: "cblagon@gmail.com",
        idempotencyKey: `contact-${ip}-${now}`,
        templateData: { nom: N, correu: C, assumpte: A, missatge: M },
      },
    });
  } catch (e) {
    console.warn("Email send skipped:", e);
  }

  return json(200, { ok: true });
});
