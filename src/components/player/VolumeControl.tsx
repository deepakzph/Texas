import { Volume1, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { usePlayer } from "@/context/PlayerContext";
import { sliderValue } from "@/lib/utils";

export function VolumeControl() {
  const { volume, isMuted, setVolume, toggleMute } = usePlayer();

  const Icon = isMuted || volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

  return (
    <div className="flex w-32 items-center gap-2">
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={toggleMute}
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        <Icon />
      </Button>
      <Slider
        value={[isMuted ? 0 : volume]}
        min={0}
        max={1}
        step={0.01}
        onValueChange={(value) => setVolume(sliderValue(value))}
        aria-label="Volume"
      />
    </div>
  );
}
