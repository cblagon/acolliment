import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

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

type VerbData = {
  infinitive: string;
  family: Family;
  meaning: string;
  present: string[]; // jo, tu, ell, nosaltres, vosaltres, ells
  passat: string[]; // perfet perifràstic: vaig + inf
  futur: string[];
};

const VERBS: VerbData[] = [
  {
    infinitive: "CANTAR",
    family: "1a",
    meaning: "cantar 🎤",
    present: ["canto", "cantes", "canta", "cantem", "canteu", "canten"],
    passat: ["vaig cantar", "vas cantar", "va cantar", "vam cantar", "vau cantar", "van cantar"],
    futur: ["cantaré", "cantaràs", "cantarà", "cantarem", "cantareu", "cantaran"],
  },
  {
    infinitive: "PARLAR",
    family: "1a",
    meaning: "hablar / to speak 💬",
    present: ["parlo", "parles", "parla", "parlem", "parleu", "parlen"],
    passat: ["vaig parlar", "vas parlar", "va parlar", "vam parlar", "vau parlar", "van parlar"],
    futur: ["parlaré", "parlaràs", "parlarà", "parlarem", "parlareu", "parlaran"],
  },
  {
    infinitive: "TÉMER",
    family: "2a",
    meaning: "témer / to fear 😨",
    present: ["temo", "tems", "tem", "temem", "temeu", "temen"],
    passat: ["vaig témer", "vas témer", "va témer", "vam témer", "vau témer", "van témer"],
    futur: ["temeré", "temeràs", "temerà", "temerem", "temereu", "temeran"],
  },
  {
    infinitive: "BEURE",
    family: "2a",
    meaning: "beber / to drink 🥤",
    present: ["bec", "beus", "beu", "bevem", "beveu", "beuen"],
    passat: ["vaig beure", "vas beure", "va beure", "vam beure", "vau beure", "van beure"],
    futur: ["beuré", "beuràs", "beurà", "beurem", "beureu", "beuran"],
  },
  {
    infinitive: "DORMIR",
    family: "3a",
    meaning: "dormir / to sleep 😴",
    present: ["dormo", "dorms", "dorm", "dormim", "dormiu", "dormen"],
    passat: ["vaig dormir", "vas dormir", "va dormir", "vam dormir", "vau dormir", "van dormir"],
    futur: ["dormiré", "dormiràs", "dormirà", "dormirem", "dormireu", "dormiran"],
  },
  {
    infinitive: "SERVIR",
    family: "3a",
    meaning: "servir / to serve 🍽️",
    present: ["serveixo", "serveixes", "serveix", "servim", "serviu", "serveixen"],
    passat: ["vaig servir", "vas servir", "va servir", "vam servir", "vau servir", "van servir"],
    futur: ["serviré", "serviràs", "servirà", "servirem", "servireu", "serviran"],
  },
  {
    infinitive: "SER",
    family: "irregular",
    meaning: "ser / to be ⭐",
    present: ["sóc", "ets", "és", "som", "sou", "són"],
    passat: ["vaig ser", "vas ser", "va ser", "vam ser", "vau ser", "van ser"],
    futur: ["seré", "seràs", "serà", "serem", "sereu", "seran"],
  },
  {
    infinitive: "ANAR",
    family: "irregular",
    meaning: "ir / to go 🚶",
    present: ["vaig", "vas", "va", "anem", "aneu", "van"],
    passat: ["vaig anar", "vas anar", "va anar", "vam anar", "vau anar", "van anar"],
    futur: ["aniré", "aniràs", "anirà", "anirem, ", "anireu", "aniran"],
  },
  {
    infinitive: "FER",
    family: "irregular",
    meaning: "hacer / to do 🛠️",
    present: ["faig", "fas", "fa", "fem", "feu", "fan"],
    passat: ["vaig fer", "vas fer", "va fer", "vam fer", "vau fer", "van fer"],
    futur: ["faré", "faràs", "farà", "farem", "fareu, ", "faran"],
  },
  {
    infinitive: "TENIR",
    family: "irregular",
    meaning: "tener / to have 🤲",
    present: ["tinc", "tens", "té", "tenim", "teniu", "tenen"],
    passat: ["vaig tenir", "vas tenir", "va tenir", "vam tenir", "vau tenir", "van tenir"],
    futur: ["tindré", "tindràs", "tindrà", "tindrem", "tindreu", "tindran"],
  },
];

const PRONOUNS = ["jo", "tu", "ell/ella", "nosaltres", "vosaltres", "ells/elles"];

const TENSE_MARKERS: Record<Tense, { keywords: string[]; color: string }> = {
  present: { keywords: ["ara", "avui", "cada dia", "sempre", "normalment"], color: "text-emerald-600 dark:text-emerald-400" },
  passat: { keywords: ["ahir", "abans", "la setmana passada", "fa 2 dies"], color: "text-violet-600 dark:text-violet-400" },
  futur: { keywords: ["demà", "després", "l'any que ve", "aviat"], color: "text-sky-600 dark:text-sky-400" },
};

const MapesVerbs = () => {
  const [tense, setTense] = useState<Tense>("present");
  const [familyFilter, setFamilyFilter] = useState<Family | "all">("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = familyFilter === "all" ? VERBS : VERBS.filter((v) => v.family === familyFilter);
  const currentTense = TENSES.find((t) => t.id === tense)!;

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
          <div className="w-16" />
        </div>
      </header>

      <main className="container py-8 space-y-8 max-w-6xl">
        {/* Tense selector — the center of the conceptual map */}
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
          <div className="flex justify-center gap-2 text-sm">
            <span className="font-semibold">Marcadors temporals:</span>
            {TENSE_MARKERS[tense].keywords.map((k) => (
              <span key={k} className={`font-bold ${TENSE_MARKERS[tense].color}`}>
                · {k}
              </span>
            ))}
          </div>
        </section>

        {/* Family legend */}
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

        {/* Conceptual map: central tense node + verb branches */}
        <section className="relative rounded-3xl border-2 border-border bg-card p-6 md:p-10 shadow-lg overflow-hidden">
          {/* Central node */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
              <div className="relative flex flex-col items-center justify-center w-40 h-40 rounded-full bg-primary text-primary-foreground shadow-2xl border-4 border-background">
                <span className="text-5xl">{currentTense.emoji}</span>
                <span className="text-xl font-extrabold">{currentTense.label}</span>
              </div>
            </div>
          </div>

          {/* Branches: one card per verb, colored by family */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((v) => {
              const info = FAMILIES[v.family];
              const forms = v[tense];
              const isOpen = expanded === v.infinitive;
              return (
                <div
                  key={v.infinitive}
                  className={`relative rounded-2xl border-2 border-transparent ${info.bg} p-4 shadow-sm hover:shadow-md transition-all ${
                    isOpen ? `ring-4 ${info.ring} ring-opacity-40` : ""
                  }`}
                >
                  {/* Family color bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl ${info.color}`} />
                  <button
                    onClick={() => setExpanded(isOpen ? null : v.infinitive)}
                    className="w-full text-left"
                  >
                    <div className="flex items-center justify-between mt-1">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`w-3 h-3 rounded-full ${info.color}`} />
                          <h4 className="font-extrabold text-lg">{v.infinitive}</h4>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{v.meaning}</p>
                      </div>
                      <span className="text-xs font-bold px-2 py-1 rounded-full bg-background/60">
                        {info.ending}
                      </span>
                    </div>
                  </button>

                  <div className="mt-3 grid grid-cols-1 gap-1.5">
                    {forms.map((form, i) => (
                      <div
                        key={i}
                        className="flex items-baseline gap-2 text-sm bg-background/70 rounded-lg px-2.5 py-1.5"
                      >
                        <span className="text-xs text-muted-foreground w-20 shrink-0">{PRONOUNS[i]}</span>
                        <span className="font-bold text-foreground">{form.trim()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Pattern summary per family */}
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
          💡 Clica els verbs per veure la conjugació completa. Canvia de temps o filtra per família per comparar patrons.
        </p>
      </main>
    </div>
  );
};

export default MapesVerbs;
