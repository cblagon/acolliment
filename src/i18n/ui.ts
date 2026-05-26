import { type LangCode, LANGUAGES } from "@/hooks/useLanguage";

/**
 * UI string dictionary. Languages without an entry fall back to English, then to the key.
 * Use {lang} placeholder to inject the localized target language name.
 */
type StringKey =
  | "appSubtitle"
  | "learnTitle"
  | "learning"
  | "helpIn"
  | "allBlocs"
  | "back"
  | "game"
  | "songs"
  | "chooseBlocPrompt"
  | "blocsCount"
  | "wordsCount"
  | "fitxesCount"
  | "card"
  | "of"
  | "tapForTranslation"
  | "whichWord"
  | "veryGood"
  | "percentCorrect"
  | "summary"
  | "word"
  | "translation"
  | "result"
  | "retry"
  | "newBloc"
  | "ttsUnavailable"
  | "videoCatalanOnly"
  | "pdf"
  | "correct"
  | "wrong"
  | "basic"
  | "elemental"
  | "intermediate"
  | "saveBloc"
  | "editBloc"
  | "newBlocTitle";

const dict: Partial<Record<LangCode, Partial<Record<StringKey, string>>>> = {
  ca: {
    appSubtitle: "Programa d'acollida lingüística",
    learnTitle: "Aprèn {lang}!",
    learning: "Aprenc",
    helpIn: "Ajuda en",
    allBlocs: "Tots els blocs",
    back: "Tornar",
    game: "Joc",
    songs: "Cançons",
    chooseBlocPrompt: "Tria un bloc per començar a aprendre 👇",
    blocsCount: "blocs",
    wordsCount: "paraules",
    fitxesCount: "fitxes",
    card: "Fitxa",
    of: "de",
    tapForTranslation: "Toca per veure la traducció",
    whichWord: "Quina paraula és?",
    veryGood: "Molt bé!",
    percentCorrect: "% correcte",
    summary: "Resum de resultats",
    word: "Paraula",
    translation: "Traducció",
    result: "Resultat",
    retry: "Repetir",
    newBloc: "Nou Bloc",
    ttsUnavailable: "Pronunciació no disponible al navegador",
    videoCatalanOnly: "Disponible només en català",
    pdf: "PDF",
    correct: "encerts",
    wrong: "errors",
    basic: "Bàsic",
    elemental: "Elemental",
    intermediate: "Intermedi",
    saveBloc: "Desar",
    editBloc: "Editar Bloc",
    newBlocTitle: "Nou Bloc",
  },
  es: {
    appSubtitle: "Programa de acogida lingüística",
    learnTitle: "¡Aprende {lang}!",
    learning: "Aprendo",
    helpIn: "Ayuda en",
    allBlocs: "Todos los bloques",
    back: "Volver",
    game: "Juego",
    songs: "Canciones",
    chooseBlocPrompt: "Elige un bloque para empezar a aprender 👇",
    blocsCount: "bloques",
    wordsCount: "palabras",
    fitxesCount: "fichas",
    card: "Ficha",
    of: "de",
    tapForTranslation: "Toca para ver la traducción",
    whichWord: "¿Qué palabra es?",
    veryGood: "¡Muy bien!",
    percentCorrect: "% correcto",
    summary: "Resumen de resultados",
    word: "Palabra",
    translation: "Traducción",
    result: "Resultado",
    retry: "Repetir",
    newBloc: "Nuevo Bloque",
    ttsUnavailable: "Pronunciación no disponible en el navegador",
    videoCatalanOnly: "Disponible solo en catalán",
    pdf: "PDF",
    correct: "aciertos",
    wrong: "errores",
    basic: "Básico",
    elemental: "Elemental",
    intermediate: "Intermedio",
    saveBloc: "Guardar",
    editBloc: "Editar Bloque",
    newBlocTitle: "Nuevo Bloque",
  },
  en: {
    appSubtitle: "Language welcome programme",
    learnTitle: "Learn {lang}!",
    learning: "I'm learning",
    helpIn: "Help in",
    allBlocs: "All blocks",
    back: "Back",
    game: "Game",
    songs: "Songs",
    chooseBlocPrompt: "Pick a block to start learning 👇",
    blocsCount: "blocks",
    wordsCount: "words",
    fitxesCount: "cards",
    card: "Card",
    of: "of",
    tapForTranslation: "Tap to see the translation",
    whichWord: "Which word is it?",
    veryGood: "Great job!",
    percentCorrect: "% correct",
    summary: "Results summary",
    word: "Word",
    translation: "Translation",
    result: "Result",
    retry: "Retry",
    newBloc: "New Block",
    ttsUnavailable: "Pronunciation not available in this browser",
    videoCatalanOnly: "Available in Catalan only",
    pdf: "PDF",
    correct: "correct",
    wrong: "wrong",
    basic: "Basic",
    elemental: "Elemental",
    intermediate: "Intermediate",
    saveBloc: "Save",
    editBloc: "Edit Block",
    newBlocTitle: "New Block",
  },
  fr: {
    appSubtitle: "Programme d'accueil linguistique",
    learnTitle: "Apprends {lang} !",
    learning: "J'apprends",
    helpIn: "Aide en",
    allBlocs: "Tous les blocs",
    back: "Retour",
    game: "Jeu",
    songs: "Chansons",
    chooseBlocPrompt: "Choisis un bloc pour commencer 👇",
    blocsCount: "blocs",
    wordsCount: "mots",
    fitxesCount: "fiches",
    card: "Fiche",
    of: "sur",
    tapForTranslation: "Touche pour voir la traduction",
    whichWord: "Quel mot est-ce ?",
    veryGood: "Très bien !",
    percentCorrect: "% correct",
    summary: "Résumé des résultats",
    word: "Mot",
    translation: "Traduction",
    result: "Résultat",
    retry: "Recommencer",
    newBloc: "Nouveau bloc",
    ttsUnavailable: "Prononciation indisponible dans le navigateur",
    videoCatalanOnly: "Disponible uniquement en catalan",
    pdf: "PDF",
    correct: "corrects",
    wrong: "erreurs",
    basic: "Basique",
    elemental: "Élémentaire",
    intermediate: "Intermédiaire",
    saveBloc: "Enregistrer",
    editBloc: "Modifier le bloc",
    newBlocTitle: "Nouveau bloc",
  },
  ar: {
    appSubtitle: "برنامج الاستقبال اللغوي",
    learnTitle: "!تعلّم {lang}",
    learning: "أتعلّم",
    helpIn: "المساعدة بـ",
    allBlocs: "كل الكتل",
    back: "رجوع",
    game: "لعبة",
    songs: "أغاني",
    chooseBlocPrompt: "اختر كتلة للبدء بالتعلّم 👇",
    fitxesCount: "بطاقات",
    card: "بطاقة",
    of: "من",
    tapForTranslation: "اضغط لرؤية الترجمة",
    whichWord: "ما هي الكلمة؟",
    veryGood: "أحسنت!",
    summary: "ملخص النتائج",
    word: "كلمة",
    translation: "ترجمة",
    result: "النتيجة",
    retry: "إعادة",
    newBloc: "كتلة جديدة",
    videoCatalanOnly: "متوفر بالكاتالانية فقط",
    correct: "صحيح",
    wrong: "خطأ",
    basic: "مبتدئ",
    elemental: "أساسي",
    intermediate: "متوسط",
  },
};

/** Localized target-language name (in helpLang context). */
const langNameByHelp: Partial<Record<LangCode, Partial<Record<LangCode, string>>>> = {
  ca: { ca: "català", es: "castellà", en: "anglès", fr: "francès", ar: "àrab", ur: "urdú", uk: "ucraïnès", it: "italià", el: "grec", ptBR: "portuguès (BR)", pt: "portuguès", zh: "xinès", hi: "hindi", ro: "romanès", wo: "wolof", mnk: "mandinga", ha: "hassaniya", snk: "soninké", srk: "sarankhulé" },
  es: { ca: "catalán", es: "castellano", en: "inglés", fr: "francés", ar: "árabe", ur: "urdu", uk: "ucraniano", it: "italiano", el: "griego", ptBR: "portugués (BR)", pt: "portugués", zh: "chino", hi: "hindi", ro: "rumano", wo: "wolof", mnk: "mandinga", ha: "hassaniya", snk: "soninké", srk: "sarankhulé" },
  en: { ca: "Catalan", es: "Spanish", en: "English", fr: "French", ar: "Arabic", ur: "Urdu", uk: "Ukrainian", it: "Italian", el: "Greek", ptBR: "Portuguese (BR)", pt: "Portuguese", zh: "Chinese", hi: "Hindi", ro: "Romanian", wo: "Wolof", mnk: "Mandinka", ha: "Hassaniya", snk: "Soninke", srk: "Sarankhule" },
  fr: { ca: "catalan", es: "espagnol", en: "anglais", fr: "français", ar: "arabe", ur: "ourdou", uk: "ukrainien", it: "italien", el: "grec", ptBR: "portugais (BR)", pt: "portugais", zh: "chinois", hi: "hindi", ro: "roumain", wo: "wolof", mnk: "mandingue", ha: "hassaniya", snk: "soninké", srk: "sarankhulé" },
  ar: { ca: "الكاتالانية", es: "الإسبانية", en: "الإنجليزية", fr: "الفرنسية", ar: "العربية" },
};

export function langName(target: LangCode, helpLang: LangCode): string {
  return langNameByHelp[helpLang]?.[target] ?? LANGUAGES[target].nativeName;
}

export function t(lang: LangCode, key: StringKey, params?: Record<string, string>): string {
  const raw = dict[lang]?.[key] ?? dict.en?.[key] ?? key;
  if (!params) return raw;
  return Object.entries(params).reduce((s, [k, v]) => s.split(`{${k}}`).join(v), raw);
}
