import { motion } from "framer-motion";
import { Maximize2, Music2, Pause, Play, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePlayer } from "@/context/PlayerContext";

export function MiniPlayer() {
  const { currentTrack, isPlaying, togglePlay, next, toggleMiniPlayer, progress, duration } =
    usePlayer();

  const pct = duration > 0 ? (progress / duration) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className="fixed right-4 bottom-4 z-40 flex w-72 items-center gap-3 overflow-hidden rounded-xl border bg-card p-3 shadow-xl"
    >
      <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-md bg-muted">
        {currentTrack?.cover ? (
          <img src={currentTrack.cover} alt="" className="size-full object-cover" />
        ) : (
          <Music2 className="size-5 text-muted-foreground" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{currentTrack?.title ?? "Nothing playing"}</p>
        <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full bg-primary" style={{ width: `${pct}%` }} />
        </div>
      </div>
      <Button variant="ghost" size="icon-sm" onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"}>
        {isPlaying ? <Pause /> : <Play />}
      </Button>
      <Button variant="ghost" size="icon-sm" onClick={next} aria-label="Next track">
        <SkipForward />
      </Button>
      <Button variant="ghost" size="icon-sm" onClick={toggleMiniPlayer} aria-label="Expand player">
        <Maximize2 />
      </Button>
    </motion.div>
  );
}
