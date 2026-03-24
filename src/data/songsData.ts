export interface Song {
  title: string;
  artist: string;
  youtubeId: string;
  description: string;
}

// Maps bloc IDs to curated YouTube songs in Catalan
export const blocSongs: Record<string, Song[]> = {
  salutacions: [
    { title: "Bon Dia!", youtubeId: "hKMN9sNaJvY", artist: "Cançons Infantils en Català", description: "Cançó per aprendre a saludar i dir bon dia en català." },
    { title: "Hola, bona tarda!", youtubeId: "3U369c8Sq6s", artist: "Super Simple Català", description: "Salutacions del dia: bon dia, bona tarda, bona nit." },
  ],
  animals: [
    { title: "Els animals de la granja", youtubeId: "usS6pMfh3RA", artist: "Smile and Learn - Català", description: "Aprèn els noms dels animals de granja en català." },
    { title: "Tinc un elefant", youtubeId: "W-TE_Ijs4cM", artist: "Cançons Infantils en Català", description: "Cançó divertida sobre animals salvatges." },
  ],
  ocells: [
    { title: "L'oreneta", youtubeId: "BscPE9t7ld4", artist: "Dàmaris Gelabert", description: "Cançó sobre l'oreneta i els ocells migratoris." },
    { title: "El pardal", youtubeId: "9SKHLcpuiEQ", artist: "Cançons Populars Catalanes", description: "Cançó popular sobre un pardalet." },
  ],
  aula: [
    { title: "Anem a l'escola", youtubeId: "QS78mTnf1XY", artist: "Smile and Learn - Català", description: "Vocabulari de l'aula i material escolar." },
    { title: "La cançó de l'escola", youtubeId: "5P-kE33r8Xo", artist: "Cançons Infantils en Català", description: "Què portem a la motxilla? Llibres, llapis i quaderns!" },
  ],
  colors: [
    { title: "Cançó dels colors", youtubeId: "z10JE9DQMBE", artist: "Cançons Infantils en Català", description: "Groc, blau, vermell... Aprèn tots els colors cantant!" },
    { title: "De quin color és?", youtubeId: "mT9zY9azG9Y", artist: "Super Simple Català", description: "Joc musical per identificar colors." },
  ],
  gimnas: [
    { title: "Mou el cos!", youtubeId: "388Q44ReOWE", artist: "Dàmaris Gelabert", description: "Cançó per moure el cos i fer exercici." },
    { title: "Cap, espatlles, genolls i peus", youtubeId: "QA48wTGbU0A", artist: "Super Simple Català", description: "La cançó clàssica adaptada al català!" },
  ],
  "jocs-taula": [
    { title: "Juguem junts!", youtubeId: "RD9LfcGbIzk", artist: "Cançons Infantils en Català", description: "Cançó sobre jugar, compartir i divertir-se." },
    { title: "El joc dels daus", youtubeId: "Y-F7Uo1Wj0A", artist: "Eines Musicals", description: "Aprèn vocabulari de jocs amb música." },
  ],
  mercat: [
    { title: "Anem al mercat!", youtubeId: "KDE6i4kEhCc", artist: "Smile and Learn - Català", description: "Fruita, verdura, pa... Comprem al mercat!" },
    { title: "Les fruites", youtubeId: "vKYHo1MNe5g", artist: "Cançons Infantils en Català", description: "Cançó per aprendre els noms de les fruites." },
  ],
  familia: [
    { title: "La família", youtubeId: "d9BjS4h0OqQ", artist: "Cançons Infantils en Català", description: "Mare, pare, germà, germana, avi, àvia..." },
    { title: "Dits de la mà - La família", youtubeId: "OH8hGkU7E34", artist: "Super Simple Català", description: "Finger Family en català: cada dit és un membre!" },
  ],
  "cos-huma": [
    { title: "Les parts del cos", youtubeId: "SUt8q0EKbms", artist: "Dàmaris Gelabert", description: "Cap, ulls, nas, boca... tot el cos cantant!" },
    { title: "Cap, espatlles, genolls i peus", youtubeId: "QA48wTGbU0A", artist: "Super Simple Català", description: "Head, shoulders, knees and toes en català." },
  ],
  roba: [
    { title: "Quina roba portes?", youtubeId: "z3p_9lAH2qY", artist: "Smile and Learn - Català", description: "Samarreta, pantalons, jaqueta... el vocabulari de la roba." },
    { title: "Ens vestim!", youtubeId: "nX8O31IWbHI", artist: "Cançons Infantils en Català", description: "Cançó per aprendre a vestir-se en català." },
  ],
  menjar: [
    { title: "Tinc gana!", youtubeId: "fXPq_yt1tmA", artist: "Cançons Infantils en Català", description: "Cançó sobre el menjar i els àpats del dia." },
    { title: "Les fruites i verdures", youtubeId: "vKYHo1MNe5g", artist: "Smile and Learn - Català", description: "Poma, plàtan, pastanaga... Mengem sa!" },
  ],
  numeros: [
    { title: "Els números de l'1 al 10", youtubeId: "Aq4UAss-_xQ", artist: "Smile and Learn - Català", description: "Aprèn a comptar de l'1 al 10 amb música." },
    { title: "Cinc cançons per comptar", youtubeId: "hy2GFEIY3EM", artist: "Titelles Pamipipa", description: "Cançons per comptar amb els dits de la mà." },
  ],
  "dies-setmana": [
    { title: "Els dies de la setmana", youtubeId: "loINl3Ln6Ck", artist: "Smile and Learn - Català", description: "Dilluns, dimarts... aprèn els dies cantant!" },
    { title: "Els mesos de l'any", youtubeId: "Fe9bnYRzFvk", artist: "Cançons Infantils en Català", description: "Gener, febrer, març... tots els mesos." },
  ],
  emocions: [
    { title: "Com et sents avui?", youtubeId: "akTRWJZMks0", artist: "Dàmaris Gelabert", description: "Content, trist, enfadat... Les emocions en català." },
    { title: "El monstre de colors", youtubeId: "MOmFGasBv0c", artist: "Smile and Learn - Català", description: "Cançó basada en el conte sobre les emocions." },
  ],
  casa: [
    { title: "La meva casa", youtubeId: "p_L22rOBTmA", artist: "Cançons Infantils en Català", description: "Cuina, habitació, bany... les parts de la casa." },
    { title: "Endrecem la casa!", youtubeId: "DPHGHbzBaeQ", artist: "Super Simple Català", description: "Cançó per aprendre vocabulari de la llar." },
  ],
  transport: [
    { title: "Les rodes de l'autobús", youtubeId: "w8FP-Pm03yA", artist: "Cançons Infantils en Català", description: "La cançó de l'autobús en català!" },
    { title: "Vehicles i transports", youtubeId: "Q_RHgSZj2d0", artist: "Smile and Learn - Català", description: "Cotxe, tren, avió... tots els transports." },
  ],
  natura: [
    { title: "La natura és genial!", youtubeId: "JD3VFjrGBCo", artist: "Dàmaris Gelabert", description: "Arbres, rius, muntanyes... la natura en català." },
    { title: "Cançó del sol i la pluja", youtubeId: "K2bIh8-gGX0", artist: "Super Simple Català", description: "Fa sol? Plou? Canta sobre el temps!" },
  ],
};

export function getSongsForBloc(blocId: string): Song[] {
  return blocSongs[blocId] || [];
}
