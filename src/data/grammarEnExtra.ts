import type { GrammarTopic } from "@/components/GrammarSection";

/** Extra English grammar topics (rules in Catalan). */
export const GRAMMAR_EN_EXTRA: Record<"A1" | "A2" | "B1", GrammarTopic[]> = {
  A1: [
    {
      title: "Demostratius: this, that, these, those", emoji: "👉",
      rule: "This (singular) i these (plural) assenyalen el que és a prop. That (singular) i those (plural) assenyalen el que és lluny.",
      examples: [
        { text: "This book is mine.", translation: "Aquest llibre és meu." },
        { text: "That house is big.", translation: "Aquella casa és gran." },
        { text: "These apples are red.", translation: "Aquestes pomes són vermelles." },
        { text: "Those boys are my friends.", translation: "Aquells nois són els meus amics." },
      ],
      questions: [
        { question: "___ pen (here) is blue.", options: ["This", "These", "Those"], answer: 0, explanation: "Singular i a prop: this." },
        { question: "___ mountains (far) are high.", options: ["This", "That", "Those"], answer: 2, explanation: "Plural i lluny: those." },
        { question: "___ shoes (here) are new.", options: ["These", "That", "This"], answer: 0, explanation: "Plural i a prop: these." },
        { question: "___ car (far) is fast.", options: ["Those", "That", "These"], answer: 1, explanation: "Singular i lluny: that." },
        { question: "___ girls (here) are sisters.", options: ["This", "These", "That"], answer: 1, explanation: "Plural i a prop: these." },
      ],
    },
    {
      title: "Have got", emoji: "🎒",
      rule: "Have got serveix per dir què tenim. I/you/we/they have got ('ve got); he/she/it has got ('s got). Negatiu: haven't got / hasn't got. Pregunta: Have you got…?",
      examples: [
        { text: "I've got a brother.", translation: "Tinc un germà." },
        { text: "She has got long hair.", translation: "Ella té els cabells llargs." },
        { text: "We haven't got a car.", translation: "No tenim cotxe." },
        { text: "Have you got a pen?", translation: "Tens un bolígraf?" },
      ],
      questions: [
        { question: "He ___ got a dog.", options: ["have", "has", "is"], answer: 1, explanation: "He → has got." },
        { question: "They ___ got two cats.", options: ["has", "have", "are"], answer: 1, explanation: "They → have got." },
        { question: "I ___ got a bike. (negatiu)", options: ["haven't", "hasn't", "don't"], answer: 0, explanation: "I → haven't got." },
        { question: "___ she got a phone?", options: ["Have", "Has", "Does"], answer: 1, explanation: "Pregunta amb she: Has she got…?" },
        { question: "We ___ got English today.", options: ["have", "has", "are"], answer: 0, explanation: "We → have got." },
      ],
    },
    {
      title: "There is / There are", emoji: "🏫",
      rule: "Per dir que alguna cosa existeix: there is amb singular i there are amb plural. Negatiu: there isn't / there aren't. Pregunta: Is there…? / Are there…?",
      examples: [
        { text: "There is a park near my house.", translation: "Hi ha un parc a prop de casa." },
        { text: "There are twenty students.", translation: "Hi ha vint alumnes." },
        { text: "There isn't any milk.", translation: "No hi ha llet." },
        { text: "Are there any shops?", translation: "Hi ha botigues?" },
      ],
      questions: [
        { question: "There ___ a cat in the garden.", options: ["is", "are", "be"], answer: 0, explanation: "Singular: there is." },
        { question: "There ___ three windows.", options: ["is", "are", "am"], answer: 1, explanation: "Plural: there are." },
        { question: "___ there a bank here?", options: ["Are", "Is", "Do"], answer: 1, explanation: "Singular: Is there…?" },
        { question: "There ___ any chairs. (negatiu)", options: ["isn't", "aren't", "don't"], answer: 1, explanation: "Plural negatiu: there aren't." },
        { question: "There ___ a lot of books.", options: ["are", "is", "has"], answer: 0, explanation: "Books és plural: there are." },
      ],
    },
    {
      title: "Les preguntes: wh- questions", emoji: "❓",
      rule: "Per preguntar: who (qui), what (què), where (on), when (quan), how (com), how old (quants anys), why (per què).",
      examples: [
        { text: "What's your name?", translation: "Com et dius?" },
        { text: "Where do you live?", translation: "On vius?" },
        { text: "How old are you?", translation: "Quants anys tens?" },
        { text: "Who is your teacher?", translation: "Qui és el teu professor?" },
      ],
      questions: [
        { question: "___ do you live? — In Lleida.", options: ["Where", "Who", "When"], answer: 0, explanation: "Lloc: where." },
        { question: "___ is your birthday? — In May.", options: ["What", "When", "How"], answer: 1, explanation: "Temps: when." },
        { question: "___ is that man? — My dad.", options: ["Who", "Where", "Why"], answer: 0, explanation: "Persona: who." },
        { question: "___ old are you? — Fifteen.", options: ["What", "How", "Who"], answer: 1, explanation: "Edat: how old." },
        { question: "___ are you sad? — Because I'm tired.", options: ["Why", "Where", "What"], answer: 0, explanation: "Causa: why." },
      ],
    },
  ],
  A2: [
    {
      title: "Can i must", emoji: "📋",
      rule: "Can expressa capacitat o permís (I can swim). Must expressa obligació (You must wear a uniform). Mustn't vol dir prohibició. Després de can i must el verb va sense to.",
      examples: [
        { text: "I can speak three languages.", translation: "Sé parlar tres llengües." },
        { text: "Can I go to the toilet?", translation: "Puc anar al lavabo?" },
        { text: "You must do your homework.", translation: "Has de fer els deures." },
        { text: "You mustn't use your phone in class.", translation: "No pots fer servir el mòbil a classe." },
      ],
      questions: [
        { question: "She ___ play the guitar very well.", options: ["can", "must", "cans"], answer: 0, explanation: "Capacitat: can (mai cans)." },
        { question: "You ___ stop at a red light.", options: ["can", "must", "mustn't"], answer: 1, explanation: "Obligació: must." },
        { question: "You ___ run in the corridor.", options: ["must", "mustn't", "can"], answer: 1, explanation: "Prohibició: mustn't." },
        { question: "I can ___ fast.", options: ["to run", "run", "running"], answer: 1, explanation: "Després de can, verb sense to: run." },
        { question: "___ I open the window?", options: ["Can", "Must", "Do"], answer: 0, explanation: "Demanar permís: Can I…?" },
      ],
    },
    {
      title: "Some i any", emoji: "🍎",
      rule: "Some s'usa en frases afirmatives (I've got some apples). Any s'usa en frases negatives i preguntes (I haven't got any milk. Have you got any bread?).",
      examples: [
        { text: "There are some apples.", translation: "Hi ha unes quantes pomes." },
        { text: "I haven't got any money.", translation: "No tinc gens de diners." },
        { text: "Is there any water?", translation: "Hi ha aigua?" },
        { text: "I need some help.", translation: "Necessito una mica d'ajuda." },
      ],
      questions: [
        { question: "I want ___ juice.", options: ["some", "any", "a"], answer: 0, explanation: "Afirmativa: some." },
        { question: "We haven't got ___ eggs.", options: ["some", "any", "an"], answer: 1, explanation: "Negativa: any." },
        { question: "Are there ___ students in the room?", options: ["any", "some", "a"], answer: 0, explanation: "Pregunta: any." },
        { question: "She bought ___ bread.", options: ["any", "some", "an"], answer: 1, explanation: "Afirmativa: some." },
        { question: "There isn't ___ sugar.", options: ["some", "any", "a"], answer: 1, explanation: "Negativa: any." },
      ],
    },
    {
      title: "Preposicions in, on, at", emoji: "📍",
      rule: "Temps: at amb hores (at 8 o'clock), on amb dies (on Monday), in amb mesos, anys i estacions (in July). Lloc: in (dins), on (sobre), at (en un punt: at school, at home).",
      examples: [
        { text: "The class starts at nine.", translation: "La classe comença a les nou." },
        { text: "I play football on Saturdays.", translation: "Jugo a futbol els dissabtes." },
        { text: "My birthday is in April.", translation: "El meu aniversari és a l'abril." },
        { text: "The keys are on the table.", translation: "Les claus són sobre la taula." },
      ],
      questions: [
        { question: "I get up ___ 7 o'clock.", options: ["in", "on", "at"], answer: 2, explanation: "Hores: at." },
        { question: "We have English ___ Tuesday.", options: ["on", "in", "at"], answer: 0, explanation: "Dies: on." },
        { question: "It's cold ___ winter.", options: ["at", "in", "on"], answer: 1, explanation: "Estacions: in." },
        { question: "The book is ___ the bag.", options: ["in", "at", "on"], answer: 0, explanation: "Dins: in." },
        { question: "I'm ___ school now.", options: ["on", "in", "at"], answer: 2, explanation: "Lloc com a punt: at school." },
      ],
    },
    {
      title: "Adverbis de freqüència", emoji: "🔄",
      rule: "Diuen cada quant fem una cosa: always (sempre), usually (normalment), often (sovint), sometimes (de vegades), never (mai). Van davant del verb, però darrere de to be.",
      examples: [
        { text: "I always have breakfast.", translation: "Sempre esmorzo." },
        { text: "She is never late.", translation: "Ella no arriba mai tard." },
        { text: "We sometimes go to the cinema.", translation: "De vegades anem al cinema." },
        { text: "They often play basketball.", translation: "Sovint juguen a bàsquet." },
      ],
      questions: [
        { question: "Tria l'ordre correcte:", options: ["I always walk to school.", "I walk always to school.", "Always I walk to school."], answer: 0, explanation: "L'adverbi va davant del verb principal." },
        { question: "Tria l'ordre correcte:", options: ["He never is tired.", "He is never tired.", "Never he is tired."], answer: 1, explanation: "Amb to be, l'adverbi va darrere: is never." },
        { question: "100% de les vegades:", options: ["never", "always", "sometimes"], answer: 1, explanation: "Sempre: always." },
        { question: "0% de les vegades:", options: ["often", "usually", "never"], answer: 2, explanation: "Mai: never." },
        { question: "We ___ eat fish (de vegades).", options: ["sometimes", "always", "never"], answer: 0, explanation: "De vegades: sometimes." },
      ],
    },
  ],
  B1: [
    {
      title: "Segon condicional", emoji: "💭",
      rule: "Per parlar de situacions imaginàries: if + past simple, would + verb. If I had money, I would travel. Amb to be es pot dir were per a totes les persones: If I were you…",
      examples: [
        { text: "If I had a car, I would drive to school.", translation: "Si tingués cotxe, aniria a l'escola amb cotxe." },
        { text: "If I were you, I would study more.", translation: "Jo de tu estudiaria més." },
        { text: "She would help you if she knew.", translation: "T'ajudaria si ho sabés." },
        { text: "What would you do if you won?", translation: "Què faries si guanyessis?" },
      ],
      questions: [
        { question: "If I ___ rich, I would buy a house.", options: ["am", "were", "will be"], answer: 1, explanation: "Situació imaginària: if + were." },
        { question: "If she studied, she ___ pass.", options: ["will", "would", "is"], answer: 1, explanation: "Segona part: would + verb." },
        { question: "If we ___ time, we would go.", options: ["had", "have", "will have"], answer: 0, explanation: "If + past simple: had." },
        { question: "I ___ call him if I knew his number.", options: ["would", "will", "did"], answer: 0, explanation: "Would + verb." },
        { question: "If it ___ sunny, we'd go to the beach.", options: ["is", "was", "will be"], answer: 1, explanation: "Past simple: was (o were)." },
      ],
    },
    {
      title: "La veu passiva", emoji: "🏗️",
      rule: "La passiva destaca l'acció i no qui la fa: to be + participi. Present: is made. Passat: was built. Qui fa l'acció s'introdueix amb by.",
      examples: [
        { text: "English is spoken all over the world.", translation: "L'anglès es parla arreu del món." },
        { text: "This house was built in 1900.", translation: "Aquesta casa es va construir el 1900." },
        { text: "The book was written by a woman.", translation: "El llibre el va escriure una dona." },
        { text: "Phones are made in factories.", translation: "Els mòbils es fan a les fàbriques." },
      ],
      questions: [
        { question: "Paper ___ from trees.", options: ["is made", "makes", "made"], answer: 0, explanation: "Passiva present: is made." },
        { question: "The window ___ yesterday.", options: ["is broken", "was broken", "broke by"], answer: 1, explanation: "Passiva passat: was broken." },
        { question: "The letters ___ every morning.", options: ["are delivered", "is delivered", "delivered"], answer: 0, explanation: "Plural present: are delivered." },
        { question: "The song was sung ___ a famous singer.", options: ["for", "by", "from"], answer: 1, explanation: "Qui fa l'acció: by." },
        { question: "The school ___ in 1990.", options: ["opened by", "was opened", "is open"], answer: 1, explanation: "Passiva passat: was opened." },
      ],
    },
    {
      title: "Relatius: who, which, where", emoji: "🔁",
      rule: "Who es refereix a persones, which a coses o animals i where a llocs. That pot substituir who i which.",
      examples: [
        { text: "The girl who lives next door is Sara.", translation: "La noia que viu al costat és la Sara." },
        { text: "The film which I saw was great.", translation: "La pel·lícula que vaig veure era genial." },
        { text: "This is the town where I was born.", translation: "Aquest és el poble on vaig néixer." },
        { text: "The bus that goes to school is late.", translation: "L'autobús que va a l'escola arriba tard." },
      ],
      questions: [
        { question: "The man ___ teaches us is kind.", options: ["which", "who", "where"], answer: 1, explanation: "Persona: who." },
        { question: "The phone ___ I bought is new.", options: ["which", "who", "where"], answer: 0, explanation: "Cosa: which." },
        { question: "The park ___ we play is big.", options: ["who", "which", "where"], answer: 2, explanation: "Lloc: where." },
        { question: "A dog is an animal ___ barks.", options: ["who", "which", "where"], answer: 1, explanation: "Animal: which." },
        { question: "She's the friend ___ helped me.", options: ["that", "where", "which"], answer: 0, explanation: "That pot substituir who." },
      ],
    },
    {
      title: "Used to", emoji: "🕰️",
      rule: "Used to + verb explica costums del passat que ja no fem: I used to play with dolls. Negatiu: didn't use to. Pregunta: Did you use to…?",
      examples: [
        { text: "I used to live in Morocco.", translation: "Abans vivia al Marroc." },
        { text: "She used to have long hair.", translation: "Abans tenia els cabells llargs." },
        { text: "We didn't use to eat vegetables.", translation: "Abans no menjàvem verdura." },
        { text: "Did you use to walk to school?", translation: "Abans anaves a peu a l'escola?" },
      ],
      questions: [
        { question: "I ___ play football when I was little.", options: ["used to", "use to", "using to"], answer: 0, explanation: "Afirmatiu: used to." },
        { question: "He didn't ___ like fish.", options: ["used to", "use to", "uses to"], answer: 1, explanation: "Negatiu: didn't use to." },
        { question: "___ you use to live here?", options: ["Do", "Did", "Were"], answer: 1, explanation: "Pregunta: Did you use to…?" },
        { question: "They used to ___ in a small flat.", options: ["live", "lived", "living"], answer: 0, explanation: "Used to + verb base: live." },
        { question: "Used to parla de…", options: ["costums del passat", "plans de futur", "accions d'ara"], answer: 0, explanation: "Costums del passat que ja no fem." },
      ],
    },
  ],
};
