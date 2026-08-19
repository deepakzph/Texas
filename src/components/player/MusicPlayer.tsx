import { Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePlayer } from "@/context/PlayerContext";
import { Controls } from "@/components/player/Controls";
import { ProgressBar } from "@/components/player/ProgressBar";
import { VolumeControl } from "@/components/player/VolumeControl";
import { Music2 } from "lucide-react";

export function MusicPlayer() {
  const { currentTrack, toggleMiniPlayer } = usePlayer();

  return (
    <div className="flex w-full flex-col gap-2 border-t bg-card/60 px-4 py-3 backdrop-blur">
      <ProgressBar />
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-md bg-muted">
            {currentTrack?.cover ? (
              <img src={currentTrack.cover} alt="" className="size-full object-cover" />
            ) : (
              <Music2 className="size-5 text-muted-foreground" />
            )}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{currentTrack?.title ?? "Nothing playing"}</p>
            <p className="truncate text-xs text-muted-foreground">{currentTrack?.artist ?? "—"}</p>
          </div>
        </div>

        <Controls />

        <div className="flex flex-1 items-center justify-end gap-2">
          <VolumeControl />
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={toggleMiniPlayer}
            aria-label="Switch to mini player"
            className="hidden md:inline-flex"
          >
            <Minimize2 />
          </Button>
        </div>
      </div>
    </div>
  );
}
