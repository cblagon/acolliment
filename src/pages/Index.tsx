import { useEffect, useMemo, useState } from "react";
import { type Bloc, type Level } from "@/data/blocksData";
import { useBlocs } from "@/hooks/useBlocs";
import { useLanguages } from "@/hooks/useLanguage";
import { useVideoBlocs } from "@/hooks/useVideoBlocs";
import { useAuth } from "@/hooks/useAuth";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { useBlocSubmissions, submissionToBloc } from "@/hooks/useBlocSubmissions";
import { BlocGrid } from "@/components/BlocGrid";
import { FitxaViewer } from "@/components/FitxaViewer";
import { QuizGame } from "@/components/QuizGame";
import { SongViewer } from "@/components/SongViewer";
import { BlocEditor } from "@/components/BlocEditor";
import { LanguageSelector } from "@/components/LanguageSelector";
import { VisitorCounter } from "@/components/VisitorCounter";
import { exportAllToPDF } from "@/hooks/useExportPDF";
import { t, langName } from "@/i18n/ui";
import { useLegalLabels } from "@/pages/Legal";
import { Download, HelpCircle, LogIn, LogOut, ShieldCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

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
  const { blocs: defaultBlocs } = useBlocs(selectedLevel);
  const { videoSlots, setVideoUrl } = useVideoBlocs(selectedLevel);
  const { targetLang, helpLang, setTargetLang, setHelpLang } = useLanguages();
  const { isAuthenticated, user, signOut } = useAuth();
  const { isAdmin } = useIsAdmin();
  const { submissions, submit } = useBlocSubmissions();
  const navigate = useNavigate();
  const [view, setView] = useState<View>({ type: "grid" });

  // IDs that belong to the "Presentacions orals" section (rendered separately), per level
  const ORAL_IDS_BY_LEVEL: Record<Level, Set<string>> = {
    A1: new Set(["presentat", "descriu-companya"]),
    A2: new Set(["presenta-familia", "explica-rutina"]),
    B1: new Set(["experiencia-personal", "opinio-tema"]),
  };
  const ORAL_VIDEO_BY_LEVEL: Partial<Record<Level, string>> = {
    A1: "/videos/presentacions.mp4",
  };

  // Merge user submissions visible to this session into the grid
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


  const loginToAddLabel: Record<string, string> = {
    ca: "Inicia sessió per afegir mòduls",
    es: "Inicia sesión para añadir módulos",
    en: "Sign in to add modules",
  };
  const restrictedToast: Record<string, string> = {
    ca: "Acció restringida. Inicia sessió amb el teu correu i contrasenya per afegir mòduls.",
    es: "Acción restringida. Inicia sesión con tu correo y contraseña para añadir módulos.",
    en: "Restricted action. Sign in with your email and password to add modules.",
  };
  const addLabel = loginToAddLabel[helpLang] ?? loginToAddLabel.en;

  // Guard: if user navigates to editor view without auth, redirect to /auth
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
              title={t(helpLang, "helpIn")}
            />
            <Link
              to="/ajuda"
              title="Com fer-ne ús"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-muted text-foreground text-sm font-semibold hover:bg-muted/80 transition-all active:scale-95"
            >
              <HelpCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Ajuda</span>
            </Link>
            {isAdmin && (
              <Link
                to="/admin"
                title="Panell d'administració"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500 text-white text-sm font-semibold hover:bg-amber-600 transition-all active:scale-95"
              >
                <ShieldCheck className="w-4 h-4" />
                <span className="hidden sm:inline">Admin</span>
              </Link>
            )}
            <VisitorCounter />
            {isAuthenticated ? (
              <button
                onClick={async () => { await signOut(); toast.success("Sessió tancada"); }}
                title={user?.email ?? ""}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-muted text-foreground text-sm font-semibold hover:bg-muted/80 transition-all active:scale-95"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sortir</span>
              </button>
            ) : (
              <Link
                to="/auth"
                title="Inicia sessió"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all active:scale-95"
              >
                <LogIn className="w-4 h-4" />
                <span className="hidden sm:inline">Entrar</span>
              </Link>
            )}
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
                          <span className="font-bold text-base leading-tight text-center">{bloc.nom}</span>
                          <span className="text-xs opacity-80">{bloc.fitxes.length} {t(helpLang, "fitxesCount")}</span>
                        </button>
                      );
                    })}
                  </div>
                  {oralVideoSrc && (
                    <div className="lg:col-span-2 rounded-2xl overflow-hidden border-2 border-primary/20 bg-card shadow-lg flex items-center justify-center">
                      <video
                        src={oralVideoSrc}
                        controls
                        playsInline
                        className="max-h-[70vh] w-auto h-auto max-w-full"
                      />
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

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-muted-foreground border-t border-border space-y-2">
        <div>
          <a href="https://acolliment.vercel.app/" className="hover:underline font-semibold">Acolliment</a>
          {" "}© 2026 by{" "}
          <a href="https://dossier.xtec.cat/cblaya/" className="hover:underline">Cristina Blaya Góngora</a>
          {" "}is licensed under{" "}
          <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/" className="hover:underline">Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International</a>
          <span className="inline-flex items-center ml-1 align-middle">
            <img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" alt="CC" className="w-4 h-4 mx-0.5" />
            <img src="https://mirrors.creativecommons.org/presskit/icons/by.svg" alt="BY" className="w-4 h-4 mx-0.5" />
            <img src="https://mirrors.creativecommons.org/presskit/icons/nc.svg" alt="NC" className="w-4 h-4 mx-0.5" />
            <img src="https://mirrors.creativecommons.org/presskit/icons/nd.svg" alt="ND" className="w-4 h-4 mx-0.5" />
          </span>
        </div>
        <LegalLinks />
      </footer>
    </div>
  );
};

function LegalLinks() {
  const labels = useLegalLabels();
  return (
    <nav className="flex flex-wrap justify-center gap-x-4 gap-y-1">
      <Link to="/privacitat" className="hover:underline">{labels.privacy}</Link>
      <span aria-hidden>·</span>
      <Link to="/galetes" className="hover:underline">{labels.cookies}</Link>
      <span aria-hidden>·</span>
      <Link to="/avis-legal" className="hover:underline">{labels.legal}</Link>
    </nav>
  );
}

export default Index;
