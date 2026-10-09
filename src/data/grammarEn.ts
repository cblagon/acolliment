import type { GrammarTopic } from "@/components/GrammarSection";

/** Hand-written English grammar (rules explained in Catalan). */
export const GRAMMAR_EN: Record<"A1" | "A2" | "B1", GrammarTopic[]> = {
  A1: [
    {
      title: "Els articles a / an / the", emoji: "📰",
      rule: "A i an volen dir «un/una». Fem servir an davant de so vocàlic (an apple) i a davant de consonant (a dog). The és l'article definit (el, la, els, les) i no canvia mai.",
      examples: [
        { text: "I have a cat.", translation: "Tinc un gat." },
        { text: "She eats an apple.", translation: "Ella menja una poma." },
        { text: "The book is on the table.", translation: "El llibre és a la taula." },
        { text: "The children are happy.", translation: "Els nens estan contents." },
      ],
      questions: [
        { question: "I have ___ orange.", options: ["a", "an", "the"], answer: 1, explanation: "Orange comença per vocal: an orange." },
        { question: "She has ___ brother.", options: ["an", "a", "–"], answer: 1, explanation: "Brother comença per consonant: a brother." },
        { question: "Close ___ door, please.", options: ["the", "an", "a"], answer: 0, explanation: "Una porta concreta: the door." },
        { question: "It's ___ umbrella.", options: ["a", "an", "the"], answer: 1, explanation: "Umbrella comença per so vocàlic: an." },
        { question: "He is ___ teacher.", options: ["an", "the", "a"], answer: 2, explanation: "Professions amb a: a teacher." },
      ],
    },
    {
      title: "El verb to be", emoji: "🧍",
      rule: "To be vol dir «ser» i «estar». Present: I am, you are, he/she/it is, we are, you are, they are. Formes curtes: I'm, you're, he's. Negatiu: afegim not (I'm not, he isn't).",
      examples: [
        { text: "I am Amina.", translation: "Sóc l'Amina." },
        { text: "He is tired.", translation: "Està cansat." },
        { text: "We are at school.", translation: "Som a l'escola." },
        { text: "They aren't from Spain.", translation: "No són d'Espanya." },
      ],
      questions: [
        { question: "I ___ twelve years old.", options: ["is", "am", "are"], answer: 1, explanation: "I → am." },
        { question: "She ___ my friend.", options: ["is", "are", "am"], answer: 0, explanation: "She → is." },
        { question: "We ___ in the classroom.", options: ["is", "am", "are"], answer: 2, explanation: "We → are." },
        { question: "They ___ happy today.", options: ["are", "is", "am"], answer: 0, explanation: "They → are." },
        { question: "It ___ cold.", options: ["are", "is", "am"], answer: 1, explanation: "It → is." },
      ],
    },
    {
      title: "El plural", emoji: "➕",
      rule: "Normalment afegim -s: cat → cats. Si acaba en -s, -sh, -ch, -x, afegim -es: box → boxes. Consonant + y → -ies: baby → babies. Alguns són irregulars: man → men, child → children.",
      examples: [
        { text: "one book → two books", translation: "+ s" },
        { text: "one box → two boxes", translation: "+ es" },
        { text: "one baby → two babies", translation: "y → ies" },
        { text: "one child → two children", translation: "irregular" },
      ],
      questions: [
        { question: "one bus → two ___", options: ["buss", "buses", "busies"], answer: 1, explanation: "Acaba en -s: buses." },
        { question: "one city → two ___", options: ["citys", "cities", "cityes"], answer: 1, explanation: "Consonant + y → ies: cities." },
        { question: "one man → two ___", options: ["men", "mans", "manes"], answer: 0, explanation: "Irregular: men." },
        { question: "one pen → two ___", options: ["penes", "pens", "penies"], answer: 1, explanation: "+ s: pens." },
        { question: "one watch → two ___", options: ["watchs", "watches", "watchies"], answer: 1, explanation: "Acaba en -ch: watches." },
      ],
    },
    {
      title: "Present simple", emoji: "⏰",
      rule: "El present simple expressa hàbits: I play, you play, we play, they play. Amb he, she, it afegim -s: he plays. Negatiu amb don't / doesn't: I don't play, she doesn't play.",
      examples: [
        { text: "I play football.", translation: "Jugo a futbol." },
        { text: "She speaks Arabic.", translation: "Ella parla àrab." },
        { text: "We don't like rain.", translation: "No ens agrada la pluja." },
        { text: "He doesn't eat meat.", translation: "Ell no menja carn." },
      ],
      questions: [
        { question: "He ___ to school by bus.", options: ["go", "goes", "going"], answer: 1, explanation: "He → goes." },
        { question: "I ___ English.", options: ["speak", "speaks", "speakes"], answer: 0, explanation: "I → speak." },
        { question: "She ___ like milk.", options: ["don't", "doesn't", "isn't"], answer: 1, explanation: "She → doesn't." },
        { question: "They ___ in Barcelona.", options: ["lives", "live", "living"], answer: 1, explanation: "They → live." },
        { question: "We ___ watch TV in the morning.", options: ["doesn't", "don't", "aren't"], answer: 1, explanation: "We → don't." },
      ],
    },
  ],
  A2: [
    {
      title: "Past simple", emoji: "⏪",
      rule: "El past simple explica accions acabades. Verbs regulars: afegim -ed (play → played). Molts són irregulars: go → went, see → saw, have → had. Negatiu i pregunta amb did: I didn't go. Did you go?",
      examples: [
        { text: "I played football yesterday.", translation: "Ahir vaig jugar a futbol." },
        { text: "We went to the beach.", translation: "Vam anar a la platja." },
        { text: "She didn't see the film.", translation: "No va veure la pel·lícula." },
        { text: "Did you have breakfast?", translation: "Vas esmorzar?" },
      ],
      questions: [
        { question: "Yesterday I ___ my grandma.", options: ["visit", "visited", "visits"], answer: 1, explanation: "Regular: visited." },
        { question: "We ___ to the park last Sunday.", options: ["went", "goed", "go"], answer: 0, explanation: "Irregular: go → went." },
        { question: "She ___ come to the party.", options: ["doesn't", "didn't", "don't"], answer: 1, explanation: "Passat negatiu: didn't." },
        { question: "___ you finish your homework?", options: ["Do", "Did", "Does"], answer: 1, explanation: "Pregunta en passat: Did." },
        { question: "They ___ a new car.", options: ["buyed", "bought", "buy"], answer: 1, explanation: "Irregular: buy → bought." },
      ],
    },
    {
      title: "Els possessius", emoji: "👜",
      rule: "Els adjectius possessius van davant del nom i no canvien: my, your, his (d'ell), her (d'ella), its, our, your, their. Per a persones també fem servir 's: Ana's book.",
      examples: [
        { text: "My brother is tall.", translation: "El meu germà és alt." },
        { text: "Her mother is a doctor.", translation: "La seva mare (d'ella) és metgessa." },
        { text: "Our school is big.", translation: "La nostra escola és gran." },
        { text: "This is Omar's bag.", translation: "Aquesta és la motxilla de l'Omar." },
      ],
      questions: [
        { question: "Tom loves ___ dog.", options: ["her", "his", "their"], answer: 1, explanation: "De Tom (ell): his." },
        { question: "Maria and ___ sister are here.", options: ["her", "his", "its"], answer: 0, explanation: "De Maria (ella): her." },
        { question: "We love ___ teacher.", options: ["their", "our", "your"], answer: 1, explanation: "De nosaltres: our." },
        { question: "They forgot ___ books.", options: ["their", "there", "they"], answer: 0, explanation: "D'ells: their." },
        { question: "This is ___ phone. (de l'Ana)", options: ["Ana", "Ana's", "Anas"], answer: 1, explanation: "Possessió amb 's: Ana's." },
      ],
    },
    {
      title: "Present continuous", emoji: "🏃",
      rule: "Expressa el que passa ara mateix: to be + verb-ing. I am reading, she is eating, they are playing. Paraules clau: now, right now, at the moment.",
      examples: [
        { text: "I am reading a book now.", translation: "Ara estic llegint un llibre." },
        { text: "She is cooking dinner.", translation: "Està fent el sopar." },
        { text: "They are playing outside.", translation: "Estan jugant fora." },
        { text: "Are you listening?", translation: "M'escoltes?" },
      ],
      questions: [
        { question: "Look! It ___ raining.", options: ["is", "are", "am"], answer: 0, explanation: "It → is raining." },
        { question: "We are ___ English now.", options: ["study", "studying", "studies"], answer: 1, explanation: "be + -ing: studying." },
        { question: "I ___ watching TV.", options: ["is", "are", "am"], answer: 2, explanation: "I → am." },
        { question: "They ___ running in the park.", options: ["are", "is", "am"], answer: 0, explanation: "They → are." },
        { question: "She is ___ a letter.", options: ["writeing", "writing", "writes"], answer: 1, explanation: "Write perd la e: writing." },
      ],
    },
    {
      title: "Comparatius", emoji: "⚖️",
      rule: "Adjectius curts: -er + than (tall → taller than). Adjectius llargs: more + adjectiu + than (more beautiful than). Irregulars: good → better, bad → worse. Igualtat: as … as.",
      examples: [
        { text: "Pau is taller than me.", translation: "En Pau és més alt que jo." },
        { text: "This book is more interesting.", translation: "Aquest llibre és més interessant." },
        { text: "Pizza is better than soup.", translation: "La pizza és millor que la sopa." },
        { text: "I am as tall as my sister.", translation: "Sóc tan alta com la meva germana." },
      ],
      questions: [
        { question: "An elephant is ___ than a cat.", options: ["big", "bigger", "more big"], answer: 1, explanation: "Curt: bigger." },
        { question: "Maths is ___ difficult than art.", options: ["more", "most", "-er"], answer: 0, explanation: "Llarg: more difficult." },
        { question: "This film is ___ than that one. (good)", options: ["gooder", "better", "more good"], answer: 1, explanation: "Irregular: better." },
        { question: "He is as fast ___ me.", options: ["than", "as", "like"], answer: 1, explanation: "Igualtat: as … as." },
        { question: "Today is ___ than yesterday. (bad)", options: ["worse", "badder", "worst"], answer: 0, explanation: "Irregular: worse." },
      ],
    },
  ],
  B1: [
    {
      title: "Present perfect", emoji: "✅",
      rule: "Have/has + participi. Parla d'experiències o d'accions que arriben fins ara: I have visited London. She has finished. Paraules clau: ever, never, already, yet, just.",
      examples: [
        { text: "I have never been to Paris.", translation: "No he estat mai a París." },
        { text: "She has just arrived.", translation: "Acaba d'arribar." },
        { text: "Have you ever eaten sushi?", translation: "Has menjat mai sushi?" },
        { text: "We haven't finished yet.", translation: "Encara no hem acabat." },
      ],
      questions: [
        { question: "I ___ seen this film before.", options: ["has", "have", "had"], answer: 1, explanation: "I → have." },
        { question: "She has ___ her homework.", options: ["did", "done", "do"], answer: 1, explanation: "Participi de do: done." },
        { question: "___ you ever been to Italy?", options: ["Have", "Did", "Has"], answer: 0, explanation: "You → Have." },
        { question: "They haven't arrived ___.", options: ["already", "yet", "ever"], answer: 1, explanation: "En negatives: yet." },
        { question: "He ___ lived here since 2020.", options: ["have", "has", "is"], answer: 1, explanation: "He → has." },
      ],
    },
    {
      title: "Futur: will i going to", emoji: "🔮",
      rule: "Going to expressa plans i decisions ja preses: I'm going to study medicine. Will expressa prediccions, promeses i decisions del moment: It will rain. I'll help you.",
      examples: [
        { text: "I'm going to visit my cousins.", translation: "Aniré a veure els cosins (pla)." },
        { text: "It will be sunny tomorrow.", translation: "Demà farà sol (predicció)." },
        { text: "I'll open the window.", translation: "Obriré la finestra (decisió del moment)." },
        { text: "Are you going to play?", translation: "Jugaràs? (pla)" },
      ],
      questions: [
        { question: "Look at the clouds! It ___ rain.", options: ["is going to", "will to", "goes"], answer: 0, explanation: "Evidència present → going to." },
        { question: "I promise I ___ call you.", options: ["am going", "will", "going"], answer: 1, explanation: "Promesa → will." },
        { question: "We ___ to travel in summer. (pla)", options: ["will", "are going", "going"], answer: 1, explanation: "Pla → are going to." },
        { question: "The phone is ringing. I ___ answer it!", options: ["'ll", "'m going to", "will to"], answer: 0, explanation: "Decisió del moment → I'll." },
        { question: "She ___ study medicine next year.", options: ["is going to", "going to", "will to"], answer: 0, explanation: "Pla → is going to." },
      ],
    },
    {
      title: "Connectors", emoji: "🔗",
      rule: "Els connectors uneixen idees: because (causa), but (contrast), so (conseqüència), also / moreover (addició), however (oposició), finally (ordre).",
      examples: [
        { text: "I stayed home because I was ill.", translation: "Em vaig quedar a casa perquè estava malalt." },
        { text: "I like it, but it's expensive.", translation: "M'agrada, però és car." },
        { text: "It was raining, so we stayed inside.", translation: "Plovia, per tant ens vam quedar dins." },
        { text: "However, she didn't give up.", translation: "Tanmateix, no es va rendir." },
      ],
      questions: [
        { question: "I study hard ___ I want to pass.", options: ["because", "but", "so"], answer: 0, explanation: "Causa → because." },
        { question: "It's sunny, ___ it's cold.", options: ["so", "but", "because"], answer: 1, explanation: "Contrast → but." },
        { question: "He was tired, ___ he went to bed.", options: ["so", "but", "however"], answer: 0, explanation: "Conseqüència → so." },
        { question: "He is shy. ___, his sister is very open.", options: ["Also", "However", "Because"], answer: 1, explanation: "Oposició → However." },
        { question: "She speaks French and ___ German.", options: ["also", "but", "so"], answer: 0, explanation: "Addició → also." },
      ],
    },
    {
      title: "Primer condicional", emoji: "🧩",
      rule: "If + present, will + infinitiu. Parla de situacions possibles en el futur: If it rains, I will stay home. Després de if no fem servir will.",
      examples: [
        { text: "If you study, you will pass.", translation: "Si estudies, aprovaràs." },
        { text: "If it rains, we'll stay inside.", translation: "Si plou, ens quedarem dins." },
        { text: "I'll call you if I have time.", translation: "Et trucaré si tinc temps." },
        { text: "If she comes, I won't go.", translation: "Si ella ve, jo no hi aniré." },
      ],
      questions: [
        { question: "If it ___ sunny, we will go to the beach.", options: ["is", "will be", "was"], answer: 0, explanation: "Després de if: present (is)." },
        { question: "If you eat too much, you ___ feel sick.", options: ["will", "are", "do"], answer: 0, explanation: "Resultat: will." },
        { question: "I ___ help you if you ask me.", options: ["will", "am", "would to"], answer: 0, explanation: "Resultat: will." },
        { question: "If he ___ late, the teacher will be angry.", options: ["will arrive", "arrives", "arrive"], answer: 1, explanation: "He + present: arrives." },
        { question: "We won't go out if it ___.", options: ["rains", "will rain", "rain"], answer: 0, explanation: "Després de if: rains." },
      ],
    },
  ],
};
