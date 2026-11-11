export interface ConceptHelp { explanation: string; example: string }

const maths: Record<string, ConceptHelp> = {
  Factoritzar: { explanation: "Escriure una expressió com un producte de factors. Busca primer si tots els termes tenen un factor comú.", example: "6x + 9 = 3 · (2x + 3). Hem tret el factor comú 3. Si tornem a multiplicar, obtenim 6x + 9." },
  Polinomi: { explanation: "Expressió formada per una suma o resta de monomis: nombres multiplicats per potències de variables amb exponents enters no negatius.", example: "2x² + 3x − 5 té tres termes: 2x², 3x i −5." },
  Monomi: { explanation: "Expressió d’un sol terme: un nombre multiplicat per variables amb exponents enters no negatius.", example: "En 4x², el nombre 4 multiplica x². És un monomi de grau 2." },
  Grau: { explanation: "En un polinomi d’una variable, és l’exponent més gran de la variable amb coeficient diferent de zero.", example: "El grau de 2x³ + x − 7 és 3, perquè l’exponent més gran és 3." },
  Coeficient: { explanation: "Nombre que multiplica la part amb lletres d’un terme algebraic.", example: "En 5x², el coeficient és 5; en −3x, és −3." },
  "Identitat notable": { explanation: "Igualtat algebraica que es compleix per a tots els valors de les lletres i permet desenvolupar o factoritzar expressions.", example: "(x + 2)² = x² + 4x + 4. Fem servir (a + b)² = a² + 2ab + b²." },
  Arrel: { explanation: "Valor de la variable que fa que un polinomi valgui zero.", example: "2 és una arrel de x − 2, perquè en substituir x per 2 obtenim 2 − 2 = 0." },
  "Sistema d'equacions": { explanation: "Conjunt d’equacions que han de complir-se alhora amb els mateixos valors de les incògnites.", example: "x + y = 5 i x − y = 1 tenen la solució x = 3, y = 2: compleix totes dues equacions." },
  Incògnita: { explanation: "Valor que no coneixem i que representem amb una lletra.", example: "A x + 3 = 8, la incògnita és x. Val 5, perquè 5 + 3 = 8." },
  Equació: { explanation: "Igualtat amb una o més incògnites. Resoldre-la és trobar els valors que fan certa la igualtat.", example: "2x = 10. Dividim els dos costats per 2 i obtenim x = 5." },
  "Equació de segon grau": { explanation: "Equació que es pot escriure ax² + bx + c = 0, amb a diferent de zero.", example: "x² − 9 = 0 té dues solucions: x = 3 i x = −3, perquè tots dos valors tenen quadrat 9." },
  Discriminant: { explanation: "Nombre Δ = b² − 4ac d’una equació de segon grau. Indica quantes solucions reals té: dues si és positiu, una doble si és zero i cap si és negatiu.", example: "A x² − 5x + 6 = 0, Δ = 25 − 24 = 1. Té dues solucions reals: 2 i 3." },
  Funció: { explanation: "Relació que assigna un únic valor de sortida a cada valor d’entrada.", example: "Si una llibreta costa 2 €, el preu és f(x) = 2x. Per 3 llibretes, f(3) = 6 €." },
  Pendent: { explanation: "En una recta, indica quant canvia y quan x augmenta una unitat.", example: "A y = 2x + 1, el pendent és 2: quan x passa de 1 a 2, y passa de 3 a 5." },
  Paràbola: { explanation: "Corba que representa una funció de segon grau. Pot obrir-se cap amunt o cap avall.", example: "La gràfica de y = x² passa per (−1, 1), (0, 0) i (1, 1), i s’obre cap amunt." },
  Fracció: { explanation: "Representa parts iguals d’un tot o una divisió. El denominador no pot ser zero.", example: "Si dividim una pizza en 4 parts iguals i en mengem 3, hem menjat 3/4 de la pizza." },
  Percentatge: { explanation: "Quantitat expressada com a parts de cada cent.", example: "El 25 % de 20 alumnes és 5 alumnes: 20 · 25 / 100 = 5." },
  Simplificar: { explanation: "En una fracció, dividir el numerador i el denominador pel mateix nombre no nul per obtenir una fracció equivalent més senzilla.", example: "6/8 = 3/4: dividim 6 i 8 per 2. La quantitat representada no canvia." },
  "Directament proporcional": { explanation: "Dues magnituds són directament proporcionals si el seu quocient és constant: quan una es multiplica per un nombre, l’altra també.", example: "A 2 € per llibreta, 3 llibretes costen 6 € i 6 llibretes costen 12 €." },
  "Inversament proporcional": { explanation: "Dues magnituds són inversament proporcionals si el seu producte és constant: quan una es duplica, l’altra es redueix a la meitat.", example: "Per recórrer 60 km, a 30 km/h calen 2 hores; a 60 km/h cal 1 hora." },
  Mitjana: { explanation: "Suma de tots els valors dividida pel nombre de valors.", example: "Per a les notes 6, 7 i 8, la mitjana és (6 + 7 + 8) / 3 = 7." },
  Mediana: { explanation: "Valor central de les dades ordenades. Si hi ha un nombre parell de dades, es calcula la mitjana dels dos valors centrals.", example: "A 2, 4, 9, la mediana és 4; a 2, 4, 6, 9, és (4 + 6) / 2 = 5." },
  Moda: { explanation: "Valor que es repeteix més vegades en un conjunt de dades.", example: "A 2, 3, 3, 5, la moda és 3, perquè apareix dues vegades." },
  Probabilitat: { explanation: "Mesura de la possibilitat que passi un esdeveniment, entre 0 i 1. Amb resultats igualment probables, dividim els casos favorables pels possibles.", example: "En un dau equilibrat, la probabilitat de treure un 6 és 1/6: un cas favorable entre sis." },
  Semblança: { explanation: "Dues figures són semblants si tenen els mateixos angles i les longituds corresponents són proporcionals.", example: "Triangles de costats 3, 4, 5 i 6, 8, 10 són semblants: cada costat del segon és el doble." },
  Volum: { explanation: "Mesura de l’espai que ocupa un cos. S’expressa en unitats cúbiques.", example: "Una caixa de 3 cm × 2 cm × 4 cm té un volum de 3 · 2 · 4 = 24 cm³." },
};

const other: Record<string, ConceptHelp> = {
  Tesi: { explanation: "Idea principal que defenses en un text argumentatiu.", example: "En un debat sobre residus, la tesi pot ser: «El centre hauria de reduir els plàstics d’un sol ús»." },
  Argument: { explanation: "Raó que dona suport a una opinió o tesi.", example: "Per defensar l’ús de cantimplores, pots argumentar que redueixen els residus d’ampolles." },
  Contraargument: { explanation: "Raó que qüestiona una tesi o un argument i que pots valorar i respondre.", example: "Si proposes fer totes les tasques en línia, un contraargument és que no tothom té internet a casa." },
  Metàfora: { explanation: "Expressió que identifica una cosa amb una altra per una semblança, sense fer servir «com».", example: "«Els teus ulls són estrelles» relaciona la brillantor dels ulls amb la de les estrelles." },
  Cohesió: { explanation: "Relació entre les parts d’un text mitjançant connectors, pronoms i altres recursos que eviten repeticions.", example: "«La Sara ha llegit el llibre. Després, l’ha resumit»: «després» connecta les accions i «l’» fa referència al llibre." },
  Parafrasi: { explanation: "Explicar una idea amb paraules pròpies sense canviar-ne el significat.", example: "«L’aigua s’evapora amb la calor» es pot reformular: «Quan rep calor, l’aigua passa de líquid a gas»." },
  Algorisme: { explanation: "Seqüència ordenada de passos per resoldre una tasca.", example: "Per calcular una mitjana: suma les notes, compta quantes n’hi ha i divideix la suma pel recompte." },
  Bucle: { explanation: "Instrucció d’un programa que repeteix una acció un nombre de vegades o mentre es compleix una condició.", example: "Un robot pot repetir quatre vegades: avançar un costat i girar 90°. Així recorre un quadrat." },
  "Reacció química": { explanation: "Transformació en què unes substàncies es converteixen en unes altres.", example: "Quan el ferro s’oxida, reacciona amb l’oxigen en presència d’humitat i forma òxids de ferro." },
  Empatia: { explanation: "Intentar comprendre què sent una altra persona i tenir-ho en compte.", example: "Si un company està nerviós abans d’exposar, l’escoltes i li ofereixes assajar amb tu." },
  Mediació: { explanation: "Procés en què una persona neutral ajuda les parts d’un conflicte a dialogar i buscar un acord.", example: "Dos alumnes discuteixen per un material. La mediadora escolta tots dos i els ajuda a acordar com compartir-lo." },
  "Desenvolupament sostenible": { explanation: "Satisfer les necessitats actuals sense perjudicar la capacitat de les generacions futures de satisfer les seves.", example: "El centre redueix el consum d’aigua i d’energia i reutilitza materials per evitar malbaratar recursos." },
};

export function getEsoConceptHelp(blocId: string, word: string): ConceptHelp | undefined {
  if (/-(mat|mates|matematic)/.test(blocId)) return maths[word];
  return other[word];
}