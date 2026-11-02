import type { GrammarTopic } from "@/components/GrammarSection";

/** Extra Catalan grammar topics (rules in Catalan). */
export const GRAMMAR_CA_EXTRA: Record<"A1" | "A2" | "B1", GrammarTopic[]> = {
  A1: [
    {
      title: "Els demostratius", emoji: "👉",
      rule: "Per assenyalar el que és a prop diem aquest, aquesta, aquests, aquestes. Per al que és lluny diem aquell, aquella, aquells, aquelles.",
      examples: [
        { text: "Aquest llibre és meu.", translation: "a prop, masculí" },
        { text: "Aquesta noia és la Laia.", translation: "a prop, femení" },
        { text: "Aquell edifici és l'escola.", translation: "lluny, masculí" },
        { text: "Aquelles cadires són noves.", translation: "lluny, femení plural" },
      ],
      questions: [
        { question: "___ bolígraf (aquí) és blau.", options: ["Aquest", "Aquesta", "Aquells"], answer: 0, explanation: "Bolígraf és masculí singular i és a prop: aquest." },
        { question: "___ muntanya (lluny) és alta.", options: ["Aquesta", "Aquella", "Aquell"], answer: 1, explanation: "Muntanya és femení i és lluny: aquella." },
        { question: "___ nens (aquí) juguen.", options: ["Aquests", "Aquestes", "Aquell"], answer: 0, explanation: "Masculí plural, a prop: aquests." },
        { question: "___ cases (lluny) són velles.", options: ["Aquells", "Aquestes", "Aquelles"], answer: 2, explanation: "Femení plural, lluny: aquelles." },
        { question: "___ taula (aquí) és petita.", options: ["Aquesta", "Aquest", "Aquelles"], answer: 0, explanation: "Femení singular, a prop: aquesta." },
      ],
    },
    {
      title: "El verb tenir", emoji: "🎒",
      rule: "Tenir serveix per dir què és nostre, l'edat o com ens sentim: jo tinc, tu tens, ell/ella té, nosaltres tenim, vosaltres teniu, ells/elles tenen.",
      examples: [
        { text: "Tinc catorze anys.", translation: "edat" },
        { text: "Tens un germà?", translation: "família" },
        { text: "Ella té gana.", translation: "com se sent" },
        { text: "Tenim classe de matemàtiques.", translation: "horari" },
      ],
      questions: [
        { question: "Jo ___ dues germanes.", options: ["té", "tinc", "tenim"], answer: 1, explanation: "Jo → tinc." },
        { question: "Nosaltres ___ set.", options: ["tenim", "teniu", "tenen"], answer: 0, explanation: "Nosaltres → tenim." },
        { question: "El Pau ___ quinze anys.", options: ["tens", "té", "tenen"], answer: 1, explanation: "Ell → té." },
        { question: "Vosaltres ___ deures?", options: ["teniu", "tenim", "tinc"], answer: 0, explanation: "Vosaltres → teniu." },
        { question: "Elles ___ fred.", options: ["té", "tens", "tenen"], answer: 2, explanation: "Elles → tenen." },
      ],
    },
    {
      title: "Hi ha", emoji: "🏫",
      rule: "Per dir que una cosa existeix en un lloc fem servir hi ha, tant en singular com en plural. Per negar: no hi ha.",
      examples: [
        { text: "A la classe hi ha una pissarra.", translation: "singular" },
        { text: "Hi ha vint alumnes.", translation: "plural" },
        { text: "No hi ha pa.", translation: "negació" },
        { text: "Hi ha un parc a prop?", translation: "pregunta" },
      ],
      questions: [
        { question: "Al pati ___ molts arbres.", options: ["hi ha", "és", "té"], answer: 0, explanation: "Existència en un lloc: hi ha." },
        { question: "A la nevera no ___ llet.", options: ["és", "hi ha", "està"], answer: 1, explanation: "Negació d'existència: no hi ha." },
        { question: "___ una farmàcia a prop?", options: ["Té", "Està", "Hi ha"], answer: 2, explanation: "Pregunta d'existència: hi ha?" },
        { question: "A la motxilla ___ tres llibres.", options: ["hi ha", "hi han", "són"], answer: 0, explanation: "Hi ha no canvia en plural." },
        { question: "Al carrer ___ cotxes.", options: ["hi ha", "tenen", "som"], answer: 0, explanation: "Existència: hi ha." },
      ],
    },
    {
      title: "Les preguntes", emoji: "❓",
      rule: "Per preguntar fem servir: qui (persona), què (cosa), on (lloc), quan (temps), com (manera), quant/quants (quantitat) i per què (causa).",
      examples: [
        { text: "Qui és la teva professora?", translation: "persona" },
        { text: "On vius?", translation: "lloc" },
        { text: "Quan comença la classe?", translation: "temps" },
        { text: "Quants anys tens?", translation: "quantitat" },
      ],
      questions: [
        { question: "___ et dius? — Em dic Omar.", options: ["Com", "On", "Quan"], answer: 0, explanation: "Per preguntar el nom: com et dius?" },
        { question: "___ vius? — A Girona.", options: ["Qui", "On", "Què"], answer: 1, explanation: "Lloc: on." },
        { question: "___ menges? — Una poma.", options: ["Què", "Qui", "Quan"], answer: 0, explanation: "Cosa: què." },
        { question: "___ és el teu aniversari? — Al maig.", options: ["On", "Com", "Quan"], answer: 2, explanation: "Temps: quan." },
        { question: "___ plores? — Perquè estic trist.", options: ["Per què", "Qui", "Quants"], answer: 0, explanation: "Causa: per què." },
      ],
    },
  ],
  A2: [
    {
      title: "La negació", emoji: "🚫",
      rule: "Per negar posem no davant del verb. Amb mai, res, ningú i gens també posem no: no vinc mai, no veig res, no hi ha ningú.",
      examples: [
        { text: "No m'agrada el peix.", translation: "negació simple" },
        { text: "No arribo mai tard.", translation: "mai" },
        { text: "No hi ha ningú a casa.", translation: "ningú" },
        { text: "No he menjat res.", translation: "res" },
      ],
      questions: [
        { question: "No veig ___ (cap persona).", options: ["res", "ningú", "mai"], answer: 1, explanation: "Cap persona: ningú." },
        { question: "No bec ___ cafè (cap vegada).", options: ["mai", "ningú", "gens"], answer: 0, explanation: "Cap vegada: mai." },
        { question: "No vull ___ (cap cosa).", options: ["ningú", "res", "mai"], answer: 1, explanation: "Cap cosa: res." },
        { question: "Ell ___ parla anglès.", options: ["no", "res", "ningú"], answer: 0, explanation: "Negació simple: no davant del verb." },
        { question: "No tinc ___ de gana (gens).", options: ["gens", "mai", "ningú"], answer: 0, explanation: "Quantitat zero: gens." },
      ],
    },
    {
      title: "Preposicions de lloc", emoji: "📍",
      rule: "Per dir on és una cosa: a/en (dins d'un lloc), sobre o damunt de, sota de, davant de, darrere de, al costat de, entre.",
      examples: [
        { text: "El llibre és sobre la taula.", translation: "a sobre" },
        { text: "El gat és sota el llit.", translation: "a sota" },
        { text: "L'escola és davant del parc.", translation: "davant" },
        { text: "Sec al costat de la Fàtima.", translation: "al costat" },
      ],
      questions: [
        { question: "La motxilla és ___ la cadira (a baix).", options: ["sota", "sobre", "davant"], answer: 0, explanation: "A baix: sota." },
        { question: "El quadre és ___ la paret (enganxat a dalt).", options: ["sota", "a", "darrere"], answer: 1, explanation: "Lloc: a la paret." },
        { question: "El banc és ___ de l'escola (a la part del darrere).", options: ["davant", "darrere", "entre"], answer: 1, explanation: "A la part posterior: darrere." },
        { question: "La farmàcia és ___ el forn i el bar.", options: ["entre", "sota", "sobre"], answer: 0, explanation: "En mig de dues coses: entre." },
        { question: "El mòbil és ___ la taula (a dalt).", options: ["sota", "sobre", "darrere"], answer: 1, explanation: "A dalt: sobre." },
      ],
    },
    {
      title: "L'obligació: haver de i cal", emoji: "📋",
      rule: "Per dir que una cosa és obligatòria: haver de + infinitiu (he d'estudiar, has de venir) o cal + infinitiu, que és impersonal (cal portar el carnet).",
      examples: [
        { text: "He de fer els deures.", translation: "obligació personal" },
        { text: "Hem de sortir a les vuit.", translation: "nosaltres" },
        { text: "Cal portar bata al laboratori.", translation: "impersonal" },
        { text: "Heu d'escoltar el professor.", translation: "vosaltres" },
      ],
      questions: [
        { question: "Jo ___ estudiar per a l'examen.", options: ["he de", "has de", "cal"], answer: 0, explanation: "Jo → he de." },
        { question: "Tu ___ arribar puntual.", options: ["hem de", "has de", "han de"], answer: 1, explanation: "Tu → has de." },
        { question: "___ fer silenci a la biblioteca.", options: ["Cal", "He de", "Tens"], answer: 0, explanation: "Norma general, impersonal: cal." },
        { question: "Ells ___ netejar la classe.", options: ["han de", "heu de", "ha de"], answer: 0, explanation: "Ells → han de." },
        { question: "Nosaltres ___ portar l'esmorzar.", options: ["hem de", "han de", "cal de"], answer: 0, explanation: "Nosaltres → hem de." },
      ],
    },
    {
      title: "L'imperatiu", emoji: "📢",
      rule: "L'imperatiu serveix per donar ordres o consells. Per a tu, en els verbs en -ar: parla, escolta, mira. Per a vosaltres: parleu, escolteu, mireu. Alguns són irregulars: vine, fes, digues.",
      examples: [
        { text: "Escolta bé!", translation: "tu" },
        { text: "Obriu el llibre.", translation: "vosaltres" },
        { text: "Vine aquí, si us plau.", translation: "irregular: venir" },
        { text: "Fes els deures.", translation: "irregular: fer" },
      ],
      questions: [
        { question: "(tu, mirar) ___ la pissarra!", options: ["Mira", "Mireu", "Miro"], answer: 0, explanation: "Tu → mira." },
        { question: "(vosaltres, seure) ___ a la cadira.", options: ["Seu", "Seieu", "Sec"], answer: 1, explanation: "Vosaltres → seieu." },
        { question: "(tu, venir) ___ amb mi.", options: ["Vens", "Vine", "Veniu"], answer: 1, explanation: "Imperatiu irregular de venir: vine." },
        { question: "(vosaltres, escoltar) ___ la cançó.", options: ["Escolta", "Escolteu", "Escolten"], answer: 1, explanation: "Vosaltres → escolteu." },
        { question: "(tu, fer) ___ silenci!", options: ["Fas", "Feu", "Fes"], answer: 2, explanation: "Imperatiu irregular de fer: fes." },
      ],
    },
  ],
  B1: [
    {
      title: "El perfet", emoji: "✅",
      rule: "El perfet parla d'accions acabades en un temps que encara dura (avui, aquesta setmana, mai, ja): haver (he, has, ha, hem, heu, han) + participi (menjat, vist, fet).",
      examples: [
        { text: "Avui he anat a la biblioteca.", translation: "avui" },
        { text: "Aquesta setmana hem fet un examen.", translation: "aquesta setmana" },
        { text: "Has estat mai a Barcelona?", translation: "experiència" },
        { text: "Ja han arribat.", translation: "ja" },
      ],
      questions: [
        { question: "Avui jo ___ esmorzat a casa.", options: ["he", "vaig", "ha"], answer: 0, explanation: "Avui → perfet: he esmorzat." },
        { question: "Aquest matí nosaltres ___ jugat a futbol.", options: ["han", "hem", "heu"], answer: 1, explanation: "Nosaltres → hem." },
        { question: "Ells encara no ___ acabat.", options: ["han", "ha", "hem"], answer: 0, explanation: "Ells → han." },
        { question: "El participi de fer és…", options: ["fet", "fat", "ferit"], answer: 0, explanation: "Fer → fet." },
        { question: "Tu ___ vist la pel·lícula?", options: ["has", "he", "heu"], answer: 0, explanation: "Tu → has." },
      ],
    },
    {
      title: "El present de subjuntiu", emoji: "🙏",
      rule: "Fem servir el subjuntiu després d'expressions de desig, consell o sentiment amb que: vull que vinguis, espero que estiguis bé. Verbs en -ar: que parli, parlis, parli, parlem, parleu, parlin.",
      examples: [
        { text: "Vull que estudiïs més.", translation: "desig" },
        { text: "Espero que tinguis sort.", translation: "esperança" },
        { text: "És important que escoltem.", translation: "valoració" },
        { text: "M'agrada que vinguis.", translation: "sentiment" },
      ],
      questions: [
        { question: "Vull que tu ___ (parlar) amb ella.", options: ["parles", "parlis", "parlaràs"], answer: 1, explanation: "Després de vull que → subjuntiu: parlis." },
        { question: "Espero que ells ___ (arribar) aviat.", options: ["arribin", "arriben", "arribaran"], answer: 0, explanation: "Subjuntiu, ells: arribin." },
        { question: "És necessari que nosaltres ___ (estudiar).", options: ["estudiem", "estudiarem", "estudiàvem"], answer: 0, explanation: "Subjuntiu, nosaltres: estudiem." },
        { question: "M'agrada que tu ___ (venir).", options: ["vens", "vinguis", "vindràs"], answer: 1, explanation: "Subjuntiu irregular de venir: vinguis." },
        { question: "Sé que tu ___ raó.", options: ["tens", "tinguis", "tingui"], answer: 0, explanation: "Saber que expressa certesa → indicatiu: tens." },
      ],
    },
    {
      title: "Els relatius", emoji: "🔁",
      rule: "Els relatius uneixen dues frases. Que es refereix a persones o coses: el noi que viu aquí. On es refereix a un lloc: la ciutat on vaig néixer. Després de preposició, amb coses: el qual / què (la llibreta amb què escric).",
      examples: [
        { text: "El noi que porta ulleres és el meu cosí.", translation: "que: persona" },
        { text: "El llibre que llegeixo és divertit.", translation: "que: cosa" },
        { text: "Aquest és el poble on visc.", translation: "on: lloc" },
        { text: "La raó per la qual t'escric és important.", translation: "preposició + la qual" },
      ],
      questions: [
        { question: "La noia ___ parla és la Nadia.", options: ["que", "on", "qui"], answer: 0, explanation: "Subjecte persona: que." },
        { question: "L'escola ___ estudio és gran.", options: ["que", "on", "què"], answer: 1, explanation: "Lloc: on." },
        { question: "La pel·lícula ___ vam veure era trista.", options: ["on", "que", "qual"], answer: 1, explanation: "Complement cosa: que." },
        { question: "El llapis amb ___ dibuixo és vermell.", options: ["que", "què", "on"], answer: 1, explanation: "Després de preposició amb coses: què." },
        { question: "El parc ___ juguem és a prop.", options: ["on", "que", "qui"], answer: 0, explanation: "Lloc: on." },
      ],
    },
    {
      title: "Pronoms de complement directe", emoji: "🎯",
      rule: "Per no repetir el complement directe fem servir: el (masculí), la (femení), els (masculí plural), les (femení plural). Davant de vocal: l'. Darrere de l'infinitiu: -lo, -la, -los, -les.",
      examples: [
        { text: "El llibre? El llegeixo ara.", translation: "el" },
        { text: "La Marta? La veig cada dia.", translation: "la" },
        { text: "Les claus? Les tinc jo.", translation: "les" },
        { text: "El pastís? Vull menjar-lo.", translation: "darrere de l'infinitiu" },
      ],
      questions: [
        { question: "Els deures? ___ faig a la tarda.", options: ["Els", "Les", "La"], answer: 0, explanation: "Deures, masculí plural: els." },
        { question: "La pel·lícula? ___ vull veure.", options: ["El", "La", "Les"], answer: 1, explanation: "Femení singular: la." },
        { question: "L'ordinador? ___ utilitzo cada dia.", options: ["L'", "La", "Els"], answer: 0, explanation: "Davant de vocal: l'." },
        { question: "Les pomes? Vull comprar-___.", options: ["los", "les", "la"], answer: 1, explanation: "Femení plural darrere de l'infinitiu: -les." },
        { question: "El Joan? ___ conec de l'escola.", options: ["El", "La", "Els"], answer: 0, explanation: "Masculí singular: el." },
      ],
    },
  ],
};
