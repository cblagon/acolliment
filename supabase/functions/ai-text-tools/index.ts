// Edge function: Catalan spell checker + translator via Lovable AI Gateway
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Retry gateway calls on 429 / 5xx with bounded backoff (honours Retry-After).
async function gatewayFetch(url: string, init: RequestInit, maxRetries = 4): Promise<Response> {
  let delay = 1500;
  for (let attempt = 0; ; attempt++) {
    const res = await fetch(url, init);
    if (res.ok || attempt >= maxRetries || (res.status !== 429 && res.status < 500)) return res;
    const retryAfter = Number(res.headers.get("Retry-After"));
    const wait = Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter * 1000 : delay;
    await res.text().catch(() => "");
    await sleep(Math.min(wait, 15000) + Math.random() * 500);
    delay = Math.min(delay * 2, 15000);
  }
}



Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json();
    const { action, text, targetLang, lines } = body;
    console.log("ai-text-tools action:", action, "linesCount:", Array.isArray(lines) ? lines.length : 0, "hasText:", typeof text === "string");

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "LOVABLE_API_KEY no configurat" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const langName: Record<string, string> = {
      ca: "català", es: "castellà", en: "anglès", fr: "francès", gl: "gallec",
      va: "valencià", ar: "àrab", it: "italià", el: "grec", pt: "portuguès europeu",
      ptBR: "portuguès brasiler", uk: "ucraïnès", ro: "romanès", zh: "xinès (simplificat)",
      hi: "hindi", ur: "urdú", ps: "paixtu (pastú)", wo: "wòlof", mnk: "mandinga",
      ha: "àrab hassania", snk: "soninké", srk: "sarankhulé",
    };

    let system = "";
    let user = "";

    if (action === "grammar") {
      const { level, helpLang } = body;
      if (!["A1", "A2", "B1"].includes(level) || typeof targetLang !== "string" || !langName[targetLang]) {
        return new Response(JSON.stringify({ error: "Paràmetres no vàlids" }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const target = langName[targetLang];
      const help = langName[helpLang] ?? "català";
      const schema = {
        type: "object", additionalProperties: false, required: ["topics"],
        properties: {
          topics: {
            type: "array",
            items: {
              type: "object", additionalProperties: false,
              required: ["title", "emoji", "rule", "examples", "questions"],
              properties: {
                title: { type: "string" }, emoji: { type: "string" }, rule: { type: "string" },
                examples: { type: "array", items: { type: "object", additionalProperties: false, required: ["text", "translation"], properties: { text: { type: "string" }, translation: { type: "string" } } } },
                questions: { type: "array", items: { type: "object", additionalProperties: false, required: ["question", "options", "answer", "explanation"], properties: { question: { type: "string" }, options: { type: "array", items: { type: "string" } }, answer: { type: "integer" }, explanation: { type: "string" } } } },
              },
            },
          },
        },
      };
      const gsys = `Ets docent de llengües per a alumnat nouvingut de 12-16 anys. Crea 4 temes de gramàtica bàsics i progressius del ${target} adequats al nivell ${level} del MECR (els més útils per a aquest nivell i propis d'aquesta llengua). Per a cada tema: "title" (títol curt en ${help}), "emoji", "rule" (explicació clara i senzilla de 2-4 frases en ${help}), "examples" (4 exemples: "text" en ${target}, "translation" en ${help}), "questions" (5 preguntes de tria la resposta: "question" amb la frase en ${target} i un buit "___" o una pregunta curta, "options" exactament 3 opcions en ${target}, "answer" índex 0-2 de la correcta, "explanation" breu en ${help}). Varia la posició de la resposta correcta. Si escrius en català, apostrofa correctament.`;
      const gres = await gatewayFetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${LOVABLE_API_KEY}` },
        body: JSON.stringify({
          model: "openai/gpt-6-astra",
          reasoning_effort: "low",
          stream: true,
          response_format: { type: "json_schema", json_schema: { name: "grammar", strict: true, schema } },
          messages: [{ role: "system", content: gsys }, { role: "user", content: `Nivell ${level}, llengua ${target}, explicacions en ${help}.` }],
        }),
      });
      if (!gres.ok || !gres.body) {
        const status = gres.status === 429 || gres.status === 402 || gres.status === 403 ? gres.status : 500;
        const msg = status === 429 ? "Massa peticions. Torna-ho a provar d'aquí una estona."
          : status === 402 ? "S'han esgotat els crèdits d'IA. Afegeix-ne al workspace."
          : `Error IA: ${await gres.text()}`;
        return new Response(JSON.stringify({ error: msg }), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      const reader = gres.body.getReader();
      const dec = new TextDecoder();
      let buf = "", content = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        const parts = buf.split("\n");
        buf = parts.pop() ?? "";
        for (const line of parts) {
          const l = line.trim();
          if (!l.startsWith("data:")) continue;
          const d = l.slice(5).trim();
          if (d === "[DONE]") continue;
          try { content += JSON.parse(d)?.choices?.[0]?.delta?.content ?? ""; } catch { /* partial */ }
        }
      }
      try {
        const parsed = JSON.parse(content);
        return new Response(JSON.stringify({ topics: parsed.topics ?? [] }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
      } catch {
        return new Response(JSON.stringify({ error: "Resposta IA no vàlida" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
    }

    if (action === "translate-lines") {
      if (!Array.isArray(lines) || lines.length === 0) {
        return new Response(JSON.stringify({ error: "Falten les línies" }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const target = langName[targetLang] ?? targetLang ?? "anglès";
      system = `Ets un traductor professional per a alumnat que aprèn idiomes. Tradueix cada línia del diàleg al ${target}, mantenint el to col·loquial i natural. Respon NOMÉS amb un objecte JSON vàlid amb aquesta forma exacta: {"lines":["traducció1","traducció2",...]}. El nombre de línies de sortida ha de coincidir exactament amb el d'entrada. No incloguis explicacions ni text fora del JSON. Si la llengua de sortida és el català, apostrofa sempre correctament (l'elefant, l'hora, d'aigua, s'ha), mai "el elefant" ni "de aigua".`;
      user = JSON.stringify({ lines });
    } else if (!text || typeof text !== "string") {
      return new Response(JSON.stringify({ error: "Falta el text" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } else if (action === "spellcheck") {
      system =
        "Ets un corrector ortogràfic i gramatical de català. Corregeix només els errors ortogràfics, gramaticals i de puntuació. Mantén el sentit i l'estil originals. Respon NOMÉS amb el text corregit, sense explicacions, sense cometes, sense prefixos. Corregeix sempre l'apostrofació catalana (l'elefant, l'hora, d'aigua), mai \"el elefant\".";
      user = text;
    } else if (action === "translate") {
      const target = langName[targetLang] ?? targetLang ?? "castellà";
      system = `Ets un traductor professional. Tradueix el text al ${target}. Respon NOMÉS amb la traducció, sense explicacions ni cometes. Si la llengua de sortida és el català, apostrofa sempre correctament (l'elefant, l'hora, d'aigua, s'ha), mai "el elefant" ni "de aigua".`;
      user = text;
    } else {
      return new Response(JSON.stringify({ error: "Acció no vàlida" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }


    const resp = await gatewayFetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
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
        ...(action === "translate-lines" ? { response_format: { type: "json_object" } } : {}),
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
    return new Response(JSON.stringify({ result: content }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (e) {
    return new Response(JSON.stringify({ error: String((e as Error).message ?? e) }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
