import { type Bloc } from "@/data/blocksData";
import { type VideoSlot } from "@/hooks/useVideoBlocs";
import { VideoBloc } from "./VideoBloc";
import { roleplays } from "@/data/roleplayData";

interface BlocGridProps {
  blocs: Bloc[];
  onSelect: (bloc: Bloc) => void;
  onAddNew: () => void;
  videoSlots: VideoSlot[];
  onVideoChange: (id: string, url: string | null) => void;
}

export function BlocGrid({ blocs, onSelect, onAddNew, videoSlots, onVideoChange }: BlocGridProps) {
  // Build interleaved list of blocs and video slots
  const items: Array<{ type: "bloc"; bloc: Bloc; index: number } | { type: "video"; slot: VideoSlot }> = [];

  let videoIdx = 0;
  const sortedSlots = [...videoSlots].sort((a, b) => a.afterBlocIndex - b.afterBlocIndex);

  blocs.forEach((bloc, i) => {
    items.push({ type: "bloc", bloc, index: i });
    // Insert video slot after this bloc if it matches
    while (videoIdx < sortedSlots.length && sortedSlots[videoIdx].afterBlocIndex === i + 1) {
      items.push({ type: "video", slot: sortedSlots[videoIdx] });
      videoIdx++;
    }
  });

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {items.map((item) => {
        if (item.type === "video") {
          const slot = item.slot;
          const vNum = sortedSlots.indexOf(slot) + 1;
          return (
            <VideoBloc
              key={slot.id}
              index={vNum}
              videoUrl={slot.videoUrl}
              title={slot.title}
              description={slot.description}
              onVideoChange={(url) => onVideoChange(slot.id, url)}
              roleplayData={roleplays.find((r) => r.id === `roleplay-${vNum}`)}
            />
          );
        }
        const { bloc, index } = item;
        return (
          <button
            key={bloc.id}
            onClick={() => onSelect(bloc)}
            className={`group relative flex flex-col items-center justify-center gap-3 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 active:scale-[0.97] ${bloc.color} text-white animate-reveal-up`}
            style={{ animationDelay: `${index * 60}ms` }}
          >
            <span className="text-5xl drop-shadow-sm transition-transform duration-300 group-hover:scale-110">{bloc.emoji}</span>
            <span className="font-bold text-base leading-tight text-center">{bloc.nom}</span>
            <span className="text-xs opacity-80">{bloc.fitxes.length} fitxes</span>
          </button>
        );
      })}
      <button
        onClick={onAddNew}
        className="flex flex-col items-center justify-center gap-3 rounded-2xl p-6 border-2 border-dashed border-muted-foreground/30 text-muted-foreground hover:border-primary hover:text-primary transition-all duration-300 hover:-translate-y-1 active:scale-[0.97] animate-reveal-up"
        style={{ animationDelay: `${blocs.length * 60}ms` }}
      >
        <span className="text-4xl">➕</span>
        <span className="font-bold text-sm">Nou Bloc</span>
      </button>
    </div>
  );
}
