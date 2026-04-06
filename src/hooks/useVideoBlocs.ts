import { useState, useCallback, useMemo } from "react";
import { type RoleplayLevel, getRoleplaysByLevel } from "@/data/roleplayData";

export interface VideoSlot {
  id: string;
  afterBlocIndex: number;
  title: string;
  description: string;
  videoUrl: string | null;
  roleplayId: string;
}

const STORAGE_KEY = "apren-catala-videos";

// Generate video slots dynamically based on level roleplays
function buildSlots(level: RoleplayLevel): Omit<VideoSlot, "videoUrl">[] {
  const levelRoleplays = getRoleplaysByLevel(level);
  // Place a video after every 2 blocs (positions 2, 4, 6, 8, ...)
  return levelRoleplays.map((rp, i) => ({
    id: `video-${level}-${i + 1}`,
    afterBlocIndex: (i + 1) * 2,
    title: rp.title,
    description: `Roleplay en català: ${rp.title}`,
    roleplayId: rp.id,
  }));
}

export function useVideoBlocs(level: RoleplayLevel = "A1") {
  const [customUrls, setCustomUrls] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const slots = useMemo(() => {
    const defs = buildSlots(level);
    return defs.map((d) => ({ ...d, videoUrl: customUrls[d.id] ?? null }));
  }, [level, customUrls]);

  const setVideoUrl = useCallback((id: string, url: string | null) => {
    setCustomUrls((prev) => {
      const next = { ...prev };
      if (url) next[id] = url;
      else delete next[id];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return { videoSlots: slots, setVideoUrl };
}
