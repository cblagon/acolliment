import { Link } from "react-router-dom";
import { ArrowLeft, Chrome, Volume2, Mic, Wifi, Sparkles, AlertTriangle } from "lucide-react";
import { useLanguages } from "@/hooks/useLanguage";
import type { LangCode } from "@/hooks/useLanguage";

type Strings = {
  back: string;
  badge: string;
  title: string;
  intro: string;
  chromeTitle: string;
  chromeWhy: string;
  chromeBullets: string[];
  otherTitle: string;
  otherText: string;
  micTitle: string;
  micText: string;
  netTitle: string;
  netText: string;
  tipsTitle: string;
  tips: string[];
  backHome: string;
};

const STRINGS: Partial<Record<LangCode, Strings>> = {
  ca: {
    back: "Tornar",
    badge: "Recomanacions",
    title: "Per a una millor experiència",
    intro:
      "Aquesta web utilitza veu sintètica (TTS), reconeixement de veu i traducció automàtica. Per gaudir-ne al màxim, et recomanem fer servir Google Chrome.",
    chromeTitle: "Fes servir Google Chrome",
    chromeWhy: "Les veus i el reconeixement de veu sonen i funcionen molt millor a Chrome perquè:",
    chromeBullets: [
      "Chrome incorpora veus naturals d'alta qualitat de Google per a desenes d'idiomes (català, àrab, urdú, xinès, romanès…), mentre que altres navegadors només tenen les veus del sistema operatiu, sovint robòtiques o inexistents per a moltes llengües.",
      "El reconeixement de veu (Web Speech API) funciona de manera fiable a Chrome i Edge; a Safari i Firefox està limitat o desactivat.",
      "Les actualitzacions de Chrome inclouen millores constants de la síntesi de veu.",
    ],
    otherTitle: "Altres navegadors",
    otherText:
      "Safari, Firefox i altres navegadors poden no reproduir l'àudio en l'idioma triat, fer servir una veu robòtica o no permetre el reconeixement de veu. Si no sents bé la pronunciació, prova-ho amb Chrome.",
    micTitle: "Permisos del micròfon",
    micText:
      "Per practicar la pronunciació, accepta els permisos del micròfon quan el navegador els demani. Comprova també que el micròfon del dispositiu funciona.",
    netTitle: "Connexió a Internet",
    netText:
      "La traducció dels diàlegs i alguns àudios requereixen connexió. Si la traducció triga o falla, comprova la connexió i torna-ho a provar.",
    tipsTitle: "Altres consells",
    tips: [
      "Apuja el volum del dispositiu i activa el so 🔊 dins l'aplicació.",
      "Si fas servir auriculars, sentiràs millor la pronunciació.",
      "Tanca altres pestanyes que reprodueixin so per evitar interferències.",
      "Si una veu no s'escolta, espera uns segons: Chrome carrega les veus la primera vegada.",
    ],
    backHome: "Tornar a l'inici",
  },
  es: {
    back: "Volver",
    badge: "Recomendaciones",
    title: "Para una mejor experiencia",
    intro:
      "Esta web usa voz sintética (TTS), reconocimiento de voz y traducción automática. Para disfrutarla al máximo, recomendamos usar Google Chrome.",
    chromeTitle: "Usa Google Chrome",
    chromeWhy: "Las voces y el reconocimiento de voz funcionan mucho mejor en Chrome porque:",
    chromeBullets: [
      "Chrome incorpora voces naturales de alta calidad de Google para decenas de idiomas (catalán, árabe, urdu, chino, rumano…), mientras que otros navegadores solo usan las voces del sistema, a menudo robóticas o inexistentes para muchos idiomas.",
      "El reconocimiento de voz (Web Speech API) funciona de forma fiable en Chrome y Edge; en Safari y Firefox está limitado o desactivado.",
      "Las actualizaciones de Chrome incluyen mejoras constantes de la síntesis de voz.",
    ],
    otherTitle: "Otros navegadores",
    otherText:
      "Safari, Firefox y otros pueden no reproducir el audio en el idioma elegido, usar una voz robótica o no permitir el reconocimiento de voz. Si no oyes bien la pronunciación, prueba con Chrome.",
    micTitle: "Permisos del micrófono",
    micText:
      "Para practicar la pronunciación, acepta los permisos del micrófono cuando el navegador los pida. Comprueba también que el micrófono del dispositivo funciona.",
    netTitle: "Conexión a Internet",
    netText:
      "La traducción de los diálogos y algunos audios requieren conexión. Si la traducción tarda o falla, comprueba la conexión y vuelve a intentarlo.",
    tipsTitle: "Otros consejos",
    tips: [
      "Sube el volumen del dispositivo y activa el sonido 🔊 dentro de la aplicación.",
      "Con auriculares oirás mejor la pronunciación.",
      "Cierra otras pestañas que reproduzcan sonido para evitar interferencias.",
      "Si una voz no se oye, espera unos segundos: Chrome carga las voces la primera vez.",
    ],
    backHome: "Volver al inicio",
  },
  en: {
    back: "Back",
    badge: "Recommendations",
    title: "For the best experience",
    intro:
      "This site uses text-to-speech, speech recognition and automatic translation. For the best experience we recommend Google Chrome.",
    chromeTitle: "Use Google Chrome",
    chromeWhy: "Voices and speech recognition work much better in Chrome because:",
    chromeBullets: [
      "Chrome includes Google's high-quality natural voices for dozens of languages (Catalan, Arabic, Urdu, Chinese, Romanian…), while other browsers only use the operating system voices, often robotic or unavailable for many languages.",
      "Speech recognition (Web Speech API) works reliably in Chrome and Edge; in Safari and Firefox it is limited or disabled.",
      "Chrome updates ship constant improvements to speech synthesis.",
    ],
    otherTitle: "Other browsers",
    otherText:
      "Safari, Firefox and others may not play audio in the selected language, may use a robotic voice or may block speech recognition. If pronunciation sounds wrong, try Chrome.",
    micTitle: "Microphone permissions",
    micText:
      "To practise pronunciation, accept the microphone permissions when the browser asks. Make sure your device microphone is working.",
    netTitle: "Internet connection",
    netText:
      "Dialogue translations and some audio need a connection. If translation is slow or fails, check your connection and try again.",
    tipsTitle: "Other tips",
    tips: [
      "Turn up the device volume and enable sound 🔊 inside the app.",
      "Headphones make the pronunciation clearer.",
      "Close other tabs playing sound to avoid interference.",
      "If a voice does not play, wait a few seconds: Chrome loads voices on first use.",
    ],
    backHome: "Back to home",
  },
};

export default function Recomanacions() {
  const { helpLang } = useLanguages();
  const s = STRINGS[helpLang] ?? STRINGS.ca!;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          {s.back}
        </Link>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          {s.badge}
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4">{s.title}</h1>
        <p className="text-muted-foreground mb-8">{s.intro}</p>

        <section className="rounded-2xl border border-border bg-card p-6 mb-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Chrome className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold">{s.chromeTitle}</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{s.chromeWhy}</p>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            {s.chromeBullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
          <a
            href="https://www.google.com/chrome/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition"
          >
            <Chrome className="w-4 h-4" />
            chrome.google.com
          </a>
        </section>

        <section className="rounded-2xl border border-amber-300/40 bg-amber-50 dark:bg-amber-950/20 p-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-300 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold">{s.otherTitle}</h2>
          </div>
          <p className="text-sm">{s.otherText}</p>
        </section>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <section className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 mb-2">
              <Mic className="w-5 h-5 text-primary" />
              <h3 className="font-bold">{s.micTitle}</h3>
            </div>
            <p className="text-sm text-muted-foreground">{s.micText}</p>
          </section>
          <section className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 mb-2">
              <Wifi className="w-5 h-5 text-primary" />
              <h3 className="font-bold">{s.netTitle}</h3>
            </div>
            <p className="text-sm text-muted-foreground">{s.netText}</p>
          </section>
        </div>

        <section className="rounded-2xl border border-border bg-card p-6 mb-8">
          <div className="flex items-center gap-3 mb-3">
            <Volume2 className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold">{s.tipsTitle}</h2>
          </div>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            {s.tips.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </section>

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          {s.backHome}
        </Link>
      </div>
    </div>
  );
}
