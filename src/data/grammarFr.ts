import type { GrammarTopic } from "@/components/GrammarSection";

/** Hand-written French grammar (rules explained in Catalan). */
export const GRAMMAR_FR: Record<"A1" | "A2" | "B1", GrammarTopic[]> = {
  A1: [
    {
      title: "Els articles", emoji: "📰",
      rule: "Definits: le (masculí), la (femení), les (plural). Davant de vocal o h muda: l'. Indefinits: un (masculí), une (femení), des (plural).",
      examples: [
        { text: "Le chien est petit.", translation: "El gos és petit." },
        { text: "La maison est grande.", translation: "La casa és gran." },
        { text: "L'école est loin.", translation: "L'escola és lluny." },
        { text: "J'ai une sœur et des frères.", translation: "Tinc una germana i germans." },
      ],
      questions: [
        { question: "___ table est blanche.", options: ["Le", "La", "Les"], answer: 1, explanation: "Table és femení: la table." },
        { question: "___ livres sont nouveaux.", options: ["Les", "Le", "La"], answer: 0, explanation: "Plural: les livres." },
        { question: "___ eau est froide.", options: ["La", "L'", "Le"], answer: 1, explanation: "Davant de vocal: l'eau." },
        { question: "J'ai ___ chat.", options: ["une", "un", "des"], answer: 1, explanation: "Chat és masculí: un chat." },
        { question: "Elle a ___ amies.", options: ["des", "un", "une"], answer: 0, explanation: "Plural indefinit: des." },
      ],
    },
    {
      title: "Els verbs être i avoir", emoji: "🧍",
      rule: "Être (ser/estar): je suis, tu es, il/elle est, nous sommes, vous êtes, ils/elles sont. Avoir (tenir): j'ai, tu as, il/elle a, nous avons, vous avez, ils/elles ont. L'edat es diu amb avoir: j'ai 13 ans.",
      examples: [
        { text: "Je suis Amina.", translation: "Sóc l'Amina." },
        { text: "Nous sommes à l'école.", translation: "Som a l'escola." },
        { text: "J'ai treize ans.", translation: "Tinc tretze anys." },
        { text: "Ils ont un chien.", translation: "Tenen un gos." },
      ],
      questions: [
        { question: "Tu ___ très gentille.", options: ["es", "est", "suis"], answer: 0, explanation: "Tu → es." },
        { question: "Nous ___ frères.", options: ["sont", "sommes", "êtes"], answer: 1, explanation: "Nous → sommes." },
        { question: "J'___ douze ans.", options: ["suis", "ai", "as"], answer: 1, explanation: "L'edat amb avoir: j'ai." },
        { question: "Ils ___ une grande maison.", options: ["ont", "sont", "avez"], answer: 0, explanation: "Ils → ont." },
        { question: "Vous ___ fatigués ?", options: ["avez", "êtes", "sont"], answer: 1, explanation: "Être, vous → êtes." },
      ],
    },
    {
      title: "El femení i el plural", emoji: "➕",
      rule: "Femení: normalment afegim -e (grand → grande). Plural: normalment afegim -s (ami → amis). Paraules en -eau o -al: beau → beaux, cheval → chevaux. La -s del plural no es pronuncia.",
      examples: [
        { text: "un ami → une amie", translation: "femení + e" },
        { text: "petit → petite", translation: "femení + e" },
        { text: "un livre → des livres", translation: "plural + s" },
        { text: "un cheval → des chevaux", translation: "-al → -aux" },
      ],
      questions: [
        { question: "Il est grand. Elle est ___.", options: ["grand", "grande", "grands"], answer: 1, explanation: "Femení: grande." },
        { question: "un stylo → des ___", options: ["stylo", "stylos", "styloux"], answer: 1, explanation: "+ s: stylos." },
        { question: "un journal → des ___", options: ["journals", "journaux", "journales"], answer: 1, explanation: "-al → -aux." },
        { question: "un gâteau → des ___", options: ["gâteaus", "gâteaux", "gâteau"], answer: 1, explanation: "-eau → -eaux." },
        { question: "Il est content. Elle est ___.", options: ["contente", "contents", "content"], answer: 0, explanation: "Femení: contente." },
      ],
    },
    {
      title: "Present dels verbs en -er", emoji: "⏰",
      rule: "Verbs en -er (parler, jouer, aimer): je parle, tu parles, il/elle parle, nous parlons, vous parlez, ils/elles parlent. Les terminacions -e, -es, -ent sonen igual.",
      examples: [
        { text: "Je parle catalan.", translation: "Parlo català." },
        { text: "Tu joues au foot.", translation: "Jugues a futbol." },
        { text: "Nous aimons la musique.", translation: "Ens agrada la música." },
        { text: "Elles dansent bien.", translation: "Ballen bé." },
      ],
      questions: [
        { question: "Je ___ au parc. (jouer)", options: ["joue", "joues", "jouons"], answer: 0, explanation: "Je → joue." },
        { question: "Nous ___ français. (parler)", options: ["parlez", "parlons", "parlent"], answer: 1, explanation: "Nous → parlons." },
        { question: "Vous ___ la pizza ? (aimer)", options: ["aimez", "aiment", "aimons"], answer: 0, explanation: "Vous → aimez." },
        { question: "Ils ___ la télé. (regarder)", options: ["regarde", "regardent", "regardez"], answer: 1, explanation: "Ils → regardent." },
        { question: "Tu ___ bien. (chanter)", options: ["chante", "chantes", "chantez"], answer: 1, explanation: "Tu → chantes." },
      ],
    },
  ],
  A2: [
    {
      title: "Passé composé", emoji: "⏪",
      rule: "Avoir o être + participi. La majoria de verbs van amb avoir: j'ai mangé. Els verbs de moviment (aller, venir, partir, arriver…) i els reflexius van amb être i concorden: elle est allée.",
      examples: [
        { text: "Hier, j'ai mangé une pomme.", translation: "Ahir vaig menjar una poma." },
        { text: "Nous avons joué au foot.", translation: "Vam jugar a futbol." },
        { text: "Elle est allée au marché.", translation: "Va anar al mercat." },
        { text: "Ils sont arrivés tard.", translation: "Van arribar tard." },
      ],
      questions: [
        { question: "Hier, j'___ regardé un film.", options: ["ai", "suis", "as"], answer: 0, explanation: "Regarder va amb avoir: j'ai." },
        { question: "Elle ___ partie à huit heures.", options: ["a", "est", "ai"], answer: 1, explanation: "Partir va amb être: est partie." },
        { question: "Nous avons ___ nos devoirs. (finir)", options: ["finé", "fini", "finis"], answer: 1, explanation: "Participi: fini." },
        { question: "Ils ___ venus à la fête.", options: ["ont", "sont", "avons"], answer: 1, explanation: "Venir va amb être." },
        { question: "Tu as ___ ton ami ? (voir)", options: ["vu", "voi", "voyé"], answer: 0, explanation: "Participi de voir: vu." },
      ],
    },
    {
      title: "Els possessius", emoji: "👜",
      rule: "Concorden amb la cosa posseïda: mon / ma / mes (meu), ton / ta / tes (teu), son / sa / ses (seu), notre / nos, votre / vos, leur / leurs. Davant de vocal femenina fem servir mon: mon amie.",
      examples: [
        { text: "Mon frère s'appelle Omar.", translation: "El meu germà es diu Omar." },
        { text: "Ma mère est médecin.", translation: "La meva mare és metgessa." },
        { text: "Nos amis sont ici.", translation: "Els nostres amics són aquí." },
        { text: "Mon école est grande.", translation: "La meva escola és gran (mon davant de vocal)." },
      ],
      questions: [
        { question: "___ maison est près de l'école.", options: ["Mon", "Ma", "Mes"], answer: 1, explanation: "Maison és femení: ma." },
        { question: "___ livres sont dans le sac.", options: ["Mes", "Ma", "Mon"], answer: 0, explanation: "Plural: mes." },
        { question: "C'est ___ chien ? (de tu)", options: ["ta", "ton", "tes"], answer: 1, explanation: "Chien masculí: ton." },
        { question: "___ amie est gentille.", options: ["Ma", "Mon", "Mes"], answer: 1, explanation: "Davant de vocal: mon amie." },
        { question: "Ils aiment ___ professeur.", options: ["leur", "leurs", "son"], answer: 0, explanation: "D'ells, singular: leur." },
      ],
    },
    {
      title: "Els verbs pronominals", emoji: "🪥",
      rule: "Porten un pronom reflexiu: je me lève, tu te lèves, il se lève, nous nous levons, vous vous levez, ils se lèvent. Davant de vocal: m', t', s'.",
      examples: [
        { text: "Je me lève à sept heures.", translation: "Em llevo a les set." },
        { text: "Tu te douches le matin ?", translation: "Et dutxes al matí?" },
        { text: "Nous nous lavons les mains.", translation: "Ens rentem les mans." },
        { text: "Il s'habille vite.", translation: "Es vesteix de pressa." },
      ],
      questions: [
        { question: "Je ___ lève tôt.", options: ["te", "me", "se"], answer: 1, explanation: "Je → me." },
        { question: "Nous ___ couchons à dix heures.", options: ["nous", "vous", "se"], answer: 0, explanation: "Nous → nous." },
        { question: "Elle ___ appelle Laia.", options: ["s'", "m'", "t'"], answer: 0, explanation: "Elle davant de vocal: s'." },
        { question: "Vous ___ brossez les dents.", options: ["nous", "vous", "se"], answer: 1, explanation: "Vous → vous." },
        { question: "Ils ___ reposent.", options: ["se", "me", "te"], answer: 0, explanation: "Ils → se." },
      ],
    },
    {
      title: "Comparatius", emoji: "⚖️",
      rule: "plus … que (més), moins … que (menys), aussi … que (tan … com). Irregular: bon → meilleur, bien → mieux.",
      examples: [
        { text: "Pau est plus grand que moi.", translation: "En Pau és més alt que jo." },
        { text: "Ce livre est moins long.", translation: "Aquest llibre és menys llarg." },
        { text: "Je suis aussi grande que ma sœur.", translation: "Sóc tan alta com la meva germana." },
        { text: "Cette pizza est meilleure.", translation: "Aquesta pizza és millor." },
      ],
      questions: [
        { question: "L'éléphant est ___ grand que le chat.", options: ["plus", "aussi", "moins"], answer: 0, explanation: "Superioritat: plus." },
        { question: "Il est aussi rapide ___ toi.", options: ["que", "comme", "de"], answer: 0, explanation: "En francès: aussi … que." },
        { question: "Ce gâteau est ___ que l'autre. (bon)", options: ["plus bon", "meilleur", "mieux"], answer: 1, explanation: "Bon → meilleur." },
        { question: "Le bus est ___ rapide que le train.", options: ["moins", "aussi", "plus que"], answer: 0, explanation: "Inferioritat: moins." },
        { question: "Elle chante ___ que moi. (bien)", options: ["meilleur", "mieux", "plus bien"], answer: 1, explanation: "Bien → mieux." },
      ],
    },
  ],
  B1: [
    {
      title: "L'imparfait", emoji: "🕰️",
      rule: "Descriu el passat i els hàbits. Es forma amb l'arrel de nous del present + -ais, -ais, -ait, -ions, -iez, -aient: nous jouons → je jouais. Être és irregular: j'étais.",
      examples: [
        { text: "Quand j'étais petite, j'habitais au Maroc.", translation: "Quan era petita vivia al Marroc." },
        { text: "Chaque été, nous allions à la plage.", translation: "Cada estiu anàvem a la platja." },
        { text: "Il faisait beau.", translation: "Feia bon temps." },
        { text: "Tu avais un chien ?", translation: "Tenies un gos?" },
      ],
      questions: [
        { question: "Petit, je ___ au foot. (jouer)", options: ["jouais", "ai joué", "joue"], answer: 0, explanation: "Hàbit: jouais." },
        { question: "Nous ___ à la campagne. (habiter)", options: ["habitions", "habitons", "habitaient"], answer: 0, explanation: "Nous → habitions." },
        { question: "Ils ___ toujours en retard. (arriver)", options: ["arrivait", "arrivaient", "arrivent"], answer: 1, explanation: "Ils → arrivaient." },
        { question: "Quand j'___ petite, j'aimais dessiner. (être)", options: ["étais", "suis", "ai été"], answer: 0, explanation: "Être: étais." },
        { question: "Tu ___ beaucoup d'amis. (avoir)", options: ["avais", "avait", "avions"], answer: 0, explanation: "Tu → avais." },
      ],
    },
    {
      title: "Futur i condicional", emoji: "🔮",
      rule: "Futur simple: infinitiu + -ai, -as, -a, -ons, -ez, -ont (je parlerai). Futur proper: aller + infinitiu (je vais partir). Condicional per a desitjos i peticions: je voudrais, j'aimerais, tu pourrais.",
      examples: [
        { text: "Demain, j'étudierai à la bibliothèque.", translation: "Demà estudiaré a la biblioteca." },
        { text: "Nous allons voyager.", translation: "Viatjarem (futur proper)." },
        { text: "Je voudrais un café.", translation: "Voldria un cafè." },
        { text: "J'aimerais être infirmière.", translation: "M'agradaria ser infermera." },
      ],
      questions: [
        { question: "Demain, je ___ à huit heures. (partir)", options: ["partirai", "partais", "partirais"], answer: 0, explanation: "Futur: partirai." },
        { question: "Je ___ un verre d'eau, s'il vous plaît.", options: ["veux", "voudrais", "voudrai"], answer: 1, explanation: "Petició educada: voudrais." },
        { question: "Nous ___ finir le projet. (futur proper)", options: ["allons", "irons", "allions"], answer: 0, explanation: "aller + infinitiu: allons finir." },
        { question: "Si j'avais le temps, je ___ plus.", options: ["lirai", "lirais", "lis"], answer: 1, explanation: "Hipòtesi: lirais." },
        { question: "Ils ___ demain. (arriver)", options: ["arriveront", "arriveraient", "arrivaient"], answer: 0, explanation: "Futur: arriveront." },
      ],
    },
    {
      title: "Connectors", emoji: "🔗",
      rule: "parce que (causa), mais (contrast), donc (conseqüència), en plus (addició), par contre (oposició), enfin (ordre).",
      examples: [
        { text: "Je ne suis pas venu parce que j'étais malade.", translation: "No vaig venir perquè estava malalt." },
        { text: "J'aime ça, mais c'est cher.", translation: "M'agrada, però és car." },
        { text: "Il pleut, donc on reste à la maison.", translation: "Plou, per tant ens quedem a casa." },
        { text: "En plus, elle parle trois langues.", translation: "A més, parla tres idiomes." },
      ],
      questions: [
        { question: "J'étudie ___ je veux réussir.", options: ["parce que", "mais", "donc"], answer: 0, explanation: "Causa: parce que." },
        { question: "Il fait beau, ___ il fait froid.", options: ["donc", "mais", "en plus"], answer: 1, explanation: "Contrast: mais." },
        { question: "Il n'a pas de billet, ___ il ne peut pas entrer.", options: ["donc", "parce que", "en plus"], answer: 0, explanation: "Conseqüència: donc." },
        { question: "Il est timide ; ___, sa sœur est très ouverte.", options: ["par contre", "en plus", "parce que"], answer: 0, explanation: "Oposició: par contre." },
        { question: "Il est sympa et, ___, très travailleur.", options: ["mais", "en plus", "donc"], answer: 1, explanation: "Addició: en plus." },
      ],
    },
    {
      title: "Els pronoms en i y", emoji: "🧩",
      rule: "En substitueix una quantitat o un complement amb de: Tu as des pommes ? Oui, j'en ai deux. Y substitueix un lloc o un complement amb à: Tu vas à Paris ? Oui, j'y vais.",
      examples: [
        { text: "Tu veux du pain ? Oui, j'en veux.", translation: "en = del pa" },
        { text: "Tu viens de la plage ? Oui, j'en viens.", translation: "en = de la platja" },
        { text: "Tu vas au cinéma ? Oui, j'y vais.", translation: "y = al cinema" },
        { text: "Tu penses à l'examen ? Oui, j'y pense.", translation: "y = a l'examen" },
      ],
      questions: [
        { question: "Tu as des frères ? Oui, j'___ ai trois.", options: ["en", "y", "les"], answer: 0, explanation: "Quantitat: en." },
        { question: "Tu vas à Barcelone ? Oui, j'___ vais demain.", options: ["en", "y", "la"], answer: 1, explanation: "Lloc: y." },
        { question: "Tu as acheté du lait ? Non, je n'___ ai pas acheté.", options: ["y", "en", "le"], answer: 1, explanation: "Quantitat indeterminada: en." },
        { question: "Tu es chez toi ? Oui, j'___ suis.", options: ["y", "en", "le"], answer: 0, explanation: "Lloc: y." },
        { question: "Combien de pommes veux-tu ? J'___ veux cinq.", options: ["y", "en", "les"], answer: 1, explanation: "Quantitat: en." },
      ],
    },
  ],
};
