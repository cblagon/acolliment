import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { type Bloc, type Level } from "@/data/blocksData";
import { useBlocs } from "@/hooks/useBlocs";
import { useLanguages } from "@/hooks/useLanguage";
import { BlocGrid } from "@/components/BlocGrid";
import { FitxaViewer } from "@/components/FitxaViewer";
import { QuizGame } from "@/components/QuizGame";
import { SongViewer } from "@/components/SongViewer";
import { t } from "@/i18n/ui";

const levels: Level[] = ["A1", "A2", "B1"];
const levelColors: Record<Level, string> = {
  A1: "bg-green-500",
  A2: "bg-amber-500",
  B1: "bg-blue-500",
};

type View =
  | { type: "grid" }
  | { type: "fitxes"; bloc: Bloc }
  | { type: "quiz"; bloc: Bloc }
  | { type: "songs"; bloc: Bloc };

const Nivell = () => {
  const [selectedLevel, setSelectedLevel] = useState<Level>("A1");
  const { blocs } = useBlocs(selectedLevel);
  const { targetLang, helpLang } = useLanguages();
  const [view, setView] = useState<View>({ type: "grid" });

  const levelLabels: Record<Level, string> = {
    A1: t(helpLang, "basic"),
    A2: t(helpLang, "elemental"),
    B1: t(helpLang, "intermediate"),
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container py-4 flex items-center justify-between gap-3 flex-wrap">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t(helpLang, "back")}
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-2xl">📊</span>
            <h1 className="text-xl font-extrabold">{t(helpLang, "level")}</h1>
          </div>
          <div className="w-16" />
        </div>
      </header>

      <main className="container py-8">
        {view.type === "grid" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-extrabold text-foreground">
                  {t(helpLang, "chooseBlocPrompt")}
                </h2>
                <p className="text-muted-foreground mt-1 text-sm">
                  {blocs.length} {t(helpLang, "blocsCount")} · {blocs.reduce((s, b) => s + b.fitxes.length, 0)} {t(helpLang, "wordsCount")}
                </p>
              </div>

              <div className="flex rounded-xl bg-muted p-0.5 gap-0.5">
                {levels.map((lv) => (
                  <button
                    key={lv}
                    onClick={() => {
                      setSelectedLevel(lv);
                      setView({ type: "grid" });
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedLevel === lv
                        ? `${levelColors[lv]} text-white shadow-sm`
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {lv} · {levelLabels[lv]}
                  </button>
                ))}
              </div>
            </div>

            <BlocGrid
              blocs={blocs}
              onSelect={(bloc) => setView({ type: "fitxes", bloc })}
              onAddNew={() => {}}
              videoSlots={[]}
              onVideoChange={() => {}}
              helpLang={helpLang}
              targetLang={targetLang}
            />
          </div>
        )}
        {view.type === "fitxes" && (
          <FitxaViewer
            bloc={view.bloc}
            targetLang={targetLang}
            helpLang={helpLang}
            onBack={() => setView({ type: "grid" })}
            onStartQuiz={() => setView({ type: "quiz", bloc: view.bloc })}
            onStartSongs={() => setView({ type: "songs", bloc: view.bloc })}
          />
        )}
        {view.type === "quiz" && (
          <QuizGame
            bloc={view.bloc}
            targetLang={targetLang}
            helpLang={helpLang}
            onBack={() => setView({ type: "fitxes", bloc: view.bloc })}
          />
        )}
        {view.type === "songs" && (
          <SongViewer
            bloc={view.bloc}
            onBack={() => setView({ type: "fitxes", bloc: view.bloc })}
          />
        )}
      </main>
    </div>
  );
};

export default Nivell;
