import { ArrowDown, BookOpen, Globe2, Heart, MessageCircle, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type LangCode } from "@/hooks/useLanguage";
import { langName, t } from "@/i18n/ui";
import heroImage from "@/assets/acolliment-hero.jpg";

type HeroCopy = {
  eyebrow: string;
  lineOne: string;
  lineTwo: string;
  lineThree: string;
  description: string;
  start: string;
  quote: string;
  features: [string, string, string, string];
  featureDetails: [string, string, string, string];
};

const HERO_COPY: Partial<Record<LangCode, HeroCopy>> = {
  ca: {
    eyebrow: "Benvinguts a Acolliment",
    lineOne: "Una llengua nova,",
    lineTwo: "un món per descobrir",
    lineThree: "i compartir.",
    description: "Aprèn al teu ritme, comunica't amb confiança i troba el teu lloc al centre des del primer dia.",
    start: "Comença ara",
    quote: "Quan aprens el llenguatge del centre, s'obren les portes de l'aprenentatge, de l'amistat i del futur.",
    features: ["Més idiomes", "Recursos pràctics", "Inclusió real", "Comunicació"],
    featureDetails: ["Per entendre i fer-se entendre", "Vocabulari, activitats, jocs i molt més", "Tothom aprèn, tothom aporta", "Situacions reals del centre"],
  },
  es: {
    eyebrow: "Bienvenidos a Acolliment",
    lineOne: "Una nueva lengua,",
    lineTwo: "un mundo por descubrir",
    lineThree: "y compartir.",
    description: "Aprende a tu ritmo, comunícate con confianza y encuentra tu lugar en el centro desde el primer día.",
    start: "Empieza ahora",
    quote: "Cuando aprendes la lengua del centro, se abren las puertas del aprendizaje, la amistad y el futuro.",
    features: ["Más idiomas", "Recursos prácticos", "Inclusión real", "Comunicación"],
    featureDetails: ["Para entender y hacerse entender", "Vocabulario, actividades, juegos y mucho más", "Todos aprenden, todos aportan", "Situaciones reales del centro"],
  },
  gl: {
    eyebrow: "Benvidos a Acolliment",
    lineOne: "Unha lingua nova,",
    lineTwo: "un mundo por descubrir",
    lineThree: "e compartir.",
    description: "Aprende ao teu ritmo, comunícate con confianza e atopa o teu lugar no centro desde o primeiro día.",
    start: "Comeza agora",
    quote: "Cando aprendes a lingua do centro, ábrense as portas da aprendizaxe, da amizade e do futuro.",
    features: ["Máis idiomas", "Recursos prácticos", "Inclusión real", "Comunicación"],
    featureDetails: ["Para entender e facerse entender", "Vocabulario, actividades, xogos e moito máis", "Todo o mundo aprende e achega", "Situacións reais do centro"],
  },
  en: {
    eyebrow: "Welcome to Acolliment",
    lineOne: "A new language,",
    lineTwo: "a world to discover",
    lineThree: "and share.",
    description: "Learn at your own pace, communicate with confidence and find your place at school from day one.",
    start: "Start now",
    quote: "When you learn the language of your school, doors open to learning, friendship and the future.",
    features: ["More languages", "Practical resources", "Real inclusion", "Communication"],
    featureDetails: ["Understand and be understood", "Vocabulary, activities, games and more", "Everyone learns and contributes", "Real situations at school"],
  },
  fr: {
    eyebrow: "Bienvenue à Acolliment",
    lineOne: "Une nouvelle langue,",
    lineTwo: "un monde à découvrir",
    lineThree: "et à partager.",
    description: "Apprends à ton rythme, communique avec confiance et trouve ta place à l'école dès le premier jour.",
    start: "Commencer",
    quote: "Apprendre la langue de l'école ouvre les portes de l'apprentissage, de l'amitié et de l'avenir.",
    features: ["Plus de langues", "Ressources pratiques", "Inclusion réelle", "Communication"],
    featureDetails: ["Comprendre et se faire comprendre", "Vocabulaire, activités, jeux et plus", "Tout le monde apprend et contribue", "Situations réelles à l'école"],
  },
  pt: {
    eyebrow: "Bem-vindos ao Acolliment",
    lineOne: "Uma nova língua,",
    lineTwo: "um mundo para descobrir",
    lineThree: "e partilhar.",
    description: "Aprende ao teu ritmo, comunica com confiança e encontra o teu lugar na escola desde o primeiro dia.",
    start: "Começar agora",
    quote: "Quando aprendes a língua da escola, abrem-se as portas da aprendizagem, da amizade e do futuro.",
    features: ["Mais idiomas", "Recursos práticos", "Inclusão real", "Comunicação"],
    featureDetails: ["Compreender e ser compreendido", "Vocabulário, atividades, jogos e mais", "Todos aprendem e contribuem", "Situações reais na escola"],
  },
};

const FEATURE_ICONS = [Globe2, BookOpen, UsersRound, MessageCircle];

interface WelcomeHeroProps {
  helpLang: LangCode;
  targetLang: LangCode;
  onStart: () => void;
}

export function WelcomeHero({ helpLang, targetLang, onStart }: WelcomeHeroProps) {
  const copy = HERO_COPY[helpLang] ?? HERO_COPY.en;
  if (!copy) return null;

  return (
    <section className="relative isolate overflow-hidden border-b border-border bg-background" aria-labelledby="welcome-title">
      <div className="absolute inset-0 -z-20">
        <img
          src={heroImage}
          alt="Cinc estudiants arribant junts a un centre educatiu"
          width={1536}
          height={1024}
          fetchPriority="high"
          className="h-full w-full object-cover object-[62%_center]"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/95 to-background/10 md:via-background/80" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-transparent to-transparent" />

      <div className="container flex min-h-[620px] items-center pb-28 pt-12 sm:min-h-[680px] sm:pt-16 lg:min-h-[720px]">
        <div className="max-w-2xl animate-reveal-up">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-2 text-sm font-extrabold text-foreground shadow-sm backdrop-blur-sm">
            <Heart className="h-4 w-4 text-bloom-pink" aria-hidden="true" />
            {copy.eyebrow}
          </p>
          <h1 id="welcome-title" className="max-w-xl text-4xl font-black leading-[1.04] text-foreground sm:text-5xl lg:text-6xl">
            {copy.lineOne}{" "}
            <span className="text-bloom-teal">{copy.lineTwo}</span>{" "}
            <span className="text-primary">{copy.lineThree}</span>
          </h1>
          <p className="mt-6 max-w-xl text-base font-semibold leading-relaxed text-foreground/80 sm:text-lg">
            {copy.description}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button onClick={onStart} size="lg" className="h-12 rounded-full px-6 text-base font-extrabold shadow-lg">
              <Heart className="h-5 w-5" aria-hidden="true" />
              {copy.start}
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </Button>
            <span className="rounded-full border border-border bg-background/75 px-4 py-2 text-sm font-bold text-foreground backdrop-blur-sm">
              {t(helpLang, "learning")}: {langName(targetLang, helpLang)}
            </span>
          </div>
        </div>
      </div>

      <div className="relative border-t border-border/70 bg-background/90 backdrop-blur-md">
        <div className="container grid grid-cols-2 divide-x divide-y divide-border sm:grid-cols-4 sm:divide-y-0">
          {copy.features.map((feature, index) => {
            const Icon = FEATURE_ICONS[index];
            return (
              <div key={feature} className="flex min-h-28 items-center gap-3 px-3 py-5 sm:px-5">
                <Icon className="h-8 w-8 shrink-0 text-secondary" strokeWidth={1.8} aria-hidden="true" />
                <div>
                  <p className="font-extrabold text-foreground">{feature}</p>
                  <p className="mt-1 text-xs font-semibold leading-snug text-muted-foreground">{copy.featureDetails[index]}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-muted/50 py-4">
        <p className="container flex max-w-5xl items-start justify-center gap-3 text-center text-sm font-bold leading-relaxed text-foreground/80 sm:text-base">
          <span className="text-2xl leading-none text-bloom-purple" aria-hidden="true">“</span>
          {copy.quote}
          <span className="text-2xl leading-none text-bloom-purple" aria-hidden="true">”</span>
        </p>
      </div>
    </section>
  );
}