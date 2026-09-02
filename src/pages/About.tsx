import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Chrome, Languages, Gamepad2, Music, Video, Download, Sparkles } from "lucide-react";
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
  moderationLink: string;
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
    moderationLink: "{s.moderationLink}",
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
    moderationLink: "🛡️ Cómo se revisan las aportaciones de los usuarios",
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
    moderationLink: "🛡️ How user contributions are reviewed",
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
    moderationLink: "🛡️ Comment les contributions des utilisateurs sont vérifiées",
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
    moderationLink: "🛡️ كيف تتم مراجعة مساهمات المستخدمين",
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
    moderationLink: "🛡️ Come vengono revisionati i contributi degli utenti",
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
    moderationLink: "🛡️ Como são revistas as contribuições dos utilizadores",
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
    moderationLink: "🛡️ Cum sunt verificate contribuțiile utilizatorilor",
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
    moderationLink: "🛡️ Як перевіряються внески користувачів",
  },
  gl: {
    subtitle: "Como usala",
    back: "Volver",
    badge: "Gu\u00eda de uso",
    title: "Como usar esta web",
    intro: "Unha ferramenta visual e interactiva pensada para a acollida ling\u00fc\u00edstica do alumnado rec\u00e9n chegado. Aqu\u00ed explic\u00e1mosche como aproveitala ao m\u00e1ximo.",
    steps: [
      { title: "1. Escolle os idiomas", text: "Na parte superior, selecciona o idioma que queres aprender (\ud83c\udfaf Aprendo) e o idioma de axuda (\ud83c\udf0d Axuda en) que xa co\u00f1eces. As\u00ed todas as traduci\u00f3ns ad\u00e1ptanse ao teu perfil." },
      { title: "2. Escolle un nivel e un bloque", text: "Selecciona o nivel (A1 B\u00e1sico \u00b7 A2 Elemental \u00b7 B1 Intermedio) e escolle un dos bloques tem\u00e1ticos: a clase, a familia, as comidas, as vacaci\u00f3ns, as profesi\u00f3ns, os instrumentos\u2026" },
      { title: "3. Aprende coas fichas", text: "Cada bloque cont\u00e9n fichas visuais coa palabra no idioma que aprendes. Toca para ver a traduci\u00f3n e escoitar a pronuncia con voz sint\u00e9tica." },
      { title: "4. Practica co xogo", text: "Ao final de cada bloque, preme \u00abXogo\u00bb e pon a proba o que aprendiches. Ao final ver\u00e1s un resumo cos acertos e erros." },
      { title: "5. Escoita canci\u00f3ns", text: "Alg\u00fans bloques incl\u00faen canci\u00f3ns relacionadas co vocabulario, perfectas para reforzar a aprendizaxe de forma l\u00fadica." },
      { title: "6. Mira roleplays animados", text: "No nivel A2 atopar\u00e1s v\u00eddeos animados con situaci\u00f3ns coti\u00e1s (vacaci\u00f3ns, taller de tecnolox\u00eda, aula de m\u00fasica\u2026) para traballar a comprensi\u00f3n oral." },
      { title: "7. Exporta a PDF", text: "Co bot\u00f3n PDF podes descargar todas as fichas do nivel elixido para imprimilas e traballalas na aula sen conexi\u00f3n." },
    ],
    justifBadge: "Xustificaci\u00f3n pedag\u00f3xica",
    justifTitle: "Inspirado nas directrices europeas",
    p1Pre: "Esta web enm\u00e1rcase dentro do proxecto ",
    p1Mid: ", parte da iniciativa ",
    p1End: ". Tiven a oportunidade de compartir a mi\u00f1a experiencia tras levar a cabo un proxecto piloto seguindo as gu\u00edas ",
    guide1: "«New Guidelines to Help Teachers Lead Europe's Digital Education»",
    guide2: "«Guidelines for Teaching Informatics: Practical Strategies for European Classrooms»",
    p2: "Estas directrices son unha iniciativa emblem\u00e1tica do Digital Education Action Plan (2021\u20132027), que ten como obxectivo apoiar a transformaci\u00f3n dixital dos sistemas educativos en toda Europa.",
    p3: "A entrevista en li\u00f1a, organizada pola Comisi\u00f3n Europea, foi gravada e contribuir\u00e1 a un v\u00eddeo testemu\u00f1al con fins de difusi\u00f3n. S\u00edntome moi honrada e agradecida por ser seleccionada para participar e representar o traballo desenvolvido durante o proxecto piloto.",
    backHome: "Volver ao inicio",
    moderationLink: "\ud83d\udee1\ufe0f Como se revisan as achegas das persoas usuarias",
  },
  el: {
    subtitle: "\u03a0\u03ce\u03c2 \u03bd\u03b1 \u03c4\u03b7 \u03c7\u03c1\u03b7\u03c3\u03b9\u03bc\u03bf\u03c0\u03bf\u03b9\u03ae\u03c3\u03b5\u03b9\u03c2",
    back: "\u03a0\u03af\u03c3\u03c9",
    badge: "\u039f\u03b4\u03b7\u03b3\u03cc\u03c2 \u03c7\u03c1\u03ae\u03c3\u03b7\u03c2",
    title: "\u03a0\u03ce\u03c2 \u03bd\u03b1 \u03c7\u03c1\u03b7\u03c3\u03b9\u03bc\u03bf\u03c0\u03bf\u03b9\u03ae\u03c3\u03b5\u03b9\u03c2 \u03b1\u03c5\u03c4\u03cc\u03bd \u03c4\u03bf\u03bd \u03b9\u03c3\u03c4\u03cc\u03c4\u03bf\u03c0\u03bf",
    intro: "\u0388\u03bd\u03b1 \u03bf\u03c0\u03c4\u03b9\u03ba\u03cc \u03ba\u03b1\u03b9 \u03b4\u03b9\u03b1\u03b4\u03c1\u03b1\u03c3\u03c4\u03b9\u03ba\u03cc \u03b5\u03c1\u03b3\u03b1\u03bb\u03b5\u03af\u03bf \u03b3\u03b9\u03b1 \u03c4\u03b7 \u03b3\u03bb\u03c9\u03c3\u03c3\u03b9\u03ba\u03ae \u03c5\u03c0\u03bf\u03b4\u03bf\u03c7\u03ae \u03c4\u03c9\u03bd \u03bd\u03b5\u03bf\u03b1\u03c6\u03b9\u03c7\u03b8\u03ad\u03bd\u03c4\u03c9\u03bd \u03bc\u03b1\u03b8\u03b7\u03c4\u03ce\u03bd. \u0394\u03b5\u03c2 \u03c0\u03ce\u03c2 \u03bd\u03b1 \u03c4\u03bf \u03b1\u03be\u03b9\u03bf\u03c0\u03bf\u03b9\u03ae\u03c3\u03b5\u03b9\u03c2 \u03c3\u03c4\u03bf \u03ad\u03c0\u03b1\u03ba\u03c1\u03bf.",
    steps: [
      { title: "1. \u0394\u03b9\u03ac\u03bb\u03b5\u03be\u03b5 \u03c4\u03b9\u03c2 \u03b3\u03bb\u03ce\u03c3\u03c3\u03b5\u03c2", text: "\u03a3\u03c4\u03bf \u03b5\u03c0\u03ac\u03bd\u03c9 \u03bc\u03ad\u03c1\u03bf\u03c2, \u03b5\u03c0\u03af\u03bb\u03b5\u03be\u03b5 \u03c4\u03b7 \u03b3\u03bb\u03ce\u03c3\u03c3\u03b1 \u03c0\u03bf\u03c5 \u03b8\u03ad\u03bb\u03b5\u03b9\u03c2 \u03bd\u03b1 \u03bc\u03ac\u03b8\u03b5\u03b9\u03c2 (\ud83c\udfaf \u039c\u03b1\u03b8\u03b1\u03af\u03bd\u03c9) \u03ba\u03b1\u03b9 \u03c4\u03b7 \u03b3\u03bb\u03ce\u03c3\u03c3\u03b1 \u03b2\u03bf\u03ae\u03b8\u03b5\u03b9\u03b1\u03c2 (\ud83c\udf0d \u0392\u03bf\u03ae\u03b8\u03b5\u03b9\u03b1 \u03c3\u03c4\u03b1) \u03c0\u03bf\u03c5 \u03ae\u03b4\u03b7 \u03b3\u03bd\u03c9\u03c1\u03af\u03b6\u03b5\u03b9\u03c2. \u0388\u03c4\u03c3\u03b9 \u03cc\u03bb\u03b5\u03c2 \u03bf\u03b9 \u03bc\u03b5\u03c4\u03b1\u03c6\u03c1\u03ac\u03c3\u03b5\u03b9\u03c2 \u03c0\u03c1\u03bf\u03c3\u03b1\u03c1\u03bc\u03cc\u03b6\u03bf\u03bd\u03c4\u03b1\u03b9 \u03c3\u03c4\u03bf \u03c0\u03c1\u03bf\u03c6\u03af\u03bb \u03c3\u03bf\u03c5." },
      { title: "2. \u0395\u03c0\u03af\u03bb\u03b5\u03be\u03b5 \u03b5\u03c0\u03af\u03c0\u03b5\u03b4\u03bf \u03ba\u03b1\u03b9 \u03b5\u03bd\u03cc\u03c4\u03b7\u03c4\u03b1", text: "\u0395\u03c0\u03af\u03bb\u03b5\u03be\u03b5 \u03c4\u03bf \u03b5\u03c0\u03af\u03c0\u03b5\u03b4\u03bf (A1 \u0392\u03b1\u03c3\u03b9\u03ba\u03cc \u00b7 A2 \u03a3\u03c4\u03bf\u03b9\u03c7\u03b5\u03b9\u03ce\u03b4\u03b5\u03c2 \u00b7 B1 \u039c\u03ad\u03c3\u03bf) \u03ba\u03b1\u03b9 \u03bc\u03af\u03b1 \u03b1\u03c0\u03cc \u03c4\u03b9\u03c2 \u03b8\u03b5\u03bc\u03b1\u03c4\u03b9\u03ba\u03ad\u03c2 \u03b5\u03bd\u03cc\u03c4\u03b7\u03c4\u03b5\u03c2: \u03b7 \u03c4\u03ac\u03be\u03b7, \u03b7 \u03bf\u03b9\u03ba\u03bf\u03b3\u03ad\u03bd\u03b5\u03b9\u03b1, \u03c4\u03b1 \u03c6\u03b1\u03b3\u03b7\u03c4\u03ac, \u03bf\u03b9 \u03b4\u03b9\u03b1\u03ba\u03bf\u03c0\u03ad\u03c2, \u03c4\u03b1 \u03b5\u03c0\u03b1\u03b3\u03b3\u03ad\u03bb\u03bc\u03b1\u03c4\u03b1, \u03c4\u03b1 \u03cc\u03c1\u03b3\u03b1\u03bd\u03b1\u2026" },
      { title: "3. \u039c\u03ac\u03b8\u03b5 \u03bc\u03b5 \u03c4\u03b9\u03c2 \u03ba\u03ac\u03c1\u03c4\u03b5\u03c2", text: "\u039a\u03ac\u03b8\u03b5 \u03b5\u03bd\u03cc\u03c4\u03b7\u03c4\u03b1 \u03c0\u03b5\u03c1\u03b9\u03ad\u03c7\u03b5\u03b9 \u03bf\u03c0\u03c4\u03b9\u03ba\u03ad\u03c2 \u03ba\u03ac\u03c1\u03c4\u03b5\u03c2 \u03bc\u03b5 \u03c4\u03b7 \u03bb\u03ad\u03be\u03b7 \u03c3\u03c4\u03b7 \u03b3\u03bb\u03ce\u03c3\u03c3\u03b1 \u03c0\u03bf\u03c5 \u03bc\u03b1\u03b8\u03b1\u03af\u03bd\u03b5\u03b9\u03c2. \u0386\u03b3\u03b3\u03b9\u03be\u03b5 \u03b3\u03b9\u03b1 \u03bd\u03b1 \u03b4\u03b5\u03b9\u03c2 \u03c4\u03b7 \u03bc\u03b5\u03c4\u03ac\u03c6\u03c1\u03b1\u03c3\u03b7 \u03ba\u03b1\u03b9 \u03bd\u03b1 \u03b1\u03ba\u03bf\u03cd\u03c3\u03b5\u03b9\u03c2 \u03c4\u03b7\u03bd \u03c0\u03c1\u03bf\u03c6\u03bf\u03c1\u03ac \u03bc\u03b5 \u03c3\u03c5\u03bd\u03b8\u03b5\u03c4\u03b9\u03ba\u03ae \u03c6\u03c9\u03bd\u03ae." },
      { title: "4. \u0395\u03be\u03b1\u03c3\u03ba\u03ae\u03c3\u03bf\u03c5 \u03bc\u03b5 \u03c4\u03bf \u03c0\u03b1\u03b9\u03c7\u03bd\u03af\u03b4\u03b9", text: "\u03a3\u03c4\u03bf \u03c4\u03ad\u03bb\u03bf\u03c2 \u03ba\u03ac\u03b8\u03b5 \u03b5\u03bd\u03cc\u03c4\u03b7\u03c4\u03b1\u03c2, \u03c0\u03ac\u03c4\u03b7\u03c3\u03b5 \u00ab\u03a0\u03b1\u03b9\u03c7\u03bd\u03af\u03b4\u03b9\u00bb \u03ba\u03b1\u03b9 \u03b4\u03bf\u03ba\u03af\u03bc\u03b1\u03c3\u03b5 \u03cc\u03c3\u03b1 \u03ad\u03bc\u03b1\u03b8\u03b5\u03c2. \u03a3\u03c4\u03bf \u03c4\u03ad\u03bb\u03bf\u03c2 \u03b8\u03b1 \u03b4\u03b5\u03b9\u03c2 \u03c3\u03cd\u03bd\u03bf\u03c8\u03b7 \u03bc\u03b5 \u03c3\u03c9\u03c3\u03c4\u03ad\u03c2 \u03ba\u03b1\u03b9 \u03bb\u03ac\u03b8\u03bf\u03c2 \u03b1\u03c0\u03b1\u03bd\u03c4\u03ae\u03c3\u03b5\u03b9\u03c2." },
      { title: "5. \u0386\u03ba\u03bf\u03c5 \u03c4\u03c1\u03b1\u03b3\u03bf\u03cd\u03b4\u03b9\u03b1", text: "\u039a\u03ac\u03c0\u03bf\u03b9\u03b5\u03c2 \u03b5\u03bd\u03cc\u03c4\u03b7\u03c4\u03b5\u03c2 \u03c0\u03b5\u03c1\u03b9\u03bb\u03b1\u03bc\u03b2\u03ac\u03bd\u03bf\u03c5\u03bd \u03c4\u03c1\u03b1\u03b3\u03bf\u03cd\u03b4\u03b9\u03b1 \u03c3\u03c7\u03b5\u03c4\u03b9\u03ba\u03ac \u03bc\u03b5 \u03c4\u03bf \u03bb\u03b5\u03be\u03b9\u03bb\u03cc\u03b3\u03b9\u03bf, \u03b9\u03b4\u03b1\u03bd\u03b9\u03ba\u03ac \u03b3\u03b9\u03b1 \u03b4\u03b9\u03b1\u03c3\u03ba\u03b5\u03b4\u03b1\u03c3\u03c4\u03b9\u03ba\u03ae \u03b5\u03bc\u03c0\u03ad\u03b4\u03c9\u03c3\u03b7." },
      { title: "6. \u0394\u03b5\u03c2 \u03ba\u03b9\u03bd\u03bf\u03cd\u03bc\u03b5\u03bd\u03b1 \u03c3\u03b5\u03bd\u03ac\u03c1\u03b9\u03b1", text: "\u03a3\u03c4\u03bf \u03b5\u03c0\u03af\u03c0\u03b5\u03b4\u03bf A2 \u03b8\u03b1 \u03b2\u03c1\u03b5\u03b9\u03c2 \u03ba\u03b9\u03bd\u03bf\u03cd\u03bc\u03b5\u03bd\u03b1 \u03b2\u03af\u03bd\u03c4\u03b5\u03bf \u03bc\u03b5 \u03ba\u03b1\u03b8\u03b7\u03bc\u03b5\u03c1\u03b9\u03bd\u03ad\u03c2 \u03ba\u03b1\u03c4\u03b1\u03c3\u03c4\u03ac\u03c3\u03b5\u03b9\u03c2 (\u03b4\u03b9\u03b1\u03ba\u03bf\u03c0\u03ad\u03c2, \u03b5\u03c1\u03b3\u03b1\u03c3\u03c4\u03ae\u03c1\u03b9\u03bf \u03c4\u03b5\u03c7\u03bd\u03bf\u03bb\u03bf\u03b3\u03af\u03b1\u03c2, \u03b1\u03af\u03b8\u03bf\u03c5\u03c3\u03b1 \u03bc\u03bf\u03c5\u03c3\u03b9\u03ba\u03ae\u03c2\u2026) \u03b3\u03b9\u03b1 \u03b5\u03be\u03ac\u03c3\u03ba\u03b7\u03c3\u03b7 \u03c3\u03c4\u03b7\u03bd \u03ba\u03b1\u03c4\u03b1\u03bd\u03cc\u03b7\u03c3\u03b7 \u03c0\u03c1\u03bf\u03c6\u03bf\u03c1\u03b9\u03ba\u03bf\u03cd \u03bb\u03cc\u03b3\u03bf\u03c5." },
      { title: "7. \u0395\u03be\u03b1\u03b3\u03c9\u03b3\u03ae \u03c3\u03b5 PDF", text: "\u039c\u03b5 \u03c4\u03bf \u03ba\u03bf\u03c5\u03bc\u03c0\u03af PDF \u03bc\u03c0\u03bf\u03c1\u03b5\u03af\u03c2 \u03bd\u03b1 \u03ba\u03b1\u03c4\u03b5\u03b2\u03ac\u03c3\u03b5\u03b9\u03c2 \u03cc\u03bb\u03b5\u03c2 \u03c4\u03b9\u03c2 \u03ba\u03ac\u03c1\u03c4\u03b5\u03c2 \u03c4\u03bf\u03c5 \u03b5\u03c0\u03b9\u03c0\u03ad\u03b4\u03bf\u03c5 \u03b3\u03b9\u03b1 \u03b5\u03ba\u03c4\u03cd\u03c0\u03c9\u03c3\u03b7 \u03ba\u03b1\u03b9 \u03c7\u03c1\u03ae\u03c3\u03b7 \u03c3\u03c4\u03b7\u03bd \u03c4\u03ac\u03be\u03b7 \u03c7\u03c9\u03c1\u03af\u03c2 \u03c3\u03cd\u03bd\u03b4\u03b5\u03c3\u03b7." },
    ],
    justifBadge: "\u03a0\u03b1\u03b9\u03b4\u03b1\u03b3\u03c9\u03b3\u03b9\u03ba\u03ae \u03c4\u03b5\u03ba\u03bc\u03b7\u03c1\u03af\u03c9\u03c3\u03b7",
    justifTitle: "\u0395\u03bc\u03c0\u03bd\u03b5\u03c5\u03c3\u03bc\u03ad\u03bd\u03bf \u03b1\u03c0\u03cc \u03c4\u03b9\u03c2 \u03b5\u03c5\u03c1\u03c9\u03c0\u03b1\u03ca\u03ba\u03ad\u03c2 \u03ba\u03b1\u03c4\u03b5\u03c5\u03b8\u03c5\u03bd\u03c4\u03ae\u03c1\u03b9\u03b5\u03c2 \u03b3\u03c1\u03b1\u03bc\u03bc\u03ad\u03c2",
    p1Pre: "\u0391\u03c5\u03c4\u03cc\u03c2 \u03bf \u03b9\u03c3\u03c4\u03cc\u03c4\u03bf\u03c0\u03bf\u03c2 \u03b5\u03bd\u03c4\u03ac\u03c3\u03c3\u03b5\u03c4\u03b1\u03b9 \u03c3\u03c4\u03bf \u03ad\u03c1\u03b3\u03bf ",
    p1Mid: ", \u03bc\u03ad\u03c1\u03bf\u03c2 \u03c4\u03b7\u03c2 \u03c0\u03c1\u03c9\u03c4\u03bf\u03b2\u03bf\u03c5\u03bb\u03af\u03b1\u03c2 ",
    p1End: ". \u0395\u03af\u03c7\u03b1 \u03c4\u03b7\u03bd \u03b5\u03c5\u03ba\u03b1\u03b9\u03c1\u03af\u03b1 \u03bd\u03b1 \u03bc\u03bf\u03b9\u03c1\u03b1\u03c3\u03c4\u03ce \u03c4\u03b7\u03bd \u03b5\u03bc\u03c0\u03b5\u03b9\u03c1\u03af\u03b1 \u03bc\u03bf\u03c5 \u03bc\u03b5\u03c4\u03ac \u03c4\u03b7\u03bd \u03c5\u03bb\u03bf\u03c0\u03bf\u03af\u03b7\u03c3\u03b7 \u03b5\u03bd\u03cc\u03c2 \u03c0\u03b9\u03bb\u03bf\u03c4\u03b9\u03ba\u03bf\u03cd \u03ad\u03c1\u03b3\u03bf\u03c5 \u03bc\u03b5 \u03b2\u03ac\u03c3\u03b7 \u03c4\u03bf\u03c5\u03c2 \u03bf\u03b4\u03b7\u03b3\u03bf\u03cd\u03c2 ",
    guide1: "«New Guidelines to Help Teachers Lead Europe's Digital Education»",
    guide2: "«Guidelines for Teaching Informatics: Practical Strategies for European Classrooms»",
    p2: "\u0391\u03c5\u03c4\u03ad\u03c2 \u03bf\u03b9 \u03ba\u03b1\u03c4\u03b5\u03c5\u03b8\u03c5\u03bd\u03c4\u03ae\u03c1\u03b9\u03b5\u03c2 \u03b3\u03c1\u03b1\u03bc\u03bc\u03ad\u03c2 \u03b1\u03c0\u03bf\u03c4\u03b5\u03bb\u03bf\u03cd\u03bd \u03b5\u03bc\u03b2\u03bb\u03b7\u03bc\u03b1\u03c4\u03b9\u03ba\u03ae \u03c0\u03c1\u03c9\u03c4\u03bf\u03b2\u03bf\u03c5\u03bb\u03af\u03b1 \u03c4\u03bf\u03c5 Digital Education Action Plan (2021\u20132027), \u03c0\u03bf\u03c5 \u03c3\u03c4\u03b7\u03c1\u03af\u03b6\u03b5\u03b9 \u03c4\u03bf\u03bd \u03c8\u03b7\u03c6\u03b9\u03b1\u03ba\u03cc \u03bc\u03b5\u03c4\u03b1\u03c3\u03c7\u03b7\u03bc\u03b1\u03c4\u03b9\u03c3\u03bc\u03cc \u03c4\u03c9\u03bd \u03b5\u03ba\u03c0\u03b1\u03b9\u03b4\u03b5\u03c5\u03c4\u03b9\u03ba\u03ce\u03bd \u03c3\u03c5\u03c3\u03c4\u03b7\u03bc\u03ac\u03c4\u03c9\u03bd \u03c3\u03c4\u03b7\u03bd \u0395\u03c5\u03c1\u03ce\u03c0\u03b7.",
    p3: "\u0397 \u03b4\u03b9\u03b1\u03b4\u03b9\u03ba\u03c4\u03c5\u03b1\u03ba\u03ae \u03c3\u03c5\u03bd\u03ad\u03bd\u03c4\u03b5\u03c5\u03be\u03b7, \u03c0\u03bf\u03c5 \u03b4\u03b9\u03bf\u03c1\u03b3\u03ac\u03bd\u03c9\u03c3\u03b5 \u03b7 \u0395\u03c5\u03c1\u03c9\u03c0\u03b1\u03ca\u03ba\u03ae \u0395\u03c0\u03b9\u03c4\u03c1\u03bf\u03c0\u03ae, \u03ba\u03b1\u03c4\u03b1\u03b3\u03c1\u03ac\u03c6\u03b7\u03ba\u03b5 \u03ba\u03b1\u03b9 \u03b8\u03b1 \u03c3\u03c5\u03bc\u03b2\u03ac\u03bb\u03b5\u03b9 \u03c3\u03b5 \u03b2\u03af\u03bd\u03c4\u03b5\u03bf \u03bc\u03b1\u03c1\u03c4\u03c5\u03c1\u03af\u03b1\u03c2 \u03b3\u03b9\u03b1 \u03c3\u03ba\u03bf\u03c0\u03bf\u03cd\u03c2 \u03b4\u03b9\u03ac\u03b4\u03bf\u03c3\u03b7\u03c2. \u039d\u03b9\u03ce\u03b8\u03c9 \u03c4\u03b9\u03bc\u03ae \u03ba\u03b1\u03b9 \u03b5\u03c5\u03b3\u03bd\u03c9\u03bc\u03bf\u03c3\u03cd\u03bd\u03b7 \u03c0\u03bf\u03c5 \u03b5\u03c0\u03b9\u03bb\u03ad\u03c7\u03b8\u03b7\u03ba\u03b1 \u03bd\u03b1 \u03c3\u03c5\u03bc\u03bc\u03b5\u03c4\u03ac\u03c3\u03c7\u03c9 \u03ba\u03b1\u03b9 \u03bd\u03b1 \u03b5\u03ba\u03c0\u03c1\u03bf\u03c3\u03c9\u03c0\u03ae\u03c3\u03c9 \u03c4\u03b7 \u03b4\u03bf\u03c5\u03bb\u03b5\u03b9\u03ac \u03c4\u03bf\u03c5 \u03c0\u03b9\u03bb\u03bf\u03c4\u03b9\u03ba\u03bf\u03cd \u03ad\u03c1\u03b3\u03bf\u03c5.",
    backHome: "\u0395\u03c0\u03b9\u03c3\u03c4\u03c1\u03bf\u03c6\u03ae \u03c3\u03c4\u03b7\u03bd \u03b1\u03c1\u03c7\u03b9\u03ba\u03ae",
    moderationLink: "\ud83d\udee1\ufe0f \u03a0\u03ce\u03c2 \u03b5\u03bb\u03ad\u03b3\u03c7\u03bf\u03bd\u03c4\u03b1\u03b9 \u03bf\u03b9 \u03c3\u03c5\u03bd\u03b5\u03b9\u03c3\u03c6\u03bf\u03c1\u03ad\u03c2 \u03c4\u03c9\u03bd \u03c7\u03c1\u03b7\u03c3\u03c4\u03ce\u03bd",
  },
  ur: {
    subtitle: "\u0627\u0633\u06d2 \u06a9\u06cc\u0633\u06d2 \u0627\u0633\u062a\u0639\u0645\u0627\u0644 \u06a9\u0631\u06cc\u06ba",
    back: "\u0648\u0627\u067e\u0633",
    badge: "\u0627\u0633\u062a\u0639\u0645\u0627\u0644 \u06a9\u06cc \u0631\u06c1\u0646\u0645\u0627\u0626\u06cc",
    title: "\u0627\u0633 \u0648\u06cc\u0628 \u0633\u0627\u0626\u0679 \u06a9\u0648 \u06a9\u06cc\u0633\u06d2 \u0627\u0633\u062a\u0639\u0645\u0627\u0644 \u06a9\u0631\u06cc\u06ba",
    intro: "\u0646\u0626\u06d2 \u0622\u0646\u06d2 \u0648\u0627\u0644\u06d2 \u0637\u0644\u0628\u06c1 \u06a9\u06cc \u0644\u0633\u0627\u0646\u06cc \u062e\u0648\u0634 \u0622\u0645\u062f\u06cc\u062f \u06a9\u06d2 \u0644\u06cc\u06d2 \u0627\u06cc\u06a9 \u0628\u0635\u0631\u06cc \u0627\u0648\u0631 \u0627\u0646\u0679\u0631\u0627\u06cc\u06a9\u0679\u0648 \u0679\u0648\u0644\u06d4 \u06cc\u06c1\u0627\u06ba \u0628\u062a\u0627\u06cc\u0627 \u06af\u06cc\u0627 \u06c1\u06d2 \u06a9\u06c1 \u0627\u0633 \u0633\u06d2 \u0628\u06be\u0631\u067e\u0648\u0631 \u0641\u0627\u0626\u062f\u06c1 \u06a9\u06cc\u0633\u06d2 \u0627\u0679\u06be\u0627\u06cc\u0627 \u062c\u0627\u0626\u06d2\u06d4",
    steps: [
      { title: "1. \u0632\u0628\u0627\u0646\u06cc\u06ba \u0645\u0646\u062a\u062e\u0628 \u06a9\u0631\u06cc\u06ba", text: "\u0627\u0648\u067e\u0631\u060c \u0648\u06c1 \u0632\u0628\u0627\u0646 \u0645\u0646\u062a\u062e\u0628 \u06a9\u0631\u06cc\u06ba \u062c\u0648 \u0622\u067e \u0633\u06cc\u06a9\u06be\u0646\u0627 \u0686\u0627\u06c1\u062a\u06d2 \u06c1\u06cc\u06ba (\ud83c\udfaf \u0645\u06cc\u06ba \u0633\u06cc\u06a9\u06be \u0631\u06c1\u0627 \u06c1\u0648\u06ba) \u0627\u0648\u0631 \u0645\u062f\u062f \u06a9\u06cc \u0632\u0628\u0627\u0646 (\ud83c\udf0d \u0645\u062f\u062f \u0628\u0630\u0631\u06cc\u0639\u06c1) \u062c\u0648 \u0622\u067e \u067e\u06c1\u0644\u06d2 \u0633\u06d2 \u062c\u0627\u0646\u062a\u06d2 \u06c1\u06cc\u06ba\u06d4" },
      { title: "2. \u0633\u0637\u062d \u0627\u0648\u0631 \u0628\u0644\u0627\u06a9 \u0686\u0646\u06cc\u06ba", text: "\u0633\u0637\u062d \u0645\u0646\u062a\u062e\u0628 \u06a9\u0631\u06cc\u06ba (A1 \u0628\u0646\u06cc\u0627\u062f\u06cc \u00b7 A2 \u0627\u0628\u062a\u062f\u0627\u0626\u06cc \u00b7 B1 \u062f\u0631\u0645\u06cc\u0627\u0646\u06cc) \u0627\u0648\u0631 \u06a9\u0648\u0626\u06cc \u0645\u0648\u0636\u0648\u0639\u0627\u062a\u06cc \u0628\u0644\u0627\u06a9 \u0686\u0646\u06cc\u06ba: \u06a9\u0644\u0627\u0633\u060c \u062e\u0627\u0646\u062f\u0627\u0646\u060c \u06a9\u06be\u0627\u0646\u06d2\u060c \u0686\u06be\u0679\u06cc\u0627\u06ba\u060c \u067e\u06cc\u0634\u06d2\u060c \u0622\u0644\u0627\u062a\u2026" },
      { title: "3. \u06a9\u0627\u0631\u0688\u0632 \u0633\u06d2 \u0633\u06cc\u06a9\u06be\u06cc\u06ba", text: "\u06c1\u0631 \u0628\u0644\u0627\u06a9 \u0645\u06cc\u06ba \u062a\u0635\u0648\u06cc\u0631\u06cc \u06a9\u0627\u0631\u0688 \u06c1\u0648\u062a\u06d2 \u06c1\u06cc\u06ba\u06d4 \u062a\u0631\u062c\u0645\u06c1 \u062f\u06cc\u06a9\u06be\u0646\u06d2 \u0627\u0648\u0631 \u062a\u0644\u0641\u0638 \u0633\u0646\u0646\u06d2 \u06a9\u06d2 \u0644\u06cc\u06d2 \u0686\u06be\u0648\u0626\u06cc\u06ba\u06d4" },
      { title: "4. \u06a9\u06be\u06cc\u0644 \u0633\u06d2 \u0645\u0634\u0642 \u06a9\u0631\u06cc\u06ba", text: "\u06c1\u0631 \u0628\u0644\u0627\u06a9 \u06a9\u06d2 \u0622\u062e\u0631 \u0645\u06cc\u06ba \u00ab\u06a9\u06be\u06cc\u0644\u00bb \u062f\u0628\u0627\u0626\u06cc\u06ba \u0627\u0648\u0631 \u062c\u0648 \u0633\u06cc\u06a9\u06be\u0627 \u06c1\u06d2 \u0627\u0633\u06d2 \u0622\u0632\u0645\u0627\u0626\u06cc\u06ba\u06d4 \u0622\u062e\u0631 \u0645\u06cc\u06ba \u062f\u0631\u0633\u062a \u0627\u0648\u0631 \u063a\u0644\u0637 \u062c\u0648\u0627\u0628\u0627\u062a \u06a9\u0627 \u062e\u0644\u0627\u0635\u06c1 \u0645\u0644\u06d2 \u06af\u0627\u06d4" },
      { title: "5. \u06af\u0627\u0646\u06d2 \u0633\u0646\u06cc\u06ba", text: "\u06a9\u0686\u06be \u0628\u0644\u0627\u06a9\u0633 \u0645\u06cc\u06ba \u0627\u0644\u0641\u0627\u0638 \u0633\u06d2 \u0645\u062a\u0639\u0644\u0642 \u06af\u0627\u0646\u06d2 \u0634\u0627\u0645\u0644 \u06c1\u06cc\u06ba \u062c\u0648 \u0633\u06cc\u06a9\u06be\u0646\u06d2 \u06a9\u0648 \u062f\u0644\u0686\u0633\u067e \u0628\u0646\u0627\u062a\u06d2 \u06c1\u06cc\u06ba\u06d4" },
      { title: "6. \u0645\u062a\u062d\u0631\u06a9 \u0631\u0648\u0644 \u067e\u0644\u06d2 \u062f\u06cc\u06a9\u06be\u06cc\u06ba", text: "A2 \u0633\u0637\u062d \u067e\u0631 \u0631\u0648\u0632\u0645\u0631\u06c1 \u06a9\u06d2 \u0645\u0646\u0627\u0638\u0631 \u06a9\u06cc \u0627\u06cc\u0646\u06cc\u0645\u06cc\u0679\u0688 \u0648\u06cc\u0688\u06cc\u0648\u0632 \u0645\u0644\u06cc\u06ba \u06af\u06cc \u062a\u0627\u06a9\u06c1 \u0633\u0646\u0646\u06d2 \u06a9\u06cc \u0645\u06c1\u0627\u0631\u062a \u0628\u06c1\u062a\u0631 \u06c1\u0648\u06d4" },
      { title: "7. PDF \u0645\u06cc\u06ba \u0645\u062d\u0641\u0648\u0638 \u06a9\u0631\u06cc\u06ba", text: "PDF \u0628\u0679\u0646 \u0633\u06d2 \u0645\u0646\u062a\u062e\u0628 \u0633\u0637\u062d \u06a9\u06d2 \u062a\u0645\u0627\u0645 \u06a9\u0627\u0631\u0688 \u0688\u0627\u0624\u0646 \u0644\u0648\u0688 \u06a9\u0631 \u06a9\u06d2 \u067e\u0631\u0646\u0679 \u06a9\u06cc\u06d2 \u062c\u0627 \u0633\u06a9\u062a\u06d2 \u06c1\u06cc\u06ba\u06d4" },
    ],
    justifBadge: "\u062a\u062f\u0631\u06cc\u0633\u06cc \u062c\u0648\u0627\u0632",
    justifTitle: "\u06cc\u0648\u0631\u067e\u06cc \u0631\u06c1\u0646\u0645\u0627 \u0627\u0635\u0648\u0644\u0648\u06ba \u0633\u06d2 \u0645\u062a\u0627\u062b\u0631",
    p1Pre: "\u06cc\u06c1 \u0648\u06cc\u0628 \u0633\u0627\u0626\u0679 \u0645\u0646\u0635\u0648\u0628\u06d2 ",
    p1Mid: " \u06a9\u0627 \u062d\u0635\u06c1 \u06c1\u06d2\u060c \u062c\u0648 \u0627\u0642\u062f\u0627\u0645 ",
    p1End: " \u06a9\u06d2 \u062a\u062d\u062a \u06c1\u06d2\u06d4 \u0645\u062c\u06be\u06d2 \u0627\u06cc\u06a9 \u067e\u0627\u0626\u0644\u0679 \u0645\u0646\u0635\u0648\u0628\u06d2 \u06a9\u06d2 \u0628\u0639\u062f \u0627\u067e\u0646\u0627 \u062a\u062c\u0631\u0628\u06c1 \u0634\u06cc\u0626\u0631 \u06a9\u0631\u0646\u06d2 \u06a9\u0627 \u0645\u0648\u0642\u0639 \u0645\u0644\u0627\u060c \u062c\u0648 \u0627\u0646 \u0631\u06c1\u0646\u0645\u0627 \u06a9\u062a\u0627\u0628\u0686\u0648\u06ba \u067e\u0631 \u0645\u0628\u0646\u06cc \u062a\u06be\u0627 ",
    guide1: "«New Guidelines to Help Teachers Lead Europe's Digital Education»",
    guide2: "«Guidelines for Teaching Informatics: Practical Strategies for European Classrooms»",
    p2: "\u06cc\u06c1 \u0631\u06c1\u0646\u0645\u0627 \u0627\u0635\u0648\u0644 Digital Education Action Plan (2021\u20132027) \u06a9\u06cc \u0646\u0645\u0627\u06cc\u0627\u06ba \u067e\u06cc\u0634 \u0631\u0641\u062a \u06c1\u06cc\u06ba\u060c \u062c\u0633 \u06a9\u0627 \u0645\u0642\u0635\u062f \u067e\u0648\u0631\u06d2 \u06cc\u0648\u0631\u067e \u0645\u06cc\u06ba \u062a\u0639\u0644\u06cc\u0645\u06cc \u0646\u0638\u0627\u0645\u0648\u06ba \u06a9\u06cc \u0688\u06cc\u062c\u06cc\u0679\u0644 \u062a\u0628\u062f\u06cc\u0644\u06cc \u0645\u06cc\u06ba \u0645\u062f\u062f \u062f\u06cc\u0646\u0627 \u06c1\u06d2\u06d4",
    p3: "\u06cc\u0648\u0631\u067e\u06cc \u06a9\u0645\u06cc\u0634\u0646 \u06a9\u06cc \u062c\u0627\u0646\u0628 \u0633\u06d2 \u0645\u0646\u0639\u0642\u062f\u06c1 \u0622\u0646 \u0644\u0627\u0626\u0646 \u0627\u0646\u0679\u0631\u0648\u06cc\u0648 \u0631\u06cc\u06a9\u0627\u0631\u0688 \u06a9\u06cc\u0627 \u06af\u06cc\u0627 \u0627\u0648\u0631 \u0627\u0633\u06d2 \u062a\u0634\u06c1\u06cc\u0631\u06cc \u0648\u06cc\u0688\u06cc\u0648 \u0645\u06cc\u06ba \u0634\u0627\u0645\u0644 \u06a9\u06cc\u0627 \u062c\u0627\u0626\u06d2 \u06af\u0627\u06d4 \u0645\u062c\u06be\u06d2 \u0645\u0646\u062a\u062e\u0628 \u06c1\u0648\u0646\u06d2 \u067e\u0631 \u0641\u062e\u0631 \u0627\u0648\u0631 \u0634\u06a9\u0631\u06af\u0632\u0627\u0631\u06cc \u06c1\u06d2\u06d4",
    backHome: "\u06c1\u0648\u0645 \u067e\u06cc\u062c \u067e\u0631 \u0648\u0627\u067e\u0633",
    moderationLink: "\ud83d\udee1\ufe0f \u0635\u0627\u0631\u0641\u06cc\u0646 \u06a9\u06cc \u0634\u0631\u0627\u06a9\u062a\u0648\u06ba \u06a9\u0627 \u062c\u0627\u0626\u0632\u06c1 \u06a9\u06cc\u0633\u06d2 \u0644\u06cc\u0627 \u062c\u0627\u062a\u0627 \u06c1\u06d2",
  },
  zh: {
    subtitle: "\u4f7f\u7528\u65b9\u6cd5",
    back: "\u8fd4\u56de",
    badge: "\u4f7f\u7528\u6307\u5357",
    title: "\u5982\u4f55\u4f7f\u7528\u672c\u7f51\u7ad9",
    intro: "\u8fd9\u662f\u4e00\u4e2a\u4e3a\u65b0\u5230\u5b66\u751f\u7684\u8bed\u8a00\u878d\u5165\u800c\u8bbe\u8ba1\u7684\u53ef\u89c6\u5316\u4e92\u52a8\u5de5\u5177\u3002\u4e0b\u9762\u544a\u8bc9\u4f60\u5982\u4f55\u5145\u5206\u5229\u7528\u5b83\u3002",
    steps: [
      { title: "1. \u9009\u62e9\u8bed\u8a00", text: "\u5728\u9876\u90e8\u9009\u62e9\u4f60\u60f3\u5b66\u4e60\u7684\u8bed\u8a00\uff08\ud83c\udfaf \u6211\u5728\u5b66\uff09\u548c\u4f60\u5df2\u638c\u63e1\u7684\u5e2e\u52a9\u8bed\u8a00\uff08\ud83c\udf0d \u5e2e\u52a9\u8bed\u8a00\uff09\u3002\u6240\u6709\u7ffb\u8bd1\u90fd\u4f1a\u968f\u4e4b\u8c03\u6574\u3002" },
      { title: "2. \u9009\u62e9\u7ea7\u522b\u548c\u4e3b\u9898", text: "\u9009\u62e9\u7ea7\u522b\uff08A1 \u57fa\u7840 \u00b7 A2 \u521d\u7ea7 \u00b7 B1 \u4e2d\u7ea7\uff09\uff0c\u518d\u9009\u4e00\u4e2a\u4e3b\u9898\u6a21\u5757\uff1a\u8bfe\u5802\u3001\u5bb6\u5ead\u3001\u996e\u98df\u3001\u5047\u671f\u3001\u804c\u4e1a\u3001\u4e50\u5668\u2026\u2026" },
      { title: "3. \u7528\u5361\u7247\u5b66\u4e60", text: "\u6bcf\u4e2a\u6a21\u5757\u90fd\u6709\u56fe\u6587\u5361\u7247\u3002\u70b9\u51fb\u5373\u53ef\u67e5\u770b\u7ffb\u8bd1\u5e76\u7528\u5408\u6210\u8bed\u97f3\u542c\u53d1\u97f3\u3002" },
      { title: "4. \u901a\u8fc7\u6e38\u620f\u7ec3\u4e60", text: "\u5728\u6bcf\u4e2a\u6a21\u5757\u672b\u5c3e\u70b9\u51fb\u201c\u6e38\u620f\u201d\u68c0\u9a8c\u6240\u5b66\u3002\u6700\u540e\u4f1a\u663e\u793a\u6b63\u786e\u4e0e\u9519\u8bef\u7684\u6c47\u603b\u3002" },
      { title: "5. \u542c\u6b4c\u66f2", text: "\u90e8\u5206\u6a21\u5757\u5305\u542b\u4e0e\u8bcd\u6c47\u76f8\u5173\u7684\u6b4c\u66f2\uff0c\u5bd3\u6559\u4e8e\u4e50\u3002" },
      { title: "6. \u89c2\u770b\u52a8\u753b\u60c5\u666f\u5267", text: "\u5728 A2 \u7ea7\u522b\u53ef\u4ee5\u770b\u5230\u65e5\u5e38\u60c5\u666f\u7684\u52a8\u753b\u89c6\u9891\uff08\u5047\u671f\u3001\u6280\u672f\u5de5\u574a\u3001\u97f3\u4e50\u6559\u5ba4\u2026\u2026\uff09\uff0c\u7528\u4e8e\u8bad\u7ec3\u542c\u529b\u3002" },
      { title: "7. \u5bfc\u51fa PDF", text: "\u70b9\u51fb PDF \u6309\u94ae\u53ef\u4e0b\u8f7d\u6240\u9009\u7ea7\u522b\u7684\u5168\u90e8\u5361\u7247\uff0c\u6253\u5370\u540e\u79bb\u7ebf\u5728\u8bfe\u5802\u4f7f\u7528\u3002" },
    ],
    justifBadge: "\u6559\u5b66\u4f9d\u636e",
    justifTitle: "\u53d7\u6b27\u6d32\u6307\u5bfc\u65b9\u9488\u542f\u53d1",
    p1Pre: "\u672c\u7f51\u7ad9\u5c5e\u4e8e\u9879\u76ee ",
    p1Mid: "\uff0c\u96b6\u5c5e\u4e8e ",
    p1End: " \u8ba1\u5212\u3002\u6211\u5728\u4f9d\u636e\u4ee5\u4e0b\u6307\u5357\u5f00\u5c55\u8bd5\u70b9\u9879\u76ee\u540e\uff0c\u6709\u673a\u4f1a\u5206\u4eab\u6211\u7684\u7ecf\u9a8c ",
    guide1: "«New Guidelines to Help Teachers Lead Europe's Digital Education»",
    guide2: "«Guidelines for Teaching Informatics: Practical Strategies for European Classrooms»",
    p2: "\u8fd9\u4e9b\u6307\u5bfc\u65b9\u9488\u662f Digital Education Action Plan\uff082021\u20132027\uff09\u7684\u65d7\u8230\u4e3e\u63aa\uff0c\u65e8\u5728\u652f\u6301\u5168\u6b27\u6d32\u6559\u80b2\u4f53\u7cfb\u7684\u6570\u5b57\u5316\u8f6c\u578b\u3002",
    p3: "\u7531\u6b27\u76df\u59d4\u5458\u4f1a\u7ec4\u7ec7\u7684\u7ebf\u4e0a\u8bbf\u8c08\u5df2\u5f55\u5236\uff0c\u5e76\u5c06\u7528\u4e8e\u4f20\u64ad\u7528\u9014\u7684\u8bc1\u8a00\u89c6\u9891\u3002\u80fd\u591f\u5165\u9009\u53c2\u4e0e\u5e76\u5c55\u793a\u8bd5\u70b9\u9879\u76ee\u7684\u6210\u679c\uff0c\u6211\u6df1\u611f\u8363\u5e78\u4e0e\u611f\u6fc0\u3002",
    backHome: "\u8fd4\u56de\u9996\u9875",
    moderationLink: "\ud83d\udee1\ufe0f \u5982\u4f55\u5ba1\u6838\u7528\u6237\u7684\u8d21\u732e",
  },
  hi: {
    subtitle: "\u0907\u0938\u0915\u093e \u0909\u092a\u092f\u094b\u0917 \u0915\u0948\u0938\u0947 \u0915\u0930\u0947\u0902",
    back: "\u0935\u093e\u092a\u0938",
    badge: "\u0909\u092a\u092f\u094b\u0917 \u0917\u093e\u0907\u0921",
    title: "\u0907\u0938 \u0935\u0947\u092c\u0938\u093e\u0907\u091f \u0915\u093e \u0909\u092a\u092f\u094b\u0917 \u0915\u0948\u0938\u0947 \u0915\u0930\u0947\u0902",
    intro: "\u0928\u090f \u0906\u090f \u0935\u093f\u0926\u094d\u092f\u093e\u0930\u094d\u0925\u093f\u092f\u094b\u0902 \u0915\u0947 \u092d\u093e\u0937\u093e\u0908 \u0938\u094d\u0935\u093e\u0917\u0924 \u0915\u0947 \u0932\u093f\u090f \u092c\u0928\u093e\u092f\u093e \u0917\u092f\u093e \u090f\u0915 \u0926\u0943\u0936\u094d\u092f \u0914\u0930 \u0907\u0902\u091f\u0930\u0948\u0915\u094d\u091f\u093f\u0935 \u0909\u092a\u0915\u0930\u0923\u0964 \u092f\u0939\u093e\u0901 \u092c\u0924\u093e\u092f\u093e \u0917\u092f\u093e \u0939\u0948 \u0915\u093f \u0907\u0938\u0915\u093e \u092a\u0942\u0930\u093e \u0932\u093e\u092d \u0915\u0948\u0938\u0947 \u0909\u0920\u093e\u090f\u0901\u0964",
    steps: [
      { title: "1. \u092d\u093e\u0937\u093e\u090f\u0901 \u091a\u0941\u0928\u0947\u0902", text: "\u090a\u092a\u0930, \u0935\u0939 \u092d\u093e\u0937\u093e \u091a\u0941\u0928\u0947\u0902 \u091c\u094b \u0906\u092a \u0938\u0940\u0916\u0928\u093e \u091a\u093e\u0939\u0924\u0947 \u0939\u0948\u0902 (\ud83c\udfaf \u092e\u0948\u0902 \u0938\u0940\u0916 \u0930\u0939\u093e/\u0930\u0939\u0940 \u0939\u0942\u0901) \u0914\u0930 \u0938\u0939\u093e\u092f\u0924\u093e \u092d\u093e\u0937\u093e (\ud83c\udf0d \u0938\u0939\u093e\u092f\u0924\u093e \u092d\u093e\u0937\u093e) \u091c\u094b \u0906\u092a \u092a\u0939\u0932\u0947 \u0938\u0947 \u091c\u093e\u0928\u0924\u0947 \u0939\u0948\u0902\u0964" },
      { title: "2. \u0938\u094d\u0924\u0930 \u0914\u0930 \u092c\u094d\u0932\u0949\u0915 \u091a\u0941\u0928\u0947\u0902", text: "\u0938\u094d\u0924\u0930 \u091a\u0941\u0928\u0947\u0902 (A1 \u092c\u0941\u0928\u093f\u092f\u093e\u0926\u0940 \u00b7 A2 \u092a\u094d\u0930\u093e\u0930\u0902\u092d\u093f\u0915 \u00b7 B1 \u092e\u0927\u094d\u092f\u092e) \u0914\u0930 \u0915\u094b\u0908 \u0935\u093f\u0937\u092f\u0917\u0924 \u092c\u094d\u0932\u0949\u0915 \u091a\u0941\u0928\u0947\u0902: \u0915\u0915\u094d\u0937\u093e, \u092a\u0930\u093f\u0935\u093e\u0930, \u092d\u094b\u091c\u0928, \u091b\u0941\u091f\u094d\u091f\u093f\u092f\u093e\u0901, \u092a\u0947\u0936\u0947, \u0935\u093e\u0926\u094d\u092f\u092f\u0902\u0924\u094d\u0930\u2026" },
      { title: "3. \u0915\u093e\u0930\u094d\u0921 \u0938\u0947 \u0938\u0940\u0916\u0947\u0902", text: "\u0939\u0930 \u092c\u094d\u0932\u0949\u0915 \u092e\u0947\u0902 \u091a\u093f\u0924\u094d\u0930 \u0915\u093e\u0930\u094d\u0921 \u0939\u094b\u0924\u0947 \u0939\u0948\u0902\u0964 \u0905\u0928\u0941\u0935\u093e\u0926 \u0926\u0947\u0916\u0928\u0947 \u0914\u0930 \u0909\u091a\u094d\u091a\u093e\u0930\u0923 \u0938\u0941\u0928\u0928\u0947 \u0915\u0947 \u0932\u093f\u090f \u091f\u0948\u092a \u0915\u0930\u0947\u0902\u0964" },
      { title: "4. \u0916\u0947\u0932 \u0938\u0947 \u0905\u092d\u094d\u092f\u093e\u0938 \u0915\u0930\u0947\u0902", text: "\u0939\u0930 \u092c\u094d\u0932\u0949\u0915 \u0915\u0947 \u0905\u0902\u0924 \u092e\u0947\u0902 \u00ab\u0916\u0947\u0932\u00bb \u0926\u092c\u093e\u090f\u0901 \u0914\u0930 \u0938\u0940\u0916\u0940 \u0939\u0941\u0908 \u092c\u093e\u0924\u0947\u0902 \u092a\u0930\u0916\u0947\u0902\u0964 \u0905\u0902\u0924 \u092e\u0947\u0902 \u0938\u0939\u0940 \u0914\u0930 \u0917\u0932\u0924 \u0909\u0924\u094d\u0924\u0930\u094b\u0902 \u0915\u093e \u0938\u093e\u0930\u093e\u0902\u0936 \u092e\u093f\u0932\u0947\u0917\u093e\u0964" },
      { title: "5. \u0917\u093e\u0928\u0947 \u0938\u0941\u0928\u0947\u0902", text: "\u0915\u0941\u091b \u092c\u094d\u0932\u0949\u0915 \u092e\u0947\u0902 \u0936\u092c\u094d\u0926\u093e\u0935\u0932\u0940 \u0938\u0947 \u091c\u0941\u0921\u093c\u0947 \u0917\u093e\u0928\u0947 \u0939\u0948\u0902, \u091c\u094b \u0938\u0940\u0916\u0928\u093e \u092e\u091c\u093c\u0947\u0926\u093e\u0930 \u092c\u0928\u093e\u0924\u0947 \u0939\u0948\u0902\u0964" },
      { title: "6. \u090f\u0928\u093f\u092e\u0947\u091f\u0947\u0921 \u0930\u094b\u0932\u092a\u094d\u0932\u0947 \u0926\u0947\u0916\u0947\u0902", text: "A2 \u0938\u094d\u0924\u0930 \u092a\u0930 \u0930\u094b\u091c\u093c\u092e\u0930\u094d\u0930\u093e \u0915\u0940 \u0938\u094d\u0925\u093f\u0924\u093f\u092f\u094b\u0902 \u0915\u0947 \u090f\u0928\u093f\u092e\u0947\u091f\u0947\u0921 \u0935\u0940\u0921\u093f\u092f\u094b \u092e\u093f\u0932\u0947\u0902\u0917\u0947, \u091c\u093f\u0938\u0938\u0947 \u0938\u0941\u0928\u0928\u0947 \u0915\u0940 \u0938\u092e\u091d \u092c\u0947\u0939\u0924\u0930 \u0939\u094b\u0924\u0940 \u0939\u0948\u0964" },
      { title: "7. PDF \u092e\u0947\u0902 \u0928\u093f\u0930\u094d\u092f\u093e\u0924 \u0915\u0930\u0947\u0902", text: "PDF \u092c\u091f\u0928 \u0938\u0947 \u091a\u0941\u0928\u0947 \u0917\u090f \u0938\u094d\u0924\u0930 \u0915\u0947 \u0938\u092d\u0940 \u0915\u093e\u0930\u094d\u0921 \u0921\u093e\u0909\u0928\u0932\u094b\u0921 \u0915\u0930 \u091b\u093e\u092a\u0947 \u091c\u093e \u0938\u0915\u0924\u0947 \u0939\u0948\u0902\u0964" },
    ],
    justifBadge: "\u0936\u0948\u0915\u094d\u0937\u0923\u093f\u0915 \u0914\u091a\u093f\u0924\u094d\u092f",
    justifTitle: "\u092f\u0942\u0930\u094b\u092a\u0940\u092f \u0926\u093f\u0936\u093e\u0928\u093f\u0930\u094d\u0926\u0947\u0936\u094b\u0902 \u0938\u0947 \u092a\u094d\u0930\u0947\u0930\u093f\u0924",
    p1Pre: "\u092f\u0939 \u0935\u0947\u092c\u0938\u093e\u0907\u091f \u092a\u0930\u093f\u092f\u094b\u091c\u0928\u093e ",
    p1Mid: " \u0915\u093e \u0939\u093f\u0938\u094d\u0938\u093e \u0939\u0948, \u091c\u094b \u092a\u0939\u0932 ",
    p1End: " \u0915\u0947 \u0905\u0902\u0924\u0930\u094d\u0917\u0924 \u0939\u0948\u0964 \u090f\u0915 \u092a\u093e\u092f\u0932\u091f \u092a\u0930\u093f\u092f\u094b\u091c\u0928\u093e \u0915\u0947 \u092c\u093e\u0926 \u092e\u0941\u091d\u0947 \u0905\u092a\u0928\u093e \u0905\u0928\u0941\u092d\u0935 \u0938\u093e\u091d\u093e \u0915\u0930\u0928\u0947 \u0915\u093e \u0905\u0935\u0938\u0930 \u092e\u093f\u0932\u093e, \u091c\u094b \u0907\u0928 \u092e\u093e\u0930\u094d\u0917\u0926\u0930\u094d\u0936\u093f\u0915\u093e\u0913\u0902 \u092a\u0930 \u0906\u0927\u093e\u0930\u093f\u0924 \u0925\u0940 ",
    guide1: "«New Guidelines to Help Teachers Lead Europe's Digital Education»",
    guide2: "«Guidelines for Teaching Informatics: Practical Strategies for European Classrooms»",
    p2: "\u092f\u0947 \u0926\u093f\u0936\u093e\u0928\u093f\u0930\u094d\u0926\u0947\u0936 Digital Education Action Plan (2021\u20132027) \u0915\u0940 \u092a\u094d\u0930\u092e\u0941\u0916 \u092a\u0939\u0932 \u0939\u0948\u0902, \u091c\u093f\u0938\u0915\u093e \u0909\u0926\u094d\u0926\u0947\u0936\u094d\u092f \u092a\u0942\u0930\u0947 \u092f\u0942\u0930\u094b\u092a \u092e\u0947\u0902 \u0936\u093f\u0915\u094d\u0937\u093e \u092a\u094d\u0930\u0923\u093e\u0932\u093f\u092f\u094b\u0902 \u0915\u0947 \u0921\u093f\u091c\u093f\u091f\u0932 \u092a\u0930\u093f\u0935\u0930\u094d\u0924\u0928 \u0915\u093e \u0938\u092e\u0930\u094d\u0925\u0928 \u0915\u0930\u0928\u093e \u0939\u0948\u0964",
    p3: "\u092f\u0942\u0930\u094b\u092a\u0940\u092f \u0906\u092f\u094b\u0917 \u0926\u094d\u0935\u093e\u0930\u093e \u0906\u092f\u094b\u091c\u093f\u0924 \u0911\u0928\u0932\u093e\u0907\u0928 \u0938\u093e\u0915\u094d\u0937\u093e\u0924\u094d\u0915\u093e\u0930 \u0930\u093f\u0915\u0949\u0930\u094d\u0921 \u0915\u093f\u092f\u093e \u0917\u092f\u093e \u0914\u0930 \u092a\u094d\u0930\u0938\u093e\u0930 \u0939\u0947\u0924\u0941 \u090f\u0915 \u092a\u094d\u0930\u0936\u0902\u0938\u093e\u092a\u0924\u094d\u0930 \u0935\u0940\u0921\u093f\u092f\u094b \u092e\u0947\u0902 \u0936\u093e\u092e\u093f\u0932 \u0939\u094b\u0917\u093e\u0964 \u091a\u092f\u0928\u093f\u0924 \u0939\u094b\u0928\u0947 \u092a\u0930 \u092e\u0948\u0902 \u0938\u092e\u094d\u092e\u093e\u0928\u093f\u0924 \u0914\u0930 \u0906\u092d\u093e\u0930\u0940 \u092e\u0939\u0938\u0942\u0938 \u0915\u0930\u0924\u0940 \u0939\u0942\u0901\u0964",
    backHome: "\u0939\u094b\u092e \u092a\u0930 \u0935\u093e\u092a\u0938",
    moderationLink: "\ud83d\udee1\ufe0f \u0909\u092a\u092f\u094b\u0917\u0915\u0930\u094d\u0924\u093e\u0913\u0902 \u0915\u0947 \u092f\u094b\u0917\u0926\u093e\u0928 \u0915\u0940 \u0938\u092e\u0940\u0915\u094d\u0937\u093e \u0915\u0948\u0938\u0947 \u0939\u094b\u0924\u0940 \u0939\u0948",
  },
  ptBR: {
    subtitle: "Como usar",
    back: "Voltar",
    badge: "Guia de uso",
    title: "Como usar este site",
    intro: "Uma ferramenta visual e interativa pensada para o acolhimento lingu\u00edstico de estudantes rec\u00e9m-chegados. Veja como aproveit\u00e1-la ao m\u00e1ximo.",
    steps: [
      { title: "1. Escolha os idiomas", text: "No topo, selecione o idioma que quer aprender (\ud83c\udfaf Estou aprendendo) e o idioma de ajuda (\ud83c\udf0d Ajuda em) que j\u00e1 conhece." },
      { title: "2. Escolha um n\u00edvel e um bloco", text: "Selecione o n\u00edvel (A1 B\u00e1sico \u00b7 A2 Elementar \u00b7 B1 Intermedi\u00e1rio) e escolha um dos blocos tem\u00e1ticos: a sala de aula, a fam\u00edlia, as refei\u00e7\u00f5es, as f\u00e9rias, as profiss\u00f5es, os instrumentos\u2026" },
      { title: "3. Aprenda com as fichas", text: "Cada bloco tem fichas visuais com a palavra no idioma que voc\u00ea aprende. Toque para ver a tradu\u00e7\u00e3o e ouvir a pron\u00fancia." },
      { title: "4. Pratique com o jogo", text: "No fim de cada bloco, toque em \u00abJogo\u00bb e teste o que aprendeu. No final aparece um resumo de acertos e erros." },
      { title: "5. Ou\u00e7a can\u00e7\u00f5es", text: "Alguns blocos incluem can\u00e7\u00f5es relacionadas ao vocabul\u00e1rio, \u00f3timas para refor\u00e7ar o aprendizado de forma l\u00fadica." },
      { title: "6. Veja roleplays animados", text: "No n\u00edvel A2 h\u00e1 v\u00eddeos animados com situa\u00e7\u00f5es do dia a dia para trabalhar a compreens\u00e3o oral." },
      { title: "7. Exporte em PDF", text: "Com o bot\u00e3o PDF voc\u00ea baixa todas as fichas do n\u00edvel escolhido para imprimir e usar off-line na sala de aula." },
    ],
    justifBadge: "Justificativa pedag\u00f3gica",
    justifTitle: "Inspirado nas diretrizes europeias",
    p1Pre: "Este site faz parte do projeto ",
    p1Mid: ", dentro da iniciativa ",
    p1End: ". Tive a oportunidade de compartilhar minha experi\u00eancia ap\u00f3s realizar um projeto piloto seguindo os guias ",
    guide1: "«New Guidelines to Help Teachers Lead Europe's Digital Education»",
    guide2: "«Guidelines for Teaching Informatics: Practical Strategies for European Classrooms»",
    p2: "Essas diretrizes s\u00e3o uma iniciativa emblem\u00e1tica do Digital Education Action Plan (2021\u20132027), que apoia a transforma\u00e7\u00e3o digital dos sistemas educativos na Europa.",
    p3: "A entrevista on-line, organizada pela Comiss\u00e3o Europeia, foi gravada e integrar\u00e1 um v\u00eddeo de depoimento para divulga\u00e7\u00e3o. Sinto-me honrada e grata por ter sido selecionada.",
    backHome: "Voltar ao in\u00edcio",
    moderationLink: "\ud83d\udee1\ufe0f Como as contribui\u00e7\u00f5es dos usu\u00e1rios s\u00e3o revisadas",
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

const REC_STRINGS: Partial<Record<LangCode, { badge: string; title: string; text: string; link: string }>> = {
  ca: { badge: "Recomanacions", title: "Per què Chrome sona millor?", text: "Descobreix quin navegador i quins ajustos ofereixen la millor experiència d'àudio, veu i traducció.", link: "Veure recomanacions" },
  es: { badge: "Recomendaciones", title: "¿Por qué Chrome suena mejor?", text: "Descubre qué navegador y ajustes ofrecen la mejor experiencia de audio, voz y traducción.", link: "Ver recomendaciones" },
  en: { badge: "Recommendations", title: "Why does Chrome sound better?", text: "Find out which browser and settings give the best audio, voice and translation experience.", link: "See recommendations" },
  fr: { badge: "Recommandations", title: "Pourquoi Chrome sonne-t-il mieux?", text: "Découvrez quel navigateur et quels réglages offrent la meilleure expérience audio, voix et traduction.", link: "Voir les recommandations" },
  ar: { badge: "توصيات", title: "لماذا يبدو Chrome أفضل؟", text: "اكتشف أي متصفح وإعدادات توفر أفضل تجربة للصوت والصوت والترجمة.", link: "عرض التوصيات" },
  it: { badge: "Raccomandazioni", title: "Perché Chrome suona meglio?", text: "Scopri quali browser e impostazioni offrono la migliore esperienza audio, voce e traduzione.", link: "Vedi raccomandazioni" },
  gl: { badge: "Recomendacións", title: "Por que Chrome soa mellor?", text: "Descubre que navegador e axustes ofrecen a mellor experiencia de audio, voz e tradución.", link: "Ver recomendacións" },
  pt: { badge: "Recomendações", title: "Porque é que o Chrome soa melhor?", text: "Descobre que navegador e definições oferecem a melhor experiência de áudio, voz e tradução.", link: "Ver recomendações" },
  ptBR: { badge: "Recomendações", title: "Por que o Chrome soa melhor?", text: "Descubra qual navegador e configurações oferecem a melhor experiência de áudio, voz e tradução.", link: "Ver recomendações" },
  uk: { badge: "Рекомендації", title: "Чому Chrome звучить краще?", text: "Дізнайтеся, який браузер і налаштування забезпечують найкращий досвід аудіо, голосу та перекладу.", link: "Переглянути рекомендації" },
  ro: { badge: "Recomandări", title: "De ce Chrome sună mai bine?", text: "Află ce browser și setări oferă cea mai bună experiență audio, voce și traducere.", link: "Vezi recomandările" },
  el: { badge: "Συστάσεις", title: "Γιατί ο Chrome ακούγεται καλύτερα;", text: "Ανακαλύψτε ποιο πρόγραμμα περιήγησης και ρυθμίσεις προσφέρουν την καλύτερη εμπειρία ήχου, φωνής και μετάφρασης.", link: "Δείτε συστάσεις" },
  ur: { badge: "سفارشات", title: "Chrome کی آواز بہتر کیوں آتی ہے؟", text: "جانیں کہ کون سا براؤزر اور سیٹنگز آڈیو، آواز اور ترجمے کا بہترین تجربہ فراہم کرتے ہیں۔", link: "سفارشات دیکھیں" },
  zh: { badge: "建议", title: "为什么 Chrome 听起来更好？", text: "了解哪种浏览器和设置能提供最佳音频、语音和翻译体验。", link: "查看建议" },
  hi: { badge: "सिफारिशें", title: "Chrome की आवाज बेहतर क्यों आती है?", text: "जानें कौन सा ब्राउज़र और सेटिंग्स ऑडियो, आवाज और अनुवाद का सबसे अच्छा अनुभव देते हैं।", link: "सिफारिशें देखें" },
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
  const rec = REC_STRINGS[helpLang] ?? REC_STRINGS.en!;

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

        <section className="mt-10">
          <Link
            to="/recomanacions"
            className="group flex items-start gap-4 p-5 rounded-2xl border border-border bg-card hover:shadow-md hover:border-primary/30 transition-all active:scale-95"
          >
            <div className="bg-primary/10 text-primary rounded-xl p-3 h-fit shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
              <Chrome className="w-5 h-5" />
            </div>
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-2">
                {rec.badge}
              </span>
              <h3 className="font-extrabold text-foreground text-lg">{rec.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{rec.text}</p>
              <span className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-primary group-hover:underline">
                {rec.link} <ArrowLeft className="w-4 h-4 rotate-180" />
              </span>
            </div>
          </Link>
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
            {audio.title}
          </h2>
          <div className="space-y-3 text-sm text-blue-950 leading-relaxed">
            <p dangerouslySetInnerHTML={{ __html: audio.intro }} />
            <p className="font-semibold">{audio.callout}</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li dangerouslySetInnerHTML={{ __html: audio.windows }} />
              <li dangerouslySetInnerHTML={{ __html: audio.android }} />
              <li dangerouslySetInnerHTML={{ __html: audio.ios }} />
              <li dangerouslySetInnerHTML={{ __html: audio.mac }} />
            </ul>
            <p dangerouslySetInnerHTML={{ __html: audio.outro }} />
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
