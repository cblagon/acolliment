import { Link } from "react-router-dom";
import { ArrowLeft, GraduationCap, Construction } from "lucide-react";
import { cursos } from "@/data/esoData";

export default function Eso() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container py-4 flex items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground font-semibold text-sm">
            <ArrowLeft className="w-4 h-4" /> Inici
          </Link>
          <h1 className="text-xl font-extrabold flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-primary" /> Cursos d'ESO
          </h1>
          <div className="w-16" />
        </div>
      </header>
      <main className="container py-8">
        <p className="text-muted-foreground mb-6 text-balance">
          Tria un curs per veure el vocabulari organitzat per àmbits curriculars.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {cursos.map((c, i) => {
            const totalBlocs = c.ambits.reduce((s, a) => s + a.blocs.length, 0);
            return (
              <Link
                key={c.id}
                to={`/eso/${c.id}`}
                className="group flex flex-col items-center justify-center gap-3 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 active:scale-[0.97] bg-primary text-primary-foreground animate-reveal-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <span className="text-5xl drop-shadow-sm transition-transform duration-300 group-hover:scale-110">{c.emoji}</span>
                <span className="font-bold text-lg leading-tight text-center">{c.nom}</span>
                <span className="text-xs opacity-90">
                  {totalBlocs > 0 ? `${totalBlocs} mòduls` : "Properament"}
                </span>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
