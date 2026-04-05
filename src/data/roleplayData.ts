export interface DialogueLine {
  speaker: "A" | "B";
  text: string;
  emoji?: string;
}

export interface RoleplayData {
  id: string;
  title: string;
  emoji: string;
  bgColor1: string;
  bgColor2: string;
  speakerA: { name: string; emoji: string; color: string };
  speakerB: { name: string; emoji: string; color: string };
  lines: DialogueLine[];
}

export const roleplays: RoleplayData[] = [
  {
    id: "roleplay-1",
    title: "Saludar i presentar-se",
    emoji: "👋",
    bgColor1: "#FF6B6B",
    bgColor2: "#FFE66D",
    speakerA: { name: "Laia", emoji: "👧", color: "#E84393" },
    speakerB: { name: "Amir", emoji: "👦", color: "#0984E3" },
    lines: [
      { speaker: "A", text: "Hola! Em dic Laia. I tu?", emoji: "👋" },
      { speaker: "B", text: "Hola! Jo em dic Amir.", emoji: "😊" },
      { speaker: "A", text: "D'on ets, Amir?", emoji: "🌍" },
      { speaker: "B", text: "Sóc del Marroc. I tu?", emoji: "🇲🇦" },
      { speaker: "A", text: "Jo sóc de Barcelona!", emoji: "🏙️" },
      { speaker: "B", text: "Encantada de conèixer-te!", emoji: "🤝" },
      { speaker: "A", text: "Igualment! Benvingut!", emoji: "❤️" },
    ],
  },
  {
    id: "roleplay-2",
    title: "Anem al mercat!",
    emoji: "🛒",
    bgColor1: "#00B894",
    bgColor2: "#55EFC4",
    speakerA: { name: "Client", emoji: "🧑", color: "#6C5CE7" },
    speakerB: { name: "Venedor", emoji: "👨‍🌾", color: "#D63031" },
    lines: [
      { speaker: "A", text: "Bon dia! Voldria fruita.", emoji: "🍎" },
      { speaker: "B", text: "Bon dia! Què voldria?", emoji: "😄" },
      { speaker: "A", text: "Mig quilo de pomes, si us plau.", emoji: "🍏" },
      { speaker: "B", text: "Aquí té. Vol alguna cosa més?", emoji: "👍" },
      { speaker: "A", text: "I un quilo de taronges.", emoji: "🍊" },
      { speaker: "B", text: "Perfecte! Són tres euros.", emoji: "💰" },
      { speaker: "A", text: "Aquí té. Gràcies! Adéu!", emoji: "👋" },
    ],
  },
  {
    id: "roleplay-3",
    title: "A classe d'educació física",
    emoji: "⚽",
    bgColor1: "#0984E3",
    bgColor2: "#74B9FF",
    speakerA: { name: "Pau", emoji: "🧒", color: "#E17055" },
    speakerB: { name: "Fàtima", emoji: "👧", color: "#00B894" },
    lines: [
      { speaker: "A", text: "Què fem avui a gimnàs?", emoji: "🏃" },
      { speaker: "B", text: "Juguem a bàsquet!", emoji: "🏀" },
      { speaker: "A", text: "M'encanta el bàsquet!", emoji: "😍" },
      { speaker: "B", text: "A mi m'agrada més el futbol.", emoji: "⚽" },
      { speaker: "A", text: "Estàs cansada?", emoji: "😅" },
      { speaker: "B", text: "Una mica! Però estic contenta.", emoji: "😊" },
      { speaker: "A", text: "Anem a beure aigua!", emoji: "💧" },
    ],
  },
  {
    id: "roleplay-4",
    title: "Descrivim com som",
    emoji: "👔",
    bgColor1: "#A29BFE",
    bgColor2: "#DFE6E9",
    speakerA: { name: "Marc", emoji: "👦", color: "#D63031" },
    speakerB: { name: "Nadia", emoji: "👧", color: "#6C5CE7" },
    lines: [
      { speaker: "A", text: "Avui porto una samarreta blava.", emoji: "👕" },
      { speaker: "B", text: "Jo porto pantalons negres.", emoji: "👖" },
      { speaker: "A", text: "Com et sents avui?", emoji: "🤔" },
      { speaker: "B", text: "Estic contenta! I tu?", emoji: "😄" },
      { speaker: "A", text: "Jo estic una mica cansat.", emoji: "😴" },
      { speaker: "B", text: "Tens els ulls marrons?", emoji: "👀" },
      { speaker: "A", text: "Sí! I tinc el cabell negre.", emoji: "🖤" },
    ],
  },
  {
    id: "roleplay-5",
    title: "Un dia qualsevol",
    emoji: "📅",
    bgColor1: "#FDCB6E",
    bgColor2: "#F8A5C2",
    speakerA: { name: "Júlia", emoji: "👧", color: "#E84393" },
    speakerB: { name: "Omar", emoji: "👦", color: "#0984E3" },
    lines: [
      { speaker: "A", text: "Quin dia és avui?", emoji: "📅" },
      { speaker: "B", text: "Avui és dilluns!", emoji: "1️⃣" },
      { speaker: "A", text: "Com véns a l'escola?", emoji: "🏫" },
      { speaker: "B", text: "Vinc en autobús. I tu?", emoji: "🚌" },
      { speaker: "A", text: "Jo vinc caminant.", emoji: "🚶‍♀️" },
      { speaker: "B", text: "On vius?", emoji: "🏠" },
      { speaker: "A", text: "Visc a prop de l'escola!", emoji: "📍" },
    ],
  },
  {
    id: "roleplay-6",
    title: "Juguem i sortim!",
    emoji: "🎲",
    bgColor1: "#E17055",
    bgColor2: "#FAB1A0",
    speakerA: { name: "Biel", emoji: "🧒", color: "#00B894" },
    speakerB: { name: "Aya", emoji: "👧", color: "#E84393" },
    lines: [
      { speaker: "A", text: "Vols jugar a cartes?", emoji: "🃏" },
      { speaker: "B", text: "Sí! M'encanten els jocs!", emoji: "🎮" },
      { speaker: "A", text: "Mira, una papallona!", emoji: "🦋" },
      { speaker: "B", text: "De quin color és?", emoji: "🎨" },
      { speaker: "A", text: "És groga i taronja!", emoji: "🟡" },
      { speaker: "B", text: "Quin arbre és aquell?", emoji: "🌳" },
      { speaker: "A", text: "Un pi! Anem a veure'l!", emoji: "🌲" },
    ],
  },
];
