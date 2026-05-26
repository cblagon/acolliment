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
  ha: "ar-SA", // fallback to Arabic
  wo: null,
  mnk: null,
  snk: null,
  srk: null,
};

function selectBestVoice(voices: SpeechSynthesisVoice[], bcp47: string = "ca-ES"): SpeechSynthesisVoice | null {
  const primary = bcp47.toLowerCase();
  const base = primary.split("-")[0];

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
      if (v.name.toLowerCase().includes("google")) score += 30;
      if (v.name.toLowerCase().includes("microsoft")) score += 20;
      return { voice: v, score };
    })
    .sort((a, b) => b.score - a.score);

  return scored[0]?.voice ?? null;
}

/**
 * Returns a `speak(text, lang?)` function plus `isAvailable(lang)`.
 * Default lang = 'ca' for backward compatibility.
 */
export function useTTS() {
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const refresh = () => {
      voicesRef.current = speechSynthesis.getVoices();
    };
    refresh();
    speechSynthesis.addEventListener("voiceschanged", refresh);
    return () => speechSynthesis.removeEventListener("voiceschanged", refresh);
  }, []);

  const isAvailable = useCallback((lang: LangCode = "ca") => {
    const bcp47 = LANG_TO_BCP47[lang];
    if (!bcp47) return false;
    if (voicesRef.current.length === 0) voicesRef.current = speechSynthesis.getVoices();
    return selectBestVoice(voicesRef.current, bcp47) !== null;
  }, []);

  const speak = useCallback((text: string, lang: LangCode = "ca") => {
    const bcp47 = LANG_TO_BCP47[lang];
    if (!bcp47) return; // unsupported language — silent no-op
    speechSynthesis.cancel();

    if (voicesRef.current.length === 0) voicesRef.current = speechSynthesis.getVoices();
    const voice = selectBestVoice(voicesRef.current, bcp47);

    setTimeout(() => {
      const utter = new SpeechSynthesisUtterance(text);
      if (voice) utter.voice = voice;
      utter.lang = bcp47;
      utter.rate = lang === "ca" ? 0.78 : 0.85;
      utter.pitch = 1.0;
      speechSynthesis.speak(utter);
    }, 100);
  }, []);

  // Backward-compat: allow `speak("hola")` calls — they default to Catalan.
  return Object.assign(speak, { isAvailable }) as ((text: string, lang?: LangCode) => void) & {
    isAvailable: (lang?: LangCode) => boolean;
  };
}

export { selectBestVoice };
