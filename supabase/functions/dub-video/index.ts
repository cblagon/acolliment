// Dub a video: extract audio → transcribe → translate → TTS in target language.
// Client sends the video/audio file; we return an MP3 with the dubbed voice.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const LANG_NAMES: Record<string, string> = {
  ca: "Catalan", es: "Spanish", en: "English", fr: "French", ar: "Arabic",
  ur: "Urdu", wo: "Wolof", uk: "Ukrainian", mnk: "Mandinka", it: "Italian",
  el: "Greek", ptBR: "Brazilian Portuguese", pt: "European Portuguese",
  ha: "Hassaniya Arabic", zh: "Mandarin Chinese", hi: "Hindi",
  snk: "Soninke", ro: "Romanian", srk: "Sarankhulé",
};

// Voice choice per language (OpenAI TTS multilingual voices)
function voiceFor(_lang: string): string {
  return "alloy";
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: corsHeaders });
  }

  const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
  if (!LOVABLE_API_KEY) {
    return new Response(JSON.stringify({ error: "Missing LOVABLE_API_KEY" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const form = await req.formData();
    const file = form.get("file");
    const targetLang = String(form.get("targetLang") ?? "ca");
    if (!(file instanceof File)) {
      return new Response(JSON.stringify({ error: "Missing file" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const targetName = LANG_NAMES[targetLang] ?? targetLang;

    // 1) Transcribe
    const sttForm = new FormData();
    sttForm.append("model", "openai/gpt-4o-mini-transcribe");
    sttForm.append("file", file, file.name || "audio.mp4");
    const sttRes = await fetch("https://ai.gateway.lovable.dev/v1/audio/transcriptions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}` },
      body: sttForm,
    });
    if (!sttRes.ok) {
      const t = await sttRes.text();
      return new Response(JSON.stringify({ error: "STT failed", status: sttRes.status, details: t }), {
        status: sttRes.status, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const sttJson = await sttRes.json();
    const transcript = String(sttJson.text ?? "").trim();
    if (!transcript) {
      return new Response(JSON.stringify({ error: "Empty transcript" }), {
        status: 422, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 2) Translate to target language (short, natural, spoken register)
    const chatRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You translate spoken dialogue into ${targetName}. Output ONLY the translated text, natural spoken register, no quotes, no notes, no source text.`,
          },
          { role: "user", content: transcript },
        ],
      }),
    });
    if (!chatRes.ok) {
      const t = await chatRes.text();
      return new Response(JSON.stringify({ error: "Translation failed", status: chatRes.status, details: t }), {
        status: chatRes.status, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const chatJson = await chatRes.json();
    const translated = String(chatJson.choices?.[0]?.message?.content ?? "").trim();
    if (!translated) {
      return new Response(JSON.stringify({ error: "Empty translation" }), {
        status: 422, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 3) TTS
    const ttsRes = await fetch("https://ai.gateway.lovable.dev/v1/audio/speech", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini-tts",
        input: translated,
        voice: voiceFor(targetLang),
        response_format: "mp3",
        instructions: `Speak in ${targetName}, natural conversational tone, clear and friendly.`,
      }),
    });
    if (!ttsRes.ok) {
      const t = await ttsRes.text();
      return new Response(JSON.stringify({ error: "TTS failed", status: ttsRes.status, details: t }), {
        status: ttsRes.status, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const audioBuf = await ttsRes.arrayBuffer();

    return new Response(audioBuf, {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "audio/mpeg",
        "X-Transcript": encodeURIComponent(transcript),
        "X-Translation": encodeURIComponent(translated),
        "Access-Control-Expose-Headers": "X-Transcript, X-Translation",
      },
    });
  } catch (err) {
    console.error("dub-video error:", err);
    return new Response(JSON.stringify({ error: String(err instanceof Error ? err.message : err) }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
