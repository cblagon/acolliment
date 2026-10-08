import type { GrammarTopic } from "@/components/GrammarSection";

/** Hand-written Catalan grammar (rules explained in Catalan). */
export const GRAMMAR_CA: Record<"A1" | "A2" | "B1", GrammarTopic[]> = {
  A1: [
    {
      title: "Els articles", emoji: "📰",
      rule: "Davant d'un nom posem l'article. Masculí: el (singular), els (plural). Femení: la (singular), les (plural). Davant de vocal o h, el i la s'apostrofen: l'.",
      examples: [
        { text: "El gos és petit.", translation: "masculí singular" },
        { text: "La casa és gran.", translation: "femení singular" },
        { text: "Els nens juguen.", translation: "masculí plural" },
        { text: "L'elefant és gris.", translation: "apostrofat davant de vocal" },
      ],
      questions: [
        { question: "___ taula és blanca.", options: ["El", "La", "Els"], answer: 1, explanation: "Taula és femení singular: la taula." },
        { question: "___ llibres són nous.", options: ["Els", "Les", "El"], answer: 0, explanation: "Llibres és masculí plural: els llibres." },
        { question: "___ aigua és freda.", options: ["La", "L'", "El"], answer: 1, explanation: "Davant de vocal, la s'apostrofa: l'aigua." },
        { question: "___ cadires són blaves.", options: ["Els", "La", "Les"], answer: 2, explanation: "Cadires és femení plural: les cadires." },
        { question: "___ home és alt.", options: ["L'", "El", "La"], answer: 0, explanation: "Davant de h + vocal, el s'apostrofa: l'home." },
      ],
    },
    {
      title: "El verb ser i estar", emoji: "🧍",
      rule: "Ser serveix per dir com és algú o què és: jo sóc, tu ets, ell/ella és, nosaltres som, vosaltres sou, ells/elles són. Estar serveix per dir on som o com ens trobem ara: jo estic, tu estàs, ell està…",
      examples: [
        { text: "Jo sóc l'Amina.", translation: "identitat" },
        { text: "Ell és alt.", translation: "com és" },
        { text: "Estic cansat.", translation: "com em trobo ara" },
        { text: "Som a l'escola.", translation: "on som" },
      ],
      questions: [
        { question: "Nosaltres ___ germans.", options: ["som", "sou", "són"], answer: 0, explanation: "Nosaltres → som." },
        { question: "Tu ___ molt simpàtica.", options: ["és", "ets", "sóc"], answer: 1, explanation: "Tu → ets." },
        { question: "Avui ___ contenta.", options: ["estic", "sóc", "som"], answer: 0, explanation: "Com em trobo ara → estar: estic." },
        { question: "Ells ___ del Marroc.", options: ["és", "sou", "són"], answer: 2, explanation: "Ells → són." },
        { question: "Vosaltres ___ a classe.", options: ["esteu", "estàs", "estan"], answer: 0, explanation: "Vosaltres → esteu." },
      ],
    },
    {
      title: "El plural", emoji: "➕",
      rule: "Per fer el plural normalment afegim -s: gat → gats. Els noms femenins acabats en -a canvien -a per -es: casa → cases. Molts noms acabats en -s, -ç, -x afegeixen -os: braç → braços.",
      examples: [
        { text: "un gat → dos gats", translation: "+ s" },
        { text: "una noia → dues noies", translation: "-a → -es" },
        { text: "un peix → dos peixos", translation: "+ os" },
        { text: "un braç → dos braços", translation: "+ os" },
      ],
      questions: [
        { question: "una poma → dues ___", options: ["pomas", "pomes", "pomos"], answer: 1, explanation: "-a → -es: pomes." },
        { question: "un llapis → dos ___", options: ["llapis", "llapises", "llapissos"], answer: 0, explanation: "Llapis no canvia en plural." },
        { question: "un llibre → dos ___", options: ["llibres", "llibros", "llibrees"], answer: 0, explanation: "Afegim -s: llibres." },
        { question: "un gos → dos ___", options: ["goss", "gosos", "goses"], answer: 1, explanation: "Acabat en -s: gosos." },
        { question: "una taula → dues ___", options: ["taulas", "taules", "taulos"], answer: 1, explanation: "-a → -es: taules." },
      ],
    },
    {
      title: "Present dels verbs en -ar", emoji: "⏰",
      rule: "Els verbs acabats en -ar (parlar, cantar, estudiar) fan el present així: jo parlo, tu parles, ell/ella parla, nosaltres parlem, vosaltres parleu, ells/elles parlen.",
      examples: [
        { text: "Jo parlo català.", translation: "jo → -o" },
        { text: "Tu cantes molt bé.", translation: "tu → -es" },
        { text: "Nosaltres estudiem junts.", translation: "nosaltres → -em" },
        { text: "Elles juguen al pati.", translation: "elles → -en" },
      ],
      questions: [
        { question: "Jo ___ al pati. (jugar)", options: ["jugo", "juga", "juguen"], answer: 0, explanation: "Jo → jugo." },
        { question: "Ella ___ molt. (parlar)", options: ["parles", "parla", "parlem"], answer: 1, explanation: "Ella → parla." },
        { question: "Nosaltres ___ català. (estudiar)", options: ["estudieu", "estudien", "estudiem"], answer: 2, explanation: "Nosaltres → estudiem." },
        { question: "Vosaltres ___ cançons. (cantar)", options: ["canteu", "canten", "cantes"], answer: 0, explanation: "Vosaltres → canteu." },
        { question: "Ells ___ a casa. (dinar)", options: ["dina", "dinen", "dinem"], answer: 1, explanation: "Ells → dinen." },
      ],
    },
  ],
  A2: [
    {
      title: "El passat perifràstic", emoji: "⏪",
      rule: "Per parlar d'accions acabades usem anar (en present especial) + infinitiu: jo vaig menjar, tu vas menjar, ell va menjar, nosaltres vam menjar, vosaltres vau menjar, ells van menjar.",
      examples: [
        { text: "Ahir vaig anar al mercat.", translation: "jo" },
        { text: "Vas veure la pel·lícula?", translation: "tu" },
        { text: "Vam jugar a futbol.", translation: "nosaltres" },
        { text: "Van arribar tard.", translation: "ells" },
      ],
      questions: [
        { question: "Ahir jo ___ estudiar molt.", options: ["vaig", "va", "vam"], answer: 0, explanation: "Jo → vaig." },
        { question: "Nosaltres ___ sopar a casa.", options: ["van", "vam", "vau"], answer: 1, explanation: "Nosaltres → vam." },
        { question: "La Laia ___ trucar-me.", options: ["vas", "vaig", "va"], answer: 2, explanation: "Ella → va." },
        { question: "Vosaltres ___ ballar a la festa.", options: ["vau", "van", "vam"], answer: 0, explanation: "Vosaltres → vau." },
        { question: "Ells ___ viatjar a Itàlia.", options: ["va", "van", "vam"], answer: 1, explanation: "Ells → van." },
      ],
    },
    {
      title: "Els possessius", emoji: "👜",
      rule: "Els possessius diuen de qui és una cosa: el meu / la meva, el teu / la teva, el seu / la seva, el nostre / la nostra, el vostre / la vostra, el seu / la seva. Concorden amb la cosa posseïda.",
      examples: [
        { text: "El meu germà es diu Omar.", translation: "masculí" },
        { text: "La meva mare és metgessa.", translation: "femení" },
        { text: "Els nostres amics són aquí.", translation: "plural" },
        { text: "Les teves sabates són noves.", translation: "femení plural" },
      ],
      questions: [
        { question: "___ casa és a prop de l'escola.", options: ["El meu", "La meva", "Els meus"], answer: 1, explanation: "Casa és femení: la meva." },
        { question: "___ llibres són a la motxilla.", options: ["Els meus", "Les meves", "El meu"], answer: 0, explanation: "Llibres és masculí plural: els meus." },
        { question: "És ___ gos? (de tu)", options: ["el seu", "el teu", "la teva"], answer: 1, explanation: "De tu, masculí: el teu." },
        { question: "___ escola és molt gran. (de nosaltres)", options: ["La nostra", "El nostre", "La vostra"], answer: 0, explanation: "Escola femení, de nosaltres: la nostra." },
        { question: "___ germanes són simpàtiques. (de tu)", options: ["Els teus", "La teva", "Les teves"], answer: 2, explanation: "Femení plural: les teves." },
      ],
    },
    {
      title: "Els pronoms reflexius", emoji: "🪥",
      rule: "Alguns verbs porten pronom perquè l'acció recau en la mateixa persona: rentar-se, llevar-se, dutxar-se. Jo em llevo, tu et lleves, ell es lleva, nosaltres ens llevem, vosaltres us lleveu, ells es lleven. Davant de vocal: m', t', s'.",
      examples: [
        { text: "Em llevo a les set.", translation: "jo" },
        { text: "Et dutxes al matí?", translation: "tu" },
        { text: "Ens rentem les mans.", translation: "nosaltres" },
        { text: "S'afaita cada dia.", translation: "apostrofat davant de vocal" },
      ],
      questions: [
        { question: "Jo ___ llevo d'hora.", options: ["et", "em", "es"], answer: 1, explanation: "Jo → em." },
        { question: "Nosaltres ___ dutxem després de gimnàstica.", options: ["ens", "us", "es"], answer: 0, explanation: "Nosaltres → ens." },
        { question: "Ella ___ pentina.", options: ["em", "es", "et"], answer: 1, explanation: "Ella → es." },
        { question: "Vosaltres ___ renteu les dents.", options: ["us", "ens", "es"], answer: 0, explanation: "Vosaltres → us." },
        { question: "Tu ___ adorms a classe!", options: ["t'", "m'", "s'"], answer: 0, explanation: "Tu davant de vocal → t'." },
      ],
    },
    {
      title: "Comparatius", emoji: "⚖️",
      rule: "Per comparar usem més … que, menys … que i tan … com. Formes especials: millor (més bo), pitjor (més dolent), més gran / més petit.",
      examples: [
        { text: "El Pau és més alt que jo.", translation: "superioritat" },
        { text: "Aquest llibre és menys llarg que aquell.", translation: "inferioritat" },
        { text: "Sóc tan alta com la meva germana.", translation: "igualtat" },
        { text: "Aquesta pizza és millor.", translation: "forma especial" },
      ],
      questions: [
        { question: "L'elefant és ___ gran que el gat.", options: ["més", "tan", "com"], answer: 0, explanation: "Superioritat: més … que." },
        { question: "Ell és tan alt ___ tu.", options: ["que", "com", "de"], answer: 1, explanation: "Igualtat: tan … com." },
        { question: "Aquest pastís és ___ que l'altre. (més bo)", options: ["més bo", "millor", "bonet"], answer: 1, explanation: "Més bo → millor." },
        { question: "El metro és ___ lent que el cotxe.", options: ["menys", "tan", "molt"], answer: 0, explanation: "Inferioritat: menys … que." },
        { question: "Aquesta nota és ___ que l'anterior. (més dolenta)", options: ["pitjor", "millor", "menor"], answer: 0, explanation: "Més dolent → pitjor." },
      ],
    },
  ],
  B1: [
    {
      title: "L'imperfet", emoji: "🕰️",
      rule: "L'imperfet descriu el passat i accions habituals: quan era petit, jugava cada dia. Verbs en -ar: jugava, jugaves, jugava, jugàvem, jugàveu, jugaven. Verbs en -er/-ir: tenia, tenies, tenia, teníem, teníeu, tenien.",
      examples: [
        { text: "Quan era petita vivia amb els avis.", translation: "descripció" },
        { text: "Cada estiu anàvem a la platja.", translation: "hàbit" },
        { text: "Plovia molt aquell dia.", translation: "descripció" },
        { text: "Tenies un gos?", translation: "verb en -er" },
      ],
      questions: [
        { question: "De petit, jo ___ a futbol. (jugar)", options: ["jugava", "vaig jugar", "jugo"], answer: 0, explanation: "Hàbit en el passat → imperfet: jugava." },
        { question: "Nosaltres ___ al poble. (viure)", options: ["vivíem", "vivim", "vam viure"], answer: 0, explanation: "Nosaltres → vivíem." },
        { question: "Ells sempre ___ tard. (arribar)", options: ["arriben", "arribaven", "arribava"], answer: 1, explanation: "Ells → arribaven." },
        { question: "Tu ___ molts amics. (tenir)", options: ["tenia", "tenies", "teníem"], answer: 1, explanation: "Tu → tenies." },
        { question: "Quan ___ petita, m'agradava dibuixar. (ser)", options: ["era", "vaig ser", "sóc"], answer: 0, explanation: "Descripció en el passat: era." },
      ],
    },
    {
      title: "El futur i el condicional", emoji: "🔮",
      rule: "El futur parla del que passarà: parlaré, parlaràs, parlarà, parlarem, parlareu, parlaran. El condicional expressa desitjos o hipòtesis: m'agradaria, podria, seria.",
      examples: [
        { text: "Demà estudiaré a la biblioteca.", translation: "futur" },
        { text: "L'any vinent farem un viatge.", translation: "futur" },
        { text: "M'agradaria ser infermera.", translation: "desig" },
        { text: "Podries ajudar-me?", translation: "petició educada" },
      ],
      questions: [
        { question: "Demà ___ a les vuit. (sortir, jo)", options: ["sortiré", "sortia", "sortiria"], answer: 0, explanation: "Futur, jo → sortiré." },
        { question: "___ un cafè, si us plau. (voler, jo)", options: ["Voldré", "Voldria", "Volia"], answer: 1, explanation: "Petició educada → condicional: voldria." },
        { question: "Nosaltres ___ el projecte divendres. (acabar)", options: ["acabarem", "acabaríem", "acabem"], answer: 0, explanation: "Futur, nosaltres → acabarem." },
        { question: "Si tingués temps, ___ més. (llegir, jo)", options: ["llegiré", "llegiria", "llegeixo"], answer: 1, explanation: "Hipòtesi → condicional: llegiria." },
        { question: "Ells ___ demà. (arribar)", options: ["arribaran", "arribarien", "arribaven"], answer: 0, explanation: "Futur, ells → arribaran." },
      ],
    },
    {
      title: "Connectors del discurs", emoji: "🔗",
      rule: "Els connectors uneixen idees: perquè (causa), però (contrast), per tant (conseqüència), a més (addició), en canvi (oposició), finalment (ordre).",
      examples: [
        { text: "No vaig venir perquè estava malalt.", translation: "causa" },
        { text: "M'agrada, però és car.", translation: "contrast" },
        { text: "Plou; per tant, ens quedem a casa.", translation: "conseqüència" },
        { text: "A més, parla tres idiomes.", translation: "addició" },
      ],
      questions: [
        { question: "Estudio molt ___ vull aprovar.", options: ["perquè", "però", "en canvi"], answer: 0, explanation: "Causa → perquè." },
        { question: "Fa sol, ___ fa fred.", options: ["per tant", "però", "a més"], answer: 1, explanation: "Contrast → però." },
        { question: "No té bitllet; ___, no pot entrar.", options: ["per tant", "perquè", "a més"], answer: 0, explanation: "Conseqüència → per tant." },
        { question: "Ell és tímid; ___, la seva germana és molt oberta.", options: ["en canvi", "a més", "perquè"], answer: 0, explanation: "Oposició → en canvi." },
        { question: "És simpàtic i, ___, molt treballador.", options: ["però", "a més", "per tant"], answer: 1, explanation: "Addició → a més." },
      ],
    },
    {
      title: "Els pronoms en i hi", emoji: "🧩",
      rule: "En substitueix una quantitat o un complement amb de: Tens pomes? Sí, en tinc dues. Hi substitueix un lloc o un complement amb a/en: Vas a l'escola? Sí, hi vaig.",
      examples: [
        { text: "Vols pa? Sí, en vull.", translation: "en = pa (quantitat)" },
        { text: "Vens de la platja? Sí, en vinc.", translation: "en = de la platja" },
        { text: "Vas al cinema? Sí, hi vaig.", translation: "hi = al cinema" },
        { text: "Penses en l'examen? Sí, hi penso.", translation: "hi = en l'examen" },
      ],
      questions: [
        { question: "Tens germans? Sí, ___ tinc tres.", options: ["en", "hi", "els"], answer: 0, explanation: "Quantitat → en." },
        { question: "Vas a Barcelona? Sí, ___ vaig demà.", options: ["en", "hi", "la"], answer: 1, explanation: "Lloc → hi." },
        { question: "Has comprat llet? No, no ___ he comprat.", options: ["hi", "la", "n'"], answer: 2, explanation: "Quantitat indeterminada → en (n' davant de vocal)." },
        { question: "Estàs a casa? Sí, ___ sóc.", options: ["hi", "en", "la"], answer: 0, explanation: "Lloc → hi." },
        { question: "Quantes pomes vols? ___ vull cinc.", options: ["Hi", "En", "Les"], answer: 1, explanation: "Quantitat → en." },
      ],
    },
  ],
};
