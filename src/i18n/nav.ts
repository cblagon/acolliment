import { type LangCode } from "@/hooks/useLanguage";

const NAV = {
  "ca": {
    "level": "Nivell",
    "tools": "Eines",
    "toolsTitle": "Corrector i traductor",
    "map": "Mapa",
    "mapTitle": "D'on ens visiten",
    "help": "Ajuda",
    "contact": "Contacte",
    "contactTitle": "Escriu a l'autora",
    "admin": "Panell d'administració",
    "changePassword": "Canviar contrasenya",
    "logout": "Sortir",
    "login": "Entrar",
    "loginTitle": "Inicia sessió"
  },
  "ps": {
    "level": "کچه",
    "tools": "وسیلې",
    "toolsTitle": "سموونکی او ژباړونکی",
    "map": "نقشه",
    "mapTitle": "له کومه زموږ سایټ ګوري",
    "help": "مرسته",
    "contact": "اړیکه",
    "contactTitle": "لیکوالې ته ولیکئ",
    "admin": "د ادارې برخه",
    "changePassword": "پټنوم بدلول",
    "logout": "وتل",
    "login": "ننوتل",
    "loginTitle": "خپل حساب ته ننوځئ"
  },
  "es": {
    "level": "Nivel",
    "tools": "Herramientas",
    "toolsTitle": "Corrector y traductor",
    "map": "Mapa",
    "mapTitle": "De dónde nos visitan",
    "help": "Ayuda",
    "contact": "Contacto",
    "contactTitle": "Escribe a la autora",
    "admin": "Panel de administración",
    "changePassword": "Cambiar contraseña",
    "logout": "Salir",
    "login": "Entrar",
    "loginTitle": "Inicia sesión"
  },
  "en": {
    "level": "Level",
    "tools": "Tools",
    "toolsTitle": "Proofreader and translator",
    "map": "Map",
    "mapTitle": "Where our visitors are from",
    "help": "Help",
    "contact": "Contact",
    "contactTitle": "Write to the author",
    "admin": "Admin panel",
    "changePassword": "Change password",
    "logout": "Log out",
    "login": "Log in",
    "loginTitle": "Sign in"
  },
  "fr": {
    "level": "Niveau",
    "tools": "Outils",
    "toolsTitle": "Correcteur et traducteur",
    "map": "Carte",
    "mapTitle": "D'où viennent nos visiteurs",
    "help": "Aide",
    "contact": "Contact",
    "contactTitle": "Écrire à l'autrice",
    "admin": "Panneau d'administration",
    "changePassword": "Changer le mot de passe",
    "logout": "Déconnexion",
    "login": "Connexion",
    "loginTitle": "Se connecter"
  },
  "gl": {
    "level": "Nivel",
    "tools": "Ferramentas",
    "toolsTitle": "Corrector e tradutor",
    "map": "Mapa",
    "mapTitle": "De onde nos visitan",
    "help": "Axuda",
    "contact": "Contacto",
    "contactTitle": "Escribe á autora",
    "admin": "Panel de administración",
    "changePassword": "Cambiar contrasinal",
    "logout": "Saír",
    "login": "Entrar",
    "loginTitle": "Inicia sesión"
  }
};

export type NavKey = keyof typeof NAV.ca;

/** Header menu labels in the help language; falls back to Catalan. */
export function tNav(lang: LangCode, key: NavKey): string {
  return (NAV as Partial<Record<LangCode, Record<NavKey, string>>>)[lang]?.[key] ?? NAV.ca[key];
}
