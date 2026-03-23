import { useRef, useState } from "react";
import { Play, Upload, X, Film } from "lucide-react";

interface VideoBlocProps {
  index: number;
  videoUrl: string | null;
  title: string;
  description: string;
  onVideoChange: (url: string | null) => void;
}

export function VideoBloc({ index, videoUrl, title, description, onVideoChange }: VideoBlocProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    onVideoChange(url);
  };

  const handleRemove = () => {
    if (videoUrl) URL.revokeObjectURL(videoUrl);
    onVideoChange(null);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setPlaying(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  return (
    <div className="col-span-full rounded-2xl overflow-hidden border-2 border-primary/20 bg-card shadow-lg animate-reveal-up">
      <div className="flex flex-col sm:flex-row">
        {/* Video area */}
        <div className="relative sm:w-1/2 aspect-video bg-muted/50 flex items-center justify-center">
          {videoUrl ? (
            <>
              <video
                ref={videoRef}
                src={videoUrl}
                className="w-full h-full object-cover"
                onEnded={() => setPlaying(false)}
                playsInline
              />
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
              {playing && (
                <button
                  onClick={togglePlay}
                  className="absolute inset-0"
                />
              )}
              <button
                onClick={handleRemove}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-destructive/80 text-white hover:bg-destructive transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          ) : (
            <button
              onClick={() => fileRef.current?.click()}
              className="flex flex-col items-center gap-3 p-8 text-muted-foreground hover:text-primary transition-colors"
            >
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-current flex items-center justify-center">
                <Upload className="w-7 h-7" />
              </div>
              <span className="text-sm font-semibold">Puja un vídeo MP4</span>
            </button>
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
        <div className="sm:w-1/2 p-5 sm:p-6 flex flex-col justify-center gap-3">
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
          <div className="flex items-center gap-2 mt-1">
            <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
              🎬 Conversa real
            </span>
            <span className="px-2.5 py-1 rounded-full bg-accent/20 text-accent-foreground text-xs font-bold">
              👥 15-16 anys
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
