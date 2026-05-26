
## Objectiu

Convertir l'app perquè l'alumne pugui **aprendre qualsevol dels 18 idiomes** del selector (no només català), mantenint el català com una opció més. L'abast cobreix **paraules i frases** (fitxes + quiz). Roleplays, cançons i vídeos queden només en català per ara (no els toquem).

## Disseny

Dos selectors independents al header:

- 🎯 **Aprenc:** idioma objectiu (per defecte: català)
- 🌍 **Ajuda en:** idioma de traducció/suport (per defecte: castellà)

Restricció UX: si l'usuari tria el mateix idioma a tots dos, es bloqueja amb un avís petit ("Tria un idioma d'ajuda diferent").

## Què canvia

**Contingut**
- `translations.ts` ja conté cada paraula en els 18 idiomes (inclòs català implícit a la clau). El reorganitzem perquè la clau passi a ser un identificador estable (`hello`, `dog`…) i tots els idiomes (català inclòs) siguin valors. Es genera amb un script puntual a partir del fitxer actual — sense reescriure a mà.
- `blocksData.ts`: cada `Fitxa` passa a tenir només `id`, `emoji` i `frases: Record<LangCode, string>` (frases d'exemple). De moment només omplim català; per a la resta d'idiomes, si no hi ha frase, mostrem només la paraula (sense frase) — així no bloquegem el llançament. Marquem amb `TODO` per anar afegint frases.

**UI**
- `LanguageSelector` es duplica → un per "target" i un per "help".
- `FitxaViewer` / `QuizGame`: cara A mostra la paraula en l'idioma objectiu; cara B la traducció en l'idioma d'ajuda. Frase d'exemple en l'idioma objectiu si existeix.
- `useTTS`: passa a rebre un `langCode` i mapeja a el codi BCP-47 corresponent (`ca-ES`, `es-ES`, `en-GB`, `fr-FR`, `ar-MA`, `it-IT`, `el-GR`, `pt-PT`/`pt-BR`, `uk-UA`, `zh-CN`, `hi-IN`, `ro-RO`, `ur-PK`). Si el navegador no té veu per a aquell idioma (wo, mnk, ha, snk, srk), el botó de 🔊 es desactiva amb tooltip "Pronunciació no disponible al teu navegador".
- Header: títol dinàmic ("Aprèn català!", "Aprende español!", "Learn English!"…) traduït per a UI segons l'idioma d'ajuda. Un fitxer petit `uiStrings.ts` amb les ~20 cadenes d'interfície (botons, capçaleres, labels de nivell) en els 18 idiomes.

**Quedarà igual (no es toca)**
- Roleplays (Remotion), cançons, vídeos pujats: només en català. Es continuen mostrant però amb una nota subtil "Disponible només en català".
- PDF export: actualitzar perquè exporti `target → help` en lloc de `català → help`.
- Editor de blocs: continua creant fitxes en l'idioma objectiu actual.

## Detalls tècnics

- `useLanguage` → `useLanguages()` retorna `{ targetLang, helpLang, setTargetLang, setHelpLang }`. Persistència a localStorage amb dues claus separades.
- Nova funció `getWord(id, lang)` i `getPhrase(id, lang)` substitueixen `getTraduccio()`.
- Script de migració one-off (`scripts/migrate-translations.ts`) que llegeix `translations.ts` actual i genera el nou format amb claus estables (slug del català).
- `useTTS(lang)` amb mapa `LANG_TO_BCP47` i scoring de veus generalitzat. Sense canvis a la qualitat del TTS català existent.

## Què NO inclou aquesta iteració

- Frases d'exemple en els 17 idiomes nous (només català). S'aniran omplint progressivament.
- Roleplays/cançons en altres idiomes.
- Traducció completa d'UI als 18 idiomes (començarem amb 6-7 més rellevants: ca, es, en, fr, ar, ur, uk; la resta cauen a anglès com a fallback).

## Risc

És un canvi gran, toca ~10 fitxers i requereix QA visual a cada idioma. Suggereixo fer-ho com una sola feina d'una tirada un cop aprovat aquest pla.
