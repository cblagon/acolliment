import { type Bloc } from "@/data/blocksData";
import { type VideoSlot } from "@/hooks/useVideoBlocs";
import { type LangCode } from "@/hooks/useLanguage";
import { VideoBloc } from "./VideoBloc";
import { roleplays } from "@/data/roleplayData";
import { t } from "@/i18n/ui";


interface BlocGridProps {
  blocs: Bloc[];
  onSelect: (bloc: Bloc) => void;
  onAddNew: () => void;
  videoSlots: VideoSlot[];
  onVideoChange: (id: string, url: string | null) => void;
  helpLang: LangCode;
  targetLang: LangCode;
  isAuthenticated?: boolean;
  loginToAddLabel?: string;
  pendingIds?: Set<string>;
  rejectedIds?: Set<string>;
}

export function BlocGrid({ blocs, onSelect, onAddNew, videoSlots, onVideoChange, helpLang, targetLang, isAuthenticated = false, loginToAddLabel, pendingIds, rejectedIds }: BlocGridProps) {
  // Build interleaved list of blocs and video slots
  const items: Array<{ type: "bloc"; bloc: Bloc; index: number } | { type: "video"; slot: VideoSlot }> = [];

  let videoIdx = 0;
  const sortedSlots = [...videoSlots].sort((a, b) => a.afterBlocIndex - b.afterBlocIndex);

  blocs.forEach((bloc, i) => {
    items.push({ type: "bloc", bloc, index: i });
    while (videoIdx < sortedSlots.length && sortedSlots[videoIdx].afterBlocIndex === i + 1) {
      items.push({ type: "video", slot: sortedSlots[videoIdx] });
      videoIdx++;
    }
  });

  const showCatalanOnlyNote = targetLang !== "ca";

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
              roleplayData={roleplays.find((r) => r.id === slot.roleplayId)}
              catalanOnlyNote={showCatalanOnlyNote ? t(helpLang, "videoCatalanOnly") : undefined}
            />
          );
        }
        const { bloc, index } = item;
        const isPending = pendingIds?.has(bloc.id);
        const isRejected = rejectedIds?.has(bloc.id);
        return (
          <button
            key={bloc.id}
            onClick={() => onSelect(bloc)}
            className={`group relative flex flex-col items-center justify-center gap-3 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 active:scale-[0.97] ${bloc.color} text-white animate-reveal-up`}
            style={{ animationDelay: `${index * 60}ms` }}
          >
            {isPending && (
              <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-amber-400 text-amber-900 text-[10px] font-bold border border-amber-600 shadow-sm">
                ⏳ Pendent
              </span>
            )}
            {isRejected && (
              <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-red-400 text-red-900 text-[10px] font-bold border border-red-600 shadow-sm">
                ❌ Rebutjat
              </span>
            )}
            <span className="text-5xl drop-shadow-sm transition-transform duration-300 group-hover:scale-110">{bloc.emoji}</span>
            <span className="font-bold text-base leading-tight text-center">{bloc.nom}</span>
            <span className="text-xs opacity-80">{bloc.fitxes.length} {t(helpLang, "fitxesCount")}</span>
          </button>
        );
      })}
      <button
        onClick={onAddNew}
        title={!isAuthenticated ? loginToAddLabel : undefined}
        className="flex flex-col items-center justify-center gap-3 rounded-2xl p-6 border-2 border-dashed border-muted-foreground/30 text-muted-foreground hover:border-primary hover:text-primary transition-all duration-300 hover:-translate-y-1 active:scale-[0.97] animate-reveal-up"
        style={{ animationDelay: `${blocs.length * 60}ms` }}
      >
        <span className="text-4xl">{isAuthenticated ? "➕" : "🔒"}</span>
        <span className="font-bold text-sm text-center leading-tight">
          {isAuthenticated ? t(helpLang, "newBloc") : (loginToAddLabel ?? t(helpLang, "newBloc"))}
        </span>
      </button>
    </div>
  );
}

