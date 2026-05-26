import { useState } from "react";
import { type Bloc, type Level } from "@/data/blocksData";
import { useBlocs } from "@/hooks/useBlocs";
import { useLanguages } from "@/hooks/useLanguage";
import { useVideoBlocs } from "@/hooks/useVideoBlocs";
import { BlocGrid } from "@/components/BlocGrid";
import { FitxaViewer } from "@/components/FitxaViewer";
import { QuizGame } from "@/components/QuizGame";
import { SongViewer } from "@/components/SongViewer";
import { BlocEditor } from "@/components/BlocEditor";
import { LanguageSelector } from "@/components/LanguageSelector";
import { exportAllToPDF } from "@/hooks/useExportPDF";
import { t, langName } from "@/i18n/ui";
import { Download } from "lucide-react";

type View =
  | { type: "grid" }
  | { type: "fitxes"; bloc: Bloc }
  | { type: "quiz"; bloc: Bloc }
  | { type: "songs"; bloc: Bloc }
  | { type: "editor"; bloc?: Bloc };

const levels: Level[] = ["A1", "A2", "B1"];
const levelColors: Record<Level, string> = {
  A1: "bg-green-500",
  A2: "bg-amber-500",
  B1: "bg-blue-500",
};

const Index = () => {
  const [selectedLevel, setSelectedLevel] = useState<Level>("A1");
  const { blocs, addBloc, updateBloc } = useBlocs(selectedLevel);
  const { videoSlots, setVideoUrl } = useVideoBlocs(selectedLevel);
  const { targetLang, helpLang, setTargetLang, setHelpLang } = useLanguages();
  const [view, setView] = useState<View>({ type: "grid" });

  const levelLabels: Record<Level, string> = {
    A1: t(helpLang, "basic"),
    A2: t(helpLang, "elemental"),
    B1: t(helpLang, "intermediate"),
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container py-4 flex flex-wrap items-center justify-between gap-3">
          <button onClick={() => setView({ type: "grid" })} className="flex items-center gap-2 active:scale-95 transition-transform">
            <span className="text-3xl">🌍</span>
            <div className="text-left">
              <h1 className="text-xl font-extrabold leading-none text-foreground">
                {t(helpLang, "learnTitle", { lang: langName(targetLang, helpLang) })}
              </h1>
              <p className="text-xs text-muted-foreground font-semibold">{t(helpLang, "appSubtitle")}</p>
            </div>
          </button>
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {/* Level selector */}
            <div className="flex rounded-xl bg-muted p-0.5 gap-0.5">
              {levels.map((lv) => (
                <button
                  key={lv}
                  onClick={() => {
                    setSelectedLevel(lv);
                    setView({ type: "grid" });
                  }}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedLevel === lv
                      ? `${levelColors[lv]} text-white shadow-sm`
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {lv}
                </button>
              ))}
            </div>
            <button
              onClick={() => exportAllToPDF(blocs, targetLang, helpLang)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-muted text-foreground text-sm font-semibold hover:bg-muted/80 transition-all active:scale-95"
              title="PDF"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">{t(helpLang, "pdf")}</span>
            </button>
            <LanguageSelector
              lang={targetLang}
              onChange={setTargetLang}
              label={`🎯 ${t(helpLang, "learning")}:`}
              exclude={helpLang}
              title={t(helpLang, "learning")}
            />
            <LanguageSelector
              lang={helpLang}
              onChange={setHelpLang}
              label={`🌍 ${t(helpLang, "helpIn")}:`}
              exclude={targetLang}
              title={t(helpLang, "helpIn")}
            />
            {view.type !== "grid" && (
              <button
                onClick={() => setView({ type: "grid" })}
                className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors active:scale-95"
              >
                {t(helpLang, "allBlocs")}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container py-8">
        {view.type === "grid" && (
          <div className="space-y-6">
            <div className="animate-reveal-up">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-2xl font-extrabold text-foreground text-balance">
                  {t(helpLang, "chooseBlocPrompt")}
                </h2>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold text-white ${levelColors[selectedLevel]}`}>
                  {selectedLevel} · {levelLabels[selectedLevel]}
                </span>
              </div>
              <p className="text-muted-foreground mt-1 text-sm">
                {blocs.length} {t(helpLang, "blocsCount")} · {blocs.reduce((s, b) => s + b.fitxes.length, 0)} {t(helpLang, "wordsCount")}
              </p>
            </div>
            <BlocGrid
              blocs={blocs}
              onSelect={(bloc) => setView({ type: "fitxes", bloc })}
              onAddNew={() => setView({ type: "editor" })}
              videoSlots={videoSlots}
              onVideoChange={setVideoUrl}
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
        {view.type === "editor" && (
          <BlocEditor
            bloc={view.bloc}
            onCancel={() => setView({ type: "grid" })}
            onSave={(bloc) => {
              if (view.bloc) updateBloc(view.bloc.id, bloc);
              else addBloc(bloc);
              setView({ type: "grid" });
            }}
          />
        )}
      </main>
    </div>
  );
};

export default Index;
