import { useCallback, useEffect, useRef } from "react";

export function useTTS() {
  const catalanVoice = useRef<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    const findVoice = () => {
      const voices = speechSynthesis.getVoices();
      // Priority: ca-ES voices first, then es-ES as fallback
      catalanVoice.current =
        voices.find((v) => v.lang === "ca-ES") ??
        voices.find((v) => v.lang.startsWith("ca")) ??
        voices.find((v) => v.lang === "es-ES") ??
        voices.find((v) => v.lang.startsWith("es")) ??
        null;
    };
    findVoice();
    speechSynthesis.addEventListener("voiceschanged", findVoice);
    return () => speechSynthesis.removeEventListener("voiceschanged", findVoice);
  }, []);

  const speak = useCallback((text: string) => {
    speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    if (catalanVoice.current) utter.voice = catalanVoice.current;
    utter.lang = "ca-ES";
    utter.rate = 0.85;
    speechSynthesis.speak(utter);
  }, []);

  return speak;
}
