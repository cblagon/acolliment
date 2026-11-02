import type { GrammarTopic } from "@/components/GrammarSection";

/** Extra Galician grammar topics (rules in Catalan). */
export const GRAMMAR_GL_EXTRA: Record<"A1" | "A2" | "B1", GrammarTopic[]> = {
  A1: [
    {
      title: "Els demostratius", emoji: "👉",
      rule: "En gallec hi ha tres distàncies: este/esta (a prop meu), ese/esa (a prop teu) i aquel/aquela (lluny). Plural: estes, esas, aqueles…",
      examples: [
        { text: "Este libro é meu.", translation: "Aquest llibre és meu." },
        { text: "Esa mochila é túa?", translation: "Aquesta motxilla (teva) és teva?" },
        { text: "Aquela casa é grande.", translation: "Aquella casa és gran." },
        { text: "Estas mazás son vermellas.", translation: "Aquestes pomes són vermelles." },
      ],
      questions: [
        { question: "___ bolígrafo (aquí, meu) é azul.", options: ["Este", "Esta", "Aquela"], answer: 0, explanation: "Masculí, a prop meu: este." },
        { question: "___ montaña (lluny) é alta.", options: ["Esta", "Aquela", "Ese"], answer: 1, explanation: "Femení, lluny: aquela." },
        { question: "___ rapaces (aquí) xogan.", options: ["Estes", "Estas", "Aquel"], answer: 0, explanation: "Masculí plural, a prop: estes." },
        { question: "___ cadeira (al teu costat) é nova.", options: ["Ese", "Esa", "Este"], answer: 1, explanation: "Femení, a prop teu: esa." },
        { question: "___ edificio (lluny) é o instituto.", options: ["Aquel", "Esta", "Estas"], answer: 0, explanation: "Masculí, lluny: aquel." },
      ],
    },
    {
      title: "El verb ter", emoji: "🎒",
      rule: "Ter vol dir tenir: eu teño, ti tes, el/ela ten, nós temos, vós tedes, eles/elas teñen.",
      examples: [
        { text: "Teño catorce anos.", translation: "Tinc catorze anys." },
        { text: "Tes irmáns?", translation: "Tens germans?" },
        { text: "Ela ten fame.", translation: "Ella té gana." },
        { text: "Temos clase de inglés.", translation: "Tenim classe d'anglès." },
      ],
      questions: [
        { question: "Eu ___ dúas irmás.", options: ["ten", "teño", "temos"], answer: 1, explanation: "Eu → teño." },
        { question: "Nós ___ sede.", options: ["temos", "tedes", "teñen"], answer: 0, explanation: "Nós → temos." },
        { question: "O Pablo ___ quince anos.", options: ["tes", "ten", "teñen"], answer: 1, explanation: "El → ten." },
        { question: "Vós ___ deberes?", options: ["tedes", "temos", "teño"], answer: 0, explanation: "Vós → tedes." },
        { question: "Elas ___ frío.", options: ["ten", "tes", "teñen"], answer: 2, explanation: "Elas → teñen." },
      ],
    },
    {
      title: "Hai", emoji: "🏫",
      rule: "Hai vol dir hi ha i no canvia en plural. Per negar: non hai.",
      examples: [
        { text: "Na clase hai un encerado.", translation: "A la classe hi ha una pissarra." },
        { text: "Hai vinte alumnos.", translation: "Hi ha vint alumnes." },
        { text: "Non hai leite.", translation: "No hi ha llet." },
        { text: "Hai un parque preto?", translation: "Hi ha un parc a prop?" },
      ],
      questions: [
        { question: "No patio ___ moitas árbores.", options: ["hai", "é", "ten"], answer: 0, explanation: "Existència: hai." },
        { question: "Na neveira non ___ queixo.", options: ["está", "hai", "é"], answer: 1, explanation: "Negació: non hai." },
        { question: "___ unha farmacia aquí?", options: ["Ten", "Está", "Hai"], answer: 2, explanation: "Pregunta d'existència: hai?" },
        { question: "Na mochila ___ tres libros.", options: ["hai", "han", "son"], answer: 0, explanation: "Hai no canvia en plural." },
        { question: "Com es nega «hi ha»?", options: ["non hai", "no hai", "hai non"], answer: 0, explanation: "En gallec la negació és non: non hai." },
      ],
    },
    {
      title: "Les preguntes", emoji: "❓",
      rule: "Per preguntar: quen (qui), que (què), onde (on), cando (quan), como (com), canto/cantos (quant) i por que (per què).",
      examples: [
        { text: "Como te chamas?", translation: "Com et dius?" },
        { text: "Onde vives?", translation: "On vius?" },
        { text: "Cantos anos tes?", translation: "Quants anys tens?" },
        { text: "Quen é a túa profesora?", translation: "Qui és la teva professora?" },
      ],
      questions: [
        { question: "___ vives? — En Vigo.", options: ["Onde", "Quen", "Cando"], answer: 0, explanation: "Lloc: onde." },
        { question: "___ é ese home? — O meu pai.", options: ["Que", "Quen", "Onde"], answer: 1, explanation: "Persona: quen." },
        { question: "___ é o teu aniversario? — En maio.", options: ["Cando", "Como", "Canto"], answer: 0, explanation: "Temps: cando." },
        { question: "___ anos tes? — Quince.", options: ["Cantos", "Como", "Quen"], answer: 0, explanation: "Quantitat: cantos." },
        { question: "___ choras? — Porque estou triste.", options: ["Por que", "Onde", "Quen"], answer: 0, explanation: "Causa: por que." },
      ],
    },
  ],
  A2: [
    {
      title: "La negació", emoji: "🚫",
      rule: "Per negar posem non davant del verb. Amb nunca, nada i ninguén: non veño nunca, non vexo nada, non hai ninguén. Si van davant del verb, no cal non: nunca chego tarde.",
      examples: [
        { text: "Non me gusta o peixe.", translation: "No m'agrada el peix." },
        { text: "Nunca chego tarde.", translation: "Mai no arribo tard." },
        { text: "Non hai ninguén na casa.", translation: "No hi ha ningú a casa." },
        { text: "Non comín nada.", translation: "No he menjat res." },
      ],
      questions: [
        { question: "Non vexo a ___ (cap persona).", options: ["nada", "ninguén", "nunca"], answer: 1, explanation: "Cap persona: ninguén." },
        { question: "___ bebo café (cap vegada).", options: ["Nunca", "Ninguén", "Nada"], answer: 0, explanation: "Cap vegada: nunca." },
        { question: "Non quero ___ (cap cosa).", options: ["ninguén", "nada", "nunca"], answer: 1, explanation: "Cap cosa: nada." },
        { question: "El ___ fala inglés.", options: ["non", "no", "nada"], answer: 0, explanation: "La negació en gallec és non." },
        { question: "Tria la correcta:", options: ["Nunca non chego tarde.", "Nunca chego tarde.", "Chego nunca tarde."], answer: 1, explanation: "Si nunca va davant, no cal non." },
      ],
    },
    {
      title: "Contraccions: no, na, do, da", emoji: "🔗",
      rule: "Les preposicions en i de s'uneixen a l'article: en + o = no, en + a = na, de + o = do, de + a = da. També a + o = ao, a + a = á.",
      examples: [
        { text: "Estou no instituto.", translation: "Sóc a l'institut." },
        { text: "Vivo na cidade.", translation: "Visc a la ciutat." },
        { text: "Veño do mercado.", translation: "Vinc del mercat." },
        { text: "Vou á praia.", translation: "Vaig a la platja." },
      ],
      questions: [
        { question: "O libro está ___ mesa. (en + a)", options: ["na", "no", "da"], answer: 0, explanation: "En + a = na." },
        { question: "Saio ___ colexio. (de + o)", options: ["no", "do", "ao"], answer: 1, explanation: "De + o = do." },
        { question: "Vou ___ cine. (a + o)", options: ["ao", "á", "do"], answer: 0, explanation: "A + o = ao." },
        { question: "A casa ___ miña avoa. (de + a)", options: ["na", "da", "á"], answer: 1, explanation: "De + a = da." },
        { question: "Xogamos ___ parque. (en + o)", options: ["na", "do", "no"], answer: 2, explanation: "En + o = no." },
      ],
    },
    {
      title: "L'obligació: ter que", emoji: "📋",
      rule: "Per dir que una cosa és obligatòria: ter que + infinitiu (teño que estudar). Per a normes generais: hai que + infinitiu (hai que facer silencio).",
      examples: [
        { text: "Teño que facer os deberes.", translation: "He de fer els deures." },
        { text: "Temos que saír ás oito.", translation: "Hem de sortir a les vuit." },
        { text: "Hai que levar bata.", translation: "Cal portar bata." },
        { text: "Tedes que escoitar.", translation: "Heu d'escoltar." },
      ],
      questions: [
        { question: "Eu ___ estudar para o exame.", options: ["teño que", "tes que", "hai que"], answer: 0, explanation: "Eu → teño que." },
        { question: "Ti ___ chegar á hora.", options: ["temos que", "tes que", "teñen que"], answer: 1, explanation: "Ti → tes que." },
        { question: "___ facer silencio na biblioteca.", options: ["Hai que", "Teño que", "Ten"], answer: 0, explanation: "Norma general: hai que." },
        { question: "Eles ___ limpar a aula.", options: ["teñen que", "tedes que", "ten que"], answer: 0, explanation: "Eles → teñen que." },
        { question: "Nós ___ levar o almorzo.", options: ["temos que", "teñen que", "hai de"], answer: 0, explanation: "Nós → temos que." },
      ],
    },
    {
      title: "L'imperatiu", emoji: "📢",
      rule: "Per donar ordres: per a ti, en verbs en -ar: fala, escoita, mira. Per a vós: falade, escoitade, mirade (acaben en -ade, -ede, -ide).",
      examples: [
        { text: "Escoita ben!", translation: "Escolta bé!" },
        { text: "Abride o libro.", translation: "Obriu el llibre." },
        { text: "Ven aquí, por favor.", translation: "Vine aquí, si us plau." },
        { text: "Sentade, por favor.", translation: "Seieu, si us plau." },
      ],
      questions: [
        { question: "(ti, mirar) ___ o encerado!", options: ["Mira", "Mirade", "Miro"], answer: 0, explanation: "Ti → mira." },
        { question: "(vós, escoitar) ___ a canción.", options: ["Escoita", "Escoitade", "Escoitan"], answer: 1, explanation: "Vós → escoitade." },
        { question: "(vós, comer) ___ a froita.", options: ["Comede", "Come", "Comade"], answer: 0, explanation: "Verbs en -er, vós: comede." },
        { question: "(vós, abrir) ___ a porta.", options: ["Abre", "Abride", "Abrede"], answer: 1, explanation: "Verbs en -ir, vós: abride." },
        { question: "(ti, vir) ___ comigo.", options: ["Ven", "Vide", "Vés"], answer: 0, explanation: "Imperatiu irregular de vir: ven." },
      ],
    },
  ],
  B1: [
    {
      title: "El present de subjuntiu", emoji: "🙏",
      rule: "El subjuntiu va després d'expressions de desig o necessitat amb que: quero que veñas, é importante que estudes. Verbs en -ar: que fale, fales, fale, falemos, faledes, falen.",
      examples: [
        { text: "Quero que estudes máis.", translation: "Vull que estudiïs més." },
        { text: "Espero que teñas sorte.", translation: "Espero que tinguis sort." },
        { text: "É importante que escoitemos.", translation: "És important que escoltem." },
        { text: "Gústame que veñas.", translation: "M'agrada que vinguis." },
      ],
      questions: [
        { question: "Quero que ti ___ (falar) con ela.", options: ["falas", "fales", "falarás"], answer: 1, explanation: "Després de quero que → subjuntiu: fales." },
        { question: "Espero que eles ___ (chegar) cedo.", options: ["cheguen", "chegan", "chegarán"], answer: 0, explanation: "Subjuntiu, eles: cheguen." },
        { question: "É necesario que nós ___ (estudar).", options: ["estudemos", "estudamos", "estudaremos"], answer: 0, explanation: "Subjuntiu, nós: estudemos." },
        { question: "Gústame que ti ___ (vir).", options: ["vés", "veñas", "virás"], answer: 1, explanation: "Subjuntiu de vir: veñas." },
        { question: "Sei que ti ___ razón.", options: ["tes", "teñas", "teña"], answer: 0, explanation: "Saber que expressa certesa → indicatiu: tes." },
      ],
    },
    {
      title: "Els relatius", emoji: "🔁",
      rule: "Que es refereix a persones o coses (o rapaz que vive aquí). Onde es refereix a llocs (a cidade onde nacín). Quen s'usa per a persones darrere de preposició (a moza con quen falei).",
      examples: [
        { text: "O rapaz que leva lentes é o meu curmán.", translation: "El noi que porta ulleres és el meu cosí." },
        { text: "O libro que leo é divertido.", translation: "El llibre que llegeixo és divertit." },
        { text: "Esta é a vila onde vivo.", translation: "Aquest és el poble on visc." },
        { text: "A moza con quen falei é Uxía.", translation: "La noia amb qui vaig parlar és la Uxía." },
      ],
      questions: [
        { question: "A rapaza ___ fala é Nadia.", options: ["que", "onde", "quen"], answer: 0, explanation: "Subjecte: que." },
        { question: "O instituto ___ estudo é grande.", options: ["que", "onde", "quen"], answer: 1, explanation: "Lloc: onde." },
        { question: "A película ___ vimos era triste.", options: ["onde", "que", "quen"], answer: 1, explanation: "Cosa: que." },
        { question: "O amigo con ___ xogo é Brais.", options: ["que", "quen", "onde"], answer: 1, explanation: "Persona darrere de preposició: quen." },
        { question: "O parque ___ xogamos está preto.", options: ["onde", "quen", "cal"], answer: 0, explanation: "Lloc: onde." },
      ],
    },
    {
      title: "L'infinitiu conjugat", emoji: "🧬",
      rule: "El gallec pot conjugar l'infinitiu per indicar qui fa l'acció: para eu falar, para ti falares, para el falar, para nós falarmos, para vós falardes, para eles falaren.",
      examples: [
        { text: "Trouxen o libro para ti leres.", translation: "He portat el llibre perquè el llegeixis." },
        { text: "É hora de marcharmos.", translation: "És hora que marxem." },
        { text: "Antes de saíren, pecharon a porta.", translation: "Abans de sortir, van tancar la porta." },
        { text: "Ao chegardes, chamade.", translation: "Quan arribeu, truqueu." },
      ],
      questions: [
        { question: "Para nós ___ (aprender) cómpre practicar.", options: ["aprendermos", "aprendemos", "aprender"], answer: 0, explanation: "Nós → -mos: aprendermos." },
        { question: "Antes de eles ___ (chegar)…", options: ["chegaren", "chegan", "chegardes"], answer: 0, explanation: "Eles → -en: chegaren." },
        { question: "Para ti ___ (entender) mellor…", options: ["entendes", "entenderes", "entendermos"], answer: 1, explanation: "Ti → -es: entenderes." },
        { question: "Ao vós ___ (saír)…", options: ["saírdes", "saímos", "saíren"], answer: 0, explanation: "Vós → -des: saírdes." },
        { question: "Amb eu i el, l'infinitiu…", options: ["no canvia", "acaba en -es", "acaba en -mos"], answer: 0, explanation: "Eu i el fan servir l'infinitiu normal: falar." },
      ],
    },
    {
      title: "Pretèrits irregulars", emoji: "⏪",
      rule: "Alguns verbs molt usats són irregulars en pretèrit: ser/ir → fun, fuches, foi; estar → estiven; ter → tiven; facer → fixen; poder → puiden; saber → souben.",
      examples: [
        { text: "Onte fun ao cine.", translation: "Ahir vaig anar al cinema." },
        { text: "Estiven en Lugo.", translation: "Vaig estar a Lugo." },
        { text: "Tiven un exame.", translation: "Vaig tenir un examen." },
        { text: "Fixen os deberes.", translation: "Vaig fer els deures." },
      ],
      questions: [
        { question: "Onte eu ___ (facer) unha torta.", options: ["facín", "fixen", "fago"], answer: 1, explanation: "Pretèrit de facer: fixen." },
        { question: "Eu ___ (ter) sorte.", options: ["tiven", "tivo", "tenín"], answer: 0, explanation: "Eu → tiven." },
        { question: "Ela ___ (ir) á praia.", options: ["fun", "foi", "fuches"], answer: 1, explanation: "Ela → foi." },
        { question: "Eu non ___ (poder) vir.", options: ["podín", "puiden", "pode"], answer: 1, explanation: "Pretèrit de poder: puiden." },
        { question: "Eu ___ (estar) enfermo.", options: ["estiven", "estei", "estou"], answer: 0, explanation: "Pretèrit d'estar: estiven." },
      ],
    },
  ],
};
