import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Languages, Gamepad2, Music, Video, Download, Sparkles } from "lucide-react";
import { useLanguages } from "@/hooks/useLanguage";
import type { LangCode } from "@/hooks/useLanguage";

type AboutStrings = {
  subtitle: string;
  back: string;
  badge: string;
  title: string;
  intro: string;
  steps: { title: string; text: string }[];
  justifBadge: string;
  justifTitle: string;
  p1Pre: string;
  p1Mid: string;
  p1End: string;
  guide1: string;
  guide2: string;
  p2: string;
  p3: string;
  backHome: string;
};

const STRINGS: Partial<Record<LangCode, AboutStrings>> = {
  ca: {
    subtitle: "Com fer-ne ús",
    back: "Tornar",
    badge: "Guia d'ús",
    title: "Com fer ús d'aquesta web",
    intro:
      "Una eina visual i interactiva pensada per a l'acollida lingüística d'alumnat nouvingut. Aquí t'expliquem com aprofitar-la al màxim.",
    steps: [
      { title: "1. Tria els idiomes", text: "A la part superior, selecciona l'idioma que vols aprendre (🎯 Aprenc) i l'idioma d'ajuda (🌍 Ajuda en) que ja coneixes. Així totes les traduccions s'adapten al teu perfil." },
      { title: "2. Escull un nivell i un bloc", text: "Selecciona el nivell (A1 Bàsic · A2 Elemental · B1 Intermedi) i tria un dels blocs temàtics: la classe, la família, els menjars, les vacances, les professions, els instruments…" },
      { title: "3. Aprèn amb les fitxes", text: "Cada bloc conté fitxes visuals amb la paraula en l'idioma que aprens. Toca per veure la traducció i escoltar la pronunciació amb veu sintètica." },
      { title: "4. Practica amb el joc", text: "Al final de cada bloc, prem 'Joc' i posa a prova el que has après. Al final veuràs un resum amb els encerts i errors." },
      { title: "5. Escolta cançons", text: "Alguns blocs inclouen cançons relacionades amb el vocabulari, perfectes per reforçar l'aprenentatge de manera lúdica." },
      { title: "6. Mira roleplays animats", text: "Al nivell A2 trobaràs vídeos animats amb situacions quotidianes (vacances, taller de tecnologia, aula de música…) per treballar la comprensió oral." },
      { title: "7. Exporta a PDF", text: "Amb el botó PDF pots descarregar totes les fitxes del nivell triat per imprimir-les i treballar-les a l'aula sense connexió." },
    ],
    justifBadge: "Justificació pedagògica",
    justifTitle: "Inspirat en les directrius europees",
    p1Pre: "Aquesta web s'emmarca dins del projecte ",
    p1Mid: ", part de la iniciativa ",
    p1End: ". Vaig tenir l'oportunitat de compartir la meva experiència després de dur a terme un projecte pilot seguint les guies ",
    guide1: "«New Guidelines to Help Teachers Lead Europe's Digital Education»",
    guide2: "«Guidelines for Teaching Informatics: Practical Strategies for European Classrooms»",
    p2: "Aquestes directrius són una iniciativa emblemàtica del Digital Education Action Plan (2021–2027), que té com a objectiu donar suport a la transformació digital dels sistemes educatius arreu d'Europa.",
    p3: "L'entrevista en línia, organitzada per la Comissió Europea, va ser enregistrada i contribuirà a un vídeo testimonial amb finalitats de difusió. Em sento molt honrada i agraïda d'haver estat seleccionada per participar-hi i representar la feina desenvolupada durant el projecte pilot.",
    backHome: "Tornar a l'inici",
  },
  es: {
    subtitle: "Cómo usarla",
    back: "Volver",
    badge: "Guía de uso",
    title: "Cómo usar esta web",
    intro:
      "Una herramienta visual e interactiva pensada para la acogida lingüística del alumnado recién llegado. Aquí te explicamos cómo aprovecharla al máximo.",
    steps: [
      { title: "1. Elige los idiomas", text: "En la parte superior, selecciona el idioma que quieres aprender (🎯 Aprendo) y el idioma de ayuda (🌍 Ayuda en) que ya conoces. Así todas las traducciones se adaptan a tu perfil." },
      { title: "2. Escoge un nivel y un bloque", text: "Selecciona el nivel (A1 Básico · A2 Elemental · B1 Intermedio) y elige uno de los bloques temáticos: la clase, la familia, las comidas, las vacaciones, las profesiones, los instrumentos…" },
      { title: "3. Aprende con las fichas", text: "Cada bloque contiene fichas visuales con la palabra en el idioma que aprendes. Toca para ver la traducción y escuchar la pronunciación con voz sintética." },
      { title: "4. Practica con el juego", text: "Al final de cada bloque, pulsa 'Juego' y pon a prueba lo que has aprendido. Al final verás un resumen con los aciertos y errores." },
      { title: "5. Escucha canciones", text: "Algunos bloques incluyen canciones relacionadas con el vocabulario, perfectas para reforzar el aprendizaje de forma lúdica." },
      { title: "6. Mira roleplays animados", text: "En el nivel A2 encontrarás vídeos animados con situaciones cotidianas (vacaciones, taller de tecnología, aula de música…) para trabajar la comprensión oral." },
      { title: "7. Exporta a PDF", text: "Con el botón PDF puedes descargar todas las fichas del nivel elegido para imprimirlas y trabajarlas en el aula sin conexión." },
    ],
    justifBadge: "Justificación pedagógica",
    justifTitle: "Inspirado en las directrices europeas",
    p1Pre: "Esta web se enmarca dentro del proyecto ",
    p1Mid: ", parte de la iniciativa ",
    p1End: ". Tuve la oportunidad de compartir mi experiencia tras llevar a cabo un proyecto piloto siguiendo las guías ",
    guide1: "«New Guidelines to Help Teachers Lead Europe's Digital Education»",
    guide2: "«Guidelines for Teaching Informatics: Practical Strategies for European Classrooms»",
    p2: "Estas directrices son una iniciativa emblemática del Digital Education Action Plan (2021–2027), cuyo objetivo es apoyar la transformación digital de los sistemas educativos en toda Europa.",
    p3: "La entrevista en línea, organizada por la Comisión Europea, fue grabada y contribuirá a un vídeo testimonial con fines de difusión. Me siento muy honrada y agradecida por haber sido seleccionada para participar y representar el trabajo desarrollado durante el proyecto piloto.",
    backHome: "Volver al inicio",
  },
  en: {
    subtitle: "How to use it",
    back: "Back",
    badge: "User guide",
    title: "How to use this website",
    intro:
      "A visual and interactive tool designed for the linguistic welcome of newly arrived students. Here's how to make the most of it.",
    steps: [
      { title: "1. Pick your languages", text: "At the top, select the language you want to learn (🎯 I'm learning) and the help language (🌍 Help in) you already know. All translations adapt to your profile." },
      { title: "2. Choose a level and a block", text: "Select the level (A1 Basic · A2 Elemental · B1 Intermediate) and pick one of the thematic blocks: the classroom, family, food, holidays, jobs, instruments…" },
      { title: "3. Learn with the cards", text: "Each block contains visual cards with the word in your target language. Tap to see the translation and listen to the pronunciation with synthetic voice." },
      { title: "4. Practise with the game", text: "At the end of each block, press 'Game' and test what you've learned. You'll get a summary of correct and wrong answers at the end." },
      { title: "5. Listen to songs", text: "Some blocks include songs related to the vocabulary, perfect for reinforcing learning in a fun way." },
      { title: "6. Watch animated roleplays", text: "At A2 level you'll find animated videos with everyday situations (holidays, tech workshop, music classroom…) to work on listening comprehension." },
      { title: "7. Export to PDF", text: "With the PDF button you can download all cards of the chosen level to print and work with them offline in the classroom." },
    ],
    justifBadge: "Pedagogical rationale",
    justifTitle: "Inspired by European guidelines",
    p1Pre: "This website is part of the ",
    p1Mid: " project, within the ",
    p1End: " initiative. I had the opportunity to share my experience after carrying out a pilot project following the guides ",
    guide1: "«New Guidelines to Help Teachers Lead Europe's Digital Education»",
    guide2: "«Guidelines for Teaching Informatics: Practical Strategies for European Classrooms»",
    p2: "These guidelines are a flagship initiative of the Digital Education Action Plan (2021–2027), which aims to support the digital transformation of education systems across Europe.",
    p3: "The online interview, organised by the European Commission, was recorded and will contribute to a testimonial video for dissemination purposes. I feel very honoured and grateful for having been selected to take part and represent the work carried out during the pilot project.",
    backHome: "Back to home",
  },
};

import { LANGUAGES } from "@/hooks/useLanguage";

const About = () => {
  const { helpLang, targetLang } = useLanguages();
  const s = STRINGS[helpLang] ?? STRINGS.en!;
  // "Com fer-ne ús" → render once per learning language (target). Fallback to English when not translated.
  const targetLangs = Array.from(new Set([targetLang])) as LangCode[];

  const stepMeta = [
    { icon: Languages, color: "bg-blue-500" },
    { icon: BookOpen, color: "bg-amber-500" },
    { icon: Sparkles, color: "bg-pink-500" },
    { icon: Gamepad2, color: "bg-green-500" },
    { icon: Music, color: "bg-purple-500" },
    { icon: Video, color: "bg-indigo-500" },
    { icon: Download, color: "bg-rose-500" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container py-4 flex items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-2 active:scale-95 transition-transform">
            <span className="text-3xl">🌍</span>
            <div className="text-left">
              <h1 className="text-xl font-extrabold leading-none text-foreground">Acolliment</h1>
              <p className="text-xs text-muted-foreground font-semibold">{s.subtitle}</p>
            </div>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-muted text-foreground text-sm font-semibold hover:bg-muted/80 transition-all active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{s.back}</span>
          </Link>
        </div>
      </header>

      <main className="container py-8 max-w-3xl">
        <section className="animate-reveal-up space-y-3">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
            {s.badge}
          </span>
          <h2 className="text-3xl font-extrabold text-foreground text-balance">{s.title}</h2>
          <p className="text-muted-foreground">{s.intro}</p>
        </section>

        <section className="mt-8 grid gap-4">
          {s.steps.map((step, i) => {
            const Icon = stepMeta[i].icon;
            return (
              <article
                key={step.title}
                className="flex gap-4 p-5 rounded-2xl border border-border bg-card hover:shadow-md transition-shadow"
              >
                <div className={`${stepMeta[i].color} text-white rounded-xl p-3 h-fit shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-foreground">{step.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{step.text}</p>
                </div>
              </article>
            );
          })}
        </section>

        <section className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-accent/10 to-background border border-border">
          <span className="inline-block px-3 py-1 rounded-full bg-foreground text-background text-xs font-bold">
            {s.justifBadge}
          </span>
          <h2 className="text-2xl font-extrabold text-foreground mt-3">{s.justifTitle}</h2>
          <div className="mt-4 space-y-4 text-sm text-foreground/90 leading-relaxed">
            <p>
              {s.p1Pre}
              <strong>Teachers' Voices</strong>
              {s.p1Mid}
              <strong>Scientix Ambassadors</strong>
              {s.p1End}
              <a
                href="https://op.europa.eu/en/publication-detail/-/publication/a3f80518-fa75-11ee-a251-01aa75ed71a1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-semibold hover:underline"
              >
                {s.guide1}
              </a>
              {" / "}
              <a
                href="https://op.europa.eu/en/publication-detail/-/publication/13d2f74a-fa76-11ee-a251-01aa75ed71a1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-semibold hover:underline"
              >
                {s.guide2}
              </a>
              .
            </p>
            <p>{s.p2}</p>
            <p>{s.p3}</p>
          </div>
        </section>

        <div className="mt-10 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            {s.backHome}
          </Link>
        </div>
      </main>

      <footer className="py-6 text-center text-xs text-muted-foreground border-t border-border mt-10">
        <a href="https://acolliment.vercel.app/" className="hover:underline font-semibold">Acolliment</a>
        {" "}© 2026 by{" "}
        <a href="https://dossier.xtec.cat/cblaya/" className="hover:underline">Cristina Blaya Góngora</a>
      </footer>
    </div>
  );
};

export default About;
