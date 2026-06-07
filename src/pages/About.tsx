import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Languages, Gamepad2, Music, Video, Download, Sparkles } from "lucide-react";
import { useLanguages, LANGUAGES } from "@/hooks/useLanguage";
import type { LangCode } from "@/hooks/useLanguage";
import { langName } from "@/i18n/ui";

type AboutStrings = {
  subtitle: string;
  back: string;
  badge: string;
  title: string;
  intro: string;
  steps: { title: string; text: string }[];
  justifBadge: string;
  justifTitle: string;
  p1Pre: string;
  p1Mid: string;
  p1End: string;
  guide1: string;
  guide2: string;
  p2: string;
  p3: string;
  backHome: string;
};

const STRINGS: Partial<Record<LangCode, AboutStrings>> = {
  ca: {
    subtitle: "Com fer-ne ús",
    back: "Tornar",
    badge: "Guia d'ús",
    title: "Com fer ús d'aquesta web",
    intro:
      "Una eina visual i interactiva pensada per a l'acollida lingüística d'alumnat nouvingut. Aquí t'expliquem com aprofitar-la al màxim.",
    steps: [
      { title: "1. Tria els idiomes", text: "A la part superior, selecciona l'idioma que vols aprendre (🎯 Aprenc) i l'idioma d'ajuda (🌍 Ajuda en) que ja coneixes. Així totes les traduccions s'adapten al teu perfil." },
      { title: "2. Escull un nivell i un bloc", text: "Selecciona el nivell (A1 Bàsic · A2 Elemental · B1 Intermedi) i tria un dels blocs temàtics: la classe, la família, els menjars, les vacances, les professions, els instruments…" },
      { title: "3. Aprèn amb les fitxes", text: "Cada bloc conté fitxes visuals amb la paraula en l'idioma que aprens. Toca per veure la traducció i escoltar la pronunciació amb veu sintètica." },
      { title: "4. Practica amb el joc", text: "Al final de cada bloc, prem 'Joc' i posa a prova el que has après. Al final veuràs un resum amb els encerts i errors." },
      { title: "5. Escolta cançons", text: "Alguns blocs inclouen cançons relacionades amb el vocabulari, perfectes per reforçar l'aprenentatge de manera lúdica." },
      { title: "6. Mira roleplays animats", text: "Al nivell A2 trobaràs vídeos animats amb situacions quotidianes (vacances, taller de tecnologia, aula de música…) per treballar la comprensió oral." },
      { title: "7. Exporta a PDF", text: "Amb el botó PDF pots descarregar totes les fitxes del nivell triat per imprimir-les i treballar-les a l'aula sense connexió." },
    ],
    justifBadge: "Justificació pedagògica",
    justifTitle: "Inspirat en les directrius europees",
    p1Pre: "Aquesta web s'emmarca dins del projecte ",
    p1Mid: ", part de la iniciativa ",
    p1End: ". Vaig tenir l'oportunitat de compartir la meva experiència després de dur a terme un projecte pilot seguint les guies ",
    guide1: "«New Guidelines to Help Teachers Lead Europe's Digital Education»",
    guide2: "«Guidelines for Teaching Informatics: Practical Strategies for European Classrooms»",
    p2: "Aquestes directrius són una iniciativa emblemàtica del Digital Education Action Plan (2021–2027), que té com a objectiu donar suport a la transformació digital dels sistemes educatius arreu d'Europa.",
    p3: "L'entrevista en línia, organitzada per la Comissió Europea, va ser enregistrada i contribuirà a un vídeo testimonial amb finalitats de difusió. Em sento molt honrada i agraïda d'haver estat seleccionada per participar-hi i representar la feina desenvolupada durant el projecte pilot.",
    backHome: "Tornar a l'inici",
  },
  es: {
    subtitle: "Cómo usarla",
    back: "Volver",
    badge: "Guía de uso",
    title: "Cómo usar esta web",
    intro:
      "Una herramienta visual e interactiva pensada para la acogida lingüística del alumnado recién llegado. Aquí te explicamos cómo aprovecharla al máximo.",
    steps: [
      { title: "1. Elige los idiomas", text: "En la parte superior, selecciona el idioma que quieres aprender (🎯 Aprendo) y el idioma de ayuda (🌍 Ayuda en) que ya conoces. Así todas las traducciones se adaptan a tu perfil." },
      { title: "2. Escoge un nivel y un bloque", text: "Selecciona el nivel (A1 Básico · A2 Elemental · B1 Intermedio) y elige uno de los bloques temáticos: la clase, la familia, las comidas, las vacaciones, las profesiones, los instrumentos…" },
      { title: "3. Aprende con las fichas", text: "Cada bloque contiene fichas visuales con la palabra en el idioma que aprendes. Toca para ver la traducción y escuchar la pronunciación con voz sintética." },
      { title: "4. Practica con el juego", text: "Al final de cada bloque, pulsa 'Juego' y pon a prueba lo que has aprendido. Al final verás un resumen con los aciertos y errores." },
      { title: "5. Escucha canciones", text: "Algunos bloques incluyen canciones relacionadas con el vocabulario, perfectas para reforzar el aprendizaje de forma lúdica." },
      { title: "6. Mira roleplays animados", text: "En el nivel A2 encontrarás vídeos animados con situaciones cotidianas (vacaciones, taller de tecnología, aula de música…) para trabajar la comprensión oral." },
      { title: "7. Exporta a PDF", text: "Con el botón PDF puedes descargar todas las fichas del nivel elegido para imprimirlas y trabajarlas en el aula sin conexión." },
    ],
    justifBadge: "Justificación pedagógica",
    justifTitle: "Inspirado en las directrices europeas",
    p1Pre: "Esta web se enmarca dentro del proyecto ",
    p1Mid: ", parte de la iniciativa ",
    p1End: ". Tuve la oportunidad de compartir mi experiencia tras llevar a cabo un proyecto piloto siguiendo las guías ",
    guide1: "«New Guidelines to Help Teachers Lead Europe's Digital Education»",
    guide2: "«Guidelines for Teaching Informatics: Practical Strategies for European Classrooms»",
    p2: "Estas directrices son una iniciativa emblemática del Digital Education Action Plan (2021–2027), cuyo objetivo es apoyar la transformación digital de los sistemas educativos en toda Europa.",
    p3: "La entrevista en línea, organizada por la Comisión Europea, fue grabada y contribuirá a un vídeo testimonial con fines de difusión. Me siento muy honrada y agradecida por haber sido seleccionada para participar y representar el trabajo desarrollado durante el proyecto piloto.",
    backHome: "Volver al inicio",
  },
  en: {
    subtitle: "How to use it",
    back: "Back",
    badge: "User guide",
    title: "How to use this website",
    intro:
      "A visual and interactive tool designed for the linguistic welcome of newly arrived students. Here's how to make the most of it.",
    steps: [
      { title: "1. Pick your languages", text: "At the top, select the language you want to learn (🎯 I'm learning) and the help language (🌍 Help in) you already know. All translations adapt to your profile." },
      { title: "2. Choose a level and a block", text: "Select the level (A1 Basic · A2 Elemental · B1 Intermediate) and pick one of the thematic blocks: the classroom, family, food, holidays, jobs, instruments…" },
      { title: "3. Learn with the cards", text: "Each block contains visual cards with the word in your target language. Tap to see the translation and listen to the pronunciation with synthetic voice." },
      { title: "4. Practise with the game", text: "At the end of each block, press 'Game' and test what you've learned. You'll get a summary of correct and wrong answers at the end." },
      { title: "5. Listen to songs", text: "Some blocks include songs related to the vocabulary, perfect for reinforcing learning in a fun way." },
      { title: "6. Watch animated roleplays", text: "At A2 level you'll find animated videos with everyday situations (holidays, tech workshop, music classroom…) to work on listening comprehension." },
      { title: "7. Export to PDF", text: "With the PDF button you can download all cards of the chosen level to print and work with them offline in the classroom." },
    ],
    justifBadge: "Pedagogical rationale",
    justifTitle: "Inspired by European guidelines",
    p1Pre: "This website is part of the ",
    p1Mid: " project, within the ",
    p1End: " initiative. I had the opportunity to share my experience after carrying out a pilot project following the guides ",
    guide1: "«New Guidelines to Help Teachers Lead Europe's Digital Education»",
    guide2: "«Guidelines for Teaching Informatics: Practical Strategies for European Classrooms»",
    p2: "These guidelines are a flagship initiative of the Digital Education Action Plan (2021–2027), which aims to support the digital transformation of education systems across Europe.",
    p3: "The online interview, organised by the European Commission, was recorded and will contribute to a testimonial video for dissemination purposes. I feel very honoured and grateful for having been selected to take part and represent the work carried out during the pilot project.",
    backHome: "Back to home",
  },
  fr: {
    subtitle: "Comment l'utiliser",
    back: "Retour",
    badge: "Guide d'utilisation",
    title: "Comment utiliser ce site",
    intro:
      "Un outil visuel et interactif conçu pour l'accueil linguistique des élèves nouvellement arrivés. Voici comment en tirer le meilleur parti.",
    steps: [
      { title: "1. Choisis les langues", text: "En haut, sélectionne la langue que tu veux apprendre (🎯 J'apprends) et la langue d'aide (🌍 Aide en) que tu connais déjà. Toutes les traductions s'adaptent à ton profil." },
      { title: "2. Choisis un niveau et un bloc", text: "Sélectionne le niveau (A1 Basique · A2 Élémentaire · B1 Intermédiaire) et choisis un des blocs thématiques : la classe, la famille, les repas, les vacances, les métiers, les instruments…" },
      { title: "3. Apprends avec les fiches", text: "Chaque bloc contient des fiches visuelles avec le mot dans la langue que tu apprends. Touche pour voir la traduction et écouter la prononciation avec une voix de synthèse." },
      { title: "4. Joue pour t'entraîner", text: "À la fin de chaque bloc, appuie sur « Jeu » et teste ce que tu as appris. Tu verras ensuite un résumé des bonnes et mauvaises réponses." },
      { title: "5. Écoute des chansons", text: "Certains blocs incluent des chansons liées au vocabulaire, parfaites pour renforcer l'apprentissage de manière ludique." },
      { title: "6. Regarde des saynètes animées", text: "Au niveau A2, tu trouveras des vidéos animées avec des situations du quotidien (vacances, atelier techno, salle de musique…) pour travailler la compréhension orale." },
      { title: "7. Exporte en PDF", text: "Avec le bouton PDF, tu peux télécharger toutes les fiches du niveau choisi pour les imprimer et les travailler en classe hors ligne." },
    ],
    justifBadge: "Justification pédagogique",
    justifTitle: "Inspiré des directives européennes",
    p1Pre: "Ce site s'inscrit dans le projet ",
    p1Mid: ", au sein de l'initiative ",
    p1End: ". J'ai eu l'occasion de partager mon expérience après avoir mené un projet pilote suivant les guides ",
    guide1: "«New Guidelines to Help Teachers Lead Europe's Digital Education»",
    guide2: "«Guidelines for Teaching Informatics: Practical Strategies for European Classrooms»",
    p2: "Ces directives constituent une initiative phare du Digital Education Action Plan (2021–2027), qui vise à soutenir la transformation numérique des systèmes éducatifs à travers l'Europe.",
    p3: "L'entretien en ligne, organisé par la Commission européenne, a été enregistré et contribuera à une vidéo témoignage à des fins de diffusion. Je me sens très honorée et reconnaissante d'avoir été sélectionnée pour y participer et représenter le travail réalisé pendant le projet pilote.",
    backHome: "Retour à l'accueil",
  },
  ar: {
    subtitle: "كيفية الاستخدام",
    back: "رجوع",
    badge: "دليل الاستخدام",
    title: "كيفية استخدام هذا الموقع",
    intro: "أداة بصرية وتفاعلية مصممة للاستقبال اللغوي للطلاب الجدد. إليك كيفية الاستفادة القصوى منها.",
    steps: [
      { title: "١. اختر اللغات", text: "في الأعلى، اختر اللغة التي تريد تعلّمها (🎯 أتعلّم) ولغة المساعدة (🌍 المساعدة بـ) التي تعرفها. ستتكيف جميع الترجمات مع ملفك الشخصي." },
      { title: "٢. اختر مستوى وكتلة", text: "اختر المستوى (A1 مبتدئ · A2 أساسي · B1 متوسط) واختر إحدى الكتل الموضوعية: الصف، العائلة، الطعام، العطلات، المهن، الآلات…" },
      { title: "٣. تعلّم بالبطاقات", text: "تحتوي كل كتلة على بطاقات بصرية بالكلمة في لغتك المستهدفة. اضغط لرؤية الترجمة والاستماع إلى النطق بصوت اصطناعي." },
      { title: "٤. تدرّب باللعبة", text: "في نهاية كل كتلة، اضغط على «لعبة» واختبر ما تعلّمته. سترى ملخصاً للإجابات الصحيحة والخاطئة." },
      { title: "٥. استمع إلى الأغاني", text: "تتضمن بعض الكتل أغاني مرتبطة بالمفردات، وهي مثالية لتعزيز التعلّم بطريقة ممتعة." },
      { title: "٦. شاهد المشاهد المتحركة", text: "في المستوى A2 ستجد مقاطع فيديو متحركة بمواقف يومية (عطلات، ورشة تكنولوجيا، صف موسيقى…) للعمل على الفهم الشفهي." },
      { title: "٧. تصدير إلى PDF", text: "بزر PDF يمكنك تنزيل جميع بطاقات المستوى المختار لطباعتها والعمل بها في الفصل دون اتصال." },
    ],
    justifBadge: "المبرر التربوي",
    justifTitle: "مستوحى من التوجيهات الأوروبية",
    p1Pre: "هذا الموقع جزء من مشروع ",
    p1Mid: ", ضمن مبادرة ",
    p1End: ". أتيحت لي الفرصة لمشاركة تجربتي بعد تنفيذ مشروع تجريبي وفقاً لدليلَي ",
    guide1: "«New Guidelines to Help Teachers Lead Europe's Digital Education»",
    guide2: "«Guidelines for Teaching Informatics: Practical Strategies for European Classrooms»",
    p2: "تُعدّ هذه التوجيهات مبادرة رئيسية ضمن Digital Education Action Plan (2021–2027) التي تهدف إلى دعم التحوّل الرقمي لأنظمة التعليم في جميع أنحاء أوروبا.",
    p3: "تم تسجيل المقابلة عبر الإنترنت التي نظّمتها المفوضية الأوروبية، وستُساهم في فيديو شهادة لأغراض النشر. أشعر بالشرف والامتنان لاختياري للمشاركة وتمثيل العمل المنجز خلال المشروع التجريبي.",
    backHome: "العودة إلى الرئيسية",
  },
  it: {
    subtitle: "Come usarlo",
    back: "Indietro",
    badge: "Guida all'uso",
    title: "Come usare questo sito",
    intro: "Uno strumento visivo e interattivo pensato per l'accoglienza linguistica degli studenti appena arrivati. Ecco come sfruttarlo al massimo.",
    steps: [
      { title: "1. Scegli le lingue", text: "In alto, seleziona la lingua che vuoi imparare (🎯 Imparo) e la lingua d'aiuto (🌍 Aiuto in) che già conosci. Tutte le traduzioni si adattano al tuo profilo." },
      { title: "2. Scegli un livello e un blocco", text: "Seleziona il livello (A1 Base · A2 Elementare · B1 Intermedio) e scegli uno dei blocchi tematici: la classe, la famiglia, i cibi, le vacanze, le professioni, gli strumenti…" },
      { title: "3. Impara con le schede", text: "Ogni blocco contiene schede visive con la parola nella lingua di studio. Tocca per vedere la traduzione e ascoltare la pronuncia con voce sintetica." },
      { title: "4. Esercitati col gioco", text: "Alla fine di ogni blocco, premi 'Gioco' e metti alla prova ciò che hai imparato. Vedrai un riepilogo di risposte corrette ed errate." },
      { title: "5. Ascolta canzoni", text: "Alcuni blocchi includono canzoni legate al vocabolario, perfette per rinforzare l'apprendimento in modo divertente." },
      { title: "6. Guarda roleplay animati", text: "Al livello A2 troverai video animati con situazioni quotidiane (vacanze, laboratorio di tecnologia, aula di musica…) per la comprensione orale." },
      { title: "7. Esporta in PDF", text: "Con il pulsante PDF puoi scaricare tutte le schede del livello scelto per stamparle e usarle in classe offline." },
    ],
    justifBadge: "Giustificazione pedagogica",
    justifTitle: "Ispirato alle linee guida europee",
    p1Pre: "Questo sito fa parte del progetto ",
    p1Mid: ", nell'ambito dell'iniziativa ",
    p1End: ". Ho avuto l'opportunità di condividere la mia esperienza dopo aver realizzato un progetto pilota seguendo le guide ",
    guide1: "«New Guidelines to Help Teachers Lead Europe's Digital Education»",
    guide2: "«Guidelines for Teaching Informatics: Practical Strategies for European Classrooms»",
    p2: "Queste linee guida sono un'iniziativa di punta del Digital Education Action Plan (2021–2027), che mira a sostenere la trasformazione digitale dei sistemi educativi in tutta Europa.",
    p3: "L'intervista online, organizzata dalla Commissione europea, è stata registrata e contribuirà a un video testimonianza per scopi divulgativi. Mi sento molto onorata e grata di essere stata selezionata per partecipare e rappresentare il lavoro svolto nel progetto pilota.",
    backHome: "Torna alla home",
  },
  pt: {
    subtitle: "Como utilizar",
    back: "Voltar",
    badge: "Guia de utilização",
    title: "Como utilizar este site",
    intro: "Uma ferramenta visual e interativa pensada para o acolhimento linguístico de alunos recém-chegados. Veja como tirar o máximo proveito.",
    steps: [
      { title: "1. Escolhe os idiomas", text: "No topo, seleciona o idioma que queres aprender (🎯 Aprendo) e o idioma de ajuda (🌍 Ajuda em) que já conheces. Todas as traduções adaptam-se ao teu perfil." },
      { title: "2. Escolhe um nível e um bloco", text: "Seleciona o nível (A1 Básico · A2 Elementar · B1 Intermédio) e escolhe um dos blocos temáticos: a aula, a família, as refeições, as férias, as profissões, os instrumentos…" },
      { title: "3. Aprende com as fichas", text: "Cada bloco contém fichas visuais com a palavra no idioma que aprendes. Toca para ver a tradução e ouvir a pronúncia com voz sintética." },
      { title: "4. Pratica com o jogo", text: "No final de cada bloco, prime 'Jogo' e testa o que aprendeste. Verás um resumo de acertos e erros." },
      { title: "5. Ouve canções", text: "Alguns blocos incluem canções relacionadas com o vocabulário, perfeitas para reforçar a aprendizagem de forma lúdica." },
      { title: "6. Vê roleplays animados", text: "No nível A2 encontrarás vídeos animados com situações do quotidiano (férias, oficina de tecnologia, sala de música…) para trabalhar a compreensão oral." },
      { title: "7. Exporta para PDF", text: "Com o botão PDF podes descarregar todas as fichas do nível escolhido para imprimir e trabalhar na sala de aula sem ligação." },
    ],
    justifBadge: "Justificação pedagógica",
    justifTitle: "Inspirado nas diretrizes europeias",
    p1Pre: "Este site faz parte do projeto ",
    p1Mid: ", dentro da iniciativa ",
    p1End: ". Tive a oportunidade de partilhar a minha experiência após realizar um projeto piloto seguindo os guias ",
    guide1: "«New Guidelines to Help Teachers Lead Europe's Digital Education»",
    guide2: "«Guidelines for Teaching Informatics: Practical Strategies for European Classrooms»",
    p2: "Estas diretrizes são uma iniciativa emblemática do Digital Education Action Plan (2021–2027), que visa apoiar a transformação digital dos sistemas educativos em toda a Europa.",
    p3: "A entrevista online, organizada pela Comissão Europeia, foi gravada e contribuirá para um vídeo testemunho com fins de divulgação. Sinto-me muito honrada e grata por ter sido selecionada para participar e representar o trabalho desenvolvido no projeto piloto.",
    backHome: "Voltar ao início",
  },
  ro: {
    subtitle: "Cum se folosește",
    back: "Înapoi",
    badge: "Ghid de utilizare",
    title: "Cum să folosești acest site",
    intro: "Un instrument vizual și interactiv conceput pentru integrarea lingvistică a elevilor nou-veniți. Iată cum să profiți la maximum.",
    steps: [
      { title: "1. Alege limbile", text: "În partea de sus, selectează limba pe care vrei să o înveți (🎯 Învăț) și limba de ajutor (🌍 Ajutor în) pe care o cunoști deja. Toate traducerile se adaptează profilului tău." },
      { title: "2. Alege un nivel și un bloc", text: "Selectează nivelul (A1 Bază · A2 Elementar · B1 Intermediar) și alege unul dintre blocurile tematice: clasa, familia, mâncarea, vacanțele, profesiile, instrumentele…" },
      { title: "3. Învață cu fișele", text: "Fiecare bloc conține fișe vizuale cu cuvântul în limba țintă. Atinge pentru a vedea traducerea și a asculta pronunția cu voce sintetică." },
      { title: "4. Exersează cu jocul", text: "La sfârșitul fiecărui bloc, apasă 'Joc' și testează ce ai învățat. Vei vedea un rezumat cu răspunsurile corecte și greșite." },
      { title: "5. Ascultă cântece", text: "Unele blocuri includ cântece legate de vocabular, perfecte pentru a consolida învățarea într-un mod distractiv." },
      { title: "6. Vezi roleplay-uri animate", text: "La nivelul A2 vei găsi videoclipuri animate cu situații cotidiene (vacanțe, atelier tehnologic, sala de muzică…) pentru a lucra înțelegerea orală." },
      { title: "7. Exportă în PDF", text: "Cu butonul PDF poți descărca toate fișele nivelului ales pentru a le imprima și lucra în clasă offline." },
    ],
    justifBadge: "Justificare pedagogică",
    justifTitle: "Inspirat de directivele europene",
    p1Pre: "Acest site face parte din proiectul ",
    p1Mid: ", în cadrul inițiativei ",
    p1End: ". Am avut ocazia să-mi împărtășesc experiența după ce am realizat un proiect pilot urmând ghidurile ",
    guide1: "«New Guidelines to Help Teachers Lead Europe's Digital Education»",
    guide2: "«Guidelines for Teaching Informatics: Practical Strategies for European Classrooms»",
    p2: "Aceste directive sunt o inițiativă emblematică a Digital Education Action Plan (2021–2027), care vizează sprijinirea transformării digitale a sistemelor educaționale din toată Europa.",
    p3: "Interviul online, organizat de Comisia Europeană, a fost înregistrat și va contribui la un video testimonial cu scop de diseminare. Mă simt foarte onorată și recunoscătoare că am fost selectată să particip și să reprezint munca desfășurată în proiectul pilot.",
    backHome: "Înapoi la pagina principală",
  },
  uk: {
    subtitle: "Як користуватися",
    back: "Назад",
    badge: "Посібник користувача",
    title: "Як користуватися цим сайтом",
    intro: "Візуальний та інтерактивний інструмент для мовної інтеграції новоприбулих учнів. Ось як отримати максимум користі.",
    steps: [
      { title: "1. Обери мови", text: "Угорі обери мову, яку хочеш вивчати (🎯 Я вивчаю), та мову допомоги (🌍 Допомога в), яку вже знаєш. Усі переклади адаптуються до твого профілю." },
      { title: "2. Обери рівень і блок", text: "Обери рівень (A1 Базовий · A2 Елементарний · B1 Середній) та один із тематичних блоків: клас, родина, їжа, канікули, професії, інструменти…" },
      { title: "3. Вчись з картками", text: "Кожен блок містить візуальні картки зі словом мовою, яку вивчаєш. Торкнись, щоб побачити переклад і почути вимову синтезованим голосом." },
      { title: "4. Тренуйся у грі", text: "Наприкінці кожного блоку натисни «Гра» та перевір вивчене. Побачиш підсумок правильних і помилкових відповідей." },
      { title: "5. Слухай пісні", text: "Деякі блоки містять пісні, пов'язані з лексикою, ідеальні для закріплення в ігровій формі." },
      { title: "6. Дивись анімовані сценки", text: "На рівні A2 знайдеш анімовані відео з повсякденними ситуаціями (канікули, технічна майстерня, кабінет музики…) для роботи над аудіюванням." },
      { title: "7. Експорт у PDF", text: "Кнопкою PDF можна завантажити всі картки обраного рівня, щоб роздрукувати й працювати в класі офлайн." },
    ],
    justifBadge: "Педагогічне обґрунтування",
    justifTitle: "Натхненно європейськими настановами",
    p1Pre: "Цей сайт є частиною проєкту ",
    p1Mid: ", у межах ініціативи ",
    p1End: ". Я мала нагоду поділитися своїм досвідом після пілотного проєкту, що базувався на посібниках ",
    guide1: "«New Guidelines to Help Teachers Lead Europe's Digital Education»",
    guide2: "«Guidelines for Teaching Informatics: Practical Strategies for European Classrooms»",
    p2: "Ці настанови — флагманська ініціатива Digital Education Action Plan (2021–2027), спрямована на підтримку цифрової трансформації освітніх систем по всій Європі.",
    p3: "Онлайн-інтерв'ю, організоване Європейською Комісією, було записане та увійде до відеосвідчення з метою поширення. Я дуже вдячна й пишаюся тим, що мене обрали для участі та представлення роботи, виконаної під час пілотного проєкту.",
    backHome: "Повернутися на головну",
  },
};

type AudioStrings = {
  title: string;
  intro: string;
  callout: string;
  windows: string;
  android: string;
  ios: string;
  mac: string;
  outro: string;
};

const AUDIO_STRINGS: Partial<Record<LangCode, AudioStrings>> = {
  ca: {
    title: "🔊 L'àudio en català no sona bé al meu dispositiu?",
    intro: "L'aplicació fa servir la <strong>síntesi de veu del teu propi dispositiu</strong> (sistema operatiu o navegador) per llegir les paraules en català. Si el dispositiu <strong>no té instal·lada cap veu catalana nativa</strong>, l'àudio pot sonar robòtic, tallat o no sonar gens.",
    callout: "👉 La solució és instal·lar la veu catalana al sistema operatiu:",
    windows: "<strong>Windows:</strong> Configuració → Hora i idioma → Idioma i regió → Afegeix idioma → Català → Opcions d'idioma → Descarrega «Veu».",
    android: "<strong>Android:</strong> Configuració → Sistema → Idiomes i introducció → Sortida de síntesi de veu → Configuració del motor → Instal·la dades de veu → Català.",
    ios: "<strong>iPhone / iPad:</strong> Configuració → Accessibilitat → Contingut llegit → Veus → Català → Descarrega una veu (per exemple «Montserrat»).",
    mac: "<strong>Mac:</strong> Configuració del sistema → Accessibilitat → Contingut llegit → Veu del sistema → Gestiona les veus → Català.",
    outro: "Un cop instal·lada, <strong>tanca i torna a obrir el navegador</strong> i l'àudio sonarà amb pronúncia catalana correcta. 🎧",
  },
  es: {
    title: "🔊 ¿El audio en catalán no suena bien en mi dispositivo?",
    intro: "La aplicación usa la <strong>síntesis de voz de tu propio dispositivo</strong> (sistema operativo o navegador) para leer las palabras en catalán. Si el dispositivo <strong>no tiene instalada ninguna voz catalana nativa</strong>, el audio puede sonar robótico, cortado o no sonar.",
    callout: "👉 La solución es instalar la voz catalana en el sistema operativo:",
    windows: "<strong>Windows:</strong> Configuración → Hora e idioma → Idioma y región → Añadir idioma → Catalán → Opciones de idioma → Descargar «Voz».",
    android: "<strong>Android:</strong> Configuración → Sistema → Idiomas e introducción → Salida de síntesis de voz → Configuración del motor → Instalar datos de voz → Catalán.",
    ios: "<strong>iPhone / iPad:</strong> Ajustes → Accesibilidad → Contenido leído → Voces → Catalán → Descargar una voz (por ejemplo «Montserrat»).",
    mac: "<strong>Mac:</strong> Ajustes del sistema → Accesibilidad → Contenido leído → Voz del sistema → Gestionar voces → Catalán.",
    outro: "Una vez instalada, <strong>cierra y vuelve a abrir el navegador</strong> y el audio sonará con la pronunciación catalana correcta. 🎧",
  },
  en: {
    title: "🔊 Catalan audio doesn't sound right on my device?",
    intro: "The app uses your <strong>device's own speech synthesis</strong> (operating system or browser) to read words in Catalan. If your device <strong>doesn't have a native Catalan voice installed</strong>, audio may sound robotic, choppy or silent.",
    callout: "👉 The fix is to install the Catalan voice on the operating system:",
    windows: "<strong>Windows:</strong> Settings → Time & Language → Language & region → Add a language → Catalan → Language options → Download «Speech».",
    android: "<strong>Android:</strong> Settings → System → Languages & input → Text-to-speech output → Engine settings → Install voice data → Catalan.",
    ios: "<strong>iPhone / iPad:</strong> Settings → Accessibility → Spoken Content → Voices → Catalan → Download a voice (for example «Montserrat»).",
    mac: "<strong>Mac:</strong> System Settings → Accessibility → Spoken Content → System Voice → Manage Voices → Catalan.",
    outro: "Once installed, <strong>close and reopen your browser</strong> and audio will play with correct Catalan pronunciation. 🎧",
  },
  fr: {
    title: "🔊 L'audio en catalan ne sonne pas bien sur mon appareil ?",
    intro: "L'application utilise la <strong>synthèse vocale de votre propre appareil</strong> (système d'exploitation ou navigateur) pour lire les mots en catalan. Si l'appareil <strong>n'a aucune voix catalane native installée</strong>, l'audio peut sembler robotique, coupé ou inaudible.",
    callout: "👉 La solution est d'installer la voix catalane dans le système d'exploitation :",
    windows: "<strong>Windows :</strong> Paramètres → Heure et langue → Langue et région → Ajouter une langue → Catalan → Options de langue → Télécharger « Voix ».",
    android: "<strong>Android :</strong> Paramètres → Système → Langues et saisie → Sortie de synthèse vocale → Paramètres du moteur → Installer les données vocales → Catalan.",
    ios: "<strong>iPhone / iPad :</strong> Réglages → Accessibilité → Contenu énoncé → Voix → Catalan → Télécharger une voix (par exemple « Montserrat »).",
    mac: "<strong>Mac :</strong> Réglages système → Accessibilité → Contenu énoncé → Voix système → Gérer les voix → Catalan.",
    outro: "Une fois installée, <strong>fermez et rouvrez le navigateur</strong> et l'audio se fera entendre avec la prononciation catalane correcte. 🎧",
  },
  ar: {
    title: "🔊 الصوت بالكتالانية لا يبدو جيداً على جهازي؟",
    intro: "يستخدم التطبيق <strong>محرك تحويل النص إلى كلام الخاص بجهازك</strong> (نظام التشغيل أو المتصفح) لقراءة الكلمات بالكتالانية. إذا لم يكن لدى الجهاز <strong>أي صوت كتالاني أصلي مثبت</strong>، فقد يبدو الصوت آلياً أو متقطعاً أو غير مسموع.",
    callout: "👉 الحل هو تثبيت الصوت الكتالاني في نظام التشغيل:",
    windows: "<strong>Windows:</strong> الإعدادات → الوقت واللغة → اللغة والمنطقة → إضافة لغة → الكتالانية → خيارات اللغة → تنزيل «الصوت».",
    android: "<strong>Android:</strong> الإعدادات → النظام → اللغات والإدخال → إخراج تحويل النص إلى كلام → إعدادات المحرك → تثبيت بيانات الصوت → الكتالانية.",
    ios: "<strong>iPhone / iPad:</strong> الإعدادات → إمكانية الوصول → المحتوى المنطوق → الأصوات → الكتالانية → تنزيل صوت (مثل «Montserrat»).",
    mac: "<strong>Mac:</strong> إعدادات النظام → إمكانية الوصول → المحتوى المنطوق → صوت النظام → إدارة الأصوات → الكتالانية.",
    outro: "بعد التثبيت، <strong>أغلق المتصفح وأعد فتحه</strong> وسيُسمع الصوت بالنطق الكتالاني الصحيح. 🎧",
  },
  it: {
    title: "🔊 L'audio in catalano non suona bene sul mio dispositivo?",
    intro: "L'app usa la <strong>sintesi vocale del tuo dispositivo</strong> (sistema operativo o browser) per leggere le parole in catalano. Se il dispositivo <strong>non ha alcuna voce catalana nativa installata</strong>, l'audio può sembrare robotico, spezzato o non sentirsi.",
    callout: "👉 La soluzione è installare la voce catalana nel sistema operativo:",
    windows: "<strong>Windows:</strong> Impostazioni → Data/ora e lingua → Lingua e area → Aggiungi una lingua → Catalano → Opzioni lingua → Scarica «Voce».",
    android: "<strong>Android:</strong> Impostazioni → Sistema → Lingue e immissione → Output sintesi vocale → Impostazioni motore → Installa dati vocali → Catalano.",
    ios: "<strong>iPhone / iPad:</strong> Impostazioni → Accessibilità → Contenuto letto → Voci → Catalano → Scarica una voce (ad esempio «Montserrat»).",
    mac: "<strong>Mac:</strong> Impostazioni di sistema → Accessibilità → Contenuto letto → Voce del sistema → Gestisci voci → Catalano.",
    outro: "Una volta installata, <strong>chiudi e riapri il browser</strong> e l'audio si sentirà con la pronuncia catalana corretta. 🎧",
  },
  pt: {
    title: "🔊 O áudio em catalão não soa bem no meu dispositivo?",
    intro: "A aplicação usa a <strong>síntese de voz do teu próprio dispositivo</strong> (sistema operativo ou navegador) para ler as palavras em catalão. Se o dispositivo <strong>não tiver nenhuma voz catalã nativa instalada</strong>, o áudio pode soar robótico, cortado ou não soar de todo.",
    callout: "👉 A solução é instalar a voz catalã no sistema operativo:",
    windows: "<strong>Windows:</strong> Definições → Hora e Idioma → Idioma e região → Adicionar idioma → Catalão → Opções de idioma → Transferir «Voz».",
    android: "<strong>Android:</strong> Definições → Sistema → Idiomas e introdução → Saída de síntese de voz → Definições do motor → Instalar dados de voz → Catalão.",
    ios: "<strong>iPhone / iPad:</strong> Definições → Acessibilidade → Conteúdo Falado → Vozes → Catalão → Transferir uma voz (por exemplo «Montserrat»).",
    mac: "<strong>Mac:</strong> Definições do sistema → Acessibilidade → Conteúdo Falado → Voz do sistema → Gerir vozes → Catalão.",
    outro: "Depois de instalada, <strong>fecha e reabre o navegador</strong> e o áudio terá a pronúncia catalã correta. 🎧",
  },
  ptBR: {
    title: "🔊 O áudio em catalão não está bom no meu dispositivo?",
    intro: "O app usa a <strong>síntese de voz do seu próprio dispositivo</strong> (sistema operacional ou navegador) para ler as palavras em catalão. Se o dispositivo <strong>não tiver nenhuma voz catalã nativa instalada</strong>, o áudio pode parecer robótico, cortado ou não tocar.",
    callout: "👉 A solução é instalar a voz catalã no sistema operacional:",
    windows: "<strong>Windows:</strong> Configurações → Hora e Idioma → Idioma e região → Adicionar idioma → Catalão → Opções de idioma → Baixar «Voz».",
    android: "<strong>Android:</strong> Configurações → Sistema → Idiomas e entrada → Saída de conversão de texto em voz → Configurações do mecanismo → Instalar dados de voz → Catalão.",
    ios: "<strong>iPhone / iPad:</strong> Ajustes → Acessibilidade → Conteúdo Falado → Vozes → Catalão → Baixar uma voz (por exemplo «Montserrat»).",
    mac: "<strong>Mac:</strong> Ajustes do Sistema → Acessibilidade → Conteúdo Falado → Voz do sistema → Gerenciar vozes → Catalão.",
    outro: "Depois de instalada, <strong>feche e reabra o navegador</strong> e o áudio tocará com a pronúncia catalã correta. 🎧",
  },
  uk: {
    title: "🔊 Каталонський звук погано звучить на моєму пристрої?",
    intro: "Застосунок використовує <strong>синтез мовлення вашого пристрою</strong> (операційна система або браузер) для читання слів каталонською. Якщо на пристрої <strong>не встановлено жодного рідного каталонського голосу</strong>, звук може звучати роботизовано, переривчасто або не звучати взагалі.",
    callout: "👉 Рішення — встановити каталонський голос в операційній системі:",
    windows: "<strong>Windows:</strong> Налаштування → Час і мова → Мова та регіон → Додати мову → Каталонська → Параметри мови → Завантажити «Мовлення».",
    android: "<strong>Android:</strong> Налаштування → Система → Мови та введення → Виведення синтезу мовлення → Налаштування рушія → Встановити голосові дані → Каталонська.",
    ios: "<strong>iPhone / iPad:</strong> Налаштування → Доступність → Озвучений вміст → Голоси → Каталонська → Завантажити голос (наприклад «Montserrat»).",
    mac: "<strong>Mac:</strong> Системні налаштування → Доступність → Озвучений вміст → Голос системи → Керувати голосами → Каталонська.",
    outro: "Після встановлення <strong>закрийте і знову відкрийте браузер</strong> — звук звучатиме з правильною каталонською вимовою. 🎧",
  },
  ro: {
    title: "🔊 Audio-ul în catalană nu sună bine pe dispozitivul meu?",
    intro: "Aplicația folosește <strong>sinteza vocală a propriului tău dispozitiv</strong> (sistem de operare sau browser) pentru a citi cuvintele în catalană. Dacă dispozitivul <strong>nu are nicio voce catalană nativă instalată</strong>, audio-ul poate suna robotic, întrerupt sau să nu se audă deloc.",
    callout: "👉 Soluția este să instalezi vocea catalană în sistemul de operare:",
    windows: "<strong>Windows:</strong> Setări → Oră și limbă → Limbă și regiune → Adaugă o limbă → Catalană → Opțiuni de limbă → Descarcă «Voce».",
    android: "<strong>Android:</strong> Setări → Sistem → Limbi și introducere → Ieșire text-vorbire → Setări motor → Instalează date vocale → Catalană.",
    ios: "<strong>iPhone / iPad:</strong> Setări → Accesibilitate → Conținut rostit → Voci → Catalană → Descarcă o voce (de exemplu «Montserrat»).",
    mac: "<strong>Mac:</strong> Setări sistem → Accesibilitate → Conținut rostit → Voce sistem → Gestionare voci → Catalană.",
    outro: "Odată instalată, <strong>închide și redeschide browserul</strong>, iar audio-ul va suna cu pronunția catalană corectă. 🎧",
  },
  el: {
    title: "🔊 Ο ήχος στα καταλανικά δεν ακούγεται καλά στη συσκευή μου;",
    intro: "Η εφαρμογή χρησιμοποιεί τη <strong>σύνθεση ομιλίας της συσκευής σας</strong> (λειτουργικό σύστημα ή πρόγραμμα περιήγησης) για να διαβάζει τις λέξεις στα καταλανικά. Αν η συσκευή <strong>δεν έχει εγκατεστημένη καμία γηγενή καταλανική φωνή</strong>, ο ήχος μπορεί να ακούγεται ρομποτικός, κομμένος ή να μην ακούγεται καθόλου.",
    callout: "👉 Η λύση είναι να εγκαταστήσετε την καταλανική φωνή στο λειτουργικό σύστημα:",
    windows: "<strong>Windows:</strong> Ρυθμίσεις → Ώρα & Γλώσσα → Γλώσσα & περιοχή → Προσθήκη γλώσσας → Καταλανικά → Επιλογές γλώσσας → Λήψη «Ομιλία».",
    android: "<strong>Android:</strong> Ρυθμίσεις → Σύστημα → Γλώσσες και εισαγωγή → Έξοδος μετατροπής κειμένου σε ομιλία → Ρυθμίσεις μηχανής → Εγκατάσταση δεδομένων φωνής → Καταλανικά.",
    ios: "<strong>iPhone / iPad:</strong> Ρυθμίσεις → Προσβασιμότητα → Εκφωνούμενο περιεχόμενο → Φωνές → Καταλανικά → Λήψη φωνής (π.χ. «Montserrat»).",
    mac: "<strong>Mac:</strong> Ρυθμίσεις συστήματος → Προσβασιμότητα → Εκφωνούμενο περιεχόμενο → Φωνή συστήματος → Διαχείριση φωνών → Καταλανικά.",
    outro: "Μόλις εγκατασταθεί, <strong>κλείστε και ανοίξτε ξανά το πρόγραμμα περιήγησης</strong> και ο ήχος θα ακούγεται με σωστή καταλανική προφορά. 🎧",
  },
  ur: {
    title: "🔊 کیا میرے ڈیوائس پر کاتالان آڈیو ٹھیک نہیں سنائی دیتا؟",
    intro: "ایپ کاتالان میں الفاظ پڑھنے کے لیے آپ کے <strong>ڈیوائس کی اپنی اسپیچ سنتھیسس</strong> (آپریٹنگ سسٹم یا براؤزر) استعمال کرتی ہے۔ اگر ڈیوائس میں <strong>کوئی مقامی کاتالان آواز نصب نہیں</strong> تو آڈیو روبوٹک، کٹا ہوا یا خاموش لگ سکتا ہے۔",
    callout: "👉 حل یہ ہے کہ آپریٹنگ سسٹم میں کاتالان آواز انسٹال کریں:",
    windows: "<strong>Windows:</strong> Settings → Time & Language → Language & region → زبان شامل کریں → کاتالان → زبان کے اختیارات → «Speech» ڈاؤن لوڈ کریں۔",
    android: "<strong>Android:</strong> Settings → System → Languages & input → Text-to-speech output → Engine settings → Install voice data → کاتالان۔",
    ios: "<strong>iPhone / iPad:</strong> Settings → Accessibility → Spoken Content → Voices → کاتالان → آواز ڈاؤن لوڈ کریں (مثلاً «Montserrat»)۔",
    mac: "<strong>Mac:</strong> System Settings → Accessibility → Spoken Content → System Voice → آوازوں کا انتظام → کاتالان۔",
    outro: "انسٹال ہونے کے بعد، <strong>براؤزر بند کریں اور دوبارہ کھولیں</strong> اور آڈیو درست کاتالان تلفظ کے ساتھ سنائی دے گا۔ 🎧",
  },
  zh: {
    title: "🔊 我的设备上加泰罗尼亚语音频听起来不正常？",
    intro: "应用使用您<strong>设备自身的语音合成</strong>（操作系统或浏览器）来朗读加泰罗尼亚语单词。如果设备<strong>未安装任何原生加泰罗尼亚语音</strong>，音频可能听起来机械、断断续续或根本没有声音。",
    callout: "👉 解决办法是在操作系统中安装加泰罗尼亚语音：",
    windows: "<strong>Windows：</strong>设置 → 时间和语言 → 语言和区域 → 添加语言 → 加泰罗尼亚语 → 语言选项 → 下载「语音」。",
    android: "<strong>Android：</strong>设置 → 系统 → 语言和输入法 → 文本转语音输出 → 引擎设置 → 安装语音数据 → 加泰罗尼亚语。",
    ios: "<strong>iPhone / iPad：</strong>设置 → 辅助功能 → 朗读内容 → 语音 → 加泰罗尼亚语 → 下载语音（例如「Montserrat」）。",
    mac: "<strong>Mac：</strong>系统设置 → 辅助功能 → 朗读内容 → 系统语音 → 管理语音 → 加泰罗尼亚语。",
    outro: "安装完成后，<strong>关闭并重新打开浏览器</strong>，音频将以正确的加泰罗尼亚语发音播放。🎧",
  },
  hi: {
    title: "🔊 क्या मेरे डिवाइस पर कैटलन ऑडियो ठीक नहीं सुनाई देता?",
    intro: "ऐप कैटलन में शब्द पढ़ने के लिए आपके <strong>डिवाइस की अपनी स्पीच सिंथेसिस</strong> (ऑपरेटिंग सिस्टम या ब्राउज़र) का उपयोग करता है। यदि डिवाइस में <strong>कोई मूल कैटलन आवाज़ इंस्टॉल नहीं</strong> है, तो ऑडियो रोबोटिक, कटा हुआ या बिल्कुल नहीं सुनाई दे सकता।",
    callout: "👉 समाधान ऑपरेटिंग सिस्टम में कैटलन आवाज़ इंस्टॉल करना है:",
    windows: "<strong>Windows:</strong> Settings → Time & Language → Language & region → भाषा जोड़ें → कैटलन → भाषा विकल्प → «Speech» डाउनलोड करें।",
    android: "<strong>Android:</strong> Settings → System → Languages & input → Text-to-speech output → Engine settings → Install voice data → कैटलन।",
    ios: "<strong>iPhone / iPad:</strong> Settings → Accessibility → Spoken Content → Voices → कैटलन → आवाज़ डाउनलोड करें (उदाहरण «Montserrat»)।",
    mac: "<strong>Mac:</strong> System Settings → Accessibility → Spoken Content → System Voice → आवाज़ें प्रबंधित करें → कैटलन।",
    outro: "इंस्टॉल होने के बाद, <strong>ब्राउज़र बंद करके दोबारा खोलें</strong> और ऑडियो सही कैटलन उच्चारण के साथ सुनाई देगा। 🎧",
  },
};


const About = () => {
  const { helpLang } = useLanguages();
  const s = STRINGS[helpLang] ?? STRINGS.en!;
  const audio = AUDIO_STRINGS[helpLang] ?? AUDIO_STRINGS.en!;

  const stepMeta = [
    { icon: Languages, color: "bg-blue-500" },
    { icon: BookOpen, color: "bg-amber-500" },
    { icon: Sparkles, color: "bg-pink-500" },
    { icon: Gamepad2, color: "bg-green-500" },
    { icon: Music, color: "bg-purple-500" },
    { icon: Video, color: "bg-indigo-500" },
    { icon: Download, color: "bg-rose-500" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container py-4 flex items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-2 active:scale-95 transition-transform">
            <span className="text-3xl">🌍</span>
            <div className="text-left">
              <h1 className="text-xl font-extrabold leading-none text-foreground">Acolliment</h1>
              <p className="text-xs text-muted-foreground font-semibold">{s.subtitle}</p>
            </div>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-muted text-foreground text-sm font-semibold hover:bg-muted/80 transition-all active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{s.back}</span>
          </Link>
        </div>
      </header>

      <main className="container py-8 max-w-3xl">
        <section className="animate-reveal-up space-y-3">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
            {s.badge}
          </span>
          <h2 className="text-3xl font-extrabold text-foreground text-balance">{s.title}</h2>
          <p className="text-muted-foreground">{s.intro}</p>
        </section>

        <section className="mt-8">
          <div className="grid gap-4">
            {s.steps.map((step, i) => {
              const Icon = stepMeta[i].icon;
              return (
                <article
                  key={step.title}
                  className="flex gap-4 p-5 rounded-2xl border border-border bg-card hover:shadow-md transition-shadow"
                >
                  <div className={`${stepMeta[i].color} text-white rounded-xl p-3 h-fit shrink-0`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-foreground">{step.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{step.text}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>



        <section className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-accent/10 to-background border border-border">
          <span className="inline-block px-3 py-1 rounded-full bg-foreground text-background text-xs font-bold">
            {s.justifBadge}
          </span>
          <h2 className="text-2xl font-extrabold text-foreground mt-3">{s.justifTitle}</h2>
          <div className="mt-4 space-y-4 text-sm text-foreground/90 leading-relaxed">
            <p>
              {s.p1Pre}
              <strong>Teachers' Voices</strong>
              {s.p1Mid}
              <strong>Scientix Ambassadors</strong>
              {s.p1End}
              <a
                href="https://op.europa.eu/en/publication-detail/-/publication/a3f80518-fa75-11ee-a251-01aa75ed71a1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-semibold hover:underline"
              >
                {s.guide1}
              </a>
              {" / "}
              <a
                href="https://op.europa.eu/en/publication-detail/-/publication/13d2f74a-fa76-11ee-a251-01aa75ed71a1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-semibold hover:underline"
              >
                {s.guide2}
              </a>
              .
            </p>
            <p>{s.p2}</p>
            <p>{s.p3}</p>
          </div>
        </section>

        <section className="mt-10 rounded-2xl border-2 border-blue-300 bg-blue-50 p-6">
          <h2 className="text-xl font-extrabold text-blue-900 mb-3 flex items-center gap-2">
            🔊 L'àudio en català no sona bé al meu dispositiu?
          </h2>
          <div className="space-y-3 text-sm text-blue-950 leading-relaxed">
            <p>
              L'aplicació fa servir la <strong>síntesi de veu del teu propi dispositiu</strong> (sistema operatiu o navegador) per llegir les paraules en català. Si el dispositiu <strong>no té instal·lada cap veu catalana nativa</strong>, l'àudio pot sonar robòtic, tallat o no sonar gens.
            </p>
            <p className="font-semibold">
              👉 La solució és instal·lar la veu catalana al sistema operatiu:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><strong>Windows:</strong> Configuració → Hora i idioma → Idioma i regió → Afegeix idioma → Català → Opcions d'idioma → Descarrega «Veu».</li>
              <li><strong>Android:</strong> Configuració → Sistema → Idiomes i introducció → Sortida de síntesi de veu → Configuració del motor → Instal·la dades de veu → Català.</li>
              <li><strong>iPhone / iPad:</strong> Configuració → Accessibilitat → Contingut llegit → Veus → Català → Descarrega una veu (per exemple «Montserrat»).</li>
              <li><strong>Mac:</strong> Configuració del sistema → Accessibilitat → Contingut llegit → Veu del sistema → Gestiona les veus → Català.</li>
            </ul>
            <p>
              Un cop instal·lada, <strong>tanca i torna a obrir el navegador</strong> i l'àudio sonarà amb pronúncia catalana correcta. 🎧
            </p>
          </div>
        </section>



        <div className="mt-10 text-center space-y-4">
          <div>
            <Link
              to="/ajuda/moderacio"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-100 text-amber-900 font-bold border border-amber-300 hover:bg-amber-200 transition-all active:scale-95"
            >
              🛡️ Com es revisen les aportacions dels usuaris
            </Link>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            {s.backHome}
          </Link>
        </div>
      </main>

      <footer className="py-6 text-center text-xs text-muted-foreground border-t border-border mt-10">
        <a href="https://acolliment.vercel.app/" className="hover:underline font-semibold">Acolliment</a>
        {" "}© 2026 by{" "}
        <a href="https://dossier.xtec.cat/cblaya/" className="hover:underline">Cristina Blaya Góngora</a>
      </footer>
    </div>
  );
};

export default About;
