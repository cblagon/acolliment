import { useState, useCallback } from "react";

export interface VideoSlot {
  id: string;
  afterBlocIndex: number; // appears after this many blocs (2, 5, 8, 11, 14, 17)
  title: string;
  description: string;
  videoUrl: string | null;
}

const defaultVideoSlots: Omit<VideoSlot, "videoUrl">[] = [
  {
    id: "video-1",
    afterBlocIndex: 2,
    title: "Saludar i presentar-se",
    description: "Dos alumnes es presenten per primera vegada: diuen el seu nom, d'on vénen i es saluden en català.",
  },
  {
    id: "video-2",
    afterBlocIndex: 5,
    title: "Anem al mercat!",
    description: "Una conversa al mercat: demanar fruita, preguntar el preu i donar les gràcies en català.",
  },
  {
    id: "video-3",
    afterBlocIndex: 8,
    title: "A classe d'educació física",
    description: "Alumnes parlant al gimnàs: noms dels esports, com es senten i què els agrada fer.",
  },
  {
    id: "video-4",
    afterBlocIndex: 11,
    title: "Descrivim com som",
    description: "Alumnes descrivint-se: la roba que porten, les emocions que senten i parts del cos.",
  },
  {
    id: "video-5",
    afterBlocIndex: 14,
    title: "Un dia qualsevol",
    description: "Conversa sobre la rutina diària: dies de la setmana, transport, casa i família.",
  },
  {
    id: "video-6",
    afterBlocIndex: 17,
    title: "Juguem i sortim!",
    description: "Alumnes parlant de jocs de taula, natura i colors que veuen al voltant.",
  },
];

const STORAGE_KEY = "apren-catala-videos";

export function useVideoBlocs() {
  const [slots, setSlots] = useState<VideoSlot[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as VideoSlot[];
        // Merge defaults with saved URLs
        return defaultVideoSlots.map((d) => {
          const saved_slot = parsed.find((s) => s.id === d.id);
          return { ...d, videoUrl: saved_slot?.videoUrl ?? null };
        });
      }
    } catch {}
    return defaultVideoSlots.map((d) => ({ ...d, videoUrl: null }));
  });

  const setVideoUrl = useCallback((id: string, url: string | null) => {
    setSlots((prev) => {
      const updated = prev.map((s) => (s.id === id ? { ...s, videoUrl: url } : s));
      // Save only slots with videos
      const toSave = updated.filter((s) => s.videoUrl);
      if (toSave.length > 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
      return updated;
    });
  }, []);

  return { videoSlots: slots, setVideoUrl };
}
