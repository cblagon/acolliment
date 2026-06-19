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

  // Enviament de la notificació via Gmail API (connector)
  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const GOOGLE_MAIL_API_KEY = Deno.env.get("GOOGLE_MAIL_API_KEY");
    if (LOVABLE_API_KEY && GOOGLE_MAIL_API_KEY) {
      const TO = "cblagon@gmail.com";
      const subject = `[Contacte web] ${A}`;
      const bodyText = [
        `Nou missatge des del formulari de contacte`,
        ``,
        `Nom: ${N}`,
        `Correu: ${C}`,
        `Assumpte: ${A}`,
        ``,
        `Missatge:`,
        M,
        ``,
        `---`,
        `IP: ${ip}`,
        `User-Agent: ${ua}`,
      ].join("\r\n");

      // Codifiquem el subject en UTF-8 (RFC 2047) per accents
      const subjEncoded = `=?UTF-8?B?${btoa(unescape(encodeURIComponent(subject)))}?=`;
      const rfc2822 = [
        `To: ${TO}`,
        `Reply-To: ${N} <${C}>`,
        `Subject: ${subjEncoded}`,
        `Content-Type: text/plain; charset="UTF-8"`,
        `MIME-Version: 1.0`,
        ``,
        bodyText,
      ].join("\r\n");

      // base64url
      const raw = btoa(unescape(encodeURIComponent(rfc2822)))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");

      const res = await fetch(
        "https://connector-gateway.lovable.dev/google_mail/gmail/v1/users/me/messages/send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${LOVABLE_API_KEY}`,
            "X-Connection-Api-Key": GOOGLE_MAIL_API_KEY,
          },
          body: JSON.stringify({ raw }),
        }
      );
      if (!res.ok) {
        const txt = await res.text();
        console.error("Gmail send failed:", res.status, txt);
      }
    } else {
      console.warn("Gmail connector secrets missing");
    }
  } catch (e) {
    console.warn("Gmail send skipped:", e);
  }

  return json(200, { ok: true });
});
