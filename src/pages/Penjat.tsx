import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, RotateCcw } from "lucide-react";

type Level = "A1" | "A2" | "B1";
type Word = { w: string; c: string };

const WORDS: Record<Level, Word[]> = {
  A1: [
    { w: "HOLA", c: "Salutació" },
    { w: "CASA", c: "Habitatge" },
    { w: "AIGUA", c: "Beguda" },
    { w: "LLIBRE", c: "Escola" },
    { w: "TAULA", c: "Mobles" },
    { w: "CADIRA", c: "Mobles" },
    { w: "MARE", c: "Família" },
    { w: "PARE", c: "Família" },
    { w: "GERMANA", c: "Família" },
    { w: "GOS", c: "Animals" },
    { w: "GAT", c: "Animals" },
    { w: "POMA", c: "Fruita" },
    { w: "PLATAN", c: "Fruita" },
    { w: "VERMELL", c: "Colors" },
    { w: "BLAU", c: "Colors" },
    { w: "VERD", c: "Colors" },
    { w: "SOL", c: "Natura" },
    { w: "LLUNA", c: "Natura" },
    { w: "DIA", c: "Temps" },
    { w: "NIT", c: "Temps" },
  ],
  A2: [
    { w: "ESMORZAR", c: "Menjar" },
    { w: "DINAR", c: "Menjar" },
    { w: "BERENAR", c: "Menjar" },
    { w: "ESCRIURE", c: "Verbs" },
    { w: "LLEGIR", c: "Verbs" },
    { w: "CORRER", c: "Verbs" },
    { w: "PARLAR", c: "Verbs" },
    { w: "TREBALLAR", c: "Verbs" },
    { w: "CUINA", c: "Casa" },
    { w: "HABITACIO", c: "Casa" },
    { w: "FINESTRA", c: "Casa" },
    { w: "AVIA", c: "Família" },
    { w: "COSI", c: "Família" },
    { w: "METGE", c: "Professions" },
    { w: "MESTRA", c: "Professions" },
    { w: "BOMBER", c: "Professions" },
    { w: "HIVERN", c: "Estacions" },
    { w: "ESTIU", c: "Estacions" },
    { w: "PRIMAVERA", c: "Estacions" },
    { w: "TARDOR", c: "Estacions" },
  ],
  B1: [
    { w: "BIBLIOTECA", c: "Llocs" },
    { w: "AJUNTAMENT", c: "Llocs" },
    { w: "HOSPITAL", c: "Llocs" },
    { w: "ORDINADOR", c: "Tecnologia" },
    { w: "TELEFON", c: "Tecnologia" },
    { w: "APRENDRE", c: "Verbs" },
    { w: "ENTENDRE", c: "Verbs" },
    { w: "EXPLICAR", c: "Verbs" },
    { w: "COMPARTIR", c: "Verbs" },
    { w: "PAISATGE", c: "Natura" },
    { w: "MUNTANYA", c: "Geografia" },
    { w: "PLATJA", c: "Geografia" },
    { w: "RIU", c: "Geografia" },
    { w: "COSTUM", c: "Cultura" },
    { w: "TRADICIO", c: "Cultura" },
    { w: "AMISTAT", c: "Sentiments" },
    { w: "ALEGRIA", c: "Sentiments" },
    { w: "TRISTESA", c: "Sentiments" },
    { w: "DEMOCRACIA", c: "Societat" },
    { w: "SOLIDARITAT", c: "Societat" },
  ],
};

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const MAX_ERRORS = 6;

const levelColors: Record<Level, string> = {
  A1: "bg-green-500",
  A2: "bg-amber-500",
  B1: "bg-blue-500",
};

function pickRandom(list: Word[], exclude?: string): Word {
  const pool = exclude ? list.filter((x) => x.w !== exclude) : list;
  return pool[Math.floor(Math.random() * pool.length)];
}

// Normalize letter for comparison (remove accents)
function norm(ch: string) {
  return ch.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
}

const Hangman = ({ errors }: { errors: number }) => {
  const parts = [
    // head
    <circle key="head" cx="140" cy="70" r="18" stroke="currentColor" strokeWidth="4" fill="none" />,
    // body
    <line key="body" x1="140" y1="88" x2="140" y2="140" stroke="currentColor" strokeWidth="4" />,
    // left arm
    <line key="larm" x1="140" y1="100" x2="115" y2="125" stroke="currentColor" strokeWidth="4" />,
    // right arm
    <line key="rarm" x1="140" y1="100" x2="165" y2="125" stroke="currentColor" strokeWidth="4" />,
    // left leg
    <line key="lleg" x1="140" y1="140" x2="120" y2="170" stroke="currentColor" strokeWidth="4" />,
    // right leg
    <line key="rleg" x1="140" y1="140" x2="160" y2="170" stroke="currentColor" strokeWidth="4" />,
  ];
  return (
    <svg viewBox="0 0 200 200" className="w-48 h-48 text-foreground">
      {/* gallows */}
      <line x1="20" y1="185" x2="120" y2="185" stroke="currentColor" strokeWidth="4" />
      <line x1="50" y1="185" x2="50" y2="20" stroke="currentColor" strokeWidth="4" />
      <line x1="50" y1="20" x2="140" y2="20" stroke="currentColor" strokeWidth="4" />
      <line x1="140" y1="20" x2="140" y2="52" stroke="currentColor" strokeWidth="4" />
      {parts.slice(0, errors)}
    </svg>
  );
};

const Penjat = () => {
  const [level, setLevel] = useState<Level>("A1");
  const [word, setWord] = useState<Word>(() => pickRandom(WORDS.A1));
  const [guessed, setGuessed] = useState<Set<string>>(new Set());
  const [errors, setErrors] = useState(0);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);

  const letters = useMemo(() => word.w.split(""), [word]);
  const won = letters.every((l) => l === " " || guessed.has(norm(l)));
  const lost = errors >= MAX_ERRORS;
  const finished = won || lost;

  useEffect(() => {
    if (won) setWins((w) => w + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [won]);
  useEffect(() => {
    if (lost) setLosses((l) => l + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lost]);

  const newWord = (lv: Level = level) => {
    setWord(pickRandom(WORDS[lv], word.w));
    setGuessed(new Set());
    setErrors(0);
  };

  const changeLevel = (lv: Level) => {
    setLevel(lv);
    setWord(pickRandom(WORDS[lv]));
    setGuessed(new Set());
    setErrors(0);
  };

  const guess = (letter: string) => {
    if (finished || guessed.has(letter)) return;
    const next = new Set(guessed);
    next.add(letter);
    setGuessed(next);
    if (!letters.some((l) => norm(l) === letter)) {
      setErrors((e) => e + 1);
    }
  };

  // Keyboard support
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = norm(e.key);
      if (k.length === 1 && k >= "A" && k <= "Z") guess(k);
      if (e.key === "Enter" && finished) newWord();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guessed, finished, word]);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container py-4 flex items-center justify-between gap-3 flex-wrap">
          <Link to="/" className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80">
            <ArrowLeft className="w-4 h-4" /> Tornar
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎯</span>
            <h1 className="text-xl font-extrabold">El joc del penjat</h1>
          </div>
          <div className="flex rounded-xl bg-muted p-0.5 gap-0.5">
            {(["A1", "A2", "B1"] as Level[]).map((lv) => (
              <button
                key={lv}
                onClick={() => changeLevel(lv)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  level === lv ? `${levelColors[lv]} text-white shadow-sm` : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {lv}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="container py-8 max-w-3xl">
        <div className="rounded-2xl border-2 border-border bg-card p-6 shadow-lg space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold text-white ${levelColors[level]}`}>
                Nivell {level}
              </span>
              <span className="ml-3 text-sm text-muted-foreground">
                Categoria: <span className="font-bold text-foreground">{word.c}</span>
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              ✅ {wins} · ❌ {losses}
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6">
            <Hangman errors={errors} />
            <div className="flex-1 w-full text-center">
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {letters.map((l, i) =>
                  l === " " ? (
                    <span key={i} className="w-4" />
                  ) : (
                    <span
                      key={i}
                      className="w-10 h-12 md:w-12 md:h-14 border-b-4 border-foreground flex items-end justify-center text-2xl md:text-3xl font-extrabold uppercase"
                    >
                      {guessed.has(norm(l)) || finished ? l : ""}
                    </span>
                  )
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                Errors: <span className="font-bold text-foreground">{errors}</span> / {MAX_ERRORS}
              </p>
              {won && (
                <p className="mt-3 text-lg font-extrabold text-green-600">🎉 Molt bé! Has encertat!</p>
              )}
              {lost && (
                <p className="mt-3 text-lg font-extrabold text-red-600">
                  💀 T'has penjat! La paraula era <span className="underline">{word.w}</span>
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-7 sm:grid-cols-9 gap-1.5">
            {ALPHABET.map((l) => {
              const used = guessed.has(l);
              const correct = used && letters.some((x) => norm(x) === l);
              return (
                <button
                  key={l}
                  onClick={() => guess(l)}
                  disabled={used || finished}
                  className={`aspect-square rounded-lg font-bold text-sm md:text-base transition-all active:scale-90 ${
                    used
                      ? correct
                        ? "bg-green-500 text-white"
                        : "bg-red-400 text-white opacity-70"
                      : "bg-muted text-foreground hover:bg-muted/70"
                  } disabled:cursor-not-allowed`}
                >
                  {l}
                </button>
              );
            })}
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => newWord()}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 active:scale-95 transition-all"
            >
              <RotateCcw className="w-4 h-4" /> Nova paraula
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4">
          Pots escriure les lletres amb el teclat. Prem <b>Enter</b> per canviar de paraula quan acabis.
        </p>
      </main>
    </div>
  );
};

export default Penjat;
