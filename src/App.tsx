import { AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Playlist } from "@/components/playlist/Playlist";
import { TrackInfo } from "@/components/player/TrackInfo";
import { MusicPlayer } from "@/components/player/MusicPlayer";
import { MiniPlayer } from "@/components/player/MiniPlayer";
import { TooltipProvider } from "@/components/ui/tooltip";
import { usePlayer } from "@/context/PlayerContext";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { useMediaSession } from "@/hooks/useMediaSession";

function App() {
  const { isMiniPlayer } = usePlayer();
  useKeyboardShortcuts();
  useMediaSession();

  return (
    <TooltipProvider>
      <div className="flex h-dvh flex-col bg-background text-foreground">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <aside className="hidden w-72 shrink-0 border-r md:block">
            <Playlist />
          </aside>
          <main className="flex-1 overflow-y-auto">
            <TrackInfo />
          </main>
        </div>
        {!isMiniPlayer && <MusicPlayer />}
      </div>
      <AnimatePresence>{isMiniPlayer && <MiniPlayer />}</AnimatePresence>
    </TooltipProvider>
  );
}

export default App;
