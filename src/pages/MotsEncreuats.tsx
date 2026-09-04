import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, RotateCcw, Check, Eye } from "lucide-react";

type Level = "A1" | "A2" | "B1";
type Word = { w: string; c: string };

const WORDS: Record<Level, Word[]> = {
  A1: [
    { w: "HOLA", c: "Salutació quan trobes algú" },
    { w: "CASA", c: "Lloc on vius" },
    { w: "AIGUA", c: "Beguda transparent" },
    { w: "LLIBRE", c: "El llegeixes a classe" },
    { w: "TAULA", c: "Moble per escriure" },
    { w: "CADIRA", c: "Moble per seure" },
    { w: "MARE", c: "Família: dona que t'ha criat" },
    { w: "PARE", c: "Família: home que t'ha criat" },
    { w: "GOS", c: "Animal que borda" },
    { w: "GAT", c: "Animal que fa miau" },
    { w: "POMA", c: "Fruita vermella o verda" },
    { w: "VERMELL", c: "Color de la sang" },
    { w: "BLAU", c: "Color del cel" },
    { w: "SOL", c: "Estrella del dia" },
    { w: "LLUNA", c: "Es veu de nit" },
  ],
  A2: [
    { w: "ESMORZAR", c: "Primer àpat del dia" },
    { w: "DINAR", c: "Àpat del migdia" },
    { w: "LLEGIR", c: "Verb: mirar un llibre i entendre'l" },
    { w: "CORRER", c: "Verb: anar molt ràpid" },
    { w: "PARLAR", c: "Verb: dir paraules" },
    { w: "CUINA", c: "Habitació on es cuina" },
    { w: "FINESTRA", c: "Obertura per veure el carrer" },
    { w: "METGE", c: "Professió: cura malalts" },
    { w: "MESTRA", c: "Professió: ensenya a l'escola" },
    { w: "HIVERN", c: "Estació més freda" },
    { w: "ESTIU", c: "Estació més calorosa" },
    { w: "TARDOR", c: "Estació de les fulles" },
    { w: "COSI", c: "Fill del teu oncle" },
    { w: "BOMBER", c: "Professió: apaga focs" },
    { w: "ESCRIURE", c: "Verb: fer lletres amb un boli" },
  ],
  B1: [
    { w: "BIBLIOTECA", c: "Lloc ple de llibres" },
    { w: "HOSPITAL", c: "Lloc on curen la gent" },
    { w: "ORDINADOR", c: "Aparell per treballar amb internet" },
    { w: "TELEFON", c: "Serveix per trucar" },
    { w: "APRENDRE", c: "Verb: adquirir coneixements" },
    { w: "EXPLICAR", c: "Verb: fer entendre una cosa" },
    { w: "MUNTANYA", c: "Elevació del terreny" },
    { w: "PLATJA", c: "Sorra al costat del mar" },
    { w: "TRADICIO", c: "Costum que passa de generació" },
    { w: "AMISTAT", c: "Relació entre amics" },
    { w: "ALEGRIA", c: "Sentiment de felicitat" },
    { w: "SOLIDARITAT", c: "Ajudar els altres" },
    { w: "PAISATGE", c: "Vista de la natura" },
    { w: "ENTENDRE", c: "Verb: comprendre" },
    { w: "DEMOCRACIA", c: "Sistema polític amb eleccions" },
  ],
};

const levelColors: Record<Level, string> = {
  A1: "bg-green-500",
  A2: "bg-amber-500",
  B1: "bg-blue-500",
};

type Placed = { word: string; clue: string; row: number; col: number; dir: "A" | "D"; num: number };

const SIZE = 15;

function buildCrossword(words: Word[]): Placed[] {
  const shuffled = [...words].sort(() => Math.random() - 0.5).sort((a, b) => b.w.length - a.w.length);
  const grid: (string | null)[][] = Array.from({ length: SIZE }, () => Array(SIZE).fill(null));
  const placed: Omit<Placed, "num">[] = [];

  const fits = (w: string, r: number, c: number, dir: "A" | "D") => {
    if (r < 0 || c < 0) return -1;
    if (dir === "A" ? c + w.length > SIZE : r + w.length > SIZE) return -1;
    let crossings = 0;
    for (let i = 0; i < w.length; i++) {
      const rr = dir === "A" ? r : r + i;
      const cc = dir === "A" ? c + i : c;
      const cell = grid[rr][cc];
      if (cell && cell !== w[i]) return -1;
      if (cell === w[i]) crossings++;
      else {
        // neighbours perpendicular must be empty
        if (dir === "A") {
          if (rr > 0 && grid[rr - 1][cc]) return -1;
          if (rr < SIZE - 1 && grid[rr + 1][cc]) return -1;
        } else {
          if (cc > 0 && grid[rr][cc - 1]) return -1;
          if (cc < SIZE - 1 && grid[rr][cc + 1]) return -1;
        }
      }
    }
    // ends must be free
    if (dir === "A") {
      if (c > 0 && grid[r][c - 1]) return -1;
      if (c + w.length < SIZE && grid[r][c + w.length]) return -1;
    } else {
      if (r > 0 && grid[r - 1][c]) return -1;
      if (r + w.length < SIZE && grid[r + w.length][c]) return -1;
    }
    return crossings;
  };

  const place = (w: string, clue: string, r: number, c: number, dir: "A" | "D") => {
    for (let i = 0; i < w.length; i++) {
      const rr = dir === "A" ? r : r + i;
      const cc = dir === "A" ? c + i : c;
      grid[rr][cc] = w[i];
    }
    placed.push({ word: w, clue, row: r, col: c, dir });
  };

  shuffled.forEach((entry, idx) => {
    const w = entry.w;
    if (idx === 0) {
      place(w, entry.c, Math.floor(SIZE / 2), Math.max(0, Math.floor((SIZE - w.length) / 2)), "A");
      return;
    }
    let best: { r: number; c: number; dir: "A" | "D"; score: number } | null = null;
    for (const p of placed) {
      for (let i = 0; i < p.word.length; i++) {
        for (let j = 0; j < w.length; j++) {
          if (p.word[i] !== w[j]) continue;
          const dir: "A" | "D" = p.dir === "A" ? "D" : "A";
          const r = p.dir === "A" ? p.row - j : p.row + i;
          const c = p.dir === "A" ? p.col + i : p.col - j;
          const score = fits(w, r, c, dir);
          if (score > 0 && (!best || score > best.score)) best = { r, c, dir, score };
        }
      }
    }
    if (best) place(w, entry.c, best.r, best.c, best.dir);
  });

  // numbering
  const sorted = [...placed].sort((a, b) => a.row - b.row || a.col - b.col);
  const numbers = new Map<string, number>();
  let n = 0;
  const result: Placed[] = [];
  for (const p of sorted) {
    const key = `${p.row}-${p.col}`;
    if (!numbers.has(key)) numbers.set(key, ++n);
    result.push({ ...p, num: numbers.get(key)! });
  }
  return result;
}

const MotsEncreuats = () => {
  const [level, setLevel] = useState<Level>("A1");
  const [seed, setSeed] = useState(0);
  const [entries, setEntries] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const inputs = useRef<Record<string, HTMLInputElement | null>>({});

  const placed = useMemo(() => buildCrossword(WORDS[level]), [level, seed]);

  const solution = useMemo(() => {
    const map: Record<string, string> = {};
    placed.forEach((p) => {
      for (let i = 0; i < p.word.length; i++) {
        const rr = p.dir === "A" ? p.row : p.row + i;
        const cc = p.dir === "A" ? p.col + i : p.col;
        map[`${rr}-${cc}`] = p.word[i];
      }
    });
    return map;
  }, [placed]);

  const starts = useMemo(() => {
    const map: Record<string, number> = {};
    placed.forEach((p) => {
      map[`${p.row}-${p.col}`] = p.num;
    });
    return map;
  }, [placed]);

  const bounds = useMemo(() => {
    const keys = Object.keys(solution).map((k) => k.split("-").map(Number));
    const rows = keys.map((k) => k[0]);
    const cols = keys.map((k) => k[1]);
    return {
      r0: Math.min(...rows),
      r1: Math.max(...rows),
      c0: Math.min(...cols),
      c1: Math.max(...cols),
    };
  }, [solution]);

  useEffect(() => {
    setEntries({});
    setChecked(false);
  }, [level, seed]);

  const solved = useMemo(
    () => Object.keys(solution).every((k) => (entries[k] ?? "") === solution[k]),
    [entries, solution]
  );

  const handleChange = useCallback((key: string, value: string) => {
    const ch = value.slice(-1).toUpperCase().replace(/[^A-ZÀ-ÜÇ·]/g, "");
    setEntries((prev) => ({ ...prev, [key]: ch }));
  }, []);

  const across = placed.filter((p) => p.dir === "A").sort((a, b) => a.num - b.num);
  const down = placed.filter((p) => p.dir === "D").sort((a, b) => a.num - b.num);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container py-4 flex items-center justify-between gap-3 flex-wrap">
          <Link to="/jocs" className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80">
            <ArrowLeft className="w-4 h-4" />
            Jocs
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🧩</span>
            <h1 className="text-xl font-extrabold">Mots encreuats</h1>
          </div>
          <div className="flex rounded-xl bg-muted p-0.5 gap-0.5">
            {(["A1", "A2", "B1"] as Level[]).map((lv) => (
              <button
                key={lv}
                onClick={() => setLevel(lv)}
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

      <main className="container py-8 grid gap-8 lg:grid-cols-[auto_1fr] items-start">
        <div className="overflow-x-auto">
          <div
            className="inline-grid gap-[2px] bg-border p-[2px] rounded-lg"
            style={{ gridTemplateColumns: `repeat(${bounds.c1 - bounds.c0 + 1}, minmax(0, 2rem))` }}
          >
            {Array.from({ length: bounds.r1 - bounds.r0 + 1 }).flatMap((_, ri) =>
              Array.from({ length: bounds.c1 - bounds.c0 + 1 }).map((__, ci) => {
                const r = ri + bounds.r0;
                const c = ci + bounds.c0;
                const key = `${r}-${c}`;
                const sol = solution[key];
                if (!sol) return <div key={key} className="w-8 h-8 bg-muted/40 rounded-sm" />;
                const val = entries[key] ?? "";
                const ok = checked && val === sol;
                const bad = checked && val !== sol;
                return (
                  <div key={key} className="relative w-8 h-8">
                    {starts[key] && (
                      <span className="absolute top-0 left-0.5 text-[9px] font-bold text-muted-foreground leading-none z-10">
                        {starts[key]}
                      </span>
                    )}
                    <input
                      ref={(el) => (inputs.current[key] = el)}
                      value={val}
                      onChange={(e) => handleChange(key, e.target.value)}
                      maxLength={1}
                      aria-label={`Cel·la ${r}-${c}`}
                      className={`w-8 h-8 text-center text-sm font-extrabold uppercase rounded-sm border-2 outline-none focus:border-primary bg-card text-foreground ${
                        ok ? "border-green-500 bg-green-500/10" : bad ? "border-red-500 bg-red-500/10" : "border-border"
                      }`}
                    />
                  </div>
                );
              })
            )}
          </div>

          <div className="flex gap-2 mt-4 flex-wrap">
            <button
              onClick={() => setChecked(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-sm active:scale-95"
            >
              <Check className="w-4 h-4" /> Comprovar
            </button>
            <button
              onClick={() => {
                setEntries(solution);
                setChecked(true);
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted text-foreground font-bold text-sm active:scale-95"
            >
              <Eye className="w-4 h-4" /> Solució
            </button>
            <button
              onClick={() => setSeed((s) => s + 1)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted text-foreground font-bold text-sm active:scale-95"
            >
              <RotateCcw className="w-4 h-4" /> Nou joc
            </button>
          </div>
          {solved && (
            <p className="mt-3 font-bold text-green-600">🎉 Molt bé! Has completat els mots encreuats.</p>
          )}
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <h2 className="font-extrabold mb-2">➡️ Horitzontals</h2>
            <ul className="space-y-1 text-sm">
              {across.map((p) => (
                <li key={`A${p.num}`}>
                  <span className="font-bold">{p.num}.</span> {p.clue}{" "}
                  <span className="text-muted-foreground">({p.word.length})</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-extrabold mb-2">⬇️ Verticals</h2>
            <ul className="space-y-1 text-sm">
              {down.map((p) => (
                <li key={`D${p.num}`}>
                  <span className="font-bold">{p.num}.</span> {p.clue}{" "}
                  <span className="text-muted-foreground">({p.word.length})</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MotsEncreuats;
