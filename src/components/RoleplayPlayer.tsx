import { useState, useEffect, useCallback, useRef } from "react";
import { Play, Pause, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { type RoleplayData } from "@/data/roleplayData";
import { selectBestVoice } from "@/hooks/useTTS";

interface RoleplayPlayerProps {
  data: RoleplayData;
}

export function RoleplayPlayer({ data }: RoleplayPlayerProps) {
  const [currentLine, setCurrentLine] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [finished, setFinished] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const synthRef = useRef(typeof window !== "undefined" ? window.speechSynthesis : null);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);

  // Find best Catalan voice — retry until found
  useEffect(() => {
    const findVoice = () => {
      const voices = speechSynthesis.getVoices();
      if (voices.length > 0) {
        voiceRef.current = selectBestVoice(voices);
      }
    };
    findVoice();
    speechSynthesis.addEventListener("voiceschanged", findVoice);
    // Some browsers need a small delay for voices to load
    const retryTimer = setTimeout(findVoice, 500);
    const retryTimer2 = setTimeout(findVoice, 1500);
    return () => {
      speechSynthesis.removeEventListener("voiceschanged", findVoice);
      clearTimeout(retryTimer);
      clearTimeout(retryTimer2);
    };
  }, []);

  const speak = useCallback((text: string) => {
    if (!soundOn || !synthRef.current) return;
    synthRef.current.cancel();

    // Re-check voices just before speaking in case they loaded late
    if (!voiceRef.current) {
      const voices = speechSynthesis.getVoices();
      voiceRef.current = selectBestVoice(voices);
    }

    const utterance = new SpeechSynthesisUtterance(text);
    if (voiceRef.current) {
      utterance.voice = voiceRef.current;
    }
    // Always force ca-ES to ensure Catalan pronunciation
    utterance.lang = "ca-ES";
    utterance.rate = 0.78;
    utterance.pitch = 1.0;
    synthRef.current.speak(utterance);
  }, [soundOn]);

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

    // Speak current line
    if (currentLine >= 0) {
      speak(data.lines[currentLine].text);
    }

    const delay = currentLine === -1 ? 2000 : 3500;
    timerRef.current = setTimeout(advanceLine, delay);
    return () => clearTimeout(timerRef.current);
  }, [isPlaying, currentLine, advanceLine, speak, data.lines]);

  const handlePlayPause = () => {
    if (finished) {
      // Restart
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

  return (
    <div
      className="relative w-full h-full min-h-[200px] flex flex-col items-center justify-center overflow-hidden rounded-l-2xl sm:rounded-l-2xl sm:rounded-r-none"
      style={{
        background: `linear-gradient(135deg, ${data.bgColor1}, ${data.bgColor2})`,
      }}
    >
      {/* Title screen */}
      {currentLine === -1 && (
        <div className="flex flex-col items-center gap-2 animate-fade-in text-center px-4">
          <span className="text-5xl">{data.emoji}</span>
          <h3 className="text-xl font-extrabold text-white drop-shadow-md">
            {data.title}
          </h3>
          <span className="text-xs text-white/80 font-semibold">
            🎭 Roleplay en català
          </span>
        </div>
      )}

      {/* Dialogue */}
      {line && speaker && (
        <div
          key={currentLine}
          className="flex flex-col items-center gap-3 px-4 w-full animate-fade-in"
        >
          {/* Speaker */}
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

          {/* Bubble */}
          <div
            className={`bg-white/95 rounded-2xl px-4 py-3 max-w-[90%] shadow-xl ${
              isLeft ? "self-start" : "self-end"
            }`}
          >
            <p className="text-sm font-bold text-gray-800 leading-relaxed">
              {line.text}
            </p>
            {line.emoji && (
              <span className="text-2xl mt-1 inline-block animate-bounce">
                {line.emoji}
              </span>
            )}
          </div>

          {/* Progress */}
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
            className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
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
