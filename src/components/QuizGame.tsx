import { useState, useCallback, useMemo } from "react";
import { type Bloc, type Fitxa } from "@/data/blocksData";
import { type LangCode } from "@/hooks/useLanguage";
import { getTraduccio } from "@/data/translations";
import { useTTS } from "@/hooks/useTTS";
import { ArrowLeft, Volume2, RotateCcw, CheckCircle2, XCircle } from "lucide-react";

interface QuizGameProps {
  bloc: Bloc;
  lang: LangCode;
  onBack: () => void;
}

interface Answer {
  fitxa: Fitxa;
  correct: boolean;
  chosen: string;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function QuizGame({ bloc, lang, onBack }: QuizGameProps) {
  const speak = useTTS();
  const [questions, setQuestions] = useState(() => shuffle(bloc.fitxes));
  const [qi, setQi] = useState(0);
  const [score, setScore] = useState({ correct: 0, wrong: 0 });
  const [selected, setSelected] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const current = questions[qi];

  const options = useMemo(() => {
    if (!current) return [];
    const wrong = shuffle(bloc.fitxes.filter((f) => f.paraula !== current.paraula)).slice(0, 3);
    return shuffle([current, ...wrong]);
  }, [current, bloc.fitxes]);

  const handleSelect = useCallback(
    (opt: Fitxa) => {
      if (selected) return;
      setSelected(opt.paraula);
      const correct = opt.paraula === current.paraula;
      if (correct) {
        speak(current.paraula);
        setScore((s) => ({ ...s, correct: s.correct + 1 }));
      } else {
        setScore((s) => ({ ...s, wrong: s.wrong + 1 }));
      }
      setAnswers((prev) => [...prev, { fitxa: current, correct, chosen: opt.paraula }]);
      setTimeout(() => {
        setSelected(null);
        if (qi + 1 >= questions.length) {
          setFinished(true);
        } else {
          setQi((q) => q + 1);
        }
      }, 1200);
    },
    [selected, current, qi, questions.length, speak]
  );

  const restart = () => {
    setQuestions(shuffle(bloc.fitxes));
    setQi(0);
    setScore({ correct: 0, wrong: 0 });
    setSelected(null);
    setFinished(false);
    setAnswers([]);
  };

  const total = score.correct + score.wrong;
  const pct = total > 0 ? Math.round((score.correct / total) * 100) : 0;

  if (finished) {
    return (
      <div className="flex flex-col items-center gap-6 animate-reveal-up max-w-2xl mx-auto">
        <h2 className="text-3xl font-extrabold">🎉 Molt bé!</h2>
        <div className="text-6xl">{pct >= 80 ? "🌟" : pct >= 50 ? "👏" : "💪"}</div>
        <div className="text-center">
          <p className="text-2xl font-bold">{pct}% correcte</p>
          <p className="text-muted-foreground mt-1">
            ✅ {score.correct} encerts · ❌ {score.wrong} errors
          </p>
        </div>

        {/* Results table */}
        <div className="w-full rounded-2xl border border-border overflow-hidden bg-card shadow-md">
          <div className="px-4 py-3 bg-muted/50 border-b border-border">
            <h3 className="font-bold text-foreground text-sm">📋 Resum de resultats</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="px-3 py-2 text-left font-semibold text-muted-foreground"></th>
                  <th className="px-3 py-2 text-left font-semibold text-muted-foreground">Paraula</th>
                  <th className="px-3 py-2 text-left font-semibold text-muted-foreground">Traducció</th>
                  <th className="px-3 py-2 text-center font-semibold text-muted-foreground">Resultat</th>
                </tr>
              </thead>
              <tbody>
                {answers.map((a, i) => (
                  <tr key={i} className={`border-b border-border/50 last:border-0 ${a.correct ? "" : "bg-destructive/5"}`}>
                    <td className="px-3 py-2 text-lg">{a.fitxa.emoji}</td>
                    <td className="px-3 py-2 font-bold text-foreground">{a.fitxa.paraula}</td>
                    <td className="px-3 py-2 text-muted-foreground">{getTraduccio(a.fitxa.paraula, lang)}</td>
                    <td className="px-3 py-2 text-center">
                      {a.correct ? (
                        <CheckCircle2 className="w-5 h-5 text-accent inline-block" />
                      ) : (
                        <div className="flex flex-col items-center gap-0.5">
                          <XCircle className="w-5 h-5 text-destructive inline-block" />
                          <span className="text-xs text-destructive">{a.chosen}</span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={restart} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold shadow-md hover:shadow-lg transition-all active:scale-95">
            <RotateCcw className="w-5 h-5" /> Repetir
          </button>
          <button onClick={onBack} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-muted text-foreground font-bold hover:bg-muted/80 transition-all active:scale-95">
            <ArrowLeft className="w-5 h-5" /> Tornar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 animate-reveal-up">
      {/* Header */}
      <div className="flex items-center justify-between w-full max-w-lg">
        <button onClick={onBack} className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors active:scale-95">
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold text-sm">Tornar</span>
        </button>
        <h2 className="text-lg font-extrabold">🎮 Joc — {bloc.nom}</h2>
        <span className="text-sm font-semibold text-muted-foreground">{qi + 1}/{questions.length}</span>
      </div>

      {/* Score bar */}
      <div className="flex items-center gap-4 text-sm font-bold">
        <span className="text-accent">✅ {score.correct}</span>
        <span className="text-destructive">❌ {score.wrong}</span>
      </div>

      {/* Question */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-7xl drop-shadow-sm">{current.emoji}</span>
        <p className="text-muted-foreground text-sm mt-1">{getTraduccio(current.paraula, lang)}</p>
        <p className="text-muted-foreground text-xs">Quina paraula és?</p>
        <button
          onClick={() => speak(current.paraula)}
          className={`p-2 rounded-full ${bloc.color} text-white shadow active:scale-90 transition-all mt-1`}
        >
          <Volume2 className="w-5 h-5" />
        </button>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-3 w-full max-w-lg">
        {options.map((opt) => {
          const isCorrect = opt.paraula === current.paraula;
          const isSelected = selected === opt.paraula;
          let cls = "bg-card border-2 border-border hover:border-primary hover:shadow-md";
          if (selected) {
            if (isCorrect) cls = "bg-accent/20 border-2 border-accent animate-bounce-soft";
            else if (isSelected) cls = "bg-destructive/10 border-2 border-destructive opacity-70";
            else cls = "bg-card border-2 border-border opacity-50";
          }
          return (
            <button
              key={opt.paraula}
              onClick={() => handleSelect(opt)}
              disabled={!!selected}
              className={`p-4 rounded-2xl font-bold text-lg transition-all active:scale-95 ${cls}`}
            >
              {opt.paraula}
            </button>
          );
        })}
      </div>
    </div>
  );
}
