import type { GrammarTopic } from "@/components/GrammarSection";

/** Extra French grammar topics (rules in Catalan). */
export const GRAMMAR_FR_EXTRA: Record<"A1" | "A2" | "B1", GrammarTopic[]> = {
  A1: [
    {
      title: "Els demostratius", emoji: "👉",
      rule: "Per assenyalar: ce (masculí), cet (masculí davant de vocal o h), cette (femení) i ces (plural).",
      examples: [
        { text: "Ce livre est à moi.", translation: "Aquest llibre és meu." },
        { text: "Cet arbre est grand.", translation: "Aquest arbre és gran." },
        { text: "Cette fille est ma sœur.", translation: "Aquesta noia és la meva germana." },
        { text: "Ces chaussures sont neuves.", translation: "Aquestes sabates són noves." },
      ],
      questions: [
        { question: "___ garçon est mon ami.", options: ["Ce", "Cette", "Ces"], answer: 0, explanation: "Masculí singular: ce." },
        { question: "___ maison est jolie.", options: ["Ce", "Cet", "Cette"], answer: 2, explanation: "Femení: cette." },
        { question: "___ enfants jouent.", options: ["Ces", "Ce", "Cet"], answer: 0, explanation: "Plural: ces." },
        { question: "___ homme est grand.", options: ["Ce", "Cet", "Cette"], answer: 1, explanation: "Masculí davant de h muda: cet." },
        { question: "___ voiture est rouge.", options: ["Cette", "Ce", "Ces"], answer: 0, explanation: "Femení: cette." },
      ],
    },
    {
      title: "La negació ne… pas", emoji: "🚫",
      rule: "Per negar posem ne davant del verb i pas darrere: je ne parle pas. Davant de vocal, ne es converteix en n': je n'aime pas.",
      examples: [
        { text: "Je ne parle pas anglais.", translation: "No parlo anglès." },
        { text: "Il n'aime pas le poisson.", translation: "No li agrada el peix." },
        { text: "Nous ne sommes pas fatigués.", translation: "No estem cansats." },
        { text: "Elle n'a pas de frère.", translation: "No té cap germà." },
      ],
      questions: [
        { question: "Je ___ mange ___ de viande.", options: ["ne / pas", "pas / ne", "non / pas"], answer: 0, explanation: "Ne davant del verb i pas darrere." },
        { question: "Tu ___ aimes pas le sport.", options: ["ne", "n'", "non"], answer: 1, explanation: "Davant de vocal: n'." },
        { question: "Tria la frase correcta:", options: ["Il ne pas danse.", "Il ne danse pas.", "Il danse ne pas."], answer: 1, explanation: "Ne + verb + pas." },
        { question: "Nous ne sommes ___ en retard.", options: ["pas", "ne", "non"], answer: 0, explanation: "Falta pas darrere del verb." },
        { question: "Elle ___ habite pas ici.", options: ["ne", "n'", "pas"], answer: 1, explanation: "Habite comença per h muda: n'." },
      ],
    },
    {
      title: "Il y a", emoji: "🏫",
      rule: "Il y a vol dir hi ha i no canvia en plural. Negatiu: il n'y a pas de… Pregunta: Est-ce qu'il y a… ?",
      examples: [
        { text: "Il y a un parc près de chez moi.", translation: "Hi ha un parc a prop de casa." },
        { text: "Il y a vingt élèves.", translation: "Hi ha vint alumnes." },
        { text: "Il n'y a pas de lait.", translation: "No hi ha llet." },
        { text: "Est-ce qu'il y a une pharmacie ?", translation: "Hi ha una farmàcia?" },
      ],
      questions: [
        { question: "Dans la classe, ___ un tableau.", options: ["il y a", "il est", "il a"], answer: 0, explanation: "Existència: il y a." },
        { question: "___ beaucoup de livres.", options: ["Il y ont", "Il y a", "Ils sont"], answer: 1, explanation: "Il y a no canvia en plural." },
        { question: "Il n'y a pas ___ pain.", options: ["du", "de", "le"], answer: 1, explanation: "Després de negació: pas de." },
        { question: "Est-ce qu'___ un bus ?", options: ["il y a", "il a", "y a il"], answer: 0, explanation: "Pregunta: est-ce qu'il y a." },
        { question: "Il ___ y a pas d'eau.", options: ["n'", "ne", "pas"], answer: 0, explanation: "Negatiu: il n'y a pas." },
      ],
    },
    {
      title: "Les preguntes", emoji: "❓",
      rule: "Per preguntar: qui (qui), quoi / qu'est-ce que (què), où (on), quand (quan), comment (com), combien (quant) i pourquoi (per què).",
      examples: [
        { text: "Comment tu t'appelles ?", translation: "Com et dius?" },
        { text: "Où est-ce que tu habites ?", translation: "On vius?" },
        { text: "Quel âge as-tu ?", translation: "Quants anys tens?" },
        { text: "Pourquoi tu ris ?", translation: "Per què rius?" },
      ],
      questions: [
        { question: "___ tu habites ? — À Tarragone.", options: ["Où", "Qui", "Quand"], answer: 0, explanation: "Lloc: où." },
        { question: "___ est ton professeur ? — M. Dubois.", options: ["Qui", "Où", "Combien"], answer: 0, explanation: "Persona: qui." },
        { question: "___ tu arrives ? — Demain.", options: ["Comment", "Quand", "Où"], answer: 1, explanation: "Temps: quand." },
        { question: "___ ça coûte ? — Deux euros.", options: ["Combien", "Pourquoi", "Qui"], answer: 0, explanation: "Quantitat o preu: combien." },
        { question: "___ tu vas bien ? — Très bien.", options: ["Comment", "Qui", "Où"], answer: 0, explanation: "Manera: comment." },
      ],
    },
  ],
  A2: [
    {
      title: "Futur proche", emoji: "🛫",
      rule: "Per parlar de plans i del futur immediat: aller (je vais, tu vas, il va, nous allons, vous allez, ils vont) + infinitiu.",
      examples: [
        { text: "Je vais manger.", translation: "Menjaré / Vaig a menjar." },
        { text: "Nous allons partir demain.", translation: "Marxarem demà." },
        { text: "Il va pleuvoir.", translation: "Plourà." },
        { text: "Vous allez voir un film ?", translation: "Veureu una pel·lícula?" },
      ],
      questions: [
        { question: "Je ___ étudier ce soir.", options: ["vais", "va", "vont"], answer: 0, explanation: "Je → vais." },
        { question: "Nous ___ jouer au foot.", options: ["allez", "allons", "vont"], answer: 1, explanation: "Nous → allons." },
        { question: "Ils ___ arriver tard.", options: ["vont", "va", "allons"], answer: 0, explanation: "Ils → vont." },
        { question: "Tu vas ___ ta grand-mère ?", options: ["appelles", "appeler", "appelé"], answer: 1, explanation: "Aller + infinitiu: appeler." },
        { question: "Vous ___ voyager en été.", options: ["allez", "allons", "va"], answer: 0, explanation: "Vous → allez." },
      ],
    },
    {
      title: "Pouvoir, vouloir, devoir", emoji: "📋",
      rule: "Pouvoir (poder): je peux, tu peux, il peut, nous pouvons, vous pouvez, ils peuvent. Vouloir (voler): je veux… ils veulent. Devoir (haver de): je dois… ils doivent. Després va l'infinitiu.",
      examples: [
        { text: "Je peux t'aider.", translation: "Et puc ajudar." },
        { text: "Tu veux venir ?", translation: "Vols venir?" },
        { text: "Nous devons étudier.", translation: "Hem d'estudiar." },
        { text: "Ils veulent jouer.", translation: "Volen jugar." },
      ],
      questions: [
        { question: "Je ___ un sandwich. (vouloir)", options: ["veux", "veut", "voulons"], answer: 0, explanation: "Je → veux." },
        { question: "Vous ___ parler plus fort ? (pouvoir)", options: ["pouvons", "pouvez", "peuvent"], answer: 1, explanation: "Vous → pouvez." },
        { question: "Elle ___ faire ses devoirs. (devoir)", options: ["dois", "doit", "doivent"], answer: 1, explanation: "Elle → doit." },
        { question: "Ils ___ sortir. (vouloir)", options: ["veulent", "veut", "voulez"], answer: 0, explanation: "Ils → veulent." },
        { question: "Nous ___ partir. (devoir)", options: ["devons", "doivent", "dois"], answer: 0, explanation: "Nous → devons." },
      ],
    },
    {
      title: "Els partitius", emoji: "🥖",
      rule: "Per a quantitats no comptades: du (masculí), de la (femení), de l' (davant de vocal), des (plural). En negatiu sempre de / d'.",
      examples: [
        { text: "Je mange du pain.", translation: "Menjo pa." },
        { text: "Elle boit de la limonade.", translation: "Beu llimonada." },
        { text: "Tu veux de l'eau ?", translation: "Vols aigua?" },
        { text: "Je ne mange pas de viande.", translation: "No menjo carn." },
      ],
      questions: [
        { question: "Je voudrais ___ fromage.", options: ["du", "de la", "des"], answer: 0, explanation: "Fromage és masculí: du." },
        { question: "Il y a ___ soupe.", options: ["du", "de la", "de l'"], answer: 1, explanation: "Soupe és femení: de la." },
        { question: "Tu bois ___ eau.", options: ["de l'", "du", "de la"], answer: 0, explanation: "Davant de vocal: de l'." },
        { question: "Je n'ai pas ___ argent.", options: ["du", "d'", "de l'"], answer: 1, explanation: "En negatiu: d'." },
        { question: "Elle achète ___ pommes.", options: ["des", "du", "de la"], answer: 0, explanation: "Plural: des." },
      ],
    },
    {
      title: "L'imperatiu", emoji: "📢",
      rule: "Per donar ordres o consells fem servir el present sense pronom: écoute (tu), écoutons (nosaltres), écoutez (vosaltres). En els verbs en -er, la forma de tu perd la -s.",
      examples: [
        { text: "Écoute bien !", translation: "Escolta bé!" },
        { text: "Ouvrez vos livres.", translation: "Obriu els llibres." },
        { text: "Allons au parc !", translation: "Anem al parc!" },
        { text: "Ne parle pas !", translation: "No parlis!" },
      ],
      questions: [
        { question: "(tu, regarder) ___ le tableau !", options: ["Regardes", "Regarde", "Regardez"], answer: 1, explanation: "Verbs en -er amb tu: sense -s." },
        { question: "(vous, fermer) ___ la porte.", options: ["Fermez", "Ferme", "Fermons"], answer: 0, explanation: "Vous → fermez." },
        { question: "(nous, chanter) ___ ensemble !", options: ["Chante", "Chantez", "Chantons"], answer: 2, explanation: "Nous → chantons." },
        { question: "(tu, finir) ___ ton repas.", options: ["Finis", "Fini", "Finissez"], answer: 0, explanation: "Verbs en -ir conserven la -s: finis." },
        { question: "Negatiu (tu, crier):", options: ["Ne crie pas !", "Crie pas ne !", "Ne pas crie !"], answer: 0, explanation: "Ne + verb + pas." },
      ],
    },
  ],
  B1: [
    {
      title: "El subjonctif", emoji: "🙏",
      rule: "El subjuntiu va després d'expressions de voluntat, necessitat o sentiment amb que: il faut que tu viennes, je veux que tu partes. Formes de parler: que je parle, tu parles, il parle, nous parlions, vous parliez, ils parlent.",
      examples: [
        { text: "Il faut que tu étudies.", translation: "Cal que estudiïs." },
        { text: "Je veux que vous veniez.", translation: "Vull que vingueu." },
        { text: "Je suis content que tu sois là.", translation: "Estic content que siguis aquí." },
        { text: "Il faut que nous partions.", translation: "Cal que marxem." },
      ],
      questions: [
        { question: "Il faut que tu ___ (faire) tes devoirs.", options: ["fais", "fasses", "feras"], answer: 1, explanation: "Subjuntiu de faire: fasses." },
        { question: "Je veux qu'il ___ (venir).", options: ["vient", "vienne", "viendra"], answer: 1, explanation: "Subjuntiu de venir: vienne." },
        { question: "Il faut que nous ___ (parler).", options: ["parlions", "parlons", "parlerons"], answer: 0, explanation: "Subjuntiu, nous: parlions." },
        { question: "Je suis heureux que tu ___ (être) ici.", options: ["es", "sois", "seras"], answer: 1, explanation: "Subjuntiu d'être: sois." },
        { question: "Je sais que tu ___ raison.", options: ["as", "aies", "aie"], answer: 0, explanation: "Savoir que expressa certesa → indicatiu: as." },
      ],
    },
    {
      title: "Relatius: qui, que, où", emoji: "🔁",
      rule: "Qui és el subjecte del verb que segueix (la fille qui chante). Que és el complement (le livre que je lis). Où indica lloc o temps (la ville où j'habite).",
      examples: [
        { text: "Le garçon qui parle est mon frère.", translation: "El noi que parla és el meu germà." },
        { text: "Le film que j'ai vu est super.", translation: "La pel·lícula que he vist és genial." },
        { text: "C'est la ville où je suis né.", translation: "És la ciutat on vaig néixer." },
        { text: "Le jour où je suis arrivé…", translation: "El dia que vaig arribar…" },
      ],
      questions: [
        { question: "La fille ___ danse est Léa.", options: ["qui", "que", "où"], answer: 0, explanation: "És subjecte de danse: qui." },
        { question: "Le gâteau ___ tu as fait est bon.", options: ["qui", "que", "où"], answer: 1, explanation: "És complement: que." },
        { question: "L'école ___ j'étudie est grande.", options: ["qui", "que", "où"], answer: 2, explanation: "Lloc: où." },
        { question: "Le chien ___ aboie est à moi.", options: ["que", "qui", "où"], answer: 1, explanation: "Subjecte d'aboie: qui." },
        { question: "La chanson ___ j'écoute est belle.", options: ["que", "qui", "où"], answer: 0, explanation: "Complement d'écoute: que." },
      ],
    },
    {
      title: "Pronoms le, la, les", emoji: "🎯",
      rule: "Per no repetir el complement directe: le (masculí), la (femení), l' (davant de vocal) i les (plural). Van davant del verb: je le vois.",
      examples: [
        { text: "Le livre ? Je le lis.", translation: "El llibre? El llegeixo." },
        { text: "Marie ? Je la connais.", translation: "La Marie? La conec." },
        { text: "Les clés ? Je les ai.", translation: "Les claus? Les tinc." },
        { text: "Le film ? Je l'aime.", translation: "La pel·lícula? M'agrada." },
      ],
      questions: [
        { question: "Le gâteau ? Je ___ mange.", options: ["le", "la", "les"], answer: 0, explanation: "Masculí singular: le." },
        { question: "La télé ? Je ___ regarde.", options: ["le", "la", "les"], answer: 1, explanation: "Femení singular: la." },
        { question: "Les devoirs ? Je ___ fais.", options: ["les", "le", "la"], answer: 0, explanation: "Plural: les." },
        { question: "L'ordinateur ? Je ___ utilise.", options: ["le", "l'", "les"], answer: 1, explanation: "Davant de vocal: l'." },
        { question: "Tria l'ordre correcte:", options: ["Je vois le.", "Je le vois.", "Le je vois."], answer: 1, explanation: "El pronom va davant del verb." },
      ],
    },
    {
      title: "Si + imparfait", emoji: "💭",
      rule: "Per a situacions imaginàries: si + imparfait, conditionnel. Si j'avais de l'argent, je voyagerais.",
      examples: [
        { text: "Si j'étais riche, j'achèterais une maison.", translation: "Si fos ric, compraria una casa." },
        { text: "Si tu venais, on jouerait.", translation: "Si vinguessis, jugaríem." },
        { text: "Si nous avions le temps, nous irions.", translation: "Si tinguéssim temps, hi aniríem." },
        { text: "Que ferais-tu si tu gagnais ?", translation: "Què faries si guanyessis?" },
      ],
      questions: [
        { question: "Si j'___ (avoir) un chien, je serais content.", options: ["ai", "avais", "aurais"], answer: 1, explanation: "Si + imparfait: avais." },
        { question: "Si tu étudiais, tu ___ (réussir).", options: ["réussis", "réussirais", "réussiras"], answer: 1, explanation: "Segona part en conditionnel: réussirais." },
        { question: "Si nous ___ (être) en vacances, nous partirions.", options: ["étions", "serions", "sommes"], answer: 0, explanation: "Si + imparfait: étions." },
        { question: "Il ___ (venir) s'il pouvait.", options: ["viendrait", "venait", "vient"], answer: 0, explanation: "Conditionnel: viendrait." },
        { question: "Després de si, mai no posem…", options: ["el conditionnel", "l'imparfait", "el present"], answer: 0, explanation: "Mai no diem «si j'aurais»." },
      ],
    },
  ],
};
