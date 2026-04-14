import { useState } from "react";

export type LangCode = "en" | "es" | "ar" | "wo" | "uk" | "fr" | "mnk" | "it" | "el" | "ur" | "ptBR" | "pt" | "ha" | "zh" | "hi" | "snk" | "ro" | "srk";

export const LANGUAGES: Record<LangCode, { name: string; flag: string; nativeName: string }> = {
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

export function useLanguage() {
  const [lang, setLang] = useState<LangCode>(() => {
    return (localStorage.getItem("apren-catala-lang") as LangCode) || "es";
  });

  const changeLang = (code: LangCode) => {
    setLang(code);
    localStorage.setItem("apren-catala-lang", code);
  };

  return { lang, setLang: changeLang };
}
