import { Pause, Play, Repeat, Repeat1, Shuffle, SkipBack, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePlayer } from "@/context/PlayerContext";
import { cn } from "@/lib/utils";

export function Controls() {
  const {
    isPlaying,
    shuffle,
    repeatMode,
    togglePlay,
    next,
    previous,
    toggleShuffle,
    cycleRepeat,
    currentTrack,
  } = usePlayer();

  const RepeatIcon = repeatMode === "one" ? Repeat1 : Repeat;

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={toggleShuffle}
        aria-pressed={shuffle}
        aria-label="Toggle shuffle"
        className={cn(shuffle && "bg-primary/15 text-primary hover:bg-primary/20")}
      >
        <Shuffle />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={previous}
        disabled={!currentTrack}
        aria-label="Previous track"
      >
        <SkipBack />
      </Button>
      <Button
        variant="default"
        size="icon-lg"
        onClick={togglePlay}
        disabled={!currentTrack}
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? <Pause /> : <Play />}
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={next}
        disabled={!currentTrack}
        aria-label="Next track"
      >
        <SkipForward />
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={cycleRepeat}
        aria-pressed={repeatMode !== "off"}
        aria-label={`Repeat: ${repeatMode}`}
        className={cn(repeatMode !== "off" && "bg-primary/15 text-primary hover:bg-primary/20")}
      >
        <RepeatIcon />
      </Button>
    </div>
  );
}
