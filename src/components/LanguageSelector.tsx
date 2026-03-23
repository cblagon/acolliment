import { type LangCode, LANGUAGES } from "@/hooks/useLanguage";

interface LanguageSelectorProps {
  lang: LangCode;
  onChange: (lang: LangCode) => void;
}

export function LanguageSelector({ lang, onChange }: LanguageSelectorProps) {
  return (
    <div className="relative">
      <select
        value={lang}
        onChange={(e) => onChange(e.target.value as LangCode)}
        className="appearance-none bg-muted text-foreground text-sm font-semibold rounded-xl px-3 py-2 pr-8 border border-border focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
      >
        {(Object.entries(LANGUAGES) as [LangCode, typeof LANGUAGES[LangCode]][]).map(([code, { flag, nativeName }]) => (
          <option key={code} value={code}>
            {flag} {nativeName}
          </option>
        ))}
      </select>
      <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground text-xs">▼</span>
    </div>
  );
}
