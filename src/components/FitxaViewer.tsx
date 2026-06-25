import { useState } from "react";
import { type Bloc } from "@/data/blocksData";
import { type LangCode } from "@/hooks/useLanguage";
import { getTraduccio, getWord } from "@/data/translations";
import { useTTS } from "@/hooks/useTTS";
import { t } from "@/i18n/ui";
import { Volume2, VolumeX, ChevronLeft, ChevronRight, ArrowLeft, Gamepad2, Music } from "lucide-react";
import { SpeechCheck } from "@/components/SpeechCheck";

interface FitxaViewerProps {
  bloc: Bloc;
  targetLang: LangCode;
  helpLang: LangCode;
  onBack: () => void;
  onStartQuiz: () => void;
  onStartSongs: () => void;
}

export function FitxaViewer({ bloc, targetLang, helpLang, onBack, onStartQuiz, onStartSongs }: FitxaViewerProps) {
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const speak = useTTS();
  const fitxa = bloc.fitxes[current];

  const go = (dir: 1 | -1) => {
    setCurrent((c) => (c + dir + bloc.fitxes.length) % bloc.fitxes.length);
    setFlipped(false);
  };

  const paraulaTarget = getWord(fitxa.paraula, targetLang);
  const traduccio = getTraduccio(fitxa.paraula, helpLang);
  const showPhrase = targetLang === "ca";
  const ttsOk = speak.isAvailable(targetLang);

  return (
    <div className="flex flex-col items-center gap-6 animate-reveal-up">
      {/* Header */}
      <div className="flex items-center justify-between w-full max-w-lg">
        <button onClick={onBack} className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors active:scale-95">
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold text-sm">{t(helpLang, "back")}</span>
        </button>
        <h2 className="text-xl font-extrabold flex items-center gap-2">
          <span>{bloc.emoji}</span> {tBlocName(bloc.nom, helpLang)}
        </h2>
        <div className="flex items-center gap-3">
          <button onClick={onStartQuiz} className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors font-semibold text-sm active:scale-95">
            <Gamepad2 className="w-4 h-4" />
            {t(helpLang, "game")}
          </button>
          <button onClick={onStartSongs} className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors font-semibold text-sm active:scale-95">
            <Music className="w-4 h-4" />
            {t(helpLang, "songs")}
          </button>
        </div>
      </div>

      {/* Progress */}
      <div className="w-full max-w-lg">
        <div className="flex justify-between text-xs text-muted-foreground mb-1">
          <span>{t(helpLang, "card")} {current + 1} {t(helpLang, "of")} {bloc.fitxes.length}</span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <div
            className={`h-full rounded-full ${bloc.color} transition-all duration-500`}
            style={{ width: `${((current + 1) / bloc.fitxes.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Card */}
      <div
        onClick={() => setFlipped(!flipped)}
        className="relative w-full max-w-lg aspect-[4/3] cursor-pointer perspective-1000"
      >
        <div
          className={`absolute inset-0 rounded-3xl shadow-lg p-8 flex flex-col items-center justify-center gap-4 transition-all duration-500 backface-hidden ${
            flipped ? "rotate-y-180 opacity-0" : ""
          } bg-card border border-border`}
        >
          <span className="text-7xl sm:text-8xl drop-shadow-sm">{fitxa.emoji}</span>
          <span className="text-3xl sm:text-4xl font-extrabold text-foreground text-center">{paraulaTarget}</span>
          <span className="text-sm text-muted-foreground">{t(helpLang, "tapForTranslation")}</span>
        </div>
        <div
          className={`absolute inset-0 rounded-3xl shadow-lg p-8 flex flex-col items-center justify-center gap-3 transition-all duration-500 backface-hidden ${
            flipped ? "" : "rotate-y-180 opacity-0"
          } ${bloc.color} text-white`}
        >
          <span className="text-5xl">{fitxa.emoji}</span>
          <span className="text-2xl font-extrabold text-center">{paraulaTarget}</span>
          <span className="text-lg opacity-90 text-center">{traduccio}</span>
          {showPhrase && <p className="text-sm opacity-80 italic text-center mt-2">"{fitxa.frase}"</p>}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => go(-1)}
          className="p-3 rounded-full bg-muted hover:bg-muted/80 transition-all active:scale-90"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => ttsOk && speak(showPhrase ? paraulaTarget + ". " + fitxa.frase : paraulaTarget, targetLang)}
          disabled={!ttsOk}
          title={ttsOk ? "" : t(helpLang, "ttsUnavailable")}
          className={`p-4 rounded-full ${bloc.color} text-white shadow-md hover:shadow-lg transition-all active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed`}
        >
          {ttsOk ? <Volume2 className="w-7 h-7" /> : <VolumeX className="w-7 h-7" />}
        </button>
        <button
          onClick={() => go(1)}
          className="p-3 rounded-full bg-muted hover:bg-muted/80 transition-all active:scale-90"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <SpeechCheck bloc={bloc} targetLang={targetLang} helpLang={helpLang} />
    </div>
  );
}
