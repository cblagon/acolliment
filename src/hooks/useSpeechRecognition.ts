import { useCallback, useEffect, useRef, useState } from "react";
import { type LangCode } from "@/hooks/useLanguage";
import { LANG_TO_BCP47 } from "@/hooks/useTTS";

// Web Speech API types (not in lib.dom by default)
type SR = any;

function getSRCtor(): SR | null {
  if (typeof window === "undefined") return null;
  return (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition || null;
}

export function isSpeechRecognitionAvailable(): boolean {
  return getSRCtor() !== null;
}

export interface UseSpeechRecognitionResult {
  supported: boolean;
  listening: boolean;
  transcript: string;
  interim: string;
  error: string | null;
  start: (lang?: LangCode) => void;
  stop: () => void;
  reset: () => void;
}

export function useSpeechRecognition(): UseSpeechRecognitionResult {
  const Ctor = getSRCtor();
  const recRef = useRef<any>(null);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interim, setInterim] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      try { recRef.current?.stop?.(); } catch {}
    };
  }, []);

  const start = useCallback((lang: LangCode = "ca") => {
    if (!Ctor) {
      setError("El teu navegador no suporta el reconeixement de veu. Prova Chrome o Edge.");
      return;
    }
    const bcp47 = LANG_TO_BCP47[lang] ?? "ca-ES";
    setError(null);
    setTranscript("");
    setInterim("");
    try {
      const rec = new Ctor();
      rec.lang = bcp47;
      rec.continuous = true;
      rec.interimResults = true;
      rec.maxAlternatives = 1;
      rec.onresult = (e: any) => {
        let finalText = "";
        let interimText = "";
        for (let i = e.resultIndex; i < e.results.length; i++) {
          const r = e.results[i];
          if (r.isFinal) finalText += r[0].transcript;
          else interimText += r[0].transcript;
        }
        if (finalText) setTranscript((t) => (t + " " + finalText).trim());
        setInterim(interimText);
      };
      rec.onerror = (e: any) => {
        setError(e?.error ? `Error: ${e.error}` : "Error al reconèixer la veu");
        setListening(false);
      };
      rec.onend = () => {
        setListening(false);
        setInterim("");
      };
      recRef.current = rec;
      rec.start();
      setListening(true);
    } catch (e: any) {
      setError(e?.message ?? "No s'ha pogut iniciar el micròfon");
      setListening(false);
    }
  }, [Ctor]);

  const stop = useCallback(() => {
    try { recRef.current?.stop?.(); } catch {}
    setListening(false);
  }, []);

  const reset = useCallback(() => {
    setTranscript("");
    setInterim("");
    setError(null);
  }, []);

  return {
    supported: Ctor !== null,
    listening,
    transcript,
    interim,
    error,
    start,
    stop,
    reset,
  };
}

/** Normalize text for matching: lowercase, strip accents and punctuation. */
export function normalizeForMatch(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s']/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Returns the set of keywords (from `keywords`) found in `spoken`. */
export function findMatchedKeywords(spoken: string, keywords: string[]): Set<string> {
  const hay = " " + normalizeForMatch(spoken) + " ";
  const found = new Set<string>();
  for (const kw of keywords) {
    const n = normalizeForMatch(kw);
    if (!n) continue;
    if (hay.includes(" " + n + " ")) found.add(kw);
  }
  return found;
}
