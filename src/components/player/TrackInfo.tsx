import { Music2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { usePlayer } from "@/context/PlayerContext";
import { FavoriteButton } from "@/components/playlist/FavoriteButton";

export function TrackInfo() {
  const { currentTrack } = usePlayer();

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 p-8 text-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTrack?.id ?? "empty"}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="flex size-64 items-center justify-center overflow-hidden rounded-2xl bg-muted shadow-lg ring-1 ring-foreground/10">
            {currentTrack?.cover ? (
              <img
                src={currentTrack.cover}
                alt={`${currentTrack.title} cover art`}
                className="size-full object-cover"
              />
            ) : (
              <Music2 className="size-16 text-muted-foreground" />
            )}
          </div>
          <div className="flex items-center gap-2">
            <div>
              <h2 className="text-xl font-semibold">
                {currentTrack?.title ?? "Nothing playing"}
              </h2>
              <p className="text-sm text-muted-foreground">
                {currentTrack?.artist ?? "Pick a track from the playlist"}
              </p>
            </div>
            {currentTrack && <FavoriteButton trackId={currentTrack.id} />}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
