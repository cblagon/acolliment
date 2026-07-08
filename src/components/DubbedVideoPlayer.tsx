import { useEffect, useRef, useState } from "react";
import { Languages, Loader2, Play } from "lucide-react";
import { useLanguages, LANGUAGES } from "@/hooks/useLanguage";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const MAX_UPLOAD_MB = 20;

// Module-level cache shared across mounts.
const dubCache = new Map<string, { url: string; text: string }>();
const inflightDubs = new Map<string, Promise<{ url: string; text: string }>>();

interface Props {
  src: string;
  className?: string;
}

export function DubbedVideoPlayer({ src, className }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { targetLang } = useLanguages();
  const [playing, setPlaying] = useState(false);
  const [dubbing, setDubbing] = useState(false);
  const [dubbedUrl, setDubbedUrl] = useState<string | null>(null);
  const [dubbedLang, setDubbedLang] = useState<string | null>(null);
  const [dubbedText, setDubbedText] = useState<string | null>(null);

  useEffect(() => {
    setDubbedUrl(null);
    setDubbedLang(null);
    setDubbedText(null);
  }, [src]);

  const runDub = async (silent: boolean) => {
    if (!src || dubbing) return;
    if (targetLang === "ca") {
      if (!silent) toast.info("Tria una llengua d'aprenentatge diferent del català per doblar el vídeo.");
      return;
    }
    const cacheKey = `${src}::${targetLang}`;
    const cached = dubCache.get(cacheKey);
    if (cached) {
      setDubbedUrl(cached.url);
      setDubbedLang(targetLang);
      setDubbedText(cached.text || null);
      return;
    }
    setDubbing(true);
    try {
      let promise = inflightDubs.get(cacheKey);
      if (!promise) {
        promise = (async () => {
          const res = await fetch(src);
          if (!res.ok) throw new Error("No s'ha pogut llegir el vídeo");
          const blob = await res.blob();
          const sizeMB = blob.size / (1024 * 1024);
          if (sizeMB > MAX_UPLOAD_MB) {
            throw new Error(`El vídeo pesa ${sizeMB.toFixed(1)} MB (màx. ${MAX_UPLOAD_MB} MB).`);
          }
          const ext = (blob.type.split("/")[1] || "mp4").split(";")[0];
          const file = new File([blob], `video.${ext}`, { type: blob.type || "video/mp4" });
          const form = new FormData();
          form.append("file", file);
          form.append("targetLang", targetLang);

          const { data: sess } = await supabase.auth.getSession();
          const token = sess.session?.access_token;
          const supaUrl = import.meta.env.VITE_SUPABASE_URL;
          const anon = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

          const dubRes = await fetch(`${supaUrl}/functions/v1/dub-video`, {
            method: "POST",
            headers: { apikey: anon, Authorization: `Bearer ${token ?? anon}` },
            body: form,
          });
          if (!dubRes.ok) {
            const txt = await dubRes.text();
            throw new Error(`Error del doblatge: ${dubRes.status} — ${txt.slice(0, 200)}`);
          }
          const audioBlob = await dubRes.blob();
          const url = URL.createObjectURL(audioBlob);
          const translation = decodeURIComponent(dubRes.headers.get("X-Translation") ?? "");
          const entry = { url, text: translation };
          dubCache.set(cacheKey, entry);
          return entry;
        })();
        inflightDubs.set(cacheKey, promise);
        promise.finally(() => inflightDubs.delete(cacheKey));
      }
      const entry = await promise;
      setDubbedUrl(entry.url);
      setDubbedLang(targetLang);
      setDubbedText(entry.text || null);
      if (!silent) toast.success(`Vídeo doblat a ${LANGUAGES[targetLang]?.name ?? targetLang}`);
    } catch (err) {
      console.error(err);
      if (!silent) toast.error(err instanceof Error ? err.message : "No s'ha pogut doblar el vídeo");
    } finally {
      setDubbing(false);
    }
  };

  // Auto-dub on target-lang change.
  useEffect(() => {
    if (!src) return;
    if (targetLang === "ca") return;
    if (dubbedLang === targetLang && dubbedUrl) return;
    const cacheKey = `${src}::${targetLang}`;
    const cached = dubCache.get(cacheKey);
    if (cached) {
      setDubbedUrl(cached.url);
      setDubbedLang(targetLang);
      setDubbedText(cached.text || null);
      return;
    }
    runDub(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, targetLang]);

  const hasDub = !!dubbedUrl;

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      if (hasDub && audioRef.current) {
        audioRef.current.currentTime = v.currentTime;
        audioRef.current.play().catch(() => {});
      }
      setPlaying(true);
    } else {
      v.pause();
      audioRef.current?.pause();
      setPlaying(false);
    }
  };

  return (
    <div className={className}>
      <div className="relative w-full bg-black flex items-center justify-center">
        <video
          ref={videoRef}
          src={src}
          className="max-h-[70vh] w-auto h-auto max-w-full"
          onEnded={() => { setPlaying(false); audioRef.current?.pause(); }}
          onPause={() => audioRef.current?.pause()}
          onSeeked={() => { if (audioRef.current && hasDub) audioRef.current.currentTime = videoRef.current?.currentTime ?? 0; }}
          muted={hasDub}
          playsInline
        />
        {hasDub && <audio ref={audioRef} src={dubbedUrl!} preload="auto" />}
        {!playing && (
          <button
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/20 transition-colors"
          >
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-xl">
              <Play className="w-7 h-7 text-primary-foreground ml-1" />
            </div>
          </button>
        )}
        {playing && <button onClick={togglePlay} className="absolute inset-0" />}
        {hasDub && (
          <div className="absolute bottom-2 left-2 px-2 py-1 rounded-md bg-black/60 text-white text-xs font-semibold">
            🔊 {LANGUAGES[dubbedLang!]?.flag} {LANGUAGES[dubbedLang!]?.nativeName}
          </div>
        )}
      </div>
      <div className="p-3 flex flex-col gap-2 bg-card">
        <button
          onClick={() => runDub(false)}
          disabled={dubbing || targetLang === "ca"}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 disabled:opacity-60 transition-colors self-start"
        >
          {dubbing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Languages className="w-4 h-4" />}
          {dubbing
            ? "Doblant…"
            : targetLang === "ca"
              ? "Tria una llengua d'aprenentatge"
              : hasDub && dubbedLang === targetLang
                ? `Refer doblatge (${LANGUAGES[targetLang]?.name})`
                : `Doblar en ${LANGUAGES[targetLang]?.name ?? targetLang}`}
        </button>
        {hasDub && dubbedText && (
          <p className="text-xs text-muted-foreground italic border-l-2 border-primary/40 pl-2">
            "{dubbedText}"
          </p>
        )}
      </div>
    </div>
  );
}
