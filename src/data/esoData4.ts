import type { Bloc } from "@/data/blocksData";
import type { Ambit } from "@/data/esoData";

// 4t ESO — same module structure as 1r/2n/3r ESO, with level-appropriate vocabulary.
// Only the first module is complete; the rest are placeholders marked "En construcció".
const mk = (id: string, nom: string, emoji: string, color: string, fitxes: Bloc["fitxes"]): Bloc => ({
  id, nom, emoji, color, level: "B1", fitxes,
});
const f = (paraula: string, traduccio: string, emoji: string, frase: string) => ({ paraula, traduccio, emoji, frase });
const wip = (id: string, nom: string, emoji: string, color: string): Bloc => mk(id, nom, emoji, color, []);

const linguistic: Ambit = {
  id: "linguistic",
  nom: "Àmbit Lingüístic",
  emoji: "📖",
  color: "bg-primary",
  descripcio: "Textos expositius, literatura contemporània, ortografia i comunicació de 4t d'ESO.",
  blocs: [
    mk("eso4-ling-expositiu", "Mòdul 1 · Text expositiu", "📑", "bg-primary", [
      f("Definició", "Definition", "📖", "La definició explica què és un concepte."),
      f("Classificació", "Classification", "🗂️", "La classificació ordena les idees en grups."),
      f("Exemple", "Example", "💡", "Posa un exemple per aclarir la idea."),
      f("Comparació", "Comparison", "⚖️", "La comparació mostra semblances i diferències."),
      f("Esquema", "Outline", "🧭", "Fes un esquema abans d'escriure."),
      f("Resum", "Summary", "✂️", "El resum recull les idees principals."),
      f("Parafrasi", "Paraphrase", "🔁", "La paràfrasi diu el mateix amb altres paraules."),
      f("Cohesió", "Cohesion", "🧵", "La cohesió lliga les frases del text."),
    ]),
    wip("eso4-ling-literatura", "Mòdul 2 · Literatura contemporània", "📚", "bg-accent"),
    wip("eso4-ling-ortografia", "Mòdul 3 · Ortografia i lèxic", "🔤", "bg-secondary"),
    wip("eso4-ling-comunicacio", "Mòdul 4 · Comunicació i debat", "🎤", "bg-bloom-pink"),
  ],
};

const matematic: Ambit = {
  id: "matematic",
  nom: "Àmbit Matemàtic",
  emoji: "📐",
  color: "bg-accent",
  descripcio: "Funcions, estadística, geometria i àlgebra de 4t d'ESO.",
  blocs: [
    wip("eso4-mat-funcions", "Mòdul 1 · Funcions", "📈", "bg-primary"),
    wip("eso4-mat-estadistica", "Mòdul 2 · Estadística i probabilitat", "🎲", "bg-accent"),
    wip("eso4-mat-geometria", "Mòdul 3 · Geometria", "📐", "bg-secondary"),
    wip("eso4-mat-algebra", "Mòdul 4 · Àlgebra", "🧮", "bg-bloom-pink"),
  ],
};

const ciencies: Ambit = {
  id: "ciencies",
  nom: "Àmbit Científic",
  emoji: "🔬",
  color: "bg-secondary",
  descripcio: "Física, química, biologia i tecnologia de 4t d'ESO.",
  blocs: [
    wip("eso4-ci-fisica", "Mòdul 1 · Física", "⚡", "bg-primary"),
    wip("eso4-ci-quimica", "Mòdul 2 · Química", "🧪", "bg-accent"),
    wip("eso4-ci-biologia", "Mòdul 3 · Biologia i salut", "🧬", "bg-secondary"),
    wip("eso4-ci-tecnologia", "Mòdul 4 · Tecnologia i robòtica", "🤖", "bg-bloom-pink"),
  ],
};

const social: Ambit = {
  id: "social",
  nom: "Àmbit Social",
  emoji: "🌍",
  color: "bg-bloom-pink",
  descripcio: "Història contemporània, geografia, ciutadania i economia de 4t d'ESO.",
  blocs: [
    wip("eso4-so-historia", "Mòdul 1 · Història contemporània", "🏛️", "bg-primary"),
    wip("eso4-so-geografia", "Mòdul 2 · Geografia", "🗺️", "bg-accent"),
    wip("eso4-so-ciutadania", "Mòdul 3 · Ciutadania i valors", "🤝", "bg-secondary"),
    wip("eso4-so-economia", "Mòdul 4 · Economia i empresa", "💼", "bg-bloom-pink"),
  ],
};

const artistic: Ambit = {
  id: "artistic",
  nom: "Àmbit Artístic",
  emoji: "🎨",
  color: "bg-primary",
  descripcio: "Art, música i expressió corporal de 4t d'ESO.",
  blocs: [
    wip("eso4-ar-art", "Mòdul 1 · Art i disseny", "🖼️", "bg-primary"),
    wip("eso4-ar-musica", "Mòdul 2 · Música", "🎵", "bg-accent"),
    wip("eso4-ar-teatre", "Mòdul 3 · Teatre i expressió", "🎭", "bg-secondary"),
    wip("eso4-ar-audiovisual", "Mòdul 4 · Llenguatge audiovisual", "🎬", "bg-bloom-pink"),
  ],
};

const fisic: Ambit = {
  id: "fisic",
  nom: "Àmbit Físic i Salut",
  emoji: "⚽",
  color: "bg-accent",
  descripcio: "Esport, salut i hàbits saludables de 4t d'ESO.",
  blocs: [
    wip("eso4-fi-esport", "Mòdul 1 · Esports d'equip", "🏀", "bg-primary"),
    wip("eso4-fi-salut", "Mòdul 2 · Salut i benestar", "❤️", "bg-accent"),
    wip("eso4-fi-natura", "Mòdul 3 · Activitats a la natura", "🥾", "bg-secondary"),
    wip("eso4-fi-joc", "Mòdul 4 · Joc i fair play", "🏅", "bg-bloom-pink"),
  ],
};

const orientacio: Ambit = {
  id: "orientacio",
  nom: "Àmbit d'Orientació",
  emoji: "🧭",
  color: "bg-secondary",
  descripcio: "Itineraris, món laboral i projecte personal de 4t d'ESO.",
  blocs: [
    wip("eso4-or-itineraris", "Mòdul 1 · Itineraris acadèmics", "🛤️", "bg-primary"),
    wip("eso4-or-treball", "Mòdul 2 · Món laboral", "🧰", "bg-accent"),
    wip("eso4-or-projecte", "Mòdul 3 · Projecte personal", "🌱", "bg-secondary"),
    wip("eso4-or-digital", "Mòdul 4 · Competència digital", "💻", "bg-bloom-pink"),
  ],
};

export const eso4Ambits: Ambit[] = [linguistic, matematic, ciencies, social, artistic, fisic, orientacio];
