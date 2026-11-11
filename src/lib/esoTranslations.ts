import type { LangCode } from "@/hooks/useLanguage";
import { invokeQueued } from "@/lib/aiQueue";

const pending = new Map<string, Promise<string[]>>();

/** Translate Catalan ESO content without silently substituting another language. */
export function translateEsoLines(lines: string[], lang: LangCode): Promise<string[]> {
  if (lang === "ca" || lines.length === 0) return Promise.resolve(lines);
  const key = `eso-translations:v1:${lang}:${JSON.stringify(lines)}`;
  const valid = (value: unknown): value is string[] => Array.isArray(value)
    && value.length === lines.length && value.every((line) => typeof line === "string" && line.trim().length > 0);
  try {
    const cached: unknown = JSON.parse(localStorage.getItem(key) ?? "null");
    if (valid(cached)) return Promise.resolve(cached);
  } catch { /* Ignore unavailable storage or invalid cached data. */ }
  const existing = pending.get(key);
  if (existing) return existing;
  const request = invokeQueued<{ lines?: string[] }>("ai-text-tools", {
    action: "translate-lines", targetLang: lang, lines,
  }).then((response) => {
    if (!valid(response.lines)) throw new Error("Incomplete ESO translation");
    try { localStorage.setItem(key, JSON.stringify(response.lines)); } catch { /* Storage is optional. */ }
    return response.lines;
  }).finally(() => pending.delete(key));
  pending.set(key, request);
  return request;
}