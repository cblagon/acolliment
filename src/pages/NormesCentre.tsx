import { Link } from "react-router-dom";
import { ArrowLeft, Check, X, Volume2, ScrollText } from "lucide-react";
import { useTTS } from "@/hooks/useTTS";

type Norma = { ok: boolean; text: string };

const aulaNormes: Norma[] = [
  { ok: true, text: "Arribar puntual a classe." },
  { ok: false, text: "Portar gorra a classe." },
  { ok: false, text: "Mastegar xiclet a classe." },
  { ok: false, text: "Fer disbauxa." },
  { ok: false, text: "Utilitzar el mòbil sense permís." },
  { ok: true, text: "Aixecar la mà per parlar." },
  { ok: true, text: "Portar el material escolar necessari." },
];

const comunsNormes: Norma[] = [
  { ok: true, text: "Demanar permís per anar al lavabo." },
  { ok: true, text: "Caminar pels passadissos, no córrer." },
  { ok: true, text: "Fer fila per entrar a classe." },
  { ok: true, text: "Parlar fluix al passadís." },
  { ok: false, text: "Cridar o molestar els companys." },
];

const frasesUtils: string[] = [
  "Puc anar al lavabo?",
  "Disculpi, puc sortir un moment?",
  "Puc beure aigua?",
  "He arribat tard, puc entrar?",
];

function NormaCard({ norma }: { norma: Norma }) {
  const speak = useTTS();
  const isOk = norma.ok;
  return (
    <div
      className={`flex items-center gap-3 rounded-2xl p-4 shadow-md border-2 transition-transform hover:-translate-y-0.5 ${
        isOk
          ? "bg-bloom-green/15 border-bloom-green/50"
          : "bg-destructive/10 border-destructive/40"
      }`}
    >
      <div
        className={`flex items-center justify-center w-12 h-12 rounded-full flex-shrink-0 text-white shadow ${
          isOk ? "bg-bloom-green" : "bg-destructive"
        }`}
        aria-hidden
      >
        {isOk ? <Check className="w-7 h-7" strokeWidth={3} /> : <X className="w-7 h-7" strokeWidth={3} />}
      </div>
      <p className="flex-1 font-semibold text-foreground leading-snug">{norma.text}</p>
      <button
        onClick={() => speak(norma.text, "ca")}
        title="Escolta la frase"
        aria-label={`Escolta: ${norma.text}`}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground hover:scale-110 active:scale-95 transition-transform shadow"
      >
        <Volume2 className="w-5 h-5" />
      </button>
    </div>
  );
}

function FraseCard({ text }: { text: string }) {
  const speak = useTTS();
  return (
    <div className="flex items-center gap-3 rounded-2xl p-4 shadow-md bg-accent/20 border-2 border-accent/40">
      <span className="text-2xl" aria-hidden>💬</span>
      <p className="flex-1 font-semibold text-foreground leading-snug">«{text}»</p>
      <button
        onClick={() => speak(text, "ca")}
        title="Escolta la frase"
        aria-label={`Escolta: ${text}`}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground hover:scale-110 active:scale-95 transition-transform shadow"
      >
        <Volume2 className="w-5 h-5" />
      </button>
    </div>
  );
}

export default function NormesCentre() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container py-4 flex items-center justify-between gap-3">
          <Link
            to="/eso/1eso/tutoria"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground font-semibold text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Tutoria
          </Link>
          <h1 className="text-xl font-extrabold flex items-center gap-2 text-center">
            <ScrollText className="w-6 h-6 text-primary" /> Normes de funcionament del centre
          </h1>
          <div className="w-16" />
        </div>
      </header>

      <main className="container py-8 space-y-10 max-w-3xl">
        <p className="text-muted-foreground text-balance">
          Llegeix cada norma i prem el botó d'àudio per escoltar-la en català. Les targetes
          verdes amb ✅ indiquen el que <strong>es pot fer</strong> i les vermelles amb ❌ el
          que <strong>no es pot fer</strong>.
        </p>

        <section>
          <h2 className="text-2xl font-extrabold mb-4 flex items-center gap-2">
            <span className="text-3xl">🪑</span> A l'aula
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {aulaNormes.map((n, i) => (
              <NormaCard key={i} norma={n} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold mb-4 flex items-center gap-2">
            <span className="text-3xl">🚪</span> Als espais comuns
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {comunsNormes.map((n, i) => (
              <NormaCard key={i} norma={n} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold mb-4 flex items-center gap-2">
            <span className="text-3xl">🗣️</span> Frases útils
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {frasesUtils.map((f, i) => (
              <FraseCard key={i} text={f} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
