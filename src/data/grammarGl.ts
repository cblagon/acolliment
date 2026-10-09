import type { GrammarTopic } from "@/components/GrammarSection";

/** Hand-written Galician grammar (rules explained in Catalan). */
export const GRAMMAR_GL: Record<"A1" | "A2" | "B1", GrammarTopic[]> = {
  A1: [
    {
      title: "Els articles", emoji: "📰",
      rule: "Definits: o (masculí), a (femení), os, as (plural). Indefinits: un, unha, uns, unhas. Amb preposicions es contrauen: de + o = do, en + a = na, a + o = ao.",
      examples: [
        { text: "O can é pequeno.", translation: "El gos és petit." },
        { text: "A casa é grande.", translation: "La casa és gran." },
        { text: "Os nenos xogan.", translation: "Els nens juguen." },
        { text: "Vou ao colexio.", translation: "Vaig a l'escola (a + o = ao)." },
      ],
      questions: [
        { question: "___ mesa é branca.", options: ["O", "A", "Os"], answer: 1, explanation: "Mesa és femení: a mesa." },
        { question: "___ libros son novos.", options: ["Os", "As", "O"], answer: 0, explanation: "Masculí plural: os libros." },
        { question: "Teño ___ irmá.", options: ["un", "unha", "uns"], answer: 1, explanation: "Irmá és femení: unha." },
        { question: "O libro está ___ mesa. (en + a)", options: ["na", "en a", "no"], answer: 0, explanation: "en + a = na." },
        { question: "É a casa ___ profesor. (de + o)", options: ["de o", "do", "da"], answer: 1, explanation: "de + o = do." },
      ],
    },
    {
      title: "Els verbs ser i estar", emoji: "🧍",
      rule: "Ser: eu son, ti es, el/ela é, nós somos, vós sodes, eles/elas son. Estar: eu estou, ti estás, el/ela está, nós estamos, vós estades, eles/elas están. Ser diu com és algú; estar, on és o com es troba.",
      examples: [
        { text: "Eu son Amina.", translation: "Sóc l'Amina." },
        { text: "Ela é moi alta.", translation: "Ella és molt alta." },
        { text: "Estou cansado.", translation: "Estic cansat." },
        { text: "Estamos no colexio.", translation: "Som a l'escola." },
      ],
      questions: [
        { question: "Nós ___ irmáns.", options: ["somos", "sodes", "son"], answer: 0, explanation: "Nós → somos." },
        { question: "Ti ___ moi simpática.", options: ["é", "es", "son"], answer: 1, explanation: "Ti → es." },
        { question: "Hoxe ___ contenta.", options: ["estou", "son", "somos"], answer: 0, explanation: "Com em trobo: estou." },
        { question: "Eles ___ de Marrocos.", options: ["é", "sodes", "son"], answer: 2, explanation: "Eles → son." },
        { question: "Vós ___ na clase.", options: ["estades", "estás", "están"], answer: 0, explanation: "Vós → estades." },
      ],
    },
    {
      title: "El plural", emoji: "➕",
      rule: "Si acaba en vocal, afegim -s: casa → casas. Si acaba en -r, -z o -s (paraula aguda), afegim -es: flor → flores. Les paraules en -l perden la l: animal → animais. Les acabades en -n afegeixen -s: can → cans.",
      examples: [
        { text: "un gato → dous gatos", translation: "+ s" },
        { text: "unha flor → dúas flores", translation: "+ es" },
        { text: "un animal → dous animais", translation: "-al → -ais" },
        { text: "un can → dous cans", translation: "-n + s" },
      ],
      questions: [
        { question: "unha mazá → dúas ___", options: ["mazás", "mazaes", "mazá"], answer: 0, explanation: "Vocal + s: mazás." },
        { question: "un profesor → dous ___", options: ["profesors", "profesores", "profesoris"], answer: 1, explanation: "-r + es: profesores." },
        { question: "un papel → dous ___", options: ["papeles", "papeis", "papels"], answer: 1, explanation: "-el → -eis: papeis." },
        { question: "un libro → dous ___", options: ["libros", "libroes", "librois"], answer: 0, explanation: "+ s: libros." },
        { question: "un rapaz → dous ___", options: ["rapazs", "rapaces", "rapazes"], answer: 1, explanation: "-z → -ces: rapaces." },
      ],
    },
    {
      title: "Present dels verbs en -ar", emoji: "⏰",
      rule: "Verbs en -ar (falar, cantar, estudar): eu falo, ti falas, el/ela fala, nós falamos, vós falades, eles/elas falan.",
      examples: [
        { text: "Eu falo galego.", translation: "Parlo gallec." },
        { text: "Ti cantas moi ben.", translation: "Cantes molt bé." },
        { text: "Nós estudamos xuntos.", translation: "Estudiem junts." },
        { text: "Elas xogan no patio.", translation: "Juguen al pati." },
      ],
      questions: [
        { question: "Eu ___ no patio. (xogar)", options: ["xogo", "xoga", "xogan"], answer: 0, explanation: "Eu → xogo." },
        { question: "Ela ___ moito. (falar)", options: ["falas", "fala", "falamos"], answer: 1, explanation: "Ela → fala." },
        { question: "Nós ___ galego. (estudar)", options: ["estudades", "estudan", "estudamos"], answer: 2, explanation: "Nós → estudamos." },
        { question: "Vós ___ cancións. (cantar)", options: ["cantades", "cantan", "cantas"], answer: 0, explanation: "Vós → cantades." },
        { question: "Eles ___ na casa. (xantar)", options: ["xanta", "xantan", "xantamos"], answer: 1, explanation: "Eles → xantan." },
      ],
    },
  ],
  A2: [
    {
      title: "El pretèrit", emoji: "⏪",
      rule: "Per a accions acabades: verbs en -ar: falei, falaches, falou, falamos, falastes, falaron. Verbs en -er: comín, comiches, comeu, comemos, comestes, comeron. Ir és irregular: fun, fuches, foi.",
      examples: [
        { text: "Onte fun ao mercado.", translation: "Ahir vaig anar al mercat." },
        { text: "Viches a película?", translation: "Vas veure la pel·lícula?" },
        { text: "Xogamos ao fútbol.", translation: "Vam jugar a futbol." },
        { text: "Chegaron tarde.", translation: "Van arribar tard." },
      ],
      questions: [
        { question: "Onte eu ___ moito. (estudar)", options: ["estudei", "estudou", "estudo"], answer: 0, explanation: "Eu → estudei." },
        { question: "Ela ___ á festa. (ir)", options: ["fun", "foi", "fuches"], answer: 1, explanation: "Ela → foi." },
        { question: "Nós ___ na casa. (cear)", options: ["ceamos", "cearon", "ceei"], answer: 0, explanation: "Nós → ceamos." },
        { question: "Ti ___ unha mazá. (comer)", options: ["comeu", "comiches", "comín"], answer: 1, explanation: "Ti → comiches." },
        { question: "Eles ___ a Italia. (viaxar)", options: ["viaxou", "viaxaron", "viaxamos"], answer: 1, explanation: "Eles → viaxaron." },
      ],
    },
    {
      title: "Els possessius", emoji: "👜",
      rule: "Van amb article: o meu / a miña, o teu / a túa, o seu / a súa, o noso / a nosa, o voso / a vosa. Plural: os meus / as miñas…",
      examples: [
        { text: "O meu irmán chámase Omar.", translation: "El meu germà es diu Omar." },
        { text: "A miña nai é médica.", translation: "La meva mare és metgessa." },
        { text: "Os nosos amigos están aquí.", translation: "Els nostres amics són aquí." },
        { text: "As túas zapatillas son novas.", translation: "Les teves sabatilles són noves." },
      ],
      questions: [
        { question: "___ casa está preto do colexio.", options: ["O meu", "A miña", "Os meus"], answer: 1, explanation: "Casa és femení: a miña." },
        { question: "___ libros están na mochila.", options: ["Os meus", "As miñas", "O meu"], answer: 0, explanation: "Masculí plural: os meus." },
        { question: "É ___ can? (de ti)", options: ["o seu", "o teu", "a túa"], answer: 1, explanation: "De ti, masculí: o teu." },
        { question: "___ escola é grande. (de nós)", options: ["A nosa", "O noso", "A vosa"], answer: 0, explanation: "Femení, de nós: a nosa." },
        { question: "___ irmás son simpáticas. (de ti)", options: ["Os teus", "A túa", "As túas"], answer: 2, explanation: "Femení plural: as túas." },
      ],
    },
    {
      title: "La posició del pronom", emoji: "🪥",
      rule: "En gallec el pronom normalment va darrere del verb: lévome, dúchaste, chámase. Va davant en frases negatives, preguntes amb interrogatiu i després de que: non me levanto, como te chamas?",
      examples: [
        { text: "Levántome ás sete.", translation: "Em llevo a les set." },
        { text: "Como te chamas?", translation: "Com et dius?" },
        { text: "Non me gusta o leite.", translation: "No m'agrada la llet." },
        { text: "Lavámonos as mans.", translation: "Ens rentem les mans." },
      ],
      questions: [
        { question: "Eu ___ ás oito.", options: ["levántome", "me levanto", "levanto me"], answer: 0, explanation: "Frase afirmativa: pronom darrere." },
        { question: "Como ___?", options: ["chámaste", "te chamas", "chamas te"], answer: 1, explanation: "Amb interrogatiu: pronom davant." },
        { question: "Non ___ o chocolate.", options: ["gústame", "me gusta", "gusta me"], answer: 1, explanation: "Amb non: pronom davant." },
        { question: "Ela ___ Laia.", options: ["chámase", "se chama", "chama se"], answer: 0, explanation: "Afirmativa: chámase." },
        { question: "Nós ___ ás dez.", options: ["deitámonos", "nos deitamos", "deitamos nos"], answer: 0, explanation: "Afirmativa: deitámonos." },
      ],
    },
    {
      title: "Comparatius", emoji: "⚖️",
      rule: "máis … ca/que (més), menos … ca/que (menys), tan … coma/como (tan … com). Irregular: mellor (més bo), peor (més dolent), maior, menor.",
      examples: [
        { text: "Pau é máis alto ca min.", translation: "En Pau és més alt que jo." },
        { text: "Este libro é menos longo.", translation: "Aquest llibre és menys llarg." },
        { text: "Son tan alta coma a miña irmá.", translation: "Sóc tan alta com la meva germana." },
        { text: "Esta pizza é mellor.", translation: "Aquesta pizza és millor." },
      ],
      questions: [
        { question: "O elefante é ___ grande ca o gato.", options: ["máis", "tan", "coma"], answer: 0, explanation: "Superioritat: máis." },
        { question: "El é tan alto ___ ti.", options: ["ca", "coma", "de"], answer: 1, explanation: "Igualtat: tan … coma." },
        { question: "Este bolo é ___ ca o outro. (máis bo)", options: ["máis bo", "mellor", "boíño"], answer: 1, explanation: "Més bo → mellor." },
        { question: "O autobús é ___ rápido ca o tren.", options: ["menos", "tan", "moi"], answer: 0, explanation: "Inferioritat: menos." },
        { question: "Esta nota é ___ ca a anterior. (máis mala)", options: ["peor", "mellor", "menor"], answer: 0, explanation: "Més dolent → peor." },
      ],
    },
  ],
  B1: [
    {
      title: "El copretèrit (imperfet)", emoji: "🕰️",
      rule: "Descriu el passat i els hàbits. Verbs en -ar: xogaba, xogabas, xogaba, xogabamos, xogabades, xogaban. Verbs en -er/-ir: tiña, tiñas, tiña, tiñamos, tiñades, tiñan. Ser: era.",
      examples: [
        { text: "Cando era pequena vivía cos avós.", translation: "Quan era petita vivia amb els avis." },
        { text: "Cada verán iamos á praia.", translation: "Cada estiu anàvem a la platja." },
        { text: "Chovía moito.", translation: "Plovia molt." },
        { text: "Tiñas un can?", translation: "Tenies un gos?" },
      ],
      questions: [
        { question: "De pequeno, eu ___ ao fútbol. (xogar)", options: ["xogaba", "xoguei", "xogo"], answer: 0, explanation: "Hàbit: xogaba." },
        { question: "Nós ___ na aldea. (vivir)", options: ["viviamos", "vivimos", "viviron"], answer: 0, explanation: "Nós → viviamos." },
        { question: "Eles sempre ___ tarde. (chegar)", options: ["chegan", "chegaban", "chegaba"], answer: 1, explanation: "Eles → chegaban." },
        { question: "Ti ___ moitos amigos. (ter)", options: ["tiña", "tiñas", "tiñamos"], answer: 1, explanation: "Ti → tiñas." },
        { question: "Cando ___ pequena, gustábame debuxar. (ser)", options: ["era", "fun", "son"], answer: 0, explanation: "Descripció: era." },
      ],
    },
    {
      title: "Futur i condicional", emoji: "🔮",
      rule: "Futur: infinitiu + -ei, -ás, -á, -emos, -edes, -án (falarei). Condicional per a desitjos i peticions: infinitiu + -ía, -ías, -ía… (gustaríame, podería, quería).",
      examples: [
        { text: "Mañá estudarei na biblioteca.", translation: "Demà estudiaré a la biblioteca." },
        { text: "O ano que vén faremos unha viaxe.", translation: "L'any vinent farem un viatge." },
        { text: "Gustaríame ser enfermeira.", translation: "M'agradaria ser infermera." },
        { text: "Poderías axudarme?", translation: "Podries ajudar-me?" },
      ],
      questions: [
        { question: "Mañá eu ___ ás oito. (saír)", options: ["sairei", "saía", "sairía"], answer: 0, explanation: "Futur: sairei." },
        { question: "___ un café, por favor. (querer, eu)", options: ["Quererei", "Querería", "Quería"], answer: 1, explanation: "Petició educada: querería." },
        { question: "Nós ___ o proxecto o venres. (rematar)", options: ["remataremos", "remataríamos", "rematamos"], answer: 0, explanation: "Futur: remataremos." },
        { question: "Se tivese tempo, ___ máis. (ler, eu)", options: ["lerei", "lería", "leo"], answer: 1, explanation: "Hipòtesi: lería." },
        { question: "Eles ___ mañá. (chegar)", options: ["chegarán", "chegarían", "chegaban"], answer: 0, explanation: "Futur: chegarán." },
      ],
    },
    {
      title: "Connectors", emoji: "🔗",
      rule: "porque (causa), pero (contrast), polo tanto (conseqüència), ademais (addició), en cambio (oposició), finalmente (ordre).",
      examples: [
        { text: "Non vin porque estaba enfermo.", translation: "No vaig venir perquè estava malalt." },
        { text: "Gústame, pero é caro.", translation: "M'agrada, però és car." },
        { text: "Chove; polo tanto, quedamos na casa.", translation: "Plou; per tant, ens quedem a casa." },
        { text: "Ademais, fala tres linguas.", translation: "A més, parla tres llengües." },
      ],
      questions: [
        { question: "Estudo moito ___ quero aprobar.", options: ["porque", "pero", "en cambio"], answer: 0, explanation: "Causa: porque." },
        { question: "Vai sol, ___ fai frío.", options: ["polo tanto", "pero", "ademais"], answer: 1, explanation: "Contrast: pero." },
        { question: "Non ten billete; ___, non pode entrar.", options: ["polo tanto", "porque", "ademais"], answer: 0, explanation: "Conseqüència: polo tanto." },
        { question: "El é tímido; ___, a súa irmá é moi aberta.", options: ["en cambio", "ademais", "porque"], answer: 0, explanation: "Oposició: en cambio." },
        { question: "É simpático e, ___, moi traballador.", options: ["pero", "ademais", "polo tanto"], answer: 1, explanation: "Addició: ademais." },
      ],
    },
    {
      title: "Els pronoms de complement", emoji: "🧩",
      rule: "Complement directe: o, a, os, as (Viches o libro? Si, vino). Després de verbs acabats en -r, -s: lo, la (Vou collelo → collelo). Complement indirecte: lle, lles (Dálle o libro).",
      examples: [
        { text: "Viches a Ana? Si, vina.", translation: "Has vist l'Ana? Sí, l'he vista." },
        { text: "Teño que facelo hoxe.", translation: "Ho he de fer avui (facer + o)." },
        { text: "Dálle o libro.", translation: "Dóna-li el llibre." },
        { text: "Mercámolos onte.", translation: "Els vam comprar ahir." },
      ],
      questions: [
        { question: "Comiches a mazá? Si, ___.", options: ["comina", "comín a", "a comín"], answer: 0, explanation: "Pronom darrere: comina." },
        { question: "Vou ___ agora. (facer + o)", options: ["facer o", "facelo", "o facer"], answer: 1, explanation: "-r + o → -lo: facelo." },
        { question: "Dálle o caderno ___ profesor.", options: ["ao", "o", "lle"], answer: 0, explanation: "Indirecte amb ao + lle." },
        { question: "Escribín unha carta e enviei___.", options: ["-a", "-la", "-lle"], answer: 0, explanation: "enviei + a = enviei-a? Es diu enviéina; a l'escrit, pronom a." },
        { question: "Que ___ dixeches á túa nai?", options: ["lle", "a", "o"], answer: 0, explanation: "Complement indirecte: lle." },
      ],
    },
  ],
};
