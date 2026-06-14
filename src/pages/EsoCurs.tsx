import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getCurs } from "@/data/esoData";

export default function EsoCurs() {
  const { curs: cursId } = useParams<{ curs: string }>();
  const curs = cursId ? getCurs(cursId) : undefined;

  if (!curs) return <Navigate to="/eso" replace />;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container py-4 flex items-center justify-between gap-3">
          <Link to="/eso" className="flex items-center gap-2 text-muted-foreground hover:text-foreground font-semibold text-sm">
            <ArrowLeft className="w-4 h-4" /> Cursos
          </Link>
          <h1 className="text-xl font-extrabold flex items-center gap-2">
            <span className="text-2xl">{curs.emoji}</span> {curs.nom}
          </h1>
          <div className="w-16" />
        </div>
      </header>
      <main className="container py-8">
        <p className="text-muted-foreground mb-6 text-balance">{curs.descripcio}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {curs.ambits.map((a, i) => (
            <Link
              key={a.id}
              to={`/eso/${curs.id}/${a.id}`}
              className={`group flex flex-col items-start gap-2 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 active:scale-[0.97] ${a.color} text-white animate-reveal-up`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex items-center gap-3">
                <span className="text-4xl drop-shadow-sm transition-transform duration-300 group-hover:scale-110">{a.emoji}</span>
                <span className="font-bold text-lg leading-tight">{a.nom}</span>
              </div>
              <p className="text-sm opacity-90 leading-snug">{a.descripcio}</p>
              <span className="mt-auto pt-2 text-xs font-semibold opacity-90">
                {a.blocs.length > 0 ? `${a.blocs.length} mòduls` : "Properament"}
              </span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
