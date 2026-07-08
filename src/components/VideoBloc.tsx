import { useRef, useState, useEffect } from "react";
import { Play, Upload, X, Film, Languages, Loader2 } from "lucide-react";
import { RoleplayPlayer } from "./RoleplayPlayer";
import { VideoOptimizer } from "./VideoOptimizer";
import { type RoleplayData } from "@/data/roleplayData";
import { useLanguages, LANGUAGES } from "@/hooks/useLanguage";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const MAX_UPLOAD_MB = 20;

interface VideoBlocProps {
  index: number;
  videoUrl: string | null;
  title: string;
  description: string;
  onVideoChange: (url: string | null) => void;
  roleplayData?: RoleplayData;
  catalanOnlyNote?: string;
}

export function VideoBloc({ index, videoUrl, title, description, onVideoChange, roleplayData, catalanOnlyNote }: VideoBlocProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [useCustomVideo, setUseCustomVideo] = useState(!!videoUrl);

  const { targetLang } = useLanguages();
  const [dubbing, setDubbing] = useState(false);
  const [dubbedUrl, setDubbedUrl] = useState<string | null>(null);
  const [dubbedLang, setDubbedLang] = useState<string | null>(null);
  const [dubbedText, setDubbedText] = useState<string | null>(null);

  // Reset dubbing when the video source changes
  useEffect(() => {
    if (dubbedUrl) URL.revokeObjectURL(dubbedUrl);
    setDubbedUrl(null);
    setDubbedLang(null);
    setDubbedText(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoUrl]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    onVideoChange(url);
    setUseCustomVideo(true);
  };

  const handleRemove = () => {
    if (videoUrl) URL.revokeObjectURL(videoUrl);
    onVideoChange(null);
    setUseCustomVideo(false);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      if (dubbedUrl && audioRef.current) {
        audioRef.current.currentTime = videoRef.current.currentTime;
        audioRef.current.play().catch(() => {});
      }
      setPlaying(true);
    } else {
      videoRef.current.pause();
      audioRef.current?.pause();
      setPlaying(false);
    }
  };

  const handleDub = async () => {
    if (!videoUrl || dubbing) return;
    if (targetLang === "ca") {
      toast.info("Tria una llengua d'aprenentatge diferent del català per doblar el vídeo.");
      return;
    }
    setDubbing(true);
    try {
      const res = await fetch(videoUrl);
      if (!res.ok) throw new Error("No s'ha pogut llegir el vídeo");
      const blob = await res.blob();
      const sizeMB = blob.size / (1024 * 1024);
      if (sizeMB > 20) {
        toast.error(`El vídeo pesa ${sizeMB.toFixed(1)} MB. Cal que sigui inferior a 20 MB.`);
        setDubbing(false);
        return;
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
        headers: {
          apikey: anon,
          Authorization: `Bearer ${token ?? anon}`,
        },
        body: form,
      });

      if (!dubRes.ok) {
        const txt = await dubRes.text();
        throw new Error(`Error del doblatge: ${dubRes.status} — ${txt.slice(0, 200)}`);
      }
      const audioBlob = await dubRes.blob();
      const url = URL.createObjectURL(audioBlob);
      const translation = decodeURIComponent(dubRes.headers.get("X-Translation") ?? "");
      setDubbedUrl(url);
      setDubbedLang(targetLang);
      setDubbedText(translation || null);
      toast.success(`Vídeo doblat a ${LANGUAGES[targetLang]?.name ?? targetLang}`);
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "No s'ha pogut doblar el vídeo");
    } finally {
      setDubbing(false);
    }
  };

  const showCustomVideo = videoUrl && useCustomVideo;
  const showRoleplay = !!roleplayData;
  const showBoth = showCustomVideo && showRoleplay;
  const hasDub = !!dubbedUrl;

  const VideoPanel = (
    <div className="relative aspect-video bg-muted/50 flex items-center justify-center overflow-hidden">
      <video
        ref={videoRef}
        src={videoUrl ?? undefined}
        className="w-full h-full object-contain bg-card"
        onEnded={() => { setPlaying(false); if (audioRef.current) audioRef.current.pause(); }}
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
      <button
        onClick={handleRemove}
        className="absolute top-2 right-2 p-1.5 rounded-full bg-destructive/80 text-white hover:bg-destructive transition-colors z-10"
      >
        <X className="w-4 h-4" />
      </button>
      {hasDub && (
        <div className="absolute bottom-2 left-2 px-2 py-1 rounded-md bg-black/60 text-white text-xs font-semibold">
          🔊 {LANGUAGES[dubbedLang!]?.flag} {LANGUAGES[dubbedLang!]?.nativeName}
        </div>
      )}
    </div>
  );

  return (
    <div className="col-span-full rounded-2xl overflow-hidden border-2 border-primary/20 bg-card shadow-lg animate-reveal-up">
      <div className="flex flex-col lg:flex-row">
        {/* Media area */}
        <div className={`${showBoth ? "lg:w-2/3" : "lg:w-1/2"} flex flex-col sm:flex-row`}>
          {showBoth ? (
            <>
              <div className="sm:w-1/2"><RoleplayPlayer data={roleplayData!} /></div>
              <div className="sm:w-1/2">{VideoPanel}</div>
            </>
          ) : showCustomVideo ? (
            <div className="w-full">{VideoPanel}</div>
          ) : showRoleplay ? (
            <div className="w-full aspect-video"><RoleplayPlayer data={roleplayData!} /></div>
          ) : (
            <div className="w-full aspect-video bg-muted/50 flex items-center justify-center">
              <button
                onClick={() => fileRef.current?.click()}
                className="flex flex-col items-center gap-3 p-8 text-muted-foreground hover:text-primary transition-colors"
              >
                <div className="w-16 h-16 rounded-full border-2 border-dashed border-current flex items-center justify-center">
                  <Upload className="w-7 h-7" />
                </div>
                <span className="text-sm font-semibold">Puja un vídeo MP4</span>
              </button>
            </div>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="video/mp4,video/webm,video/*"
            className="hidden"
            onChange={handleFile}
          />
        </div>


        {/* Info area */}
        <div className={`${showBoth ? "lg:w-1/3" : "lg:w-1/2"} p-5 sm:p-6 flex flex-col justify-center gap-3`}>
          <div className="flex items-center gap-2">
            <Film className="w-5 h-5 text-primary" />
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Vídeo pràctic {index}
            </span>
          </div>
          <h3 className="text-xl font-extrabold text-foreground leading-tight">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
              🎬 Conversa real
            </span>
            <span className="px-2.5 py-1 rounded-full bg-accent/20 text-accent-foreground text-xs font-bold">
              👥 15-16 anys
            </span>
            {catalanOnlyNote && (
              <span className="px-2.5 py-1 rounded-full bg-muted text-muted-foreground text-xs font-semibold">
                🇪🇸 {catalanOnlyNote}
              </span>
            )}
          </div>

          {showCustomVideo && (
            <div className="mt-3 flex flex-col gap-2">
              <button
                onClick={handleDub}
                disabled={dubbing}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 disabled:opacity-60 transition-colors self-start"
              >
                {dubbing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Languages className="w-4 h-4" />}
                {dubbing
                  ? "Doblant… (pot trigar uns segons)"
                  : hasDub && dubbedLang === targetLang
                    ? `Refer doblatge (${LANGUAGES[targetLang]?.name})`
                    : `Doblar en ${LANGUAGES[targetLang]?.name ?? targetLang}`}
              </button>
              {hasDub && dubbedText && (
                <p className="text-xs text-muted-foreground italic border-l-2 border-primary/40 pl-2">
                  "{dubbedText}"
                </p>
              )}
              <p className="text-[11px] text-muted-foreground">
                🎙️ Es tradueix la veu i es reprodueix en la llengua d'aprenentatge escollida (màx. 20 MB).
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
