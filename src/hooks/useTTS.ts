import { useCallback, useEffect, useRef } from "react";
import { type LangCode } from "@/hooks/useLanguage";

/** Map our app's LangCode to a BCP-47 locale for the SpeechSynthesis API. null = unsupported. */
export const LANG_TO_BCP47: Record<LangCode, string | null> = {
  ca: "ca-ES",
  es: "es-ES",
  en: "en-GB",
  fr: "fr-FR",
  ar: "ar-SA",
  ur: "ur-PK",
  uk: "uk-UA",
  it: "it-IT",
  el: "el-GR",
  ptBR: "pt-BR",
  pt: "pt-PT",
  zh: "zh-CN",
  hi: "hi-IN",
  ro: "ro-RO",
  ha: "ar-SA",
  wo: null,
  mnk: null,
  snk: null,
  srk: null,
};

function selectBestVoice(voices: SpeechSynthesisVoice[], bcp47: string = "ca-ES"): SpeechSynthesisVoice | null {
  if (!voices || voices.length === 0) return null;
  const primary = bcp47.toLowerCase();
  const base = primary.split("-")[0];

  // For Catalan, always prioritize any ca* voice strongly.
  const scored = voices
    .filter((v) => {
      const l = v.lang.toLowerCase();
      return l === primary || l.startsWith(base + "-") || l === base;
    })
    .map((v) => {
      const l = v.lang.toLowerCase();
      let score = 0;
      if (l === primary) score += 100;
      else if (l.startsWith(base + "-")) score += 60;
      else if (l === base) score += 40;
      if (!v.localService) score += 50;
      const n = v.name.toLowerCase();
      if (n.includes("google")) score += 30;
      if (n.includes("microsoft")) score += 20;
      if (n.includes("natural") || n.includes("neural")) score += 25;
      return { voice: v, score };
    })
    .sort((a, b) => b.score - a.score);

  if (scored[0]) return scored[0].voice;
  // Fallback: browser default
  return voices.find((v) => v.default) ?? voices[0] ?? null;
}

/** Wait until voices are loaded (or timeout). Safari/iOS often need the event. */
function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      resolve([]);
      return;
    }
    const existing = speechSynthesis.getVoices();
    if (existing && existing.length > 0) {
      resolve(existing);
      return;
    }
    const handler = () => {
      resolve(speechSynthesis.getVoices() || []);
    };
    speechSynthesis.addEventListener("voiceschanged", handler, { once: true });
    // Safety timeout in case the event never fires
    setTimeout(() => {
      resolve(speechSynthesis.getVoices() || []);
    }, 1500);
  });
}

/**
 * Returns a `speak(text, lang?)` function plus `isAvailable(lang)`.
 * Default lang = 'ca' for backward compatibility.
 * IMPORTANT: only call speak() from a user-triggered event (click/tap).
 */
export function useTTS() {
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const refresh = () => {
      const v = speechSynthesis.getVoices();
      if (v && v.length > 0) voicesRef.current = v;
    };
    refresh();
    speechSynthesis.addEventListener("voiceschanged", refresh);
    return () => speechSynthesis.removeEventListener("voiceschanged", refresh);
  }, []);

  const isAvailable = useCallback((lang: LangCode = "ca") => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return false;
    return LANG_TO_BCP47[lang] != null;
  }, []);

  const speak = useCallback((text: string, lang: LangCode = "ca") => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const bcp47 = LANG_TO_BCP47[lang] || "ca-ES";
    speechSynthesis.cancel();

    const doSpeak = (voices: SpeechSynthesisVoice[]) => {
      const voice = selectBestVoice(voices, bcp47);
      const utter = new SpeechSynthesisUtterance(text);
      if (voice) utter.voice = voice;
      utter.lang = bcp47;
      utter.rate = lang === "ca" ? 0.78 : 0.85;
      utter.pitch = 1.0;
      speechSynthesis.speak(utter);
    };

    if (voicesRef.current.length > 0) {
      doSpeak(voicesRef.current);
    } else {
      loadVoices().then((v) => {
        voicesRef.current = v;
        doSpeak(v);
      });
    }
  }, []);

  return Object.assign(speak, { isAvailable }) as ((text: string, lang?: LangCode) => void) & {
    isAvailable: (lang?: LangCode) => boolean;
  };
}

export { selectBestVoice };
