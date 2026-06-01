import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Languages, Gamepad2, Music, Video, Download, Sparkles } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container py-4 flex items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-2 active:scale-95 transition-transform">
            <span className="text-3xl">🌍</span>
            <div className="text-left">
              <h1 className="text-xl font-extrabold leading-none text-foreground">Acolliment</h1>
              <p className="text-xs text-muted-foreground font-semibold">Com fer-ne ús</p>
            </div>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-muted text-foreground text-sm font-semibold hover:bg-muted/80 transition-all active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Tornar</span>
          </Link>
        </div>
      </header>

      <main className="container py-8 max-w-3xl">
        {/* Intro */}
        <section className="animate-reveal-up space-y-3">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
            Guia d'ús
          </span>
          <h2 className="text-3xl font-extrabold text-foreground text-balance">
            Com fer ús d'aquesta web
          </h2>
          <p className="text-muted-foreground">
            Una eina visual i interactiva pensada per a l'acollida lingüística d'alumnat nouvingut.
            Aquí t'expliquem com aprofitar-la al màxim.
          </p>
        </section>

        {/* Steps */}
        <section className="mt-8 grid gap-4">
          {[
            {
              icon: Languages,
              title: "1. Tria els idiomes",
              text: "A la part superior, selecciona l'idioma que vols aprendre (🎯 Aprenc) i l'idioma d'ajuda (🌍 Ajuda en) que ja coneixes. Així totes les traduccions s'adapten al teu perfil.",
              color: "bg-blue-500",
            },
            {
              icon: BookOpen,
              title: "2. Escull un nivell i un bloc",
              text: "Selecciona el nivell (A1 Bàsic · A2 Elemental · B1 Intermedi) i tria un dels blocs temàtics: la classe, la família, els menjars, les vacances, les professions, els instruments…",
              color: "bg-amber-500",
            },
            {
              icon: Sparkles,
              title: "3. Aprèn amb les fitxes",
              text: "Cada bloc conté fitxes visuals amb la paraula en l'idioma que aprens. Toca per veure la traducció i escoltar la pronunciació amb veu sintètica.",
              color: "bg-pink-500",
            },
            {
              icon: Gamepad2,
              title: "4. Practica amb el joc",
              text: "Al final de cada bloc, prem 'Joc' i posa a prova el que has après. Al final veuràs un resum amb els encerts i errors.",
              color: "bg-green-500",
            },
            {
              icon: Music,
              title: "5. Escolta cançons",
              text: "Alguns blocs inclouen cançons relacionades amb el vocabulari, perfectes per reforçar l'aprenentatge de manera lúdica.",
              color: "bg-purple-500",
            },
            {
              icon: Video,
              title: "6. Mira roleplays animats",
              text: "Al nivell A2 trobaràs vídeos animats amb situacions quotidianes (vacances, taller de tecnologia, aula de música…) per treballar la comprensió oral.",
              color: "bg-indigo-500",
            },
            {
              icon: Download,
              title: "7. Exporta a PDF",
              text: "Amb el botó PDF pots descarregar totes les fitxes del nivell triat per imprimir-les i treballar-les a l'aula sense connexió.",
              color: "bg-rose-500",
            },
          ].map((step) => (
            <article
              key={step.title}
              className="flex gap-4 p-5 rounded-2xl border border-border bg-card hover:shadow-md transition-shadow"
            >
              <div className={`${step.color} text-white rounded-xl p-3 h-fit shrink-0`}>
                <step.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{step.text}</p>
              </div>
            </article>
          ))}
        </section>

        {/* Justification */}
        <section className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-accent/10 to-background border border-border">
          <span className="inline-block px-3 py-1 rounded-full bg-foreground text-background text-xs font-bold">
            Justificació pedagògica
          </span>
          <h2 className="text-2xl font-extrabold text-foreground mt-3">
            Inspirat en les directrius europees
          </h2>
          <div className="mt-4 space-y-4 text-sm text-foreground/90 leading-relaxed">
            <p>
              Aquesta web s'emmarca dins del projecte <strong>Teachers' Voices</strong>, part de la
              iniciativa <strong>Scientix Ambassadors</strong>. Vaig tenir l'oportunitat de compartir
              la meva experiència després de dur a terme un projecte pilot seguint les guies{" "}
              <a
                href="https://op.europa.eu/en/publication-detail/-/publication/a3f80518-fa75-11ee-a251-01aa75ed71a1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-semibold hover:underline"
              >
                «New Guidelines to Help Teachers Lead Europe's Digital Education»
              </a>{" "}
              i{" "}
              <a
                href="https://op.europa.eu/en/publication-detail/-/publication/13d2f74a-fa76-11ee-a251-01aa75ed71a1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-semibold hover:underline"
              >
                «Guidelines for Teaching Informatics: Practical Strategies for European Classrooms»
              </a>
              .
            </p>
            <p>
              Aquestes directrius són una iniciativa emblemàtica del{" "}
              <strong>Digital Education Action Plan (2021–2027)</strong>, que té com a objectiu
              donar suport a la transformació digital dels sistemes educatius arreu d'Europa.
            </p>
            <p>
              L'entrevista en línia, organitzada per la <strong>Comissió Europea</strong>, va ser
              enregistrada i contribuirà a un vídeo testimonial amb finalitats de difusió. Em sento
              molt honrada i agraïda d'haver estat seleccionada per participar-hi i representar la
              feina desenvolupada durant el projecte pilot.
            </p>
          </div>
        </section>

        <div className="mt-10 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            Tornar a l'inici
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
