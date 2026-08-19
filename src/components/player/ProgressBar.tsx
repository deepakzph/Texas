import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { usePlayer } from "@/context/PlayerContext";
import { formatTime, sliderValue } from "@/lib/utils";

export function ProgressBar() {
  const { progress, duration, seek } = usePlayer();
  const [dragValue, setDragValue] = useState<number | null>(null);

  const displayValue = dragValue ?? progress;

  return (
    <div className="flex w-full items-center gap-2 text-xs text-muted-foreground">
      <span className="w-10 text-right tabular-nums">{formatTime(displayValue)}</span>
      <Slider
        value={[displayValue]}
        min={0}
        max={Math.max(duration, 1)}
        step={1}
        onValueChange={(value) => setDragValue(sliderValue(value))}
        onValueCommitted={(value) => {
          seek(sliderValue(value));
          setDragValue(null);
        }}
        aria-label="Seek"
      />
      <span className="w-10 tabular-nums">{formatTime(duration)}</span>
    </div>
  );
}
