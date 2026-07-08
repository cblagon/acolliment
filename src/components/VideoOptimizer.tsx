import { useEffect, useRef, useState } from "react";
import { Loader2, Scissors, Wand2, X } from "lucide-react";
import { toast } from "sonner";

interface VideoOptimizerProps {
  file: File;
  maxMB?: number;
  onCancel: () => void;
  onReady: (optimized: File) => void;
}

/**
 * Pre-processor for MP4/WebM files that exceed the transcription size limit.
 * Lets the user TRIM (choose start/end) and/or COMPRESS (re-encode at lower
 * bitrate / 720p) directly in the browser via MediaRecorder before sending
 * the file to the dubbing edge function.
 */
export function VideoOptimizer({ file, maxMB = 20, onCancel, onReady }: VideoOptimizerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [url, setUrl] = useState<string>("");
  const [duration, setDuration] = useState(0);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [compress, setCompress] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState<string>("");

  const sizeMB = file.size / (1024 * 1024);

  useEffect(() => {
    const u = URL.createObjectURL(file);
    setUrl(u);
    return () => URL.revokeObjectURL(u);
  }, [file]);

  const onLoaded = () => {
    const d = videoRef.current?.duration ?? 0;
    if (!isFinite(d)) return;
    setDuration(d);
    setStart(0);
    setEnd(d);
  };

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const r = Math.floor(s % 60);
    return `${m}:${r.toString().padStart(2, "0")}`;
  };

  // Rough estimate of resulting size assuming ~800 kbps video + 96 kbps audio when compressing,
  // or proportional trim of the original bitrate.
  const estimatedMB = (() => {
    const dur = Math.max(0.1, end - start);
    if (compress) {
      const bitsPerSec = 800_000 + 96_000;
      return (bitsPerSec * dur) / 8 / (1024 * 1024);
    }
    const originalBitrate = (file.size * 8) / Math.max(1, duration);
    return (originalBitrate * dur) / 8 / (1024 * 1024);
  })();

  const process = async () => {
    if (!videoRef.current) return;
    if (end - start < 0.5) {
      toast.error("El fragment ha de durar més de mig segon.");
      return;
    }
    setProcessing(true);
    setProgress("Preparant el vídeo…");
    try {
      const src = videoRef.current;

      // Target dimensions
      const targetW = compress ? Math.min(1280, src.videoWidth) : src.videoWidth;
      const scale = targetW / src.videoWidth;
      const targetH = Math.round(src.videoHeight * scale);

      const canvas = document.createElement("canvas");
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas no disponible");

      // Video stream from canvas
      const canvasStream = (canvas as HTMLCanvasElement).captureStream(30);

      // Audio: play the video muted and grab its audio via WebAudio
      const AudioCtx: typeof AudioContext =
        (window.AudioContext as typeof AudioContext) ||
        ((window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext);
      const audioCtx = new AudioCtx();
      const sourceNode = audioCtx.createMediaElementSource(src);
      const destNode = audioCtx.createMediaStreamDestination();
      sourceNode.connect(destNode);
      // We do NOT connect to audioCtx.destination so the user doesn't hear it.

      const combined = new MediaStream([
        ...canvasStream.getVideoTracks(),
        ...destNode.stream.getAudioTracks(),
      ]);

      // Pick the best supported mime
      const candidates = [
        "video/webm;codecs=vp9,opus",
        "video/webm;codecs=vp8,opus",
        "video/webm",
      ];
      const mime = candidates.find((m) => MediaRecorder.isTypeSupported(m)) || "video/webm";

      const chunks: Blob[] = [];
      const recorder = new MediaRecorder(combined, {
        mimeType: mime,
        videoBitsPerSecond: compress ? 800_000 : 2_500_000,
        audioBitsPerSecond: 96_000,
      });
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      const done = new Promise<Blob>((resolve, reject) => {
        recorder.onstop = () => resolve(new Blob(chunks, { type: mime }));
        recorder.onerror = (e) => reject(e);
      });

      // Seek to start
      setProgress("Retallant i comprimint…");
      src.muted = false; // needed for WebAudio to receive audio
      src.volume = 0.0001; // silence for the user, still routed through audio graph
      src.currentTime = start;
      await new Promise<void>((res) => {
        const h = () => {
          src.removeEventListener("seeked", h);
          res();
        };
        src.addEventListener("seeked", h);
      });

      recorder.start(250);
      await src.play();

      let raf = 0;
      const draw = () => {
        ctx.drawImage(src, 0, 0, targetW, targetH);
        if (src.currentTime < end && !src.paused && !src.ended) {
          raf = requestAnimationFrame(draw);
        }
      };
      raf = requestAnimationFrame(draw);

      await new Promise<void>((resolve) => {
        const check = () => {
          if (src.currentTime >= end || src.ended) {
            src.pause();
            cancelAnimationFrame(raf);
            resolve();
          } else {
            setTimeout(check, 100);
          }
        };
        check();
      });

      recorder.stop();
      const blob = await done;
      try { await audioCtx.close(); } catch { /* noop */ }

      const outMB = blob.size / (1024 * 1024);
      if (outMB > maxMB) {
        toast.warning(
          `El resultat encara pesa ${outMB.toFixed(1)} MB. Prova de retallar un fragment més curt.`
        );
        setProcessing(false);
        setProgress("");
        return;
      }

      const base = file.name.replace(/\.[^.]+$/, "");
      const optimized = new File([blob], `${base}-optim.webm`, { type: mime });
      toast.success(`Vídeo llest: ${outMB.toFixed(1)} MB`);
      onReady(optimized);
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "No s'ha pogut processar el vídeo");
    } finally {
      setProcessing(false);
      setProgress("");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="bg-card rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-2">
            <Scissors className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-extrabold">Prepara el vídeo abans de doblar-lo</h3>
          </div>
          <button
            onClick={onCancel}
            disabled={processing}
            className="p-1 rounded-full hover:bg-muted"
            aria-label="Tancar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 p-3 text-sm text-amber-900 dark:text-amber-100">
            <p className="font-semibold mb-1">Aquest vídeo pesa {sizeMB.toFixed(1)} MB.</p>
            <p>
              El servei de transcripció només accepta fitxers de fins a <b>{maxMB} MB</b>. Pots{" "}
              <b>retallar</b> el fragment que t'interessa i/o <b>comprimir-lo</b> aquí mateix, sense
              tornar a pujar-lo. La còpia original no es modifica.
            </p>
          </div>

          <video
            ref={videoRef}
            src={url}
            onLoadedMetadata={onLoaded}
            className="w-full rounded-lg bg-black aspect-video"
            controls
            playsInline
          />

          {duration > 0 && (
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-muted-foreground uppercase">
                  Inici: {fmt(start)}
                </label>
                <input
                  type="range"
                  min={0}
                  max={duration}
                  step={0.1}
                  value={start}
                  disabled={processing}
                  onChange={(e) => {
                    const v = Math.min(parseFloat(e.target.value), end - 0.5);
                    setStart(v);
                    if (videoRef.current) videoRef.current.currentTime = v;
                  }}
                  className="w-full accent-primary"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-muted-foreground uppercase">
                  Final: {fmt(end)}
                </label>
                <input
                  type="range"
                  min={0}
                  max={duration}
                  step={0.1}
                  value={end}
                  disabled={processing}
                  onChange={(e) => {
                    const v = Math.max(parseFloat(e.target.value), start + 0.5);
                    setEnd(v);
                  }}
                  className="w-full accent-primary"
                />
              </div>

              <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={compress}
                  disabled={processing}
                  onChange={(e) => setCompress(e.target.checked)}
                  className="w-4 h-4 accent-primary"
                />
                <Wand2 className="w-4 h-4 text-primary" />
                Comprimir (720p, qualitat mitjana — recomanat)
              </label>

              <div className="text-xs text-muted-foreground">
                Durada seleccionada: <b>{fmt(end - start)}</b> · Mida estimada:{" "}
                <b className={estimatedMB > maxMB ? "text-destructive" : "text-primary"}>
                  ≈ {estimatedMB.toFixed(1)} MB
                </b>
                {estimatedMB > maxMB && " (encara massa gran, retalla més)"}
              </div>
            </div>
          )}

          {progress && (
            <div className="flex items-center gap-2 text-sm text-primary">
              <Loader2 className="w-4 h-4 animate-spin" />
              {progress}
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-2 p-5 border-t border-border">
          <button
            onClick={onCancel}
            disabled={processing}
            className="px-4 py-2 rounded-lg border border-border text-sm font-bold hover:bg-muted"
          >
            Cancel·lar
          </button>
          <button
            onClick={process}
            disabled={processing || duration === 0}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 disabled:opacity-60"
          >
            {processing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Scissors className="w-4 h-4" />}
            {processing ? "Processant…" : "Retalla i continua"}
          </button>
        </div>
      </div>
    </div>
  );
}
