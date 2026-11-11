import type { Bloc } from "@/data/blocksData";
import type { LangCode } from "@/hooks/useLanguage";
import { useEsoTranslations } from "@/hooks/useEsoTranslations";
import { FitxaViewer } from "@/components/FitxaViewer";
import { QuizGame } from "@/components/QuizGame";
import { Button } from "@/components/ui/button";
import { t } from "@/i18n/ui";
import { ArrowLeft, Loader2, RotateCcw } from "lucide-react";

export function EsoModule({ bloc, targetLang, helpLang, quiz, onBack, onQuiz, onCards }: {
  bloc: Bloc; targetLang: LangCode; helpLang: LangCode; quiz: boolean;
  onBack: () => void; onQuiz: () => void; onCards: () => void;
}) {
  const source = [bloc.nom, ...bloc.fitxes.map((f) => f.paraula), ...bloc.fitxes.map((f) => f.frase)];
  const target = useEsoTranslations(source, targetLang);
  const help = useEsoTranslations(source, helpLang);
  if (!target.lines || !help.lines) return (
    <div className="flex flex-col items-center gap-4 py-12" role="status">
      <p className="font-bold">{bloc.nom}</p>
      {(target.loading || help.loading) && <Loader2 className="h-8 w-8 animate-spin text-primary" aria-label={t(helpLang, "translation")} />}
      {(target.error || help.error) && <Button variant="outline" onClick={() => { target.retry(); help.retry(); }}><RotateCcw />{t(helpLang, "grammarRetry")}</Button>}
      <Button variant="ghost" onClick={onBack}><ArrowLeft />{t(helpLang, "back")}</Button>
    </div>
  );
  const count = bloc.fitxes.length;
  const translations = {
    targetWords: target.lines.slice(1, count + 1), targetPhrases: target.lines.slice(count + 1),
    helpWords: help.lines.slice(1, count + 1), helpPhrases: help.lines.slice(count + 1),
  };
  const localizedBloc = { ...bloc, nom: help.lines[0] };
  return quiz ? (
    <QuizGame bloc={localizedBloc} targetLang={targetLang} helpLang={helpLang} onBack={onCards}
      wordTranslations={{
        target: Object.fromEntries(bloc.fitxes.map((f, i) => [f.paraula, translations.targetWords[i]])),
        help: Object.fromEntries(bloc.fitxes.map((f, i) => [f.paraula, translations.helpWords[i]])),
      }} />
  ) : (
    <FitxaViewer bloc={localizedBloc} targetLang={targetLang} helpLang={helpLang}
      onBack={onBack} onStartQuiz={onQuiz} contentTranslations={translations} />
  );
}