import { useState, useEffect } from "react";
import { defaultBlocs, type Bloc, type Level } from "@/data/blocksData";

const STORAGE_KEY = "apren-catala-blocs";

export function useBlocs(level?: Level) {
  const [allBlocs, setAllBlocs] = useState<Bloc[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Bloc[];
        const defaultIds = new Set(defaultBlocs.map((b) => b.id));
        const customBlocs = parsed.filter((b) => !defaultIds.has(b.id));
        return [...defaultBlocs, ...customBlocs];
      }
    } catch {}
    return defaultBlocs;
  });

  useEffect(() => {
    const defaultIds = new Set(defaultBlocs.map((b) => b.id));
    const custom = allBlocs.filter((b) => !defaultIds.has(b.id));
    if (custom.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allBlocs));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [allBlocs]);

  const blocs = level ? allBlocs.filter((b) => b.level === level) : allBlocs;

  const addBloc = (bloc: Bloc) => setAllBlocs((prev) => [...prev, bloc]);
  const updateBloc = (id: string, bloc: Bloc) =>
    setAllBlocs((prev) => prev.map((b) => (b.id === id ? bloc : b)));
  const removeBloc = (id: string) =>
    setAllBlocs((prev) => prev.filter((b) => b.id !== id));

  return { blocs, addBloc, updateBloc, removeBloc };
}
