export interface Song {
  title: string;
  artist: string;
  youtubeId: string;
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

export function getSongsForBloc(blocId: string): Song[] {
  return blocSongs[blocId] || [];
}
