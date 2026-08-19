import { ListMusic, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Playlist } from "@/components/playlist/Playlist";
import { useTheme } from "@/context/ThemeContext";

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex items-center justify-between border-b px-4 py-3">
      <div className="flex items-center gap-2">
        <Sheet>
          <SheetTrigger
            render={
              <Button variant="ghost" size="icon-sm" aria-label="Open playlist" className="md:hidden" />
            }
          >
            <ListMusic />
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <SheetTitle className="sr-only">Playlist</SheetTitle>
            <Playlist />
          </SheetContent>
        </Sheet>
        <h1 className="text-lg font-semibold">Music Player</h1>
      </div>

      <Button
        variant="ghost"
        size="icon-sm"
        onClick={toggleTheme}
        aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      >
        {theme === "dark" ? <Sun /> : <Moon />}
      </Button>
    </header>
  );
}
