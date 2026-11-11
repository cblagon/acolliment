import { useEffect, useState } from "react";
import type { LangCode } from "@/hooks/useLanguage";
import { translateEsoLines } from "@/lib/esoTranslations";

export function useEsoTranslations(lines: string[], lang: LangCode) {
  const key = JSON.stringify([lang, lines]);
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState<{ key: string; lines?: string[]; error?: boolean }>({ key: "" });
  useEffect(() => {
    let cancelled = false;
    setState({ key });
    translateEsoLines(lines, lang).then(
      (translated) => { if (!cancelled) setState({ key, lines: translated }); },
      () => { if (!cancelled) setState({ key, error: true }); },
    );
    return () => { cancelled = true; };
    // The key includes the entire source content and selected language.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, attempt]);
  if (lang === "ca" || lines.length === 0) return { lines, error: false, loading: false, retry: () => setAttempt((n) => n + 1) };
  const current = state.key === key ? state : undefined;
  return { lines: current?.lines, error: current?.error, loading: !current?.lines && !current?.error, retry: () => setAttempt((n) => n + 1) };
}