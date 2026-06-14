import type { Bloc } from "@/data/blocksData";

export type CursId = "1eso" | "2eso" | "3eso" | "4eso";
export type AmbitId =
  | "linguistic"
  | "matematic"
  | "cientific-tecnologic"
  | "social"
  | "artistic"
  | "educacio-fisica"
  | "tutoria";

export interface Ambit {
  id: AmbitId;
  nom: string;
  emoji: string;
  color: string;
  descripcio: string;
  blocs: Bloc[];
}

export interface Curs {
  id: CursId;
  nom: string;
  emoji: string;
  descripcio: string;
  ambits: Ambit[];
}

// Helper to build a Bloc quickly. We reuse Level "A1" as a placeholder
// because ESO content does not rely on the A1/A2/B1 filter system.
const mk = (id: string, nom: string, emoji: string, color: string, fitxes: Bloc["fitxes"]): Bloc => ({
  id,
  nom,
  emoji,
  color,
  level: "A1",
  fitxes,
});

const f = (paraula: string, traduccio: string, emoji: string, frase: string) => ({ paraula, traduccio, emoji, frase });

// ============================================================
// 1r ESO — contingut complet
// ============================================================

const eso1_linguistic: Ambit = {
  id: "linguistic",
  nom: "Àmbit Lingüístic",
  emoji: "📖",
  color: "bg-primary",
  descripcio: "Català, castellà i llengua estrangera: vocabulari per comunicar-se a l'aula i fora.",
  blocs: [
    mk("eso1-ling-aula-material", "L'aula i el material escolar", "🎒", "bg-primary", [
      f("Llibreta", "Notebook", "📓", "Apunta-ho a la llibreta."),
      f("Llibre", "Book", "📖", "Obre el llibre de text."),
      f("Esborrany", "Draft", "📝", "Fes-ho primer a l'esborrany."),
      f("Pissarra", "Blackboard", "📋", "Surt a la pissarra."),
      f("Retolador", "Marker", "🖍️", "Dóna'm el retolador negre."),
      f("Agenda", "Diary", "🗓️", "Apunta els deures a l'agenda."),
      f("Motxilla", "Backpack", "🎒", "La motxilla pesa molt."),
      f("Estoig", "Pencil case", "✏️", "Treu un llapis de l'estoig."),
    ]),
    mk("eso1-ling-accions-classe", "Accions a classe", "✍️", "bg-accent", [
      f("Escriure", "To write", "✍️", "Escriu la data."),
      f("Llegir", "To read", "📖", "Llegeix en veu alta."),
      f("Escoltar", "To listen", "👂", "Escolta l'àudio."),
      f("Subratllar", "To underline", "🖍️", "Subratlla la idea principal."),
      f("Corregir", "To correct", "✅", "Corregeix els errors."),
      f("Repassar", "To review", "🔁", "Repassa el tema abans de l'examen."),
      f("Preguntar", "To ask", "❓", "Pregunta si no ho entens."),
      f("Respondre", "To answer", "💬", "Respon a la pregunta."),
    ]),
    mk("eso1-ling-persones-centre", "Les persones del centre", "👩‍🏫", "bg-secondary", [
      f("Professor", "Teacher (m)", "👨‍🏫", "El professor explica el tema."),
      f("Professora", "Teacher (f)", "👩‍🏫", "La professora ajuda l'alumnat."),
      f("Tutor", "Tutor (m)", "🧑‍🏫", "El tutor parla amb la família."),
      f("Tutora", "Tutor (f)", "👩‍🏫", "La tutora ens dóna les notes."),
      f("Director", "Headmaster", "👔", "El director és al despatx."),
      f("Conserge", "Janitor", "🛎️", "El conserge obre la porta."),
      f("Company", "Classmate (m)", "🧑", "Treballa amb el company."),
      f("Companya", "Classmate (f)", "👧", "La companya m'ajuda."),
    ]),
    mk("eso1-ling-emocions", "Emocions i sentiments", "😊", "bg-bloom-pink", [
      f("Content", "Happy", "😄", "Estic content avui."),
      f("Trist", "Sad", "😢", "Es sent trist."),
      f("Nerviós", "Nervous", "😬", "Estic nerviós abans de l'examen."),
      f("Avorrit", "Bored", "😑", "Estic avorrit."),
      f("Motivat", "Motivated", "💪", "Em sento motivat."),
      f("Cansat", "Tired", "😴", "Avui estic cansat."),
      f("Sorprès", "Surprised", "😲", "Quina sorpresa!"),
      f("Enfadat", "Angry", "😠", "No estiguis enfadat."),
    ]),
    mk("eso1-ling-familia", "La família i les relacions", "👨‍👩‍👧", "bg-bloom-purple", [
      f("Pare", "Father", "👨", "El meu pare treballa."),
      f("Mare", "Mother", "👩", "La meva mare cuina."),
      f("Germà", "Brother", "👦", "Tinc un germà gran."),
      f("Germana", "Sister", "👧", "La meva germana petita."),
      f("Avi", "Grandfather", "👴", "L'avi explica històries."),
      f("Àvia", "Grandmother", "👵", "L'àvia fa galetes."),
      f("Amic", "Friend (m)", "🧑‍🤝‍🧑", "El meu millor amic."),
      f("Amiga", "Friend (f)", "👭", "La meva amiga del barri."),
    ]),
    mk("eso1-ling-cos-salut", "El cos i la salut", "🧍", "bg-bloom-teal", [
      f("Cap", "Head", "🗣️", "Em fa mal el cap."),
      f("Braç", "Arm", "💪", "S'ha trencat el braç."),
      f("Cama", "Leg", "🦵", "Em fa mal la cama."),
      f("Mà", "Hand", "✋", "Renta't les mans."),
      f("Peu", "Foot", "🦶", "Em fa mal el peu."),
      f("Mal de cap", "Headache", "🤕", "Tinc mal de cap."),
      f("Febre", "Fever", "🌡️", "Té febre alta."),
      f("Tos", "Cough", "😷", "Té molta tos."),
    ]),
    mk("eso1-ling-formules", "Fórmules per comunicar-se", "💬", "bg-bloom-yellow", [
      f("Puc anar al lavabo?", "May I go to the toilet?", "🚻", "Disculpi, puc anar al lavabo?"),
      f("No ho entenc", "I don't understand", "🤔", "Perdoni, no ho entenc."),
      f("Pots repetir?", "Can you repeat?", "🔁", "Pots repetir-ho, si us plau?"),
      f("M'ajudes?", "Can you help me?", "🙏", "M'ajudes amb això?"),
      f("Com es diu…?", "How do you say…?", "❓", "Com es diu això en català?"),
      f("Què significa?", "What does it mean?", "💭", "Què significa aquesta paraula?"),
      f("Més a poc a poc", "More slowly", "🐢", "Parla més a poc a poc, si us plau."),
      f("Gràcies, mestra", "Thanks, teacher", "🙏", "Gràcies per l'ajuda."),
    ]),
  ],
};

const eso1_matematic: Ambit = {
  id: "matematic",
  nom: "Àmbit Matemàtic",
  emoji: "📐",
  color: "bg-bloom-purple",
  descripcio: "Vocabulari de matemàtiques: formes, nombres, mesures, estadística i àlgebra.",
  blocs: [
    mk("eso1-mat-formes2d", "Mòdul 1 · Formes planes (2D)", "🔺", "bg-primary", [
      f("Triangle", "Triangle", "🔺", "El triangle té tres costats."),
      f("Quadrat", "Square", "⬜", "El quadrat té quatre costats iguals."),
      f("Rectangle", "Rectangle", "▭", "La pissarra és un rectangle."),
      f("Cercle", "Circle", "⭕", "Dibuixa un cercle amb el compàs."),
      f("El·lipse", "Ellipse", "🥚", "L'el·lipse és com un cercle aixafat."),
      f("Pentàgon", "Pentagon", "⬟", "El pentàgon té cinc costats."),
      f("Hexàgon", "Hexagon", "⬢", "La rajola és un hexàgon."),
      f("Rombe", "Rhombus", "🔷", "El rombe té quatre costats iguals."),
      f("Trapezi", "Trapezium", "⏢", "El trapezi té dos costats paral·lels."),
      f("Costat", "Side", "📏", "Mesura el costat del triangle."),
      f("Vèrtex", "Vertex", "📍", "El triangle té tres vèrtexs."),
      f("Angle", "Angle", "📐", "L'angle recte fa 90 graus."),
    ]),
    mk("eso1-mat-cossos3d", "Mòdul 2 · Cossos geomètrics (3D)", "🧊", "bg-accent", [
      f("Cub", "Cube", "🧊", "El dau és un cub."),
      f("Esfera", "Sphere", "🔵", "La pilota és una esfera."),
      f("Cilindre", "Cylinder", "🥫", "La llauna és un cilindre."),
      f("Con", "Cone", "🍦", "El con de gelat."),
      f("Prisma", "Prism", "📦", "El prisma triangular."),
      f("Piràmide", "Pyramid", "🗻", "La piràmide d'Egipte."),
      f("Aresta", "Edge", "📐", "El cub té dotze arestes."),
      f("Cara", "Face", "🟥", "El cub té sis cares."),
      f("Base", "Base", "⬇️", "La base del prisma és un triangle."),
    ]),
    mk("eso1-mat-propietats", "Mòdul 3 · Elements i propietats", "📐", "bg-secondary", [
      f("Angle recte", "Right angle", "📐", "L'angle recte fa 90°."),
      f("Angle agut", "Acute angle", "∠", "Un angle agut és menor de 90°."),
      f("Angle obtús", "Obtuse angle", "⦦", "Un angle obtús és major de 90°."),
      f("Perímetre", "Perimeter", "🔲", "Calcula el perímetre del quadrat."),
      f("Àrea", "Area", "🟦", "L'àrea és base per altura."),
      f("Volum", "Volume", "📦", "Calcula el volum del cub."),
      f("Simetria", "Symmetry", "🪞", "La papallona té simetria."),
      f("Paral·lel", "Parallel", "‖", "Les vies del tren són paral·leles."),
      f("Perpendicular", "Perpendicular", "⊥", "Aquestes línies són perpendiculars."),
    ]),
    mk("eso1-mat-instruments", "Mòdul 4 · Instruments de dibuix i mesura", "📏", "bg-bloom-pink", [
      f("Regle", "Ruler", "📏", "Mesura amb el regle."),
      f("Escaire", "Set square", "📐", "Dibuixa amb l'escaire."),
      f("Compàs", "Compass", "🧭", "Fes un cercle amb el compàs."),
      f("Transportador d'angles", "Protractor", "📐", "Mesura l'angle amb el transportador."),
      f("Calculadora", "Calculator", "🧮", "Usa la calculadora."),
      f("Cinta mètrica", "Tape measure", "📏", "Mesura l'aula amb la cinta mètrica."),
    ]),
    mk("eso1-mat-nombres", "Mòdul 5 · Nombres i operacions", "➕", "bg-bloom-purple", [
      f("Suma", "Addition", "➕", "Fes la suma."),
      f("Resta", "Subtraction", "➖", "Fes la resta."),
      f("Multiplicació", "Multiplication", "✖️", "Aprèn la taula de multiplicar."),
      f("Divisió", "Division", "➗", "Fes la divisió."),
      f("Resultat", "Result", "🟰", "Quin és el resultat?"),
      f("Fracció", "Fraction", "½", "Mitja pizza és una fracció."),
      f("Numerador", "Numerator", "🔢", "El numerador va a dalt."),
      f("Denominador", "Denominator", "🔢", "El denominador va a baix."),
      f("Decimal", "Decimal", ".", "Un nombre decimal té coma."),
      f("Percentatge", "Percentage", "💯", "Un 50% és la meitat."),
      f("Potència", "Power", "²", "Dos al quadrat és quatre."),
      f("Arrel quadrada", "Square root", "√", "L'arrel quadrada de 9 és 3."),
      f("Nombre enter", "Integer", "🔢", "−3 és un nombre enter."),
      f("Nombre primer", "Prime number", "🔢", "El 7 és un nombre primer."),
    ]),
    mk("eso1-mat-mesures", "Mòdul 6 · Mesures i unitats", "⚖️", "bg-bloom-teal", [
      f("Metre", "Metre", "📏", "Un metre té cent centímetres."),
      f("Centímetre", "Centimetre", "📏", "Mesura en centímetres."),
      f("Quilòmetre", "Kilometre", "🛣️", "Hi ha cinc quilòmetres fins al poble."),
      f("Gram", "Gram", "⚖️", "Un caramel pesa pocs grams."),
      f("Quilogram", "Kilogram", "⚖️", "Un quilogram té mil grams."),
      f("Litre", "Litre", "🧴", "Una ampolla d'aigua de dos litres."),
      f("Segon", "Second", "⏱️", "Un minut té seixanta segons."),
      f("Minut", "Minute", "⏰", "Espera cinc minuts."),
      f("Hora", "Hour", "🕐", "Una hora té seixanta minuts."),
      f("Grau", "Degree", "🌡️", "Avui fa 25 graus."),
    ]),
    mk("eso1-mat-estadistica", "Mòdul 7 · Estadística i atzar", "📊", "bg-bloom-yellow", [
      f("Gràfic de barres", "Bar chart", "📊", "Fes un gràfic de barres."),
      f("Diagrama de sectors", "Pie chart", "🥧", "El diagrama de sectors mostra percentatges."),
      f("Taula de freqüències", "Frequency table", "📋", "Omple la taula de freqüències."),
      f("Mitjana", "Mean", "📈", "Calcula la mitjana de les notes."),
      f("Moda", "Mode", "🔝", "La moda és el valor més repetit."),
      f("Mediana", "Median", "↕️", "La mediana és el valor central."),
      f("Probabilitat", "Probability", "🎲", "Quina probabilitat hi ha?"),
      f("Atzar", "Chance", "🎰", "Un joc d'atzar."),
      f("Dau", "Die", "🎲", "Tira el dau."),
      f("Moneda", "Coin", "🪙", "Llança la moneda a l'aire."),
    ]),
    mk("eso1-mat-algebra", "Mòdul 8 · Àlgebra bàsica", "🔣", "bg-primary", [
      f("Incògnita", "Unknown", "❓", "La x és la incògnita."),
      f("Equació", "Equation", "🟰", "Resol l'equació."),
      f("Igualtat", "Equality", "=", "A=B és una igualtat."),
      f("Variable", "Variable", "🔤", "La variable és una lletra."),
      f("Terme", "Term", "🔢", "Cada terme està separat per +."),
      f("Coeficient", "Coefficient", "🔢", "El coeficient és el nombre."),
      f("Resoldre", "To solve", "💡", "Resol l'equació."),
    ]),
  ],
};

const eso1_cientific: Ambit = {
  id: "cientific-tecnologic",
  nom: "Àmbit Científic-Tecnològic",
  emoji: "🔬",
  color: "bg-bloom-teal",
  descripcio: "Ciències, tecnologia, digitalització, laboratori i el món natural.",
  blocs: [
    mk("eso1-ct-materials", "Materials de construcció", "🪵", "bg-primary", [
      f("Fusta", "Wood", "🪵", "La cadira és de fusta."),
      f("Metall", "Metal", "⛓️", "El got de metall."),
      f("Plàstic", "Plastic", "🧴", "L'ampolla és de plàstic."),
      f("Cartró", "Cardboard", "📦", "La caixa és de cartró."),
      f("Vidre", "Glass", "🥛", "El got és de vidre."),
      f("Tela", "Fabric", "🧵", "La samarreta és de tela."),
    ]),
    mk("eso1-ct-dibuix-tecnic", "Dibuix tècnic", "📐", "bg-accent", [
      f("Croquis", "Sketch", "✏️", "Fes un croquis abans del plànol."),
      f("Plànol", "Blueprint", "📜", "Mira el plànol de la casa."),
      f("Escala", "Scale", "📏", "El plànol està a escala 1:100."),
      f("Vista frontal", "Front view", "👁️", "Dibuixa la vista frontal."),
      f("Vista lateral", "Side view", "👁️", "Aquesta és la vista lateral."),
      f("Vista de planta", "Top view", "🔽", "La vista de planta es veu des de dalt."),
      f("Acotació", "Dimensioning", "📐", "Acota totes les mides."),
    ]),
    mk("eso1-ct-electricitat", "Electricitat i circuits", "💡", "bg-bloom-yellow", [
      f("Pila", "Battery", "🔋", "La pila dóna energia."),
      f("Cable", "Wire", "🔌", "Connecta el cable."),
      f("Interruptor", "Switch", "🔘", "Prem l'interruptor."),
      f("Bombeta", "Bulb", "💡", "S'ha fos la bombeta."),
      f("Circuit", "Circuit", "⚡", "Munta el circuit elèctric."),
      f("Corrent", "Current", "🔌", "El corrent passa pel cable."),
    ]),
    mk("eso1-ct-processos", "Processos i estructures", "🔧", "bg-secondary", [
      f("Tallar", "To cut", "✂️", "Talla la fusta."),
      f("Unir", "To join", "🔗", "Uneix les peces amb cola."),
      f("Muntar", "To assemble", "🔧", "Munta el moble."),
      f("Doblegar", "To bend", "↩️", "Doblega el filferro."),
      f("Estructura", "Structure", "🏗️", "L'estructura és sòlida."),
      f("Mecanisme", "Mechanism", "⚙️", "Aquest mecanisme mou la peça."),
    ]),
    mk("eso1-ct-laboratori", "Material i normes de laboratori", "🧪", "bg-bloom-pink", [
      f("Tub d'assaig", "Test tube", "🧪", "Posa el líquid al tub d'assaig."),
      f("Microscopi", "Microscope", "🔬", "Mira al microscopi."),
      f("Bata", "Lab coat", "🥼", "Posa't la bata."),
      f("Ulleres de seguretat", "Safety goggles", "🥽", "Usa les ulleres de seguretat."),
      f("Bec Bunsen", "Bunsen burner", "🔥", "Encén el bec Bunsen."),
      f("Vas de precipitats", "Beaker", "⚗️", "Aboca l'aigua al vas de precipitats."),
    ]),
    mk("eso1-ct-essers-vius", "Els éssers vius", "🌱", "bg-bloom-teal", [
      f("Cèl·lula", "Cell", "🦠", "La cèl·lula és la unitat de la vida."),
      f("Animal", "Animal", "🦁", "El gos és un animal."),
      f("Planta", "Plant", "🌿", "Rega la planta."),
      f("Fong", "Fungus", "🍄", "El bolet és un fong."),
      f("Espècie", "Species", "🐾", "Hi ha moltes espècies d'ocells."),
      f("Ecosistema", "Ecosystem", "🌳", "El bosc és un ecosistema."),
    ]),
    mk("eso1-ct-cos-huma", "El cos humà", "🫀", "bg-bloom-purple", [
      f("Sistema digestiu", "Digestive system", "🍽️", "El sistema digestiu digereix els aliments."),
      f("Sistema respiratori", "Respiratory system", "🫁", "El sistema respiratori porta oxigen."),
      f("Sistema circulatori", "Circulatory system", "❤️", "El sistema circulatori transporta la sang."),
      f("Cor", "Heart", "❤️", "El cor batega."),
      f("Pulmons", "Lungs", "🫁", "Respira amb els pulmons."),
      f("Estómac", "Stomach", "🫃", "L'estómac digereix els aliments."),
      f("Cervell", "Brain", "🧠", "El cervell pensa."),
    ]),
    mk("eso1-ct-materia", "La matèria", "⚗️", "bg-primary", [
      f("Sòlid", "Solid", "🧊", "El gel és sòlid."),
      f("Líquid", "Liquid", "💧", "L'aigua és líquida."),
      f("Gas", "Gas", "💨", "El vapor és un gas."),
      f("Canvi d'estat", "State change", "🔄", "Quan el gel es fon hi ha un canvi d'estat."),
      f("Mescla", "Mixture", "🥣", "L'amanida és una mescla."),
      f("Dissolució", "Solution", "🥤", "L'aigua amb sucre és una dissolució."),
    ]),
    mk("eso1-ct-energia", "L'energia", "⚡", "bg-bloom-yellow", [
      f("Energia elèctrica", "Electrical energy", "⚡", "L'energia elèctrica ve dels endolls."),
      f("Energia tèrmica", "Thermal energy", "🔥", "El foc dóna energia tèrmica."),
      f("Energia lluminosa", "Light energy", "💡", "El Sol és energia lluminosa."),
      f("Energia renovable", "Renewable energy", "♻️", "El sol és energia renovable."),
      f("Energia no renovable", "Non-renewable energy", "🛢️", "El petroli és energia no renovable."),
      f("Font d'energia", "Energy source", "🔋", "El vent és una font d'energia."),
    ]),
  ],
};

const eso1_social: Ambit = {
  id: "social",
  nom: "Àmbit Social",
  emoji: "🌍",
  color: "bg-bloom-yellow",
  descripcio: "Geografia, història i les nostres societats.",
  blocs: [
    mk("eso1-soc-temps", "El temps i l'espai", "⏳", "bg-primary", [
      f("Segle", "Century", "🏛️", "Estem al segle XXI."),
      f("Era", "Era", "📜", "L'era industrial."),
      f("Dècada", "Decade", "🔟", "Una dècada són deu anys."),
      f("Línia del temps", "Timeline", "📏", "Dibuixa una línia del temps."),
      f("Abans", "Before", "⬅️", "Això va passar abans."),
      f("Després", "After", "➡️", "I després què va passar?"),
    ]),
    mk("eso1-soc-mapes", "Mapes i orientació", "🗺️", "bg-accent", [
      f("Mapa", "Map", "🗺️", "Mira el mapa."),
      f("Nord", "North", "⬆️", "El nord és a dalt del mapa."),
      f("Sud", "South", "⬇️", "Anem cap al sud."),
      f("Est", "East", "➡️", "El sol surt per l'est."),
      f("Oest", "West", "⬅️", "El sol es pon per l'oest."),
      f("Llegenda", "Legend", "🧭", "Mira la llegenda del mapa."),
      f("Escala", "Scale", "📏", "El mapa és a escala 1:1000."),
      f("Planisferi", "World map", "🌍", "Busca el país al planisferi."),
    ]),
    mk("eso1-soc-relleu", "El relleu i el paisatge", "🏔️", "bg-bloom-teal", [
      f("Muntanya", "Mountain", "⛰️", "Pugem la muntanya."),
      f("Vall", "Valley", "🏞️", "El poble és a la vall."),
      f("Riu", "River", "🏞️", "El riu desemboca al mar."),
      f("Costa", "Coast", "🏖️", "Vivim a la costa."),
      f("Plana", "Plain", "🌾", "La plana és terra cultivada."),
      f("Illa", "Island", "🏝️", "Mallorca és una illa."),
    ]),
    mk("eso1-soc-clima", "El clima i el temps", "☀️", "bg-bloom-yellow", [
      f("Pluja", "Rain", "🌧️", "Avui plou."),
      f("Núvol", "Cloud", "☁️", "El cel està ple de núvols."),
      f("Temperatura", "Temperature", "🌡️", "Quina temperatura fa?"),
      f("Primavera", "Spring", "🌸", "A la primavera floreixen els arbres."),
      f("Estiu", "Summer", "☀️", "A l'estiu fa molta calor."),
      f("Tardor", "Autumn", "🍂", "A la tardor cauen les fulles."),
      f("Hivern", "Winter", "❄️", "A l'hivern neva."),
    ]),
    mk("eso1-soc-poblacio", "La població i el territori", "🏘️", "bg-bloom-pink", [
      f("Ciutat", "City", "🏙️", "Barcelona és una ciutat gran."),
      f("Poble", "Village", "🏘️", "Visc en un poble petit."),
      f("Població", "Population", "👨‍👩‍👧", "La població creix."),
      f("Immigració", "Immigration", "🛂", "La immigració porta diversitat."),
      f("Frontera", "Border", "🚧", "La frontera separa dos països."),
    ]),
    mk("eso1-soc-fonts", "Fonts històriques", "📜", "bg-secondary", [
      f("Document", "Document", "📄", "Un document antic."),
      f("Jaciment", "Archaeological site", "🏺", "El jaciment arqueològic."),
      f("Museu", "Museum", "🏛️", "Anem al museu."),
      f("Font oral", "Oral source", "🗣️", "L'àvia és una font oral."),
      f("Font escrita", "Written source", "📜", "Els llibres són fonts escrites."),
    ]),
  ],
};

const eso1_artistic: Ambit = {
  id: "artistic",
  nom: "Àmbit Artístic",
  emoji: "🎨",
  color: "bg-bloom-pink",
  descripcio: "Educació visual i plàstica + música.",
  blocs: [
    mk("eso1-art-materials", "Materials de dibuix i pintura", "🎨", "bg-primary", [
      f("Llapis", "Pencil", "✏️", "Dibuixa amb llapis."),
      f("Retolador", "Marker", "🖍️", "Pinta amb retolador."),
      f("Pinzell", "Brush", "🖌️", "Mulla el pinzell."),
      f("Pintura", "Paint", "🎨", "Necessito pintura blava."),
      f("Paleta", "Palette", "🎨", "Barreja colors a la paleta."),
      f("Full", "Sheet", "📄", "Dibuixa al full blanc."),
    ]),
    mk("eso1-art-colors", "Colors i tècniques", "🌈", "bg-accent", [
      f("Color primari", "Primary colour", "🟦", "El blau és un color primari."),
      f("Color secundari", "Secondary colour", "🟢", "El verd és un color secundari."),
      f("Escala de grisos", "Grayscale", "⬜", "Dibuixa en escala de grisos."),
      f("Collage", "Collage", "🖼️", "Fes un collage amb retalls."),
      f("Traç", "Stroke", "〰️", "Aquest traç és fort."),
    ]),
    mk("eso1-art-composicio", "Formes i composició", "🟦", "bg-bloom-purple", [
      f("Línia", "Line", "➖", "Dibuixa una línia recta."),
      f("Punt", "Dot", "•", "Tècnica de punts."),
      f("Textura", "Texture", "🧵", "Quina textura té?"),
      f("Simetria", "Symmetry", "🪞", "La cara té simetria."),
      f("Contrast", "Contrast", "⚫⚪", "El blanc i el negre fan contrast."),
    ]),
    mk("eso1-art-instruments", "Instruments musicals", "🎸", "bg-bloom-yellow", [
      f("Corda", "String", "🎻", "El violí és un instrument de corda."),
      f("Vent", "Wind", "🎺", "La trompeta és de vent."),
      f("Percussió", "Percussion", "🥁", "El tambor és de percussió."),
      f("Piano", "Piano", "🎹", "Toco el piano."),
      f("Guitarra", "Guitar", "🎸", "Aprenc a tocar la guitarra."),
      f("Flauta", "Flute", "🪈", "La flauta és de vent."),
    ]),
    mk("eso1-art-so", "Elements del so", "🎵", "bg-bloom-pink", [
      f("Ritme", "Rhythm", "🥁", "Segueix el ritme."),
      f("Melodia", "Melody", "🎶", "Quina melodia tan bonica!"),
      f("To", "Tone", "🎵", "Canta en aquest to."),
      f("Durada", "Duration", "⏱️", "La durada de la nota."),
      f("Pentagrama", "Staff", "🎼", "Les notes s'escriuen al pentagrama."),
      f("Nota", "Note", "🎵", "Toca aquesta nota."),
    ]),
  ],
};

const eso1_ef: Ambit = {
  id: "educacio-fisica",
  nom: "Educació Física",
  emoji: "⚽",
  color: "bg-bloom-teal",
  descripcio: "Cos, esports, materials i valors.",
  blocs: [
    mk("eso1-ef-cos", "El cos en moviment", "🏃", "bg-primary", [
      f("Córrer", "To run", "🏃", "Cal córrer ràpid."),
      f("Saltar", "To jump", "🤸", "Salta el banc."),
      f("Llançar", "To throw", "🤾", "Llança la pilota."),
      f("Equilibri", "Balance", "🤸", "Fes equilibri amb un peu."),
      f("Resistència", "Endurance", "💪", "Treballa la resistència."),
    ]),
    mk("eso1-ef-esports", "Esports i jocs", "🏀", "bg-accent", [
      f("Pilota", "Ball", "⚽", "Passa la pilota."),
      f("Equip", "Team", "👥", "Juguem en equip."),
      f("Partit", "Match", "🏆", "Guanyem el partit."),
      f("Àrbitre", "Referee", "🦺", "L'àrbitre xiula."),
      f("Punt", "Point", "1️⃣", "Hem marcat un punt."),
    ]),
    mk("eso1-ef-material", "Material esportiu", "👟", "bg-bloom-yellow", [
      f("Xandall", "Tracksuit", "👕", "Posa't el xandall."),
      f("Espardenyes", "Sneakers", "👟", "Lliga't les espardenyes."),
      f("Con", "Cone", "🟧", "Posa els cons al pati."),
      f("Xarxa", "Net", "🥅", "Salta per damunt de la xarxa."),
    ]),
    mk("eso1-ef-valors", "Valors i normes", "🤝", "bg-bloom-purple", [
      f("Joc net", "Fair play", "🤝", "Practica el joc net."),
      f("Respecte", "Respect", "🙏", "Respecte cap al rival."),
      f("Treball en equip", "Teamwork", "👥", "Treball en equip."),
      f("Regles del joc", "Rules of the game", "📋", "Llegeix les regles del joc."),
    ]),
  ],
};

const eso1_tutoria: Ambit = {
  id: "tutoria",
  nom: "Tutoria i vida al centre",
  emoji: "🏫",
  color: "bg-bloom-purple",
  descripcio: "Orientació per al primer dia: espais, horaris, documents i normes.",
  blocs: [
    mk("eso1-tut-espais", "Espais del centre", "🏫", "bg-primary", [
      f("Aula", "Classroom", "🪑", "L'aula està al primer pis."),
      f("Pati", "Playground", "🌳", "Sortim al pati."),
      f("Gimnàs", "Gym", "🤸", "El gimnàs és al soterrani."),
      f("Biblioteca", "Library", "📚", "Anem a la biblioteca."),
      f("Menjador", "Canteen", "🍽️", "Mengem al menjador."),
      f("Secretaria", "Office", "📋", "Pregunta a secretaria."),
      f("Sala de professors", "Staff room", "👨‍🏫", "Els professors són a la sala."),
    ]),
    mk("eso1-tut-horari", "L'horari", "🕐", "bg-accent", [
      f("Assignatura", "Subject", "📚", "Quina assignatura toca ara?"),
      f("Hora", "Hour", "🕐", "Hi ha sis hores de classe."),
      f("Pati", "Break", "⚽", "Tenim mitja hora de pati."),
      f("Classe", "Class", "🪑", "Vés a classe."),
      f("Deures", "Homework", "📝", "Tenim deures de mates."),
    ]),
    mk("eso1-tut-documents", "Documents i organització", "📋", "bg-bloom-pink", [
      f("Matrícula", "Enrolment", "📝", "Has de fer la matrícula."),
      f("Butlletí de notes", "Report card", "📊", "Lliuren el butlletí de notes."),
      f("Agenda", "Diary", "🗓️", "Apunta-ho a l'agenda."),
      f("Justificant", "Excuse note", "📄", "Porta el justificant de l'absència."),
    ]),
    mk("eso1-tut-normes", "Normes de convivència", "🤝", "bg-bloom-yellow", [
      f("Puntualitat", "Punctuality", "⏰", "La puntualitat és important."),
      f("Respecte", "Respect", "🙏", "Respecte als companys."),
      f("Material", "Material", "🎒", "Porta tot el material."),
      f("Mòbil", "Mobile phone", "📱", "El mòbil no es pot fer servir a classe."),
    ]),
  ],
};

const eso1: Curs = {
  id: "1eso",
  nom: "1r d'ESO",
  emoji: "1️⃣",
  descripcio: "Vocabulari bàsic per al primer curs d'ESO, organitzat per àmbits curriculars.",
  ambits: [eso1_linguistic, eso1_matematic, eso1_cientific, eso1_social, eso1_artistic, eso1_ef, eso1_tutoria],
};

// ============================================================
// 2n, 3r, 4t d'ESO — estructura preparada, contingut a omplir
// ============================================================

function emptyAmbits(): Ambit[] {
  return eso1.ambits.map((a) => ({ ...a, blocs: [] }));
}

const eso2: Curs = {
  id: "2eso",
  nom: "2n d'ESO",
  emoji: "2️⃣",
  descripcio: "Properament: vocabulari del segon curs d'ESO.",
  ambits: emptyAmbits(),
};

const eso3: Curs = {
  id: "3eso",
  nom: "3r d'ESO",
  emoji: "3️⃣",
  descripcio: "Properament: vocabulari del tercer curs d'ESO.",
  ambits: emptyAmbits(),
};

const eso4: Curs = {
  id: "4eso",
  nom: "4t d'ESO",
  emoji: "4️⃣",
  descripcio: "Properament: vocabulari del quart curs d'ESO.",
  ambits: emptyAmbits(),
};

export const cursos: Curs[] = [eso1, eso2, eso3, eso4];

export function getCurs(id: string): Curs | undefined {
  return cursos.find((c) => c.id === id);
}

export function getAmbit(cursId: string, ambitId: string): { curs: Curs; ambit: Ambit } | undefined {
  const curs = getCurs(cursId);
  if (!curs) return undefined;
  const ambit = curs.ambits.find((a) => a.id === ambitId);
  if (!ambit) return undefined;
  return { curs, ambit };
}
