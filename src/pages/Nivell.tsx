import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Download, GraduationCap } from "lucide-react";
import { toast } from "sonner";
import { type Bloc, type Level } from "@/data/blocksData";
import { useBlocs } from "@/hooks/useBlocs";
import { useLanguages } from "@/hooks/useLanguage";
import { useVideoBlocs } from "@/hooks/useVideoBlocs";
import { useAuth } from "@/hooks/useAuth";
import { useBlocSubmissions, submissionToBloc } from "@/hooks/useBlocSubmissions";
import { BlocGrid } from "@/components/BlocGrid";
import { FitxaViewer } from "@/components/FitxaViewer";
import { QuizGame } from "@/components/QuizGame";
import { SongViewer } from "@/components/SongViewer";
import { BlocEditor } from "@/components/BlocEditor";
import { DubbedVideoPlayer } from "@/components/DubbedVideoPlayer";
import { exportAllToPDF } from "@/hooks/useExportPDF";
import { t } from "@/i18n/ui";
import { tBlocName } from "@/i18n/blocNames";

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
  | { type: "songs"; bloc: Bloc }
  | { type: "editor"; bloc?: Bloc };

const ORAL_IDS_BY_LEVEL: Record<Level, Set<string>> = {
  A1: new Set(["presentat", "descriu-companya"]),
  A2: new Set(["presenta-familia", "explica-rutina"]),
  B1: new Set(["experiencia-personal", "opinio-tema"]),
};
const ORAL_VIDEO_BY_LEVEL: Partial<Record<Level, string>> = {
  A1: "/videos/presentacions.mp4",
};

const Nivell = () => {
  const [selectedLevel, setSelectedLevel] = useState<Level>("A1");
  const { blocs: defaultBlocs } = useBlocs(selectedLevel);
  const { videoSlots, setVideoUrl } = useVideoBlocs(selectedLevel);
  const { targetLang, helpLang } = useLanguages();
  const { isAuthenticated } = useAuth();
  const { submissions, submit } = useBlocSubmissions();
  const navigate = useNavigate();
  const [view, setView] = useState<View>({ type: "grid" });

  const { blocs, oralBlocs, pendingIds, rejectedIds } = useMemo(() => {
    const levelSubs = submissions.filter((s) => s.level === selectedLevel);
    const extras = levelSubs.map(submissionToBloc);
    const pending = new Set(levelSubs.filter((s) => s.status === "pending").map((s) => s.id));
    const rejected = new Set(levelSubs.filter((s) => s.status === "rejected").map((s) => s.id));
    const all = [...defaultBlocs, ...extras];
    const oralSet = ORAL_IDS_BY_LEVEL[selectedLevel];
    const oral = all.filter((b) => oralSet.has(b.id));
    const main = all.filter((b) => !oralSet.has(b.id));
    return { blocs: main, oralBlocs: oral, pendingIds: pending, rejectedIds: rejected };
  }, [defaultBlocs, submissions, selectedLevel]);

  const oralVideoSrc = ORAL_VIDEO_BY_LEVEL[selectedLevel];

  const restrictedToast: Record<string, string> = {
    ca: "Acció restringida. Inicia sessió amb el teu correu i contrasenya per afegir mòduls.",
    es: "Acción restringida. Inicia sesión con tu correo y contraseña para añadir módulos.",
    en: "Restricted action. Sign in with your email and password to add modules.",
  };
  const loginToAddLabel: Record<string, string> = {
    ca: "Inicia sessió per afegir mòduls",
    es: "Inicia sesión para añadir módulos",
    en: "Sign in to add modules",
  };
  const addLabel = loginToAddLabel[helpLang] ?? loginToAddLabel.en;

  useEffect(() => {
    if (view.type === "editor" && !isAuthenticated) {
      toast.error(restrictedToast[helpLang] ?? restrictedToast.en);
      setView({ type: "grid" });
      navigate("/auth?reason=restricted");
    }
  }, [view, isAuthenticated, navigate, helpLang]);

  const handleAddNew = () => {
    if (!isAuthenticated) {
      toast.error(restrictedToast[helpLang] ?? restrictedToast.en);
      navigate("/auth?reason=restricted");
      return;
    }
    setView({ type: "editor" });
  };

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
            <button
              onClick={() => navigate("/eso")}
              className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all text-muted-foreground hover:text-foreground hover:bg-accent flex items-center gap-1"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              ESO
              <span title="En construcció" className="text-[8px] leading-none">🚧</span>
            </button>
            <button
              onClick={() => exportAllToPDF(blocs, targetLang, helpLang)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-muted text-foreground text-xs font-bold hover:bg-muted/80 transition-all active:scale-95"
              title={t(helpLang, "pdf")}
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t(helpLang, "pdf")}</span>
            </button>
          </div>
        </div>
      </header>

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
              onAddNew={handleAddNew}
              videoSlots={videoSlots}
              onVideoChange={setVideoUrl}
              helpLang={helpLang}
              targetLang={targetLang}
              isAuthenticated={isAuthenticated}
              loginToAddLabel={addLabel}
              pendingIds={pendingIds}
              rejectedIds={rejectedIds}
            />

            {oralBlocs.length > 0 && (
              <section className="mt-10 animate-reveal-up">
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <h2 className="text-2xl font-extrabold text-foreground">
                    🎤 Presentacions orals
                  </h2>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold text-white bg-bloom-pink">
                    Diàlegs guiats
                  </span>
                </div>
                <div className={`grid grid-cols-1 gap-4 items-stretch ${oralVideoSrc ? "lg:grid-cols-3" : ""}`}>
                  <div className={`${oralVideoSrc ? "lg:col-span-1 grid grid-cols-2 lg:grid-cols-1" : "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"} gap-4`}>
                    {oralBlocs.map((bloc, i) => {
                      const isPending = pendingIds?.has(bloc.id);
                      const isRejected = rejectedIds?.has(bloc.id);
                      return (
                        <button
                          key={bloc.id}
                          onClick={() => setView({ type: "fitxes", bloc })}
                          className={`group relative flex flex-col items-center justify-center gap-3 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 active:scale-[0.97] ${bloc.color} text-white animate-reveal-up`}
                          style={{ animationDelay: `${i * 60}ms` }}
                        >
                          {isPending && (
                            <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-amber-400 text-amber-900 text-[10px] font-bold border border-amber-600 shadow-sm">⏳ Pendent</span>
                          )}
                          {isRejected && (
                            <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-red-400 text-red-900 text-[10px] font-bold border border-red-600 shadow-sm">❌ Rebutjat</span>
                          )}
                          <span className="text-5xl drop-shadow-sm transition-transform duration-300 group-hover:scale-110">{bloc.emoji}</span>
                          <span className="font-bold text-base leading-tight text-center">{tBlocName(bloc.nom, helpLang)}</span>
                          <span className="text-xs opacity-80">{bloc.fitxes.length} {t(helpLang, "fitxesCount")}</span>
                        </button>
                      );
                    })}
                  </div>
                  {oralVideoSrc && (
                    <div className="lg:col-span-2 rounded-2xl overflow-hidden border-2 border-primary/20 bg-card shadow-lg">
                      <DubbedVideoPlayer src={oralVideoSrc} />
                    </div>
                  )}
                </div>
              </section>
            )}
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
            onSave={async (bloc) => {
              try {
                await submit({ ...bloc, level: selectedLevel });
                toast.success("Aportació enviada! Quedarà pendent de revisió per l'administradora.");
                setView({ type: "grid" });
              } catch (e: any) {
                toast.error("No s'ha pogut enviar: " + (e?.message ?? "error"));
              }
            }}
          />
        )}
      </main>
    </div>
  );
};

export default Nivell;
