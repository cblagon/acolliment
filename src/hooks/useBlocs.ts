import { useState, useEffect } from "react";
import { defaultBlocs, type Bloc } from "@/data/blocksData";

const STORAGE_KEY = "apren-catala-blocs";

export function useBlocs() {
  const [blocs, setBlocs] = useState<Bloc[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Bloc[];
        // Merge: keep saved custom blocks + update defaults
        const defaultIds = new Set(defaultBlocs.map((b) => b.id));
        const customBlocs = parsed.filter((b) => !defaultIds.has(b.id));
        return [...defaultBlocs, ...customBlocs];
      }
    } catch {}
    return defaultBlocs;
  });

  useEffect(() => {
    // Only save custom blocks (non-default)
    const defaultIds = new Set(defaultBlocs.map((b) => b.id));
    const custom = blocs.filter((b) => !defaultIds.has(b.id));
    if (custom.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(blocs));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [blocs]);

  const addBloc = (bloc: Bloc) => setBlocs((prev) => [...prev, bloc]);
  const updateBloc = (id: string, bloc: Bloc) =>
    setBlocs((prev) => prev.map((b) => (b.id === id ? bloc : b)));
  const removeBloc = (id: string) =>
    setBlocs((prev) => prev.filter((b) => b.id !== id));

  return { blocs, addBloc, updateBloc, removeBloc };
}
