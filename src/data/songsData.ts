import { type LangCode } from "@/hooks/useLanguage";
import { tBlocName } from "@/i18n/blocNames";

export interface Song {
  title: string;
  artist: string;
  /** Direct YouTube video (curated). */
  youtubeId?: string;
  /** Fallback: opens a YouTube search in the target language. */
  searchQuery?: string;
  description: string;
}

// Maps bloc IDs to curated YouTube songs in Catalan
// All YouTube IDs verified from official sources (Dàmaris Gelabert official site, videomusicalis.com, ClapClap)
export const blocSongs: Record<string, Song[]> = {
  salutacions: [
    { title: "Bon Dia!", youtubeId: "BF7w-xJUlwM", artist: "Dàmaris Gelabert", description: "Videoclip oficial per aprendre a dir bon dia en català." },
    { title: "Qui sóc jo?", youtubeId: "_EITuHjRJxc", artist: "Dàmaris Gelabert", description: "Cançó per presentar-se: qui sóc, com em dic, d'on vinc." },
  ],
  animals: [
    { title: "Els mosquits (parts del cos i animals)", youtubeId: "4jVSaapPujY", artist: "Dàmaris Gelabert", description: "Cançó divertida sobre mosquits que piquen: aprèn noms d'animals i parts del cos." },
    { title: "Naturalment", youtubeId: "LBZF2mTvybQ", artist: "Dàmaris Gelabert", description: "Cançó sobre la natura i els animals que hi viuen." },
  ],
  ocells: [
    { title: "La tardor que jo conec", youtubeId: "gYGjWa8Dip4", artist: "Dàmaris Gelabert", description: "Cançó sobre la tardor: ocells, fulles i natura." },
    { title: "Anem d'excursió", youtubeId: "M8lJSvOw4l4", artist: "Dàmaris Gelabert", description: "Anem d'excursió al camp i observem els ocells i la natura." },
  ],
  aula: [
    { title: "Fem una fila", youtubeId: "9g13so-jJqk", artist: "Dàmaris Gelabert", description: "Cançó per fer una fila a l'escola: vocabulari de l'aula." },
    { title: "L'abecedari", youtubeId: "ITUmXHq7Y-A", artist: "Dàmaris Gelabert", description: "Aprèn l'abecedari en català cantant!" },
  ],
  colors: [
    { title: "Cançó dels colors", youtubeId: "HrBoYZq5Xkk", artist: "Contes i Cançons Infantils en Català", description: "Verd, blau, vermell, groc... Aprèn tots els colors cantant!" },
    { title: "Les vocals", youtubeId: "whuKasZzqDU", artist: "Dàmaris Gelabert", description: "A, E, I, O, U – les vocals en català amb colors i dibuixos." },
  ],
  gimnas: [
    { title: "Mou el cos!", youtubeId: "72p1AdzrSs8", artist: "Dàmaris Gelabert", description: "Videoclip oficial per moure el cos i fer exercici cantant." },
    { title: "Els mosquits (parts del cos)", youtubeId: "4jVSaapPujY", artist: "Dàmaris Gelabert", description: "Un mosquit m'ha picat a l'orella, al nas, a la mà... Aprèn les parts del cos!" },
  ],
  "jocs-taula": [
    { title: "Tot sona!", youtubeId: "CfIVJNZRSDQ", artist: "Dàmaris Gelabert", description: "Cançó sobre instruments i jocs musicals: tot sona al nostre voltant!" },
    { title: "Tat!", youtubeId: "soCcuM6zSkg", artist: "Dàmaris Gelabert", description: "Cançó rítmica per jugar i aprendre paraules noves." },
  ],
  mercat: [
    { title: "Fruites i verdures", youtubeId: "fbEIibeZawI", artist: "Dàmaris Gelabert", description: "Poma, plàtan, pastanaga... Aprèn els noms de fruites i verdures." },
    { title: "Sol solet i cançons populars", youtubeId: "2nMyu2WRcPs", artist: "Contes i Cançons Infantils en Català", description: "Col·lecció de cançons populars catalanes amb vocabulari quotidià." },
  ],
  familia: [
    { title: "Tu", youtubeId: "V1p89c4_klU", artist: "Dàmaris Gelabert", description: "Cançó sobre les persones que estimem: família i amics." },
    { title: "La festa de la Pau", youtubeId: "-ISx80tGzgg", artist: "Dàmaris Gelabert", description: "Cançó sobre la convivència, la família i la pau." },
  ],
  "cos-huma": [
    { title: "Els mosquits (parts del cos)", youtubeId: "4jVSaapPujY", artist: "Dàmaris Gelabert", description: "Un mosquit m'ha picat a l'orella, al nas, a la mà... Totes les parts del cos!" },
    { title: "Mou el cos!", youtubeId: "72p1AdzrSs8", artist: "Dàmaris Gelabert", description: "Cap, braços, cames, peus... Mou tot el cos cantant!" },
  ],
  roba: [
    { title: "Comença l'estiu!", youtubeId: "d3NWWRsgO3k", artist: "Dàmaris Gelabert", description: "Cançó d'estiu: banyador, samarreta, sandàlies... roba d'estiu!" },
    { title: "Cançó dels colors", youtubeId: "HrBoYZq5Xkk", artist: "Contes i Cançons Infantils en Català", description: "Groc, groc, groc és el vestit que porto... Colors i roba!" },
  ],
  menjar: [
    { title: "Fruites i verdures", youtubeId: "fbEIibeZawI", artist: "Dàmaris Gelabert", description: "Poma, plàtan, pastanaga... Aprèn vocabulari del menjar." },
    { title: "Anem a la piscina", youtubeId: "oPTr1ViMfXE", artist: "Dàmaris Gelabert", description: "Cançó d'estiu amb vocabulari de menjar i begudes." },
  ],
  numeros: [
    { title: "L'abecedari", youtubeId: "ITUmXHq7Y-A", artist: "Dàmaris Gelabert", description: "Aprèn lletres i números cantant l'abecedari." },
    { title: "Els mesos de l'any", youtubeId: "Wmnol9SPy_8", artist: "Dàmaris Gelabert", description: "Gener, febrer, març... Compta els 12 mesos cantant." },
  ],
  "dies-setmana": [
    { title: "Els dies de la setmana", youtubeId: "4atoVE3t-yo", artist: "Dàmaris Gelabert", description: "Dilluns, dimarts, dimecres... Videoclip oficial dels dies de la setmana." },
    { title: "Els mesos de l'any", youtubeId: "Wmnol9SPy_8", artist: "Dàmaris Gelabert", description: "Gener, febrer, març... tots els mesos de l'any cantant." },
  ],
  emocions: [
    { title: "Bye Bye Monstre", youtubeId: "SqunqCHk0pI", artist: "Dagoll Dagom i Dàmaris Gelabert", description: "Cançó per perdre la por: adéu monstres, hola valentia!" },
    { title: "Aplaudiments!", youtubeId: "OMQD1e_vGiw", artist: "Dàmaris Gelabert", description: "Cançó sobre l'alegria, aplaudir i celebrar junts." },
  ],
  casa: [
    { title: "Rentem les dents", youtubeId: "jo85FWjvdjs", artist: "Dàmaris Gelabert", description: "Cançó sobre la higiene a casa: rentar-se les dents cada dia!" },
    { title: "El núvol de la son", youtubeId: "BgYeSKo7ZBc", artist: "Dàmaris Gelabert", description: "Cançó per anar a dormir: el llit, l'habitació, bona nit!" },
  ],
  transport: [
    { title: "Anem d'excursió", youtubeId: "M8lJSvOw4l4", artist: "Dàmaris Gelabert", description: "Anem d'excursió! Vocabulari de transport i viatges." },
    { title: "Què seré quan sigui gran?", youtubeId: "O2QsUewF-Ow", artist: "Dàmaris Gelabert", description: "Cançó sobre professions: conductor, pilot, bomber..." },
  ],
  natura: [
    { title: "Naturalment", youtubeId: "LBZF2mTvybQ", artist: "Dàmaris Gelabert", description: "Cançó sobre la natura: arbres, rius, muntanyes i animals." },
    { title: "La tardor que jo conec", youtubeId: "gYGjWa8Dip4", artist: "Dàmaris Gelabert", description: "Fulles, pluja, colors de tardor... La natura en català." },
  ],
};

/** Curated songs for languages other than Catalan, keyed by lang then bloc id. */
const songsByLang: Partial<Record<LangCode, Record<string, Song[]>>> = {
  es: {
    salutacions: [
      { title: "Hola, ¿cómo estás?", artist: "Canciones infantiles", youtubeId: "tbnLJDrOouM", description: "Canción de saludos en español." },
    ],
    colors: [
      { title: "La canción de los colores", artist: "Canciones infantiles", youtubeId: "0OSC1jLJC6E", description: "Aprende los colores cantando." },
    ],
    numeros: [
      { title: "Los números del 1 al 10", artist: "Canciones infantiles", youtubeId: "ORHDcCA3RXk", description: "Cuenta del 1 al 10 en español." },
    ],
  },
  en: {
    salutacions: [
      { title: "Hello Song", artist: "Super Simple Songs", youtubeId: "tVlcKp3bWH8", description: "Say hello in English!" },
    ],
    colors: [
      { title: "I See Something Blue", artist: "Super Simple Songs", youtubeId: "jYAWf8Y91hA", description: "Learn the colours in English." },
    ],
    numeros: [
      { title: "Numbers Song 1-10", artist: "Super Simple Songs", youtubeId: "D0Ajq682yrA", description: "Count from 1 to 10 in English." },
    ],
  },
  fr: {
    salutacions: [
      { title: "Bonjour ! Comment ça va ?", artist: "Comptines", youtubeId: "OiHtdeuQ1sc", description: "Chanson de salutations en français." },
    ],
    colors: [
      { title: "La chanson des couleurs", artist: "Comptines", youtubeId: "0jbmzKcpxa4", description: "Apprends les couleurs en chantant." },
    ],
  },
};

/** Word for "children's songs" used to build a YouTube search per language. */
const SEARCH_TERM: Partial<Record<LangCode, string>> = {
  ca: "cançons infantils",
  es: "canciones infantiles",
  gl: "cancións infantís",
  en: "kids songs",
  fr: "comptines pour enfants",
  it: "canzoni per bambini",
  pt: "canções infantis",
  ptBR: "músicas infantis",
  ro: "cântece pentru copii",
  el: "παιδικά τραγούδια",
  uk: "дитячі пісні",
  ar: "أغاني أطفال",
  ur: "بچوں کے گیت",
  hi: "बच्चों के गाने",
  zh: "儿歌",
  wo: "woy ndaw yi",
  mnk: "dindiŋ denkiloolu",
  ha: "أغاني أطفال",
  snk: "lemunu suuxu",
  srk: "lemunu suuxu",
};

/**
 * Songs for a bloc in the language the student is learning.
 * Catalan uses the curated list; other languages use curated songs when
 * available and otherwise a YouTube search link in that language.
 */
export function getSongsForBloc(blocId: string, lang: LangCode = "ca", blocName?: string): Song[] {
  if (lang === "ca") return blocSongs[blocId] || [];

  const curated = songsByLang[lang]?.[blocId];
  if (curated?.length) return curated;

  const term = SEARCH_TERM[lang] ?? SEARCH_TERM.en!;
  const topic = blocName ? tBlocName(blocName, lang) : blocId;
  const query = `${topic} ${term}`;
  return [
    {
      title: query,
      artist: "YouTube",
      searchQuery: query,
      description: `${topic} — ${term}`,
    },
  ];
}
