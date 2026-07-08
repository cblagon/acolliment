import { useState, useEffect, useCallback, useRef } from "react";
import { Play, Pause, RotateCcw, Volume2, VolumeX, Loader2, Languages } from "lucide-react";
import { type RoleplayData } from "@/data/roleplayData";
import { selectBestVoice } from "@/hooks/useTTS";
import { supabase } from "@/integrations/supabase/client";
import { useLanguages } from "@/hooks/useLanguage";

interface RoleplayPlayerProps {
  data: RoleplayData;
}

// Target learning languages: code → { label, bcp47 }
const TARGET_LANGS: Record<string, { label: string; bcp47: string }> = {
  ca: { label: "Català", bcp47: "ca-ES" },
  es: { label: "Español", bcp47: "es-ES" },
  en: { label: "English", bcp47: "en-US" },
  fr: { label: "Français", bcp47: "fr-FR" },
  it: { label: "Italiano", bcp47: "it-IT" },
  pt: { label: "Português", bcp47: "pt-PT" },
  de: { label: "Deutsch", bcp47: "de-DE" },
  ar: { label: "العربية", bcp47: "ar-SA" },
  ur: { label: "اردو", bcp47: "ur-PK" },
  ro: { label: "Română", bcp47: "ro-RO" },
  uk: { label: "Українська", bcp47: "uk-UA" },
  zh: { label: "中文", bcp47: "zh-CN" },
  hi: { label: "हिन्दी", bcp47: "hi-IN" },
};

const CACHE_PREFIX = "roleplay-translation:";

export function RoleplayPlayer({ data }: RoleplayPlayerProps) {
  const { targetLang: appTargetLang } = useLanguages();
  // Map app LangCode → RoleplayPlayer target language code
  const mapAppLang = (code: string): string => {
    if (code === "ptBR") return "pt";
    if (TARGET_LANGS[code]) return code;
    return "ca";
  };
  const [currentLine, setCurrentLine] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [finished, setFinished] = useState(false);
  const [targetLang, setTargetLang] = useState<string>(() => mapAppLang(appTargetLang));
  const [translatedLines, setTranslatedLines] = useState<string[] | null>(null);
  const [translating, setTranslating] = useState(false);
  const [translateError, setTranslateError] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const synthRef = useRef(typeof window !== "undefined" ? window.speechSynthesis : null);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);

  const bcp47 = TARGET_LANGS[targetLang]?.bcp47 ?? "ca-ES";

  // Pick best voice for current target language
  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const pick = () => {
      const voices = speechSynthesis.getVoices();
      if (voices.length > 0) {
        voiceRef.current = selectBestVoice(voices, bcp47);
      }
    };
    const initial = speechSynthesis.getVoices();
    if (initial && initial.length > 0) {
      voiceRef.current = selectBestVoice(initial, bcp47);
    } else {
      speechSynthesis.addEventListener("voiceschanged", pick, { once: true });
    }
    return () => {
      speechSynthesis.removeEventListener("voiceschanged", pick);
    };
  }, [bcp47]);

  // Fetch translation when target lang changes
  useEffect(() => {
    setTranslateError(null);
    if (targetLang === "ca") {
      setTranslatedLines(null);
      return;
    }
    const cacheKey = `${CACHE_PREFIX}${data.id}:${targetLang}`;
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const parsed = JSON.parse(cached) as string[];
        if (Array.isArray(parsed) && parsed.length === data.lines.length) {
          setTranslatedLines(parsed);
          return;
        }
      }
    } catch { /* ignore */ }

    let cancelled = false;
    setTranslating(true);
    setTranslatedLines(null);
    (async () => {
      try {
        const { data: resp, error } = await supabase.functions.invoke("ai-text-tools", {
          body: {
            action: "translate-lines",
            targetLang,
            lines: data.lines.map((l) => l.text),
          },
        });
        if (cancelled) return;
        if (error) throw error;
        const outLines: string[] = resp?.lines ?? [];
        if (outLines.length !== data.lines.length) {
          throw new Error("Traducció incompleta");
        }
        setTranslatedLines(outLines);
        try { localStorage.setItem(cacheKey, JSON.stringify(outLines)); } catch { /* ignore */ }
      } catch (e) {
        if (!cancelled) setTranslateError((e as Error).message ?? "Error de traducció");
      } finally {
        if (!cancelled) setTranslating(false);
      }
    })();
    return () => { cancelled = true; };
  }, [targetLang, data.id, data.lines]);

  const getLineText = useCallback((idx: number) => {
    if (targetLang === "ca" || !translatedLines) return data.lines[idx]?.text ?? "";
    return translatedLines[idx] ?? data.lines[idx]?.text ?? "";
  }, [targetLang, translatedLines, data.lines]);

  const speak = useCallback((text: string) => {
    if (!soundOn || !synthRef.current) return;
    synthRef.current.cancel();

    const doSpeak = () => {
      const utterance = new SpeechSynthesisUtterance(text);
      if (voiceRef.current) utterance.voice = voiceRef.current;
      utterance.lang = bcp47;
      utterance.rate = bcp47.startsWith("ca") ? 0.78 : 0.9;
      utterance.pitch = 1;
      synthRef.current!.speak(utterance);
    };

    if (voiceRef.current) {
      doSpeak();
    } else {
      const voices = speechSynthesis.getVoices();
      if (voices.length > 0) {
        voiceRef.current = selectBestVoice(voices, bcp47);
        doSpeak();
      } else {
        speechSynthesis.addEventListener(
          "voiceschanged",
          () => {
            voiceRef.current = selectBestVoice(speechSynthesis.getVoices(), bcp47);
            doSpeak();
          },
          { once: true }
        );
      }
    }
  }, [soundOn, bcp47]);

  const advanceLine = useCallback(() => {
    setCurrentLine((prev) => {
      const next = prev + 1;
      if (next >= data.lines.length) {
        setIsPlaying(false);
        setFinished(true);
        return prev;
      }
      return next;
    });
  }, [data.lines.length]);

  // Auto-advance when playing
  useEffect(() => {
    if (!isPlaying) return;
    if (currentLine >= data.lines.length) return;

    if (currentLine >= 0) {
      speak(getLineText(currentLine));
    }

    const delay = currentLine === -1 ? 2000 : 3500;
    timerRef.current = setTimeout(advanceLine, delay);
    return () => clearTimeout(timerRef.current);
  }, [isPlaying, currentLine, advanceLine, speak, getLineText, data.lines.length]);

  const handlePlayPause = () => {
    if (translating) return;
    if (finished) {
      setFinished(false);
      setCurrentLine(-1);
      setIsPlaying(true);
      return;
    }
    setIsPlaying((p) => !p);
  };

  const handleRestart = () => {
    synthRef.current?.cancel();
    clearTimeout(timerRef.current);
    setCurrentLine(-1);
    setFinished(false);
    setIsPlaying(false);
  };

  const line = currentLine >= 0 ? data.lines[currentLine] : null;
  const speaker = line
    ? line.speaker === "A"
      ? data.speakerA
      : data.speakerB
    : null;
  const isLeft = line?.speaker === "A";
  const displayText = line ? getLineText(currentLine) : "";
  const targetLabel = TARGET_LANGS[targetLang]?.label ?? "Català";

  return (
    <div
      className="relative w-full h-full min-h-[200px] flex flex-col items-center justify-center overflow-hidden rounded-l-2xl sm:rounded-l-2xl sm:rounded-r-none"
      style={{
        background: `linear-gradient(135deg, ${data.bgColor1}, ${data.bgColor2})`,
      }}
    >
      {/* Language selector */}
      <div className="absolute top-2 right-2 z-10 flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full pl-2 pr-1 py-1">
        <Languages className="w-3.5 h-3.5 text-white" />
        <select
          aria-label="Llengua a aprendre"
          value={targetLang}
          onChange={(e) => {
            handleRestart();
            setTargetLang(e.target.value);
          }}
          className="bg-transparent text-white text-xs font-bold outline-none cursor-pointer pr-1"
        >
          {Object.entries(TARGET_LANGS).map(([code, { label }]) => (
            <option key={code} value={code} className="text-gray-800">
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* Title screen */}
      {currentLine === -1 && !translating && !translateError && (
        <div className="flex flex-col items-center gap-2 animate-fade-in text-center px-4">
          <span className="text-5xl">{data.emoji}</span>
          <h3 className="text-xl font-extrabold text-white drop-shadow-md">
            {data.title}
          </h3>
          <span className="text-xs text-white/80 font-semibold">
            🎭 Roleplay en {targetLabel}
          </span>
        </div>
      )}

      {/* Translation loading */}
      {translating && (
        <div className="flex flex-col items-center gap-2 text-white">
          <Loader2 className="w-8 h-8 animate-spin" />
          <span className="text-xs font-semibold">Traduint a {targetLabel}…</span>
        </div>
      )}

      {/* Translation error */}
      {translateError && !translating && (
        <div className="flex flex-col items-center gap-2 text-white text-center px-4">
          <span className="text-3xl">⚠️</span>
          <span className="text-xs font-semibold">No s'ha pogut traduir. Torna-ho a provar.</span>
        </div>
      )}

      {/* Dialogue */}
      {line && speaker && !translating && (
        <div
          key={currentLine}
          className="flex flex-col items-center gap-3 px-4 w-full animate-fade-in"
        >
          <div className="flex items-center gap-2">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-lg"
              style={{ background: speaker.color }}
            >
              {speaker.emoji}
            </div>
            <span className="text-white font-bold text-sm drop-shadow">
              {speaker.name}
            </span>
          </div>

          <div
            className={`bg-white/95 rounded-2xl px-4 py-3 max-w-[90%] shadow-xl ${
              isLeft ? "self-start" : "self-end"
            }`}
            dir={bcp47.startsWith("ar") || bcp47.startsWith("ur") ? "rtl" : "ltr"}
          >
            <p className="text-sm font-bold text-gray-800 leading-relaxed">
              {displayText}
            </p>
            {line.emoji && (
              <span className="text-2xl mt-1 inline-block animate-bounce">
                {line.emoji}
              </span>
            )}
          </div>

          <div className="flex gap-1 mt-1">
            {data.lines.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i <= currentLine ? "bg-white scale-110" : "bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* End screen */}
      {finished && (
        <div className="flex flex-col items-center gap-2 animate-fade-in">
          <span className="text-5xl">🎉</span>
          <h3 className="text-xl font-extrabold text-white drop-shadow-md">
            Molt bé!
          </h3>
          <span className="text-xs text-white/80 font-semibold">
            Ara practica amb un company! 👥
          </span>
        </div>
      )}

      {/* Controls */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
        <div className="flex gap-1.5">
          <button
            onClick={handlePlayPause}
            disabled={translating}
            className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {finished ? (
              <RotateCcw className="w-4 h-4" />
            ) : isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4 ml-0.5" />
            )}
          </button>
          <button
            onClick={handleRestart}
            className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
        <button
          onClick={() => {
            setSoundOn((s) => !s);
            if (soundOn) synthRef.current?.cancel();
          }}
          className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
        >
          {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
