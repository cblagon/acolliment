import { useEffect, useState } from "react";
import { type Level } from "@/data/blocksData";
import { type LangCode, LANGUAGES } from "@/hooks/useLanguage";
import { invokeQueued } from "@/lib/aiQueue";
import { useTTS } from "@/hooks/useTTS";
import { t } from "@/i18n/ui";
import { GRAMMAR_CA } from "@/data/grammarCa";
import { GRAMMAR_EN } from "@/data/grammarEn";
import { GRAMMAR_FR } from "@/data/grammarFr";
import { GRAMMAR_GL } from "@/data/grammarGl";

const STATIC: Partial<Record<LangCode, typeof GRAMMAR_CA>> = { ca: GRAMMAR_CA, va: GRAMMAR_CA, en: GRAMMAR_EN, fr: GRAMMAR_FR, gl: GRAMMAR_GL };
import { ArrowLeft, Check, Loader2, RotateCcw, Volume2, X } from "lucide-react";

export interface GrammarTopic {
  title: string;
  emoji: string;
  rule: string;
  examples: { text: string; translation: string }[];
  questions: { question: string; options: string[]; answer: number; explanation: string }[];
}

const CACHE = "grammar:v1:";
const COLORS = ["bg-bloom-teal", "bg-bloom-pink", "bg-bloom-yellow", "bg-primary"];

interface Props {
  level: Level;
  targetLang: LangCode;
  helpLang: LangCode;
}

export function GrammarSection({ level, targetLang, helpLang }: Props) {
  const [topics, setTopics] = useState<GrammarTopic[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState<number | null>(null);
  const key = `${CACHE}${targetLang}:${level}:${helpLang}`;

  useEffect(() => {
    setOpen(null);
    setError(null);
    if (STATIC[targetLang]) {
      setTopics(STATIC[targetLang]![level]);
      return;
    }
    try {
      const c = localStorage.getItem(key);
      setTopics(c ? (JSON.parse(c) as GrammarTopic[]) : null);
    } catch {
      setTopics(null);
    }
  }, [key]);

  const load = () => {
    setLoading(true);
    setError(null);
    invokeQueued<{ topics?: GrammarTopic[] }>("ai-text-tools", { action: "grammar", targetLang, helpLang, level }, 1)
      .then((r) => {
        const list = (r.topics ?? []).filter((x) => x.questions?.length && x.examples?.length);
        if (!list.length) throw new Error("Error");
        setTopics(list);
        try { localStorage.setItem(key, JSON.stringify(list)); } catch { /* ignore */ }
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  };

  if (open !== null && topics?.[open]) {
    return <GrammarTopicView topic={topics[open]} targetLang={targetLang} helpLang={helpLang} color={COLORS[open % 4]} onBack={() => setOpen(null)} />;
  }

  return (
    <section className="mt-10 animate-reveal-up">
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <h2 className="text-2xl font-extrabold text-foreground">📐 {t(helpLang, "grammar")}</h2>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-muted text-foreground">
          {LANGUAGES[targetLang].flag} {LANGUAGES[targetLang].nativeName} · {level}
        </span>
      </div>
      {!topics && (
        <div className="rounded-2xl border-2 border-dashed border-border p-6 text-center space-y-3">
          <p className="text-muted-foreground text-sm">{t(helpLang, "grammarIntro")}</p>
          <button
            onClick={load}
            disabled={loading}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold shadow-md active:scale-95 disabled:opacity-60"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? t(helpLang, "grammarLoading") : t(helpLang, "grammarLoad")}
          </button>
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
      )}
      {topics && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {topics.map((tp, i) => (
            <button
              key={i}
              onClick={() => setOpen(i)}
              className={`flex flex-col items-center justify-center gap-2 rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all text-primary-foreground ${COLORS[i % 4]}`}
            >
              <span className="text-5xl">{tp.emoji}</span>
              <span className="font-bold text-center leading-tight">{tp.title}</span>
              <span className="text-xs opacity-80">{tp.questions.length} {t(helpLang, "grammarExercises")}</span>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

function GrammarTopicView({ topic, targetLang, helpLang, color, onBack }: { topic: GrammarTopic; targetLang: LangCode; helpLang: LangCode; color: string; onBack: () => void }) {
  const speak = useTTS();
  const ttsOk = speak.isAvailable(targetLang);
  const [q, setQ] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const done = q >= topic.questions.length;
  const cur = topic.questions[q];

  const choose = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === cur.answer) setScore((s) => s + 1);
  };
  const next = () => { setPicked(null); setQ((x) => x + 1); };
  const restart = () => { setPicked(null); setQ(0); setScore(0); };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-reveal-up">
      <button onClick={onBack} className="flex items-center gap-1 text-muted-foreground hover:text-foreground font-semibold text-sm">
        <ArrowLeft className="w-4 h-4" /> {t(helpLang, "back")}
      </button>
      <div className={`rounded-3xl p-6 shadow-lg text-primary-foreground ${color}`}>
        <div className="text-5xl mb-2">{topic.emoji}</div>
        <h2 className="text-2xl font-extrabold mb-2">{topic.title}</h2>
        <p className="leading-relaxed">{topic.rule}</p>
      </div>

      <div className="space-y-2">
        <h3 className="font-extrabold text-lg">💡 {t(helpLang, "grammarExamples")}</h3>
        {topic.examples.map((ex, i) => (
          <div key={i} className="flex items-center gap-3 rounded-2xl bg-card border border-border p-4">
            <div className="flex-1">
              <p className="font-bold">{ex.text}</p>
              <p className="text-sm text-muted-foreground">{ex.translation}</p>
            </div>
            {ttsOk && (
              <button onClick={() => speak(ex.text, targetLang)} className="p-2 rounded-full bg-primary text-primary-foreground active:scale-90" aria-label="Escolta">
                <Volume2 className="w-5 h-5" />
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="rounded-3xl bg-card border border-border p-6 space-y-4">
        <h3 className="font-extrabold text-lg">🎯 {t(helpLang, "grammarExercises")}</h3>
        {done ? (
          <div className="text-center space-y-3">
            <p className="text-3xl font-extrabold">{score} / {topic.questions.length}</p>
            <button onClick={restart} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold">
              <RotateCcw className="w-4 h-4" /> {t(helpLang, "grammarRetry")}
            </button>
          </div>
        ) : (
          <>
            <p className="text-xs text-muted-foreground">{q + 1} / {topic.questions.length}</p>
            <p className="text-xl font-bold">{cur.question}</p>
            <div className="grid gap-2">
              {cur.options.map((o, i) => {
                const state = picked === null ? "" : i === cur.answer ? "border-bloom-green bg-bloom-green/15" : i === picked ? "border-destructive bg-destructive/10" : "opacity-60";
                return (
                  <button key={i} onClick={() => choose(i)} className={`flex items-center justify-between text-left px-4 py-3 rounded-xl border-2 border-border font-semibold transition-all ${state}`}>
                    {o}
                    {picked !== null && i === cur.answer && <Check className="w-5 h-5" />}
                    {picked === i && i !== cur.answer && <X className="w-5 h-5" />}
                  </button>
                );
              })}
            </div>
            {picked !== null && (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">{cur.explanation}</p>
                <button onClick={next} className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold">
                  {t(helpLang, "grammarNext")}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
