import { useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getAmbit } from "@/data/esoData";
import type { Bloc } from "@/data/blocksData";
import { FitxaViewer } from "@/components/FitxaViewer";
import { QuizGame } from "@/components/QuizGame";
import { useLanguages } from "@/hooks/useLanguage";
import { t } from "@/i18n/ui";

type View =
  | { type: "grid" }
  | { type: "fitxes"; bloc: Bloc }
  | { type: "quiz"; bloc: Bloc };

export default function EsoAmbit() {
  const { curs: cursId, ambit: ambitId } = useParams<{ curs: string; ambit: string }>();
  const found = cursId && ambitId ? getAmbit(cursId, ambitId) : undefined;
  const { targetLang, helpLang } = useLanguages();
  const [view, setView] = useState<View>({ type: "grid" });

  if (!found) return <Navigate to="/eso" replace />;
  const { curs, ambit } = found;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container py-4 flex items-center justify-between gap-3">
          <Link to={`/eso/${curs.id}`} className="flex items-center gap-2 text-muted-foreground hover:text-foreground font-semibold text-sm">
            <ArrowLeft className="w-4 h-4" /> {curs.nom}
          </Link>
          <h1 className="text-xl font-extrabold flex items-center gap-2 text-center">
            <span className="text-2xl">{ambit.emoji}</span> {ambit.nom}
          </h1>
          <div className="w-16" />
        </div>
      </header>
      <main className="container py-8">
        {view.type === "grid" && (
          <>
            <p className="text-muted-foreground mb-6 text-balance">{ambit.descripcio}</p>
            {ambit.blocs.length === 0 ? (
              <div className="rounded-2xl border-2 border-dashed border-muted-foreground/30 p-12 text-center text-muted-foreground">
                <p className="text-lg font-semibold">Properament</p>
                <p className="text-sm mt-2">Els mòduls d'aquest àmbit per a {curs.nom} encara s'estan preparant.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {ambit.blocs.map((bloc, index) => (
                  <button
                    key={bloc.id}
                    onClick={() => setView({ type: "fitxes", bloc })}
                    className={`group relative flex flex-col items-center justify-center gap-3 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 active:scale-[0.97] ${bloc.color} text-white animate-reveal-up`}
                    style={{ animationDelay: `${index * 60}ms` }}
                  >
                    <span className="text-5xl drop-shadow-sm transition-transform duration-300 group-hover:scale-110">{bloc.emoji}</span>
                    <span className="font-bold text-base leading-tight text-center">{bloc.nom}</span>
                    <span className="text-xs opacity-80">{bloc.fitxes.length} {t(helpLang, "fitxesCount")}</span>
                  </button>
                ))}
              </div>
            )}
          </>
        )}
        {view.type === "fitxes" && (
          <FitxaViewer
            bloc={view.bloc}
            targetLang={targetLang}
            helpLang={helpLang}
            onBack={() => setView({ type: "grid" })}
            onStartQuiz={() => setView({ type: "quiz", bloc: view.bloc })}
            onStartSongs={() => setView({ type: "fitxes", bloc: view.bloc })}
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
      </main>
    </div>
  );
}
