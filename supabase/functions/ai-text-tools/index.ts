// Edge function: Catalan spell checker + translator via Lovable AI Gateway
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json();
    const { action, text, targetLang, lines, infinitive, tense } = body;
    console.log("ai-text-tools action:", action, "linesCount:", Array.isArray(lines) ? lines.length : 0, "hasText:", typeof text === "string");

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "LOVABLE_API_KEY no configurat" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const langName: Record<string, string> = {
      ca: "català", es: "castellà", en: "anglès", fr: "francès",
      ar: "àrab", it: "italià", pt: "portuguès", ptBR: "portuguès del Brasil", de: "alemany",
      uk: "ucraïnès", ro: "romanès", zh: "xinès (simplificat)", hi: "hindi", ur: "urdú",
      wo: "wolof", mnk: "mandinga", el: "grec modern", ha: "hassania (àrab de Mauritània)",
      snk: "soninké", srk: "sarankhulé (saraxulle)",
    };

    let system = "";
    let user = "";

    if (action === "translate-lines") {
      if (!Array.isArray(lines) || lines.length === 0) {
        return new Response(JSON.stringify({ error: "Falten les línies" }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const target = langName[targetLang] ?? targetLang ?? "anglès";
      system = `Ets un traductor professional per a alumnat que aprèn idiomes. Tradueix cada línia del diàleg al ${target}, mantenint el to col·loquial i natural. Respon NOMÉS amb un objecte JSON vàlid amb aquesta forma exacta: {"lines":["traducció1","traducció2",...]}. El nombre de línies de sortida ha de coincidir exactament amb el d'entrada. No incloguis explicacions ni text fora del JSON.`;
      user = JSON.stringify({ lines });
    } else if (action === "conjugate-verb") {
      if (!infinitive || !tense || !targetLang) {
        return new Response(JSON.stringify({ error: "Falta infinitive, tense o targetLang" }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const target = langName[targetLang] ?? targetLang;
      const tenseName: Record<string, string> = {
        present: "present d'indicatiu",
        passat: "passat (pretèrit perfet o equivalent narratiu més natural)",
        futur: "futur simple",
      };
      const tn = tenseName[tense] ?? tense;
      system = `Ets un lingüista expert. Conjuga el verb en ${target} en ${tn} per a les 6 persones: 1) jo, 2) tu, 3) ell/ella, 4) nosaltres, 5) vosaltres, 6) ells/elles. Si la llengua no distingeix persones (p. ex. wolof, mandinga, xinès), inclou el pronom davant de la forma verbal per a cadascuna. Respon NOMÉS amb JSON vàlid amb aquesta forma exacta: {"forms":["forma1","forma2","forma3","forma4","forma5","forma6"]}. Sense explicacions.`;
      user = `Verb (infinitiu en català): ${infinitive}\nLlengua destí: ${target}\nTemps verbal: ${tn}`;
    } else if (!text || typeof text !== "string") {
      return new Response(JSON.stringify({ error: "Falta el text" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } else if (action === "spellcheck") {
      system =
        "Ets un corrector ortogràfic i gramatical de català. Corregeix només els errors ortogràfics, gramaticals i de puntuació. Mantén el sentit i l'estil originals. Respon NOMÉS amb el text corregit, sense explicacions, sense cometes, sense prefixos.";
      user = text;
    } else if (action === "translate") {
      const target = langName[targetLang] ?? targetLang ?? "castellà";
      system = `Ets un traductor professional. Tradueix el text al ${target}. Respon NOMÉS amb la traducció, sense explicacions ni cometes.`;
      user = text;
    } else {
      return new Response(JSON.stringify({ error: "Acció no vàlida" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }


    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
        ...(action === "translate-lines" || action === "conjugate-verb"
          ? { response_format: { type: "json_object" } }
          : {}),
      }),
    });


    if (!resp.ok) {
      const errText = await resp.text();
      if (resp.status === 429) {
        return new Response(JSON.stringify({ error: "Massa peticions. Torna-ho a provar d'aquí una estona." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (resp.status === 402) {
        return new Response(JSON.stringify({ error: "S'han esgotat els crèdits d'IA. Afegeix-ne al workspace." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ error: `Error IA: ${errText}` }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await resp.json();
    const content = data?.choices?.[0]?.message?.content ?? "";
    if (action === "translate-lines") {
      try {
        const parsed = JSON.parse(content);
        const outLines: string[] = Array.isArray(parsed?.lines) ? parsed.lines : [];
        return new Response(JSON.stringify({ lines: outLines }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      } catch {
        return new Response(JSON.stringify({ error: "Resposta IA no vàlida", raw: content }), {
          status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }
    if (action === "conjugate-verb") {
      try {
        const parsed = JSON.parse(content);
        const forms: string[] = Array.isArray(parsed?.forms) ? parsed.forms : [];
        return new Response(JSON.stringify({ forms }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      } catch {
        return new Response(JSON.stringify({ error: "Resposta IA no vàlida", raw: content }), {
          status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }
    return new Response(JSON.stringify({ result: content }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (e) {
    return new Response(JSON.stringify({ error: String((e as Error).message ?? e) }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
