import { useState } from "react";
import { type Bloc } from "@/data/blocksData";
import { useBlocs } from "@/hooks/useBlocs";
import { useLanguage } from "@/hooks/useLanguage";
import { useVideoBlocs } from "@/hooks/useVideoBlocs";
import { BlocGrid } from "@/components/BlocGrid";
import { FitxaViewer } from "@/components/FitxaViewer";
import { QuizGame } from "@/components/QuizGame";
import { SongViewer } from "@/components/SongViewer";
import { BlocEditor } from "@/components/BlocEditor";
import { LanguageSelector } from "@/components/LanguageSelector";
import { exportAllToPDF } from "@/hooks/useExportPDF";
import { Download } from "lucide-react";

type View =
  | { type: "grid" }
  | { type: "fitxes"; bloc: Bloc }
  | { type: "quiz"; bloc: Bloc }
  | { type: "songs"; bloc: Bloc }
  | { type: "editor"; bloc?: Bloc };

const Index = () => {
  const { blocs, addBloc, updateBloc } = useBlocs();
  const { videoSlots, setVideoUrl } = useVideoBlocs();
  const { lang, setLang } = useLanguage();
  const [view, setView] = useState<View>({ type: "grid" });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container py-4 flex items-center justify-between">
          <button onClick={() => setView({ type: "grid" })} className="flex items-center gap-2 active:scale-95 transition-transform">
            <span className="text-3xl">🌍</span>
            <div>
              <h1 className="text-xl font-extrabold leading-none text-foreground">Aprèn Català!</h1>
              <p className="text-xs text-muted-foreground font-semibold">Programa d'acollida lingüística</p>
            </div>
          </button>
          <div className="flex items-center gap-3">
            <LanguageSelector lang={lang} onChange={setLang} />
            {view.type !== "grid" && (
              <button
                onClick={() => setView({ type: "grid" })}
                className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors active:scale-95"
              >
                Tots els blocs
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
              <h2 className="text-2xl font-extrabold text-foreground text-balance">
                Tria un bloc per començar a aprendre 👇
              </h2>
              <p className="text-muted-foreground mt-1 text-sm">{blocs.length} blocs · {blocs.reduce((s, b) => s + b.fitxes.length, 0)} paraules</p>
            </div>
            <BlocGrid
              blocs={blocs}
              onSelect={(bloc) => setView({ type: "fitxes", bloc })}
              onAddNew={() => setView({ type: "editor" })}
              videoSlots={videoSlots}
              onVideoChange={setVideoUrl}
            />
          </div>
        )}
        {view.type === "fitxes" && (
          <FitxaViewer
            bloc={view.bloc}
            lang={lang}
            onBack={() => setView({ type: "grid" })}
            onStartQuiz={() => setView({ type: "quiz", bloc: view.bloc })}
            onStartSongs={() => setView({ type: "songs", bloc: view.bloc })}
          />
        )}
        {view.type === "quiz" && (
          <QuizGame
            bloc={view.bloc}
            lang={lang}
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
