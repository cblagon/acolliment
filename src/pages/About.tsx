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



const About = () => {
  const { helpLang, targetLang } = useLanguages();
  const s = STRINGS[helpLang] ?? STRINGS.en!;
  // "Com fer-ne ús" → render once per learning language (target). Fallback to English when not translated.
  const targetLangs = Array.from(new Set([targetLang])) as LangCode[];

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

        {targetLangs.map((tl) => {
          const stepsSrc = STRINGS[tl] ?? STRINGS.en!;
          const sameAsHelp = tl === helpLang;
          return (
            <section key={tl} className="mt-8">
              {!sameAsHelp && (
                <div className="mb-4 flex items-center gap-2">
                  <span className="text-2xl">{LANGUAGES[tl].flag}</span>
                  <h3 className="text-lg font-extrabold text-foreground">
                    {s.title} · {langName(tl, helpLang)}
                  </h3>
                </div>
              )}
              <div className="grid gap-4">
                {stepsSrc.steps.map((step, i) => {
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
          );
        })}


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
