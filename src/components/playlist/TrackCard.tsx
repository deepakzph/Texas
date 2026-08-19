import { Music2, Volume2 } from "lucide-react";
import { usePlayer } from "@/context/PlayerContext";
import { FavoriteButton } from "@/components/playlist/FavoriteButton";
import { cn, formatTime } from "@/lib/utils";
import type { Track } from "@/types/music";

export function TrackCard({ track, libraryIndex }: { track: Track; libraryIndex: number }) {
  const { currentTrack, isPlaying, playTrack, togglePlay } = usePlayer();
  const isCurrent = currentTrack?.id === track.id;

  function handleActivate() {
    if (isCurrent) togglePlay();
    else playTrack(libraryIndex);
  }

  return (
    // A native <button> can't contain the favorite <button> below (invalid HTML — the
    // browser silently un-nests it and breaks click targeting), so this row is a
    // keyboard-accessible div instead.
    <div
      role="button"
      tabIndex={0}
      onClick={handleActivate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleActivate();
        }
      }}
      aria-current={isCurrent}
      className={cn(
        "flex w-full cursor-pointer items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-muted",
        isCurrent && "bg-muted"
      )}
    >
      <div className="relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md bg-background">
        {track.cover ? (
          <img src={track.cover} alt="" className="size-full object-cover" />
        ) : (
          <Music2 className="size-4 text-muted-foreground" />
        )}
        {isCurrent && isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/70">
            <Volume2 className="size-4 animate-pulse text-primary" />
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className={cn("truncate text-sm", isCurrent && "font-medium text-primary")}>{track.title}</p>
        <p className="truncate text-xs text-muted-foreground">{track.artist}</p>
      </div>
      {track.duration !== undefined && (
        <span className="text-xs tabular-nums text-muted-foreground">{formatTime(track.duration)}</span>
      )}
      <FavoriteButton trackId={track.id} />
    </div>
  );
}
