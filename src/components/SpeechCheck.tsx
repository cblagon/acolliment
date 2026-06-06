import { useMemo } from "react";
import { Mic, MicOff, RotateCcw } from "lucide-react";
import { useSpeechRecognition, findMatchedKeywords, normalizeForMatch } from "@/hooks/useSpeechRecognition";
import { type Bloc } from "@/data/blocksData";
import { type LangCode } from "@/hooks/useLanguage";
import { getWord } from "@/data/translations";

interface SpeechCheckProps {
  bloc: Bloc;
  targetLang: LangCode;
  helpLang: LangCode;
}

export function SpeechCheck({ bloc, targetLang, helpLang }: SpeechCheckProps) {
  const sr = useSpeechRecognition();

  const keywords = useMemo(
    () => bloc.fitxes.map((f) => getWord(f.paraula, targetLang)).filter(Boolean),
    [bloc, targetLang],
  );

  const spoken = (sr.transcript + " " + sr.interim).trim();
  const matched = useMemo(() => findMatchedKeywords(spoken, keywords), [spoken, keywords]);

  if (!sr.supported) {
    return (
      <div className="w-full max-w-lg p-4 rounded-2xl bg-muted/50 border border-border text-sm text-muted-foreground">
        🎙️ El reconeixement de veu no està disponible en aquest navegador. Prova Chrome o Edge en ordinador o Android.
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg p-4 rounded-2xl bg-card border border-border space-y-3 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-extrabold text-foreground flex items-center gap-2">
          🎙️ Practica la pronunciació
        </h3>
        <div className="flex items-center gap-2">
          {(sr.transcript || sr.interim) && (
            <button
              onClick={sr.reset}
              className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-all active:scale-90"
              title="Esborrar"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => (sr.listening ? sr.stop() : sr.start(targetLang))}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm text-white shadow-md transition-all active:scale-95 ${
              sr.listening ? "bg-red-500 animate-pulse" : bloc.color
            }`}
          >
            {sr.listening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            {sr.listening ? "Atura" : "Parla"}
          </button>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        Prem <strong>Parla</strong> i digues paraules d'aquest bloc. Es marcaran en verd les que detecti.
      </p>

      {/* Transcript */}
      <div className="min-h-[3.5rem] p-3 rounded-xl bg-muted/50 border border-border text-sm">
        {spoken ? (
          <span className="text-foreground">
            {sr.transcript}
            {sr.interim && <span className="text-muted-foreground italic"> {sr.interim}</span>}
          </span>
        ) : (
          <span className="text-muted-foreground italic">
            {sr.listening ? "Escoltant…" : "La teva transcripció apareixerà aquí"}
          </span>
        )}
      </div>

      {sr.error && (
        <div className="text-xs text-red-600 dark:text-red-400">{sr.error}</div>
      )}

      {/* Keyword chips */}
      <div className="flex flex-wrap gap-1.5">
        {keywords.map((kw) => {
          const ok = matched.has(kw);
          return (
            <span
              key={kw}
              className={`px-2.5 py-1 rounded-full text-xs font-semibold border transition-all ${
                ok
                  ? "bg-green-500 text-white border-green-600 shadow-sm"
                  : "bg-background text-muted-foreground border-border"
              }`}
            >
              {ok ? "✓ " : ""}{kw}
            </span>
          );
        })}
      </div>

      {keywords.length > 0 && (
        <div className="text-xs text-muted-foreground font-semibold">
          {matched.size} / {keywords.length} paraules detectades
        </div>
      )}
    </div>
  );
}
