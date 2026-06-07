import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLanguages, type LangCode } from "@/hooks/useLanguage";

type LegalKind = "privacy" | "cookies" | "legal";

interface LegalContent {
  title: string;
  intro: string;
  sections: { heading: string; body: string }[];
  back: string;
  updated: string;
}

const CONTENT: Record<LegalKind, Partial<Record<LangCode, LegalContent>>> = {
  privacy: {
    ca: {
      title: "Política de privacitat",
      intro: "Aquesta política descriu com es tracten les dades personals dels usuaris d'aquesta aplicació educativa d'acolliment lingüístic.",
      back: "Tornar",
      updated: "Última actualització: juny de 2026",
      sections: [
        { heading: "1. Responsable del tractament", body: "Aquesta aplicació és un projecte educatiu sense ànim de lucre destinat a l'acolliment lingüístic d'alumnat nouvingut. No recull dades personals identificables dels usuaris." },
        { heading: "2. Dades que es recullen", body: "L'aplicació guarda preferències d'ús (idioma seleccionat, progressió en les activitats) exclusivament al navegador local (localStorage). Aquestes dades no s'envien a cap servidor extern ni són accessibles per terceres parts." },
        { heading: "3. Finalitat", body: "Les dades emmagatzemades localment serveixen únicament per recordar les preferències de l'usuari entre sessions i millorar l'experiència d'aprenentatge." },
        { heading: "4. Drets de l'usuari", body: "L'usuari pot esborrar en qualsevol moment les dades guardades al navegador buidant les dades del lloc des de la configuració del navegador." },
        { heading: "5. Menors d'edat", body: "L'aplicació està dissenyada per a ús educatiu amb alumnat menor d'edat sota supervisió docent. No es recullen dades identificables dels menors." },
        { heading: "6. Contacte", body: "Per a qualsevol consulta relacionada amb la privacitat, podeu contactar amb l'autora del projecte a través de la pàgina d'inici." },
      ],
    },
    es: {
      title: "Política de privacidad",
      intro: "Esta política describe cómo se tratan los datos personales de las personas usuarias de esta aplicación educativa de acogida lingüística.",
      back: "Volver",
      updated: "Última actualización: junio de 2026",
      sections: [
        { heading: "1. Responsable del tratamiento", body: "Esta aplicación es un proyecto educativo sin ánimo de lucro destinado a la acogida lingüística de alumnado recién llegado. No recoge datos personales identificables de los usuarios." },
        { heading: "2. Datos que se recogen", body: "La aplicación guarda preferencias de uso (idioma seleccionado, progreso en las actividades) exclusivamente en el navegador local (localStorage). Estos datos no se envían a ningún servidor externo ni son accesibles por terceros." },
        { heading: "3. Finalidad", body: "Los datos almacenados localmente sirven únicamente para recordar las preferencias del usuario entre sesiones y mejorar la experiencia de aprendizaje." },
        { heading: "4. Derechos del usuario", body: "El usuario puede borrar en cualquier momento los datos guardados en el navegador vaciando los datos del sitio desde la configuración del navegador." },
        { heading: "5. Menores de edad", body: "La aplicación está diseñada para uso educativo con alumnado menor de edad bajo supervisión docente. No se recogen datos identificables de los menores." },
        { heading: "6. Contacto", body: "Para cualquier consulta relacionada con la privacidad, puede contactar con la autora del proyecto a través de la página de inicio." },
      ],
    },
    en: {
      title: "Privacy Policy",
      intro: "This policy describes how personal data of users of this educational language welcoming application is handled.",
      back: "Back",
      updated: "Last updated: June 2026",
      sections: [
        { heading: "1. Data controller", body: "This application is a non-profit educational project aimed at the language welcoming of newly arrived students. It does not collect any identifiable personal data from users." },
        { heading: "2. Data collected", body: "The application stores usage preferences (selected language, activity progress) exclusively in the local browser (localStorage). This data is not sent to any external server nor accessible to third parties." },
        { heading: "3. Purpose", body: "Locally stored data only serves to remember user preferences between sessions and improve the learning experience." },
        { heading: "4. User rights", body: "Users may delete the data stored in the browser at any time by clearing the site data from their browser settings." },
        { heading: "5. Minors", body: "The application is designed for educational use with underage students under teacher supervision. No identifiable data of minors is collected." },
        { heading: "6. Contact", body: "For any privacy-related queries, you can contact the project author through the home page." },
      ],
    },
    fr: {
      title: "Politique de confidentialité",
      intro: "Cette politique décrit la manière dont les données personnelles des utilisateurs de cette application éducative d'accueil linguistique sont traitées.",
      back: "Retour",
      updated: "Dernière mise à jour : juin 2026",
      sections: [
        { heading: "1. Responsable du traitement", body: "Cette application est un projet éducatif sans but lucratif destiné à l'accueil linguistique des élèves nouvellement arrivés. Elle ne recueille aucune donnée personnelle identifiable des utilisateurs." },
        { heading: "2. Données collectées", body: "L'application enregistre les préférences d'utilisation (langue choisie, progression des activités) exclusivement dans le navigateur local (localStorage). Ces données ne sont envoyées à aucun serveur externe ni accessibles à des tiers." },
        { heading: "3. Finalité", body: "Les données stockées localement servent uniquement à mémoriser les préférences de l'utilisateur entre les sessions et à améliorer l'expérience d'apprentissage." },
        { heading: "4. Droits de l'utilisateur", body: "L'utilisateur peut à tout moment supprimer les données enregistrées dans le navigateur en effaçant les données du site depuis les paramètres du navigateur." },
        { heading: "5. Mineurs", body: "L'application est conçue pour un usage éducatif avec des élèves mineurs sous supervision enseignante. Aucune donnée identifiable des mineurs n'est collectée." },
        { heading: "6. Contact", body: "Pour toute question relative à la confidentialité, vous pouvez contacter l'auteure du projet via la page d'accueil." },
      ],
    },
    ar: {
      title: "سياسة الخصوصية",
      intro: "تصف هذه السياسة كيفية معالجة البيانات الشخصية لمستخدمي هذا التطبيق التعليمي للاستقبال اللغوي.",
      back: "رجوع",
      updated: "آخر تحديث: يونيو 2026",
      sections: [
        { heading: "1. المسؤول عن المعالجة", body: "هذا التطبيق هو مشروع تعليمي غير ربحي يهدف إلى الاستقبال اللغوي للطلاب الوافدين الجدد. لا يجمع أي بيانات شخصية قابلة للتعريف من المستخدمين." },
        { heading: "2. البيانات المُجمَّعة", body: "يخزن التطبيق تفضيلات الاستخدام (اللغة المختارة، تقدم الأنشطة) حصرياً في المتصفح المحلي (localStorage). لا تُرسل هذه البيانات إلى أي خادم خارجي ولا يمكن للأطراف الثالثة الوصول إليها." },
        { heading: "3. الغرض", body: "تُستخدم البيانات المخزنة محلياً فقط لتذكر تفضيلات المستخدم بين الجلسات وتحسين تجربة التعلم." },
        { heading: "4. حقوق المستخدم", body: "يمكن للمستخدم في أي وقت حذف البيانات المحفوظة في المتصفح بمسح بيانات الموقع من إعدادات المتصفح." },
        { heading: "5. القاصرون", body: "صُمم التطبيق للاستخدام التعليمي مع الطلاب القاصرين تحت إشراف المعلمين. لا تُجمع أي بيانات قابلة للتعريف للقاصرين." },
        { heading: "6. الاتصال", body: "لأي استفسار يتعلق بالخصوصية، يمكنكم الاتصال بمؤلفة المشروع عبر الصفحة الرئيسية." },
      ],
    },
  },
  cookies: {
    ca: {
      title: "Política de galetes",
      intro: "Aquesta pàgina explica l'ús de galetes (cookies) i tecnologies similars en aquesta aplicació.",
      back: "Tornar",
      updated: "Última actualització: juny de 2026",
      sections: [
        { heading: "1. Què són les galetes?", body: "Les galetes són petits fitxers de text que els llocs web guarden al navegador per recordar informació entre visites." },
        { heading: "2. Galetes utilitzades", body: "Aquesta aplicació NO utilitza galetes publicitàries ni de seguiment de tercers. Únicament fa servir l'emmagatzematge local del navegador (localStorage) per recordar l'idioma seleccionat i el progrés de l'usuari." },
        { heading: "3. Galetes de tercers", body: "L'aplicació pot incorporar continguts incrustats (per exemple, vídeos) servits per plataformes externes que poden establir les seves pròpies galetes. Consulteu les seves polítiques per a més informació." },
        { heading: "4. Com gestionar-les", body: "Podeu esborrar les dades emmagatzemades en qualsevol moment des de la configuració del navegador (Esborrar dades de navegació)." },
        { heading: "5. Consentiment", body: "L'ús continuat de l'aplicació implica l'acceptació d'aquesta política de galetes." },
      ],
    },
    es: {
      title: "Política de cookies",
      intro: "Esta página explica el uso de cookies y tecnologías similares en esta aplicación.",
      back: "Volver",
      updated: "Última actualización: junio de 2026",
      sections: [
        { heading: "1. ¿Qué son las cookies?", body: "Las cookies son pequeños archivos de texto que los sitios web guardan en el navegador para recordar información entre visitas." },
        { heading: "2. Cookies utilizadas", body: "Esta aplicación NO utiliza cookies publicitarias ni de seguimiento de terceros. Únicamente emplea el almacenamiento local del navegador (localStorage) para recordar el idioma seleccionado y el progreso del usuario." },
        { heading: "3. Cookies de terceros", body: "La aplicación puede incorporar contenidos incrustados (por ejemplo, vídeos) servidos por plataformas externas que pueden establecer sus propias cookies. Consulte sus políticas para más información." },
        { heading: "4. Cómo gestionarlas", body: "Puede borrar los datos almacenados en cualquier momento desde la configuración del navegador (Borrar datos de navegación)." },
        { heading: "5. Consentimiento", body: "El uso continuado de la aplicación implica la aceptación de esta política de cookies." },
      ],
    },
    en: {
      title: "Cookies Policy",
      intro: "This page explains the use of cookies and similar technologies in this application.",
      back: "Back",
      updated: "Last updated: June 2026",
      sections: [
        { heading: "1. What are cookies?", body: "Cookies are small text files that websites save in the browser to remember information between visits." },
        { heading: "2. Cookies used", body: "This application does NOT use advertising or third-party tracking cookies. It only uses the browser's local storage (localStorage) to remember the selected language and user progress." },
        { heading: "3. Third-party cookies", body: "The application may embed content (e.g., videos) served by external platforms that may set their own cookies. Refer to their policies for more information." },
        { heading: "4. How to manage them", body: "You can delete stored data at any time from your browser settings (Clear browsing data)." },
        { heading: "5. Consent", body: "Continued use of the application implies acceptance of this cookies policy." },
      ],
    },
    fr: {
      title: "Politique de cookies",
      intro: "Cette page explique l'utilisation des cookies et technologies similaires dans cette application.",
      back: "Retour",
      updated: "Dernière mise à jour : juin 2026",
      sections: [
        { heading: "1. Que sont les cookies ?", body: "Les cookies sont de petits fichiers texte que les sites web enregistrent dans le navigateur pour conserver des informations entre les visites." },
        { heading: "2. Cookies utilisés", body: "Cette application n'utilise PAS de cookies publicitaires ni de suivi tiers. Elle utilise uniquement le stockage local du navigateur (localStorage) pour mémoriser la langue choisie et la progression de l'utilisateur." },
        { heading: "3. Cookies tiers", body: "L'application peut intégrer des contenus (par exemple des vidéos) servis par des plateformes externes qui peuvent définir leurs propres cookies. Consultez leurs politiques pour plus d'informations." },
        { heading: "4. Comment les gérer", body: "Vous pouvez supprimer les données stockées à tout moment depuis les paramètres de votre navigateur (Effacer les données de navigation)." },
        { heading: "5. Consentement", body: "L'utilisation continue de l'application implique l'acceptation de cette politique de cookies." },
      ],
    },
    ar: {
      title: "سياسة ملفات تعريف الارتباط",
      intro: "تشرح هذه الصفحة استخدام ملفات تعريف الارتباط والتقنيات المماثلة في هذا التطبيق.",
      back: "رجوع",
      updated: "آخر تحديث: يونيو 2026",
      sections: [
        { heading: "1. ما هي ملفات تعريف الارتباط؟", body: "ملفات تعريف الارتباط هي ملفات نصية صغيرة تحفظها المواقع في المتصفح لتذكر المعلومات بين الزيارات." },
        { heading: "2. الملفات المستخدمة", body: "لا يستخدم هذا التطبيق ملفات تعريف ارتباط إعلانية أو لتتبع الطرف الثالث. يستخدم فقط التخزين المحلي للمتصفح (localStorage) لتذكر اللغة المختارة وتقدم المستخدم." },
        { heading: "3. ملفات الطرف الثالث", body: "قد يضم التطبيق محتوى مضمَّن (مثل مقاطع فيديو) تقدمه منصات خارجية قد تضع ملفاتها الخاصة. راجع سياساتها لمزيد من المعلومات." },
        { heading: "4. كيفية إدارتها", body: "يمكنك حذف البيانات المخزنة في أي وقت من إعدادات المتصفح (مسح بيانات التصفح)." },
        { heading: "5. الموافقة", body: "يعني الاستمرار في استخدام التطبيق قبول هذه السياسة." },
      ],
    },
  },
  legal: {
    ca: {
      title: "Avís legal",
      intro: "Informació legal sobre aquesta aplicació educativa.",
      back: "Tornar",
      updated: "Última actualització: juny de 2026",
      sections: [
        { heading: "1. Titularitat", body: "Aquesta aplicació és un projecte educatiu desenvolupat per Cristina Blaya Góngora, docent, sense ànim de lucre i amb finalitat purament educativa." },
        { heading: "2. Objecte", body: "L'aplicació té com a finalitat facilitar l'acolliment lingüístic d'alumnat nouvingut mitjançant materials visuals, interactius i multilingües." },
        { heading: "3. Llicència d'ús", body: "El contingut està publicat sota llicència Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0). Es permet l'ús educatiu no comercial citant l'autoria; no es permeten obres derivades." },
        { heading: "4. Propietat intel·lectual", body: "Els recursos gràfics, vídeos i textos són propietat de la seva autora o s'utilitzen sota llicències compatibles amb finalitats educatives. Les marques, logotips i materials de tercers pertanyen als seus respectius titulars." },
        { heading: "5. Limitació de responsabilitat", body: "L'autora no es fa responsable de l'ús que terceres parts puguin fer dels continguts ni dels possibles errors o interrupcions del servei." },
        { heading: "6. Legislació aplicable", body: "Aquest avís es regeix per la legislació espanyola i catalana vigent en matèria de propietat intel·lectual i protecció de dades." },
      ],
    },
    es: {
      title: "Aviso legal",
      intro: "Información legal sobre esta aplicación educativa.",
      back: "Volver",
      updated: "Última actualización: junio de 2026",
      sections: [
        { heading: "1. Titularidad", body: "Esta aplicación es un proyecto educativo desarrollado por Cristina Blaya Góngora, docente, sin ánimo de lucro y con finalidad puramente educativa." },
        { heading: "2. Objeto", body: "La aplicación tiene como finalidad facilitar la acogida lingüística del alumnado recién llegado mediante materiales visuales, interactivos y multilingües." },
        { heading: "3. Licencia de uso", body: "El contenido está publicado bajo licencia Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0). Se permite el uso educativo no comercial citando la autoría; no se permiten obras derivadas." },
        { heading: "4. Propiedad intelectual", body: "Los recursos gráficos, vídeos y textos son propiedad de su autora o se utilizan bajo licencias compatibles con fines educativos. Las marcas, logotipos y materiales de terceros pertenecen a sus respectivos titulares." },
        { heading: "5. Limitación de responsabilidad", body: "La autora no se hace responsable del uso que terceros puedan hacer de los contenidos ni de los posibles errores o interrupciones del servicio." },
        { heading: "6. Legislación aplicable", body: "Este aviso se rige por la legislación española y catalana vigente en materia de propiedad intelectual y protección de datos." },
      ],
    },
    en: {
      title: "Legal Notice",
      intro: "Legal information about this educational application.",
      back: "Back",
      updated: "Last updated: June 2026",
      sections: [
        { heading: "1. Ownership", body: "This application is an educational project developed by Cristina Blaya Góngora, teacher, non-profit and for purely educational purposes." },
        { heading: "2. Purpose", body: "The application aims to facilitate the language welcoming of newly arrived students through visual, interactive and multilingual materials." },
        { heading: "3. License", body: "The content is published under Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0). Non-commercial educational use is allowed with attribution; derivative works are not permitted." },
        { heading: "4. Intellectual property", body: "Graphic resources, videos and texts are owned by the author or used under licenses compatible with educational purposes. Third-party trademarks, logos and materials belong to their respective owners." },
        { heading: "5. Limitation of liability", body: "The author is not responsible for the use that third parties may make of the contents nor for any errors or interruptions of the service." },
        { heading: "6. Applicable law", body: "This notice is governed by the Spanish and Catalan legislation in force regarding intellectual property and data protection." },
      ],
    },
    fr: {
      title: "Mentions légales",
      intro: "Informations légales concernant cette application éducative.",
      back: "Retour",
      updated: "Dernière mise à jour : juin 2026",
      sections: [
        { heading: "1. Titulaire", body: "Cette application est un projet éducatif développé par Cristina Blaya Góngora, enseignante, à but non lucratif et à finalité purement éducative." },
        { heading: "2. Objet", body: "L'application vise à faciliter l'accueil linguistique des élèves nouvellement arrivés au moyen de supports visuels, interactifs et multilingues." },
        { heading: "3. Licence d'utilisation", body: "Le contenu est publié sous licence Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0). L'usage éducatif non commercial est autorisé avec mention de l'auteure ; les œuvres dérivées ne sont pas autorisées." },
        { heading: "4. Propriété intellectuelle", body: "Les ressources graphiques, vidéos et textes appartiennent à leur auteure ou sont utilisés sous des licences compatibles avec un usage éducatif. Les marques, logos et contenus de tiers appartiennent à leurs titulaires respectifs." },
        { heading: "5. Limitation de responsabilité", body: "L'auteure décline toute responsabilité quant à l'usage que des tiers pourraient faire des contenus, ainsi qu'aux éventuelles erreurs ou interruptions du service." },
        { heading: "6. Législation applicable", body: "Cet avis est régi par la législation espagnole et catalane en vigueur en matière de propriété intellectuelle et de protection des données." },
      ],
    },
    ar: {
      title: "إشعار قانوني",
      intro: "معلومات قانونية حول هذا التطبيق التعليمي.",
      back: "رجوع",
      updated: "آخر تحديث: يونيو 2026",
      sections: [
        { heading: "1. الملكية", body: "هذا التطبيق مشروع تعليمي طورته كريستينا بلايا غونغورا، معلمة، بلا أهداف ربحية ولأغراض تعليمية بحتة." },
        { heading: "2. الهدف", body: "يهدف التطبيق إلى تسهيل الاستقبال اللغوي للطلاب الوافدين الجدد من خلال مواد بصرية وتفاعلية ومتعددة اللغات." },
        { heading: "3. رخصة الاستخدام", body: "يُنشر المحتوى بموجب رخصة المشاع الإبداعي (CC BY-NC-ND 4.0). يُسمح بالاستخدام التعليمي غير التجاري مع ذكر المؤلف؛ لا يُسمح بالأعمال المشتقة." },
        { heading: "4. الملكية الفكرية", body: "الموارد الرسومية ومقاطع الفيديو والنصوص ملك للمؤلفة أو تُستخدم بموجب تراخيص متوافقة مع الأغراض التعليمية. تعود علامات وشعارات ومواد الأطراف الثالثة لأصحابها." },
        { heading: "5. تحديد المسؤولية", body: "لا تتحمل المؤلفة مسؤولية الاستخدام الذي قد يقوم به الآخرون للمحتوى ولا الأخطاء أو الانقطاعات المحتملة للخدمة." },
        { heading: "6. التشريع المطبق", body: "يخضع هذا الإشعار للتشريع الإسباني والكتالوني الساري في مجال الملكية الفكرية وحماية البيانات." },
      ],
    },
  },
};

function getContent(kind: LegalKind, lang: LangCode): LegalContent {
  return CONTENT[kind][lang] ?? CONTENT[kind].es ?? CONTENT[kind].en!;
}

interface LegalPageProps {
  kind: LegalKind;
}

export default function LegalPage({ kind }: LegalPageProps) {
  const { helpLang } = useLanguages();
  const content = getContent(kind, helpLang);
  const isRTL = helpLang === "ar" || helpLang === "ur";

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? "rtl" : "ltr"}>
      <header className="border-b border-border bg-card">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            {content.back}
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">{content.title}</h1>
        <p className="text-xs text-muted-foreground mb-2">{content.updated}</p>
        <p className="text-base text-foreground/80 mb-8 leading-relaxed">{content.intro}</p>

        <article className="space-y-6">
          {content.sections.map((s, i) => (
            <section key={i} className="bg-card rounded-2xl border border-border p-5">
              <h2 className="text-lg font-bold text-foreground mb-2">{s.heading}</h2>
              <p className="text-sm text-foreground/80 leading-relaxed">{s.body}</p>
            </section>
          ))}
        </article>
      </main>
    </div>
  );
}

/** Returns the localized navigation labels for the three legal pages, based on the given helpLang. */
export function useLegalLabels(helpLangOverride?: LangCode) {
  const { helpLang } = useLanguages();
  const lang = helpLangOverride ?? helpLang;
  return {
    privacy: getContent("privacy", lang).title,
    cookies: getContent("cookies", lang).title,
    legal: getContent("legal", lang).title,
  };
}
