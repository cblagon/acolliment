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

// Default pre-loaded videos per slot id
const DEFAULT_VIDEOS: Record<string, string> = {
  "video-A1-1": "/videos/salutacions.mp4",
  "video-A1-3": "/videos/que_portes.mp4",
};

// Override title/description per slot id when the combined block needs a different label
const SLOT_OVERRIDES: Record<string, { title?: string; description?: string }> = {
  "video-A1-1": {
    title: "Salutacions en català",
    description: "Vídeo pràctic amb salutacions quotidianes",
  },
};

// Generate video slots dynamically based on level roleplays
function buildSlots(level: RoleplayLevel): Omit<VideoSlot, "videoUrl">[] {
  const levelRoleplays = getRoleplaysByLevel(level);
  return levelRoleplays.map((rp, i) => {
    const id = `video-${level}-${i + 1}`;
    const override = SLOT_OVERRIDES[id] ?? {};
    return {
      id,
      afterBlocIndex: (i + 1) * 2,
      title: override.title ?? rp.title,
      description: override.description ?? `Roleplay en català: ${rp.title}`,
      roleplayId: rp.id,
    };
  });
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
    return defs.map((d) => ({
      ...d,
      videoUrl: customUrls[d.id] ?? DEFAULT_VIDEOS[d.id] ?? null,
    }));
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
