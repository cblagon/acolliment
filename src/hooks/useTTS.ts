import { useCallback, useEffect, useRef } from "react";

/**
 * Selects the best available Catalan voice.
 * Priority: ca-ES native > ca-* > Google ca-ES > es-ES (fallback)
 */
function selectBestVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  // Score voices — higher is better
  const scored = voices
    .filter((v) => v.lang.startsWith("ca") || v.lang.startsWith("es"))
    .map((v) => {
      let score = 0;
      if (v.lang === "ca-ES") score += 100;
      else if (v.lang.startsWith("ca")) score += 80;
      else if (v.lang === "es-ES") score += 20;
      else if (v.lang.startsWith("es")) score += 10;

      // Prefer non-local (network/cloud) voices — they sound much better
      if (!v.localService) score += 50;
      // Google voices tend to be higher quality
      if (v.name.toLowerCase().includes("google")) score += 30;
      // Microsoft voices are also decent
      if (v.name.toLowerCase().includes("microsoft")) score += 20;

      return { voice: v, score };
    })
    .sort((a, b) => b.score - a.score);

  return scored[0]?.voice ?? null;
}

export function useTTS() {
  const bestVoice = useRef<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    const findVoice = () => {
      const voices = speechSynthesis.getVoices();
      bestVoice.current = selectBestVoice(voices);
    };
    findVoice();
    speechSynthesis.addEventListener("voiceschanged", findVoice);
    return () => speechSynthesis.removeEventListener("voiceschanged", findVoice);
  }, []);

  const speak = useCallback((text: string) => {
    speechSynthesis.cancel();

    // Re-check voices just before speaking
    if (!bestVoice.current) {
      const voices = speechSynthesis.getVoices();
      bestVoice.current = selectBestVoice(voices);
    }

    const utter = new SpeechSynthesisUtterance(text);
    if (bestVoice.current) {
      utter.voice = bestVoice.current;
    }
    // Always force ca-ES for correct Catalan pronunciation
    utter.lang = "ca-ES";
    utter.rate = 0.78;
    utter.pitch = 1.0;
    speechSynthesis.speak(utter);
  }, []);

  return speak;
}

export { selectBestVoice };
