import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Languages, Loader2 } from "lucide-react";
import { useLanguages, LANGUAGES, type LangCode } from "@/hooks/useLanguage";
import { LanguageSelector } from "@/components/LanguageSelector";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Tense = "present" | "passat" | "futur";
type Family = "1a" | "2a" | "3a" | "irregular";

const TENSES: { id: Tense; label: string; emoji: string; desc: string }[] = [
  { id: "present", label: "Present", emoji: "⏰", desc: "Ara mateix, cada dia" },
  { id: "passat", label: "Passat", emoji: "⏮️", desc: "Ahir, abans, fa temps" },
  { id: "futur", label: "Futur", emoji: "⏭️", desc: "Demà, després, aviat" },
];

const FAMILIES: Record<Family, { label: string; ending: string; color: string; ring: string; bg: string; example: string }> = {
  "1a": { label: "1a conjugació", ending: "-AR", color: "bg-rose-500", ring: "ring-rose-500", bg: "bg-rose-50 dark:bg-rose-950/30", example: "cantar" },
  "2a": { label: "2a conjugació", ending: "-ER / -RE", color: "bg-emerald-500", ring: "ring-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/30", example: "témer" },
  "3a": { label: "3a conjugació", ending: "-IR", color: "bg-sky-500", ring: "ring-sky-500", bg: "bg-sky-50 dark:bg-sky-950/30", example: "dormir" },
  irregular: { label: "Irregulars", ending: "especials", color: "bg-amber-500", ring: "ring-amber-500", bg: "bg-amber-50 dark:bg-amber-950/30", example: "ser, anar, fer" },
};

type Translations = Partial<Record<LangCode, string>>;

type VerbData = {
  infinitive: string;
  family: Family;
  emoji: string;
  translations: Translations;
  present: string[];
  passat: string[];
  futur: string[];
};

const VERBS: VerbData[] = [
  {
    infinitive: "CANTAR",
    family: "1a",
    emoji: "🎤",
    translations: {
      ca: "cantar", es: "cantar", en: "to sing", fr: "chanter",
      ar: "يغني", ur: "گانا گانا", wo: "woy", uk: "співати",
      mnk: "donkili la", it: "cantare", el: "τραγουδώ",
      ptBR: "cantar", pt: "cantar", ha: "يغني", zh: "唱歌",
      hi: "गाना", snk: "dòŋi", ro: "a cânta", srk: "donkili",
    },
    present: ["canto", "cantes", "canta", "cantem", "canteu", "canten"],
    passat: ["vaig cantar", "vas cantar", "va cantar", "vam cantar", "vau cantar", "van cantar"],
    futur: ["cantaré", "cantaràs", "cantarà", "cantarem", "cantareu", "cantaran"],
  },
  {
    infinitive: "PARLAR",
    family: "1a",
    emoji: "💬",
    translations: {
      ca: "parlar", es: "hablar", en: "to speak", fr: "parler",
      ar: "يتكلم", ur: "بولنا", wo: "wax", uk: "говорити",
      mnk: "diyaamu", it: "parlare", el: "μιλάω",
      ptBR: "falar", pt: "falar", ha: "يهدر", zh: "说话",
      hi: "बोलना", snk: "sefene", ro: "a vorbi", srk: "sefe",
    },
    present: ["parlo", "parles", "parla", "parlem", "parleu", "parlen"],
    passat: ["vaig parlar", "vas parlar", "va parlar", "vam parlar", "vau parlar", "van parlar"],
    futur: ["parlaré", "parlaràs", "parlarà", "parlarem", "parlareu", "parlaran"],
  },
  {
    infinitive: "TÉMER",
    family: "2a",
    emoji: "😨",
    translations: {
      ca: "témer", es: "temer", en: "to fear", fr: "craindre",
      ar: "يخاف", ur: "ڈرنا", wo: "ragal", uk: "боятися",
      mnk: "silan", it: "temere", el: "φοβάμαι",
      ptBR: "temer", pt: "temer", ha: "يخاف", zh: "害怕",
      hi: "डरना", snk: "gaajine", ro: "a se teme", srk: "gaajine",
    },
    present: ["temo", "tems", "tem", "temem", "temeu", "temen"],
    passat: ["vaig témer", "vas témer", "va témer", "vam témer", "vau témer", "van témer"],
    futur: ["temeré", "temeràs", "temerà", "temerem", "temereu", "temeran"],
  },
  {
    infinitive: "BEURE",
    family: "2a",
    emoji: "🥤",
    translations: {
      ca: "beure", es: "beber", en: "to drink", fr: "boire",
      ar: "يشرب", ur: "پینا", wo: "naan", uk: "пити",
      mnk: "mii", it: "bere", el: "πίνω",
      ptBR: "beber", pt: "beber", ha: "يشرب", zh: "喝",
      hi: "पीना", snk: "min", ro: "a bea", srk: "min",
    },
    present: ["bec", "beus", "beu", "bevem", "beveu", "beuen"],
    passat: ["vaig beure", "vas beure", "va beure", "vam beure", "vau beure", "van beure"],
    futur: ["beuré", "beuràs", "beurà", "beurem", "beureu", "beuran"],
  },
  {
    infinitive: "DORMIR",
    family: "3a",
    emoji: "😴",
    translations: {
      ca: "dormir", es: "dormir", en: "to sleep", fr: "dormir",
      ar: "ينام", ur: "سونا", wo: "nelaw", uk: "спати",
      mnk: "siinoo", it: "dormire", el: "κοιμάμαι",
      ptBR: "dormir", pt: "dormir", ha: "ينعس", zh: "睡觉",
      hi: "सोना", snk: "xara", ro: "a dormi", srk: "xara",
    },
    present: ["dormo", "dorms", "dorm", "dormim", "dormiu", "dormen"],
    passat: ["vaig dormir", "vas dormir", "va dormir", "vam dormir", "vau dormir", "van dormir"],
    futur: ["dormiré", "dormiràs", "dormirà", "dormirem", "dormireu", "dormiran"],
  },
  {
    infinitive: "SERVIR",
    family: "3a",
    emoji: "🍽️",
    translations: {
      ca: "servir", es: "servir", en: "to serve", fr: "servir",
      ar: "يخدم", ur: "خدمت کرنا", wo: "liggéey", uk: "служити",
      mnk: "dookuu", it: "servire", el: "υπηρετώ",
      ptBR: "servir", pt: "servir", ha: "يخدم", zh: "服务",
      hi: "सेवा करना", snk: "golle", ro: "a servi", srk: "golle",
    },
    present: ["serveixo", "serveixes", "serveix", "servim", "serviu", "serveixen"],
    passat: ["vaig servir", "vas servir", "va servir", "vam servir", "vau servir", "van servir"],
    futur: ["serviré", "serviràs", "servirà", "servirem", "servireu", "serviran"],
  },
  {
    infinitive: "SER",
    family: "irregular",
    emoji: "⭐",
    translations: {
      ca: "ser", es: "ser", en: "to be", fr: "être",
      ar: "يكون", ur: "ہونا", wo: "nekk", uk: "бути",
      mnk: "mu", it: "essere", el: "είμαι",
      ptBR: "ser", pt: "ser", ha: "يكون", zh: "是",
      hi: "होना", snk: "ni", ro: "a fi", srk: "ni",
    },
    present: ["sóc", "ets", "és", "som", "sou", "són"],
    passat: ["vaig ser", "vas ser", "va ser", "vam ser", "vau ser", "van ser"],
    futur: ["seré", "seràs", "serà", "serem", "sereu", "seran"],
  },
  {
    infinitive: "ANAR",
    family: "irregular",
    emoji: "🚶",
    translations: {
      ca: "anar", es: "ir", en: "to go", fr: "aller",
      ar: "يذهب", ur: "جانا", wo: "dem", uk: "йти",
      mnk: "taa", it: "andare", el: "πηγαίνω",
      ptBR: "ir", pt: "ir", ha: "يمشي", zh: "去",
      hi: "जाना", snk: "doonu", ro: "a merge", srk: "doonu",
    },
    present: ["vaig", "vas", "va", "anem", "aneu", "van"],
    passat: ["vaig anar", "vas anar", "va anar", "vam anar", "vau anar", "van anar"],
    futur: ["aniré", "aniràs", "anirà", "anirem", "anireu", "aniran"],
  },
  {
    infinitive: "FER",
    family: "irregular",
    emoji: "🛠️",
    translations: {
      ca: "fer", es: "hacer", en: "to do / make", fr: "faire",
      ar: "يفعل", ur: "کرنا", wo: "def", uk: "робити",
      mnk: "ke", it: "fare", el: "κάνω",
      ptBR: "fazer", pt: "fazer", ha: "يسوي", zh: "做",
      hi: "करना", snk: "ke", ro: "a face", srk: "ke",
    },
    present: ["faig", "fas", "fa", "fem", "feu", "fan"],
    passat: ["vaig fer", "vas fer", "va fer", "vam fer", "vau fer", "van fer"],
    futur: ["faré", "faràs", "farà", "farem", "fareu", "faran"],
  },
  {
    infinitive: "TENIR",
    family: "irregular",
    emoji: "🤲",
    translations: {
      ca: "tenir", es: "tener", en: "to have", fr: "avoir",
      ar: "يملك", ur: "رکھنا", wo: "am", uk: "мати",
      mnk: "soto", it: "avere", el: "έχω",
      ptBR: "ter", pt: "ter", ha: "عنده", zh: "有",
      hi: "पास होना", snk: "bara", ro: "a avea", srk: "bara",
    },
    present: ["tinc", "tens", "té", "tenim", "teniu", "tenen"],
    passat: ["vaig tenir", "vas tenir", "va tenir", "vam tenir", "vau tenir", "van tenir"],
    futur: ["tindré", "tindràs", "tindrà", "tindrem", "tindreu", "tindran"],
  },
];

const PRONOUNS_CA = ["jo", "tu", "ell/ella", "nosaltres", "vosaltres", "ells/elles"];
const PRONOUNS_BY_LANG: Partial<Record<LangCode, string[]>> = {
  ca: PRONOUNS_CA,
  es: ["yo", "tú", "él/ella", "nosotros", "vosotros", "ellos/ellas"],
  en: ["I", "you", "he/she", "we", "you (pl.)", "they"],
  fr: ["je", "tu", "il/elle", "nous", "vous", "ils/elles"],
  it: ["io", "tu", "lui/lei", "noi", "voi", "loro"],
  pt: ["eu", "tu", "ele/ela", "nós", "vós", "eles/elas"],
  ptBR: ["eu", "você", "ele/ela", "nós", "vocês", "eles/elas"],
  ro: ["eu", "tu", "el/ea", "noi", "voi", "ei/ele"],
  el: ["εγώ", "εσύ", "αυτός/αυτή", "εμείς", "εσείς", "αυτοί/αυτές"],
  uk: ["я", "ти", "він/вона", "ми", "ви", "вони"],
  ar: ["أنا", "أنتَ/أنتِ", "هو/هي", "نحن", "أنتم", "هم/هن"],
  ha: ["أنا", "انت", "هو/هي", "احنا", "انتم", "هم"],
  ur: ["میں", "تم", "وہ", "ہم", "تم لوگ", "وہ لوگ"],
  hi: ["मैं", "तुम", "वह", "हम", "आप", "वे"],
  zh: ["我", "你", "他/她", "我们", "你们", "他们/她们"],
  wo: ["man", "yow", "moom", "ñun", "yeen", "ñoom"],
  mnk: ["nte", "ite", "ate", "ntolu", "altolu", "itolu"],
  snk: ["in", "an", "a", "o", "xa", "i"],
  srk: ["in", "an", "a", "o", "xa", "i"],
};
const pronounsFor = (lang: LangCode) => PRONOUNS_BY_LANG[lang] ?? PRONOUNS_CA;

const TENSE_MARKERS: Record<Tense, { keywords: string[]; color: string }> = {
  present: { keywords: ["ara", "avui", "cada dia", "sempre", "normalment"], color: "text-emerald-600 dark:text-emerald-400" },
  passat: { keywords: ["ahir", "abans", "la setmana passada", "fa 2 dies"], color: "text-violet-600 dark:text-violet-400" },
  futur: { keywords: ["demà", "després", "l'any que ve", "aviat"], color: "text-sky-600 dark:text-sky-400" },
};

const CONJ_CACHE_KEY = "mapes-verbs-conj-cache-v1";
type ConjCache = Record<string, string[]>; // key: `${infinitive}|${tense}|${lang}`

function loadCache(): ConjCache {
  try { return JSON.parse(localStorage.getItem(CONJ_CACHE_KEY) || "{}"); } catch { return {}; }
}
function saveCache(c: ConjCache) {
  try { localStorage.setItem(CONJ_CACHE_KEY, JSON.stringify(c)); } catch {}
}

const MapesVerbs = () => {
  const [tense, setTense] = useState<Tense>("present");
  const [familyFilter, setFamilyFilter] = useState<Family | "all">("all");
  const [expanded, setExpanded] = useState<string | null>(null);
  const { targetLang, helpLang, setTargetLang, setHelpLang } = useLanguages();
  const [conjCache, setConjCache] = useState<ConjCache>(() => loadCache());
  const [loadingKey, setLoadingKey] = useState<string | null>(null);

  const filtered = familyFilter === "all" ? VERBS : VERBS.filter((v) => v.family === familyFilter);
  const currentTense = TENSES.find((t) => t.id === tense)!;

  const trFor = (v: VerbData, lang: LangCode) => v.translations[lang] ?? v.translations.en ?? v.infinitive.toLowerCase();

  const conjKey = (inf: string, t: Tense, lang: LangCode) => `${inf}|${t}|${lang}`;

  const fetchConjugation = useCallback(async (v: VerbData, t: Tense, lang: LangCode) => {
    const key = conjKey(v.infinitive, t, lang);
    if (conjCache[key] || lang === "ca") return;
    setLoadingKey(key);
    try {
      const { data, error } = await supabase.functions.invoke("ai-text-tools", {
        body: { action: "conjugate-verb", infinitive: v.infinitive.toLowerCase(), tense: t, targetLang: lang },
      });
      if (error) throw error;
      const forms: string[] = Array.isArray(data?.forms) ? data.forms : [];
      if (forms.length === 6) {
        const next = { ...conjCache, [key]: forms };
        setConjCache(next);
        saveCache(next);
      } else {
        toast.error("No s'han pogut obtenir les 6 formes");
      }
    } catch (e: any) {
      toast.error("Error traduint: " + (e?.message ?? "desconegut"));
    } finally {
      setLoadingKey(null);
    }
  }, [conjCache]);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container py-4 flex items-center justify-between gap-3 flex-wrap">
          <Link to="/" className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80">
            <ArrowLeft className="w-4 h-4" /> Tornar
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🗺️</span>
            <h1 className="text-xl font-extrabold">Mapes conceptuals dels temps verbals</h1>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <LanguageSelector
              lang={targetLang}
              onChange={setTargetLang}
              label="🎯 Aprenc:"
              exclude={helpLang}
              title="Idioma que aprenc"
            />
            <LanguageSelector
              lang={helpLang}
              onChange={setHelpLang}
              label="🌍 Ajuda:"
              title="Idioma d'ajuda"
            />
          </div>
        </div>
      </header>

      <main className="container py-8 space-y-8 max-w-6xl">
        <section className="text-center space-y-4">
          <h2 className="text-lg font-bold text-muted-foreground">Tria un temps verbal</h2>
          <div className="flex justify-center gap-3 flex-wrap">
            {TENSES.map((t) => (
              <button
                key={t.id}
                onClick={() => setTense(t.id)}
                className={`flex flex-col items-center gap-1 px-6 py-4 rounded-2xl transition-all active:scale-95 border-2 ${
                  tense === t.id
                    ? "border-primary bg-primary/10 shadow-lg scale-105"
                    : "border-border bg-card hover:border-primary/40"
                }`}
              >
                <span className="text-4xl">{t.emoji}</span>
                <span className="font-extrabold text-lg">{t.label}</span>
                <span className="text-xs text-muted-foreground">{t.desc}</span>
              </button>
            ))}
          </div>
          <div className="flex justify-center gap-2 text-sm flex-wrap">
            <span className="font-semibold">Marcadors temporals:</span>
            {TENSE_MARKERS[tense].keywords.map((k) => (
              <span key={k} className={`font-bold ${TENSE_MARKERS[tense].color}`}>
                · {k}
              </span>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border-2 border-border bg-card p-5 shadow-sm">
          <h3 className="font-bold mb-3 text-center">🎨 Famílies de verbs (colors)</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button
              onClick={() => setFamilyFilter("all")}
              className={`p-3 rounded-xl border-2 transition-all ${
                familyFilter === "all" ? "border-foreground bg-muted" : "border-border hover:bg-muted/50"
              }`}
            >
              <div className="font-bold text-sm">Totes</div>
              <div className="text-xs text-muted-foreground">Mostra-ho tot</div>
            </button>
            {(Object.keys(FAMILIES) as Family[]).map((f) => {
              const info = FAMILIES[f];
              const active = familyFilter === f;
              return (
                <button
                  key={f}
                  onClick={() => setFamilyFilter(f)}
                  className={`p-3 rounded-xl border-2 transition-all text-left ${
                    active ? "border-foreground shadow-md" : "border-border hover:bg-muted/50"
                  } ${info.bg}`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-4 h-4 rounded-full ${info.color}`} />
                    <span className="font-bold text-sm">{info.label}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Acaba en <b>{info.ending}</b> · ex: <i>{info.example}</i>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section className="relative rounded-3xl border-2 border-border bg-card p-6 md:p-10 shadow-lg overflow-hidden">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
              <div className="relative flex flex-col items-center justify-center w-40 h-40 rounded-full bg-primary text-primary-foreground shadow-2xl border-4 border-background">
                <span className="text-5xl">{currentTense.emoji}</span>
                <span className="text-xl font-extrabold">{currentTense.label}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((v) => {
              const info = FAMILIES[v.family];
              const forms = v[tense];
              const isOpen = expanded === v.infinitive;
              const helpTr = trFor(v, helpLang);
              const targetTr = trFor(v, targetLang);
              return (
                <div
                  key={v.infinitive}
                  className={`relative rounded-2xl border-2 border-transparent ${info.bg} p-4 shadow-sm hover:shadow-md transition-all ${
                    isOpen ? `ring-4 ${info.ring} ring-opacity-40` : ""
                  }`}
                >
                  <div className={`absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl ${info.color}`} />
                  <button
                    onClick={() => setExpanded(isOpen ? null : v.infinitive)}
                    className="w-full text-left"
                  >
                    <div className="flex items-center justify-between mt-1 gap-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`w-3 h-3 rounded-full shrink-0 ${info.color}`} />
                          <h4 className="font-extrabold text-lg truncate">{v.infinitive}</h4>
                          <span className="text-xl">{v.emoji}</span>
                        </div>
                        <div className="mt-1 space-y-0.5">
                          {targetLang !== "ca" && (
                            <p className="text-sm font-bold text-primary">
                              {LANGUAGES[targetLang].flag} {targetTr}
                            </p>
                          )}
                          {helpLang !== targetLang && helpLang !== "ca" && (
                            <p className="text-xs text-muted-foreground">
                              {LANGUAGES[helpLang].flag} {helpTr}
                            </p>
                          )}
                        </div>
                      </div>
                      <span className="text-xs font-bold px-2 py-1 rounded-full bg-background/60 shrink-0">
                        {info.ending}
                      </span>
                    </div>
                  </button>

                  {(() => {
                    const tKey = conjKey(v.infinitive, tense, targetLang);
                    const hKey = conjKey(v.infinitive, tense, helpLang);
                    const tForms = targetLang !== "ca" ? conjCache[tKey] : undefined;
                    const hForms = helpLang !== "ca" && helpLang !== targetLang ? conjCache[hKey] : undefined;
                    const isLoading = loadingKey === tKey || loadingKey === hKey;
                    const needsFetch =
                      (targetLang !== "ca" && !tForms) ||
                      (helpLang !== "ca" && helpLang !== targetLang && !hForms);
                    const targetPron = pronounsFor(targetLang);
                    const helpPron = pronounsFor(helpLang);
                    const caPron = PRONOUNS_CA;
                    // Primary display: target language (what the student learns)
                    // Fallback to Catalan if target is Catalan.
                    return (
                      <>
                        <div className="mt-3 grid grid-cols-1 gap-1.5">
                          {forms.map((form, i) => {
                            const mainPron = targetLang === "ca" ? caPron[i] : targetPron[i];
                            const mainForm = targetLang === "ca" ? form.trim() : tForms?.[i];
                            const helpForm = helpLang === "ca" ? form.trim() : hForms?.[i];
                            return (
                              <div
                                key={i}
                                className="grid grid-cols-[5rem_1fr] gap-2 items-baseline text-sm bg-background/70 rounded-lg px-2.5 py-1.5"
                              >
                                <span className="text-xs font-bold text-foreground truncate">
                                  {mainPron}
                                </span>
                                <div className="space-y-0.5">
                                  <div className="font-bold text-primary text-base leading-tight">
                                    {mainForm ?? <span className="italic text-muted-foreground/60 text-xs">— tradueix per veure-ho —</span>}
                                  </div>
                                  {helpLang !== targetLang && (
                                    <div className="text-xs text-muted-foreground flex items-baseline gap-1">
                                      <span className="opacity-70">{LANGUAGES[helpLang].flag}</span>
                                      <span>{helpForm ?? "…"}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {needsFetch && (
                          <button
                            onClick={async () => {
                              if (targetLang !== "ca" && !tForms) await fetchConjugation(v, tense, targetLang);
                              if (helpLang !== "ca" && helpLang !== targetLang && !conjCache[hKey])
                                await fetchConjugation(v, tense, helpLang);
                            }}
                            disabled={isLoading}
                            className="mt-2 w-full flex items-center justify-center gap-2 text-xs font-bold px-3 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-all disabled:opacity-50"
                          >
                            {isLoading ? (
                              <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Traduint…</>
                            ) : (
                              <><Languages className="w-3.5 h-3.5" /> Tradueix les formes al {LANGUAGES[targetLang].name}{helpLang !== targetLang && helpLang !== "ca" ? ` i ${LANGUAGES[helpLang].name}` : ""}</>
                            )}
                          </button>
                        )}
                      </>
                    );
                  })()}

                  {isOpen && (
                    <details open className="mt-3 rounded-lg bg-background/60 p-3 text-xs">
                      <summary className="font-bold cursor-pointer">🌐 Traduccions a totes les llengües</summary>
                      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-1">
                        {(Object.keys(LANGUAGES) as LangCode[]).map((lc) => (
                          <div key={lc} className="flex items-center gap-1.5">
                            <span>{LANGUAGES[lc].flag}</span>
                            <span className="text-muted-foreground">{LANGUAGES[lc].name}:</span>
                            <span className="font-semibold text-foreground">{trFor(v, lc)}</span>
                          </div>
                        ))}
                      </div>
                    </details>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <section className="rounded-2xl border-2 border-border bg-card p-5 shadow-sm">
          <h3 className="font-bold text-lg mb-4">🧩 Patró general — {currentTense.label}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {(Object.keys(FAMILIES) as Family[]).map((f) => {
              const info = FAMILIES[f];
              const patterns: Record<Family, Record<Tense, string>> = {
                "1a": {
                  present: "arrel + o / es / a / em / eu / en",
                  passat: "vaig/vas/va… + infinitiu",
                  futur: "infinitiu + é / às / à / em / eu / an",
                },
                "2a": {
                  present: "arrel + o / s / — / em / eu / en",
                  passat: "vaig/vas/va… + infinitiu",
                  futur: "infinitiu + é / às / à / em / eu / an",
                },
                "3a": {
                  present: "arrel (+eix) + o / es / — / im / iu / en",
                  passat: "vaig/vas/va… + infinitiu",
                  futur: "infinitiu + é / às / à / em / eu / an",
                },
                irregular: {
                  present: "cal memoritzar cada forma",
                  passat: "vaig/vas/va… + infinitiu (regular!)",
                  futur: "arrel irregular + é / às / à / em / eu / an",
                },
              };
              return (
                <div key={f} className={`rounded-xl p-3 ${info.bg} border border-border`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`w-3 h-3 rounded-full ${info.color}`} />
                    <span className="font-bold text-sm">{info.label}</span>
                  </div>
                  <p className="text-xs leading-relaxed">{patterns[f][tense]}</p>
                </div>
              );
            })}
          </div>
        </section>

        <p className="text-center text-xs text-muted-foreground">
          💡 Clica un verb per veure la conjugació completa i les traduccions a totes les llengües (del wolof a l'ucraïnès).
        </p>
      </main>
    </div>
  );
};

export default MapesVerbs;
