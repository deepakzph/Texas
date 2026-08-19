import { useEffect } from "react";
import { usePlayer } from "@/context/PlayerContext";

const SEEK_STEP = 5;
const VOLUME_STEP = 0.1;

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return (
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.isContentEditable
  );
}

export function useKeyboardShortcuts() {
  const {
    currentTrack,
    progress,
    duration,
    volume,
    togglePlay,
    next,
    previous,
    seek,
    setVolume,
    toggleMute,
    toggleShuffle,
    cycleRepeat,
    toggleFavorite,
  } = usePlayer();

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (isTypingTarget(e.target)) return;

      if (e.key === "/") {
        e.preventDefault();
        document.querySelector<HTMLInputElement>('[data-search-input="true"]')?.focus();
        return;
      }

      switch (e.key) {
        case " ":
          e.preventDefault();
          togglePlay();
          break;
        case "ArrowRight":
          if (e.shiftKey) next();
          else seek(Math.min(duration, progress + SEEK_STEP));
          break;
        case "ArrowLeft":
          if (e.shiftKey) previous();
          else seek(Math.max(0, progress - SEEK_STEP));
          break;
        case "ArrowUp":
          e.preventDefault();
          setVolume(Math.min(1, volume + VOLUME_STEP));
          break;
        case "ArrowDown":
          e.preventDefault();
          setVolume(Math.max(0, volume - VOLUME_STEP));
          break;
        case "m":
        case "M":
          toggleMute();
          break;
        case "s":
        case "S":
          toggleShuffle();
          break;
        case "r":
        case "R":
          cycleRepeat();
          break;
        case "f":
        case "F":
          if (currentTrack) toggleFavorite(currentTrack.id);
          break;
        default:
          break;
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [
    currentTrack,
    progress,
    duration,
    volume,
    togglePlay,
    next,
    previous,
    seek,
    setVolume,
    toggleMute,
    toggleShuffle,
    cycleRepeat,
    toggleFavorite,
  ]);
}
