import { useEffect } from "react";
import { usePlayer } from "@/context/PlayerContext";

// Wires the browser / OS lock-screen media controls (Media Session API) to the player.
export function useMediaSession() {
  const { currentTrack, isPlaying, togglePlay, next, previous, seek, progress, duration } =
    usePlayer();

  useEffect(() => {
    if (!("mediaSession" in navigator) || !currentTrack) return;

    navigator.mediaSession.metadata = new MediaMetadata({
      title: currentTrack.title,
      artist: currentTrack.artist,
      artwork: currentTrack.cover
        ? [{ src: currentTrack.cover, sizes: "512x512", type: "image/png" }]
        : [],
    });

    navigator.mediaSession.setActionHandler("play", togglePlay);
    navigator.mediaSession.setActionHandler("pause", togglePlay);
    navigator.mediaSession.setActionHandler("nexttrack", next);
    navigator.mediaSession.setActionHandler("previoustrack", previous);
    navigator.mediaSession.setActionHandler("seekto", (details) => {
      if (typeof details.seekTime === "number") seek(details.seekTime);
    });

    return () => {
      navigator.mediaSession.setActionHandler("play", null);
      navigator.mediaSession.setActionHandler("pause", null);
      navigator.mediaSession.setActionHandler("nexttrack", null);
      navigator.mediaSession.setActionHandler("previoustrack", null);
      navigator.mediaSession.setActionHandler("seekto", null);
    };
  }, [currentTrack, togglePlay, next, previous, seek]);

  useEffect(() => {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.playbackState = isPlaying ? "playing" : "paused";
    }
  }, [isPlaying]);

  useEffect(() => {
    if ("mediaSession" in navigator && duration > 0 && "setPositionState" in navigator.mediaSession) {
      try {
        navigator.mediaSession.setPositionState({
          duration,
          position: Math.min(progress, duration),
          playbackRate: 1,
        });
      } catch {
        // duration/position can briefly be out of range during track transitions — ignore
      }
    }
  }, [progress, duration]);
}
