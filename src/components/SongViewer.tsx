import { type Bloc } from "@/data/blocksData";
import { getSongsForBloc, type Song } from "@/data/songsData";
import { ArrowLeft, Music, Play } from "lucide-react";
import { useState } from "react";

interface SongViewerProps {
  bloc: Bloc;
  onBack: () => void;
}

export function SongViewer({ bloc, onBack }: SongViewerProps) {
  const songs = getSongsForBloc(bloc.id);
  const [activeSong, setActiveSong] = useState<Song | null>(null);

  return (
    <div className="flex flex-col items-center gap-6 animate-reveal-up max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors active:scale-95"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold text-sm">Tornar</span>
        </button>
        <h2 className="text-xl font-extrabold flex items-center gap-2">
          <Music className="w-5 h-5" />
          <span>{bloc.emoji}</span> Cançons — {bloc.nom}
        </h2>
        <div className="w-16" />
      </div>

      {/* Active video */}
      {activeSong && (
        <div className="w-full rounded-2xl overflow-hidden shadow-lg border border-border bg-card animate-reveal-up">
          <div className="aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${activeSong.youtubeId}?autoplay=1`}
              title={activeSong.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
          <div className="p-4">
            <h3 className="font-bold text-foreground">{activeSong.title}</h3>
            <p className="text-sm text-muted-foreground">{activeSong.artist}</p>
            <p className="text-sm text-muted-foreground mt-1">{activeSong.description}</p>
          </div>
        </div>
      )}

      {/* Song list */}
      {songs.length === 0 ? (
        <div className="text-center py-12">
          <span className="text-5xl">🎵</span>
          <p className="text-muted-foreground mt-3">Encara no hi ha cançons per aquest bloc.</p>
        </div>
      ) : (
        <div className="w-full space-y-3">
          {!activeSong && (
            <p className="text-sm text-muted-foreground text-center">
              🎵 Tria una cançó per escoltar-la i aprendre vocabulari!
            </p>
          )}
          {songs.map((song) => {
            const isActive = activeSong?.youtubeId === song.youtubeId;
            return (
              <button
                key={song.youtubeId}
                onClick={() => setActiveSong(isActive ? null : song)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-300 active:scale-[0.98] text-left ${
                  isActive
                    ? `${bloc.color} text-white border-transparent shadow-lg`
                    : "bg-card border-border hover:border-primary hover:shadow-md"
                }`}
              >
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                    isActive ? "bg-white/20" : `${bloc.color} text-white`
                  }`}
                >
                  <Play className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-bold text-sm truncate ${isActive ? "text-white" : "text-foreground"}`}>
                    {song.title}
                  </h3>
                  <p className={`text-xs truncate ${isActive ? "text-white/80" : "text-muted-foreground"}`}>
                    {song.artist}
                  </p>
                  <p className={`text-xs mt-0.5 line-clamp-1 ${isActive ? "text-white/70" : "text-muted-foreground/80"}`}>
                    {song.description}
                  </p>
                </div>
                <span className="text-2xl flex-shrink-0">🎵</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
