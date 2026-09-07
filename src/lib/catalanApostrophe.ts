/**
 * Aplica l'apostrofació catalana bàsica a un text abans de pronunciar-lo o mostrar-lo.
 * "el elefant" -> "l'elefant", "de aigua" -> "d'aigua", "la hora" -> "l'hora".
 *
 * Regles aplicades:
 *  - el/de + vocal o h + vocal  -> l' / d'
 *  - la + vocal o h + vocal     -> l'  EXCEPTE davant i/u (o hi/hu) àtones: la idea, la universitat
 */

const VOWELS = "aàáeèéiíïoòóuúü";

function startsWithVowelSound(word: string): boolean {
  const w = word.toLowerCase();
  const first = w.startsWith("h") ? w.slice(1) : w;
  return first.length > 0 && VOWELS.includes(first[0]);
}

/** i/u àtones inicials: la idea, la universitat, la hipòtesi, la humitat */
function isUnstressedIU(word: string): boolean {
  const w = word.toLowerCase();
  const rest = w.startsWith("h") ? w.slice(1) : w;
  const c = rest[0];
  if (c !== "i" && c !== "u") return false;
  // Si porta accent (í, ú) és tònica -> sí que s'apostrofa
  return true;
}

export function apostrofaCatala(text: string): string {
  if (!text) return text;
  return text.replace(
    /\b(el|la|de)\s+([A-Za-zÀ-ÿ][\wÀ-ÿ·'-]*)/g,
    (match, art: string, word: string) => {
      if (!startsWithVowelSound(word)) return match;
      const lower = art.toLowerCase();
      if (lower === "la" && isUnstressedIU(word)) return match;
      const apos = lower === "de" ? "d'" : "l'";
      const isUpper = art[0] === art[0].toUpperCase();
      const prefix = isUpper ? apos[0].toUpperCase() + apos.slice(1) : apos;
      return prefix + word;
    },
  );
}
