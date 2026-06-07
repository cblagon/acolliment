import { useCallback, useEffect, useRef } from "react";
import { type LangCode } from "@/hooks/useLanguage";

/** Map our app's LangCode to a BCP-47 locale for the SpeechSynthesis API. null = unsupported. */
export const LANG_TO_BCP47: Record<LangCode, string | null> = {
  ca: "ca-ES",
  es: "es-ES",
  en: "en-US",
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

/**
 * Pick the best matching voice for a BCP-47 locale.
 * - Prioritizes voice.localService === true (sounds more natural on most devices).
 * - For Catalan (ca-ES): NEVER falls back to es-ES. Returns null if no ca* voice exists.
 * - For other languages: falls back to any voice whose lang starts with the base code.
 */
function selectBestVoice(voices: SpeechSynthesisVoice[], bcp47: string = "ca-ES"): SpeechSynthesisVoice | null {
  if (!voices || voices.length === 0) return null;
  const primary = bcp47.toLowerCase();
  const base = primary.split("-")[0];

  const matches = voices.filter((v) => {
    const l = v.lang.toLowerCase();
    return l === primary || l.startsWith(base + "-") || l === base;
  });

  if (matches.length === 0) {
    if (base === "ca") {
      console.warn("No Catalan voice found on this device — using default voice with lang=ca-ES");
    }
    // Fall back to browser default. utterance.lang stays as requested so cloud engines may still try Catalan.
    return voices.find((v) => v.default) ?? voices[0] ?? null;
  }


  const scored = matches
    .map((v) => {
      const l = v.lang.toLowerCase();
      const n = v.name.toLowerCase();
      let score = 0;
      if (l === primary) score += 100;
      else if (l.startsWith(base + "-")) score += 60;
      else if (l === base) score += 40;
      if (v.localService) score += 80; // native voices sound best
      if (n.includes("natural") || n.includes("neural") || n.includes("enhanced")) score += 30;
      if (n.includes("google")) score += 25;
      if (n.includes("microsoft")) score += 20;
      return { voice: v, score };
    })
    .sort((a, b) => b.score - a.score);

  return scored[0].voice;
}

/** Resolve once voices are available (or after a short timeout). Safe across browsers. */
function ensureVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      resolve([]);
      return;
    }
    const initial = speechSynthesis.getVoices();
    if (initial && initial.length > 0) {
      resolve(initial);
      return;
    }
    let done = false;
    const handler = () => {
      if (done) return;
      done = true;
      resolve(speechSynthesis.getVoices() || []);
    };
    speechSynthesis.addEventListener("voiceschanged", handler, { once: true });
    setTimeout(() => {
      if (done) return;
      done = true;
      resolve(speechSynthesis.getVoices() || []);
    }, 1500);
  });
}

/**
 * Returns a `speak(text, lang?)` function plus `isAvailable(lang)`.
 * IMPORTANT: only call speak() from a direct user interaction (click/tap)
 * — required for iOS/Safari to actually play audio.
 */
export function useTTS() {
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);
  const speakingRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const refresh = () => {
      const v = speechSynthesis.getVoices();
      if (v && v.length > 0) voicesRef.current = v;
    };
    refresh();
    // Some Android Chrome builds fire voiceschanged multiple times — we only refresh the cache,
    // we never call speak() from this handler, so duplicates are harmless.
    speechSynthesis.addEventListener("voiceschanged", refresh);
    return () => speechSynthesis.removeEventListener("voiceschanged", refresh);
  }, []);

  const isAvailable = useCallback((lang: LangCode = "ca") => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return false;
    return LANG_TO_BCP47[lang] != null;
  }, []);

  const speak = useCallback((text: string, lang: LangCode = "ca") => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const bcp47 = LANG_TO_BCP47[lang];
    if (!bcp47) return;

    // Clear any stuck queue (common iOS bug) before scheduling new speech.
    speechSynthesis.cancel();

    const doSpeak = (voices: SpeechSynthesisVoice[]) => {
      const voice = selectBestVoice(voices, bcp47);
      // Strict Catalan rule: if no Catalan voice, skip rather than mispronounce.
      if (!voice && bcp47.startsWith("ca")) return;

      // Guard against double-fire (e.g. Android voiceschanged firing twice).
      if (speakingRef.current) speechSynthesis.cancel();
      speakingRef.current = true;

      const utter = new SpeechSynthesisUtterance(text);
      if (voice) utter.voice = voice;
      utter.lang = bcp47;
      utter.rate = 0.9;
      utter.pitch = 1;
      utter.onend = () => { speakingRef.current = false; };
      utter.onerror = () => { speakingRef.current = false; };
      speechSynthesis.speak(utter);
    };

    if (voicesRef.current.length > 0) {
      doSpeak(voicesRef.current);
    } else {
      ensureVoices().then((v) => {
        if (v.length > 0) voicesRef.current = v;
        doSpeak(v);
      });
    }
  }, []);

  return Object.assign(speak, { isAvailable }) as ((text: string, lang?: LangCode) => void) & {
    isAvailable: (lang?: LangCode) => boolean;
  };
}

export { selectBestVoice };
