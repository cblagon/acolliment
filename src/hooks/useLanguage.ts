import { useState, useCallback } from "react";

export type LangCode = "ca" | "en" | "es" | "ar" | "wo" | "uk" | "fr" | "mnk" | "it" | "el" | "ur" | "ptBR" | "pt" | "ha" | "zh" | "hi" | "snk" | "ro" | "srk";

export const LANGUAGES: Record<LangCode, { name: string; flag: string; nativeName: string }> = {
  ca: { name: "Català", flag: "🏴󠁥󠁳󠁣󠁴󠁿", nativeName: "Català" },
  es: { name: "Castellà", flag: "🇪🇸", nativeName: "Español" },
  en: { name: "Anglès", flag: "🇬🇧", nativeName: "English" },
  fr: { name: "Francès", flag: "🇫🇷", nativeName: "Français" },
  ar: { name: "Àrab", flag: "🇲🇦", nativeName: "العربية" },
  ur: { name: "Urdú", flag: "🇵🇰", nativeName: "اردو" },
  wo: { name: "Wolof", flag: "🇸🇳", nativeName: "Wolof" },
  uk: { name: "Ucraïnès", flag: "🇺🇦", nativeName: "Українська" },
  mnk: { name: "Mandinga", flag: "🇬🇲", nativeName: "Mandinka" },
  it: { name: "Italià", flag: "🇮🇹", nativeName: "Italiano" },
  el: { name: "Grec", flag: "🇬🇷", nativeName: "Ελληνικά" },
  ptBR: { name: "Brasiler", flag: "🇧🇷", nativeName: "Português (Brasil)" },
  pt: { name: "Portuguès", flag: "🇵🇹", nativeName: "Português" },
  ha: { name: "Hassaniya", flag: "🇲🇷", nativeName: "حسانية" },
  zh: { name: "Xinès", flag: "🇨🇳", nativeName: "中文" },
  hi: { name: "Hindi", flag: "🇮🇳", nativeName: "हिन्दी" },
  snk: { name: "Soninké", flag: "🇲🇱", nativeName: "Soninkanxaane" },
  ro: { name: "Romanès", flag: "🇷🇴", nativeName: "Română" },
  srk: { name: "Sarankhulé", flag: "🇲🇱", nativeName: "Saranxulle" },
};

const TARGET_KEY = "apren-target-lang";
const HELP_KEY = "apren-help-lang";

/** Legacy single-language hook (kept for backward compatibility — returns help lang). */
export function useLanguage() {
  const [lang, setLang] = useState<LangCode>(() => {
    return (localStorage.getItem(HELP_KEY) as LangCode) || (localStorage.getItem("apren-catala-lang") as LangCode) || "es";
  });

  const changeLang = (code: LangCode) => {
    setLang(code);
    localStorage.setItem(HELP_KEY, code);
  };

  return { lang, setLang: changeLang };
}

/** Dual-language hook: targetLang = what the student is learning, helpLang = bridge language. */
export function useLanguages() {
  const [targetLang, setTargetLangState] = useState<LangCode>(() => {
    return (localStorage.getItem(TARGET_KEY) as LangCode) || "ca";
  });
  const [helpLang, setHelpLangState] = useState<LangCode>(() => {
    return (localStorage.getItem(HELP_KEY) as LangCode) || (localStorage.getItem("apren-catala-lang") as LangCode) || "es";
  });

  const setTargetLang = useCallback((code: LangCode) => {
    setTargetLangState(code);
    localStorage.setItem(TARGET_KEY, code);
  }, []);

  const setHelpLang = useCallback((code: LangCode) => {
    setHelpLangState(code);
    localStorage.setItem(HELP_KEY, code);
  }, []);

  return { targetLang, helpLang, setTargetLang, setHelpLang };
}
