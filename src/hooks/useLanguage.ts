import { useState } from "react";

export type LangCode = "en" | "es" | "ar" | "wo" | "uk" | "fr";

export const LANGUAGES: Record<LangCode, { name: string; flag: string; nativeName: string }> = {
  es: { name: "Castellà", flag: "🇪🇸", nativeName: "Español" },
  en: { name: "Anglès", flag: "🇬🇧", nativeName: "English" },
  fr: { name: "Francès", flag: "🇫🇷", nativeName: "Français" },
  ar: { name: "Àrab", flag: "🇲🇦", nativeName: "العربية" },
  wo: { name: "Wolof", flag: "🇸🇳", nativeName: "Wolof" },
  uk: { name: "Ucraïnès", flag: "🇺🇦", nativeName: "Українська" },
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
