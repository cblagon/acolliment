import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Globe2, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { invokeQueued } from "@/lib/aiQueue";
import { useLanguages, LANGUAGES } from "@/hooks/useLanguage";

type Goal = {
  num: number;
  color: string;
  icon: string;
  title: string;
  text: string;
  star?: boolean;
};

const PAGE_TITLE = "ODS vinculats al projecte";
const PAGE_INTRO =
  "Justificació dels Objectius de Desenvolupament Sostenible (Agenda 2030) que es treballen amb aquest model d'acolliment lingüístic i digital.";

const GOALS: Goal[] = [
  {
    num: 4,
    color: "#C5192D",
    icon: "/ods/ods-4.svg",
    star: true,
    title: "Educació de qualitat",
    text: "És el principal. El projecte afavoreix una educació inclusiva, equitativa i personalitzada, facilitant l'aprenentatge de la llengua vehicular i l'accés als recursos educatius de l'alumnat nouvingut. També desenvolupa competències digitals, pensament computacional i aprenentatge al llarg del procés.",
  },
  {
    num: 10,
    color: "#DD1367",
    icon: "/ods/ods-10.svg",
    star: true,
    title: "Reducció de les desigualtats",
    text: "És especialment important perquè el projecte intenta reduir les desigualtats que poden generar la barrera lingüística, cultural i d'accés a la informació quan un alumne s'incorpora al centre durant el curs. La traducció, els recursos multilingües i l'acompanyament digital faciliten la inclusió.",
  },
  {
    num: 9,
    color: "#FD6925",
    icon: "/ods/ods-9.svg",
    title: "Indústria, innovació i infraestructura",
    text: "La situació d'aprenentatge de Welcome Robotics Hub connecta programació, electrònica, sensors, ESP32 STEAMakers i sistemes d'àudio per crear solucions tecnològiques innovadores davant d'un problema real.",
  },
  {
    num: 11,
    color: "#FD9D24",
    icon: "/ods/ods-11.svg",
    title: "Ciutats i comunitats sostenibles",
    text: "El projecte contribueix a construir una comunitat educativa més inclusiva, segura i cohesionada, fomentant la participació i el sentiment de pertinença de l'alumnat nouvingut.",
  },
  {
    num: 16,
    color: "#00689D",
    icon: "/ods/ods-16.svg",
    title: "Pau, justícia i institucions sòlides",
    text: "En l'àmbit educatiu, el projecte treballa la convivència, el respecte, l'empatia i la participació, especialment quan els alumnes experimenten què significa arribar a un entorn on no coneixen la llengua.",
  },
  {
    num: 17,
    color: "#19486A",
    icon: "/ods/ods-17.svg",
    title: "Aliances per assolir els objectius",
    text: "També hi ha una connexió interessant amb aquest ODS per la participació en Scientix, Teachers' Voices i les iniciatives europees d'educació digital, que permeten compartir experiències i coneixement més enllà del centre.",
  },
];

const BASE_LINES = [
  PAGE_TITLE,
  PAGE_INTRO,
  ...GOALS.flatMap((g) => [g.title, g.text]),
];

const CACHE_PREFIX = "apren-ods-i18n-v1-";

export default function ODS() {
  const { helpLang } = useLanguages();
  const [lines, setLines] = useState<string[]>(BASE_LINES);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (helpLang === "ca") {
      setLines(BASE_LINES);
      return;
    }
    const cacheKey = CACHE_PREFIX + helpLang;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        const parsed = JSON.parse(cached) as string[];
        if (parsed.length === BASE_LINES.length) {
          setLines(parsed);
          return;
        }
      } catch { /* ignore */ }
    }
    let cancelled = false;
    setLoading(true);
    (async () => {
      try {
        const data = await invokeQueued<{ lines?: string[] }>("ai-text-tools", {
          action: "translate-lines", targetLang: helpLang, lines: BASE_LINES,
        });
        if (cancelled) return;
        const out: string[] = data?.lines ?? [];
        if (out.length !== BASE_LINES.length) throw new Error("incomplete");

        setLines(out);
        try { localStorage.setItem(cacheKey, JSON.stringify(out)); } catch { /* ignore */ }
      } catch {
        if (!cancelled) setLines(BASE_LINES);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [helpLang]);

  const title = lines[0];
  const intro = lines[1];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/60 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-4 py-4">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-xl bg-muted px-3 py-2 text-base font-semibold text-foreground transition-all hover:bg-muted/80 active:scale-95"
          >
            <ArrowLeft className="h-4 w-4" />
            Inici
          </Link>
          <span className="flex items-center gap-2 text-base font-semibold text-muted-foreground">
            <Globe2 className="h-4 w-4 text-primary" />
            {LANGUAGES[helpLang]?.nativeName}
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {GOALS.map((g) => (
            <div
              key={g.num}
              className="flex items-center justify-center rounded-full shadow-sm ring-2 ring-white/50 dark:ring-white/20"
              style={{ backgroundColor: g.color }}
              title={`ODS ${g.num}`}
            >
              <img
                src={g.icon}
                alt={`Icona ODS ${g.num}`}
                className="h-12 w-12 sm:h-14 sm:w-14"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl">{title}</h1>
        <p className="mt-3 text-lg text-muted-foreground">{intro}</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {GOALS.map((g, i) => (
            <article
              key={g.num}
              className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
            >
              <div
                className="flex items-center gap-3 px-4 py-3"
                style={{ backgroundColor: g.color }}
              >
                <span className="text-3xl font-black leading-none text-white">{g.num}</span>
                <img
                  src={g.icon}
                  alt={`Icona ODS ${g.num}`}
                  className="h-8 w-8"
                  loading="lazy"
                />
                <h2 className="text-base font-bold leading-tight text-white">
                  {lines[2 + i * 2]} {g.star && "⭐"}
                </h2>
              </div>
              <p className="px-4 py-4 text-[15px] leading-relaxed text-foreground/90">
                {lines[3 + i * 2]}
              </p>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
