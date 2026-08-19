import { useMemo, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/playlist/SearchBar";
import { TrackCard } from "@/components/playlist/TrackCard";
import { usePlayer } from "@/context/PlayerContext";
import { cn } from "@/lib/utils";
import type { PlaylistFilter } from "@/types/music";

const FILTERS: { key: PlaylistFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "favorites", label: "Favorites" },
  { key: "recent", label: "Recent" },
];

export function Playlist() {
  const { library, favorites, recentlyPlayed, searchQuery } = usePlayer();
  const [filter, setFilter] = useState<PlaylistFilter>("all");

  const indexed = useMemo(
    () =>
      library
        .map((track, libraryIndex) => ({ track, libraryIndex }))
        .filter(({ track }) => {
          if (filter === "favorites" && !favorites.includes(track.id)) return false;
          if (filter === "recent" && !recentlyPlayed.includes(track.id)) return false;
          return true;
        }),
    [library, filter, favorites, recentlyPlayed]
  );

  const ordered = useMemo(() => {
    if (filter !== "recent") return indexed;
    // recentlyPlayed is newest-first; reorder the indexed list to match it.
    const byId = new Map(indexed.map((item) => [item.track.id, item]));
    return recentlyPlayed.map((id) => byId.get(id)).filter((x): x is (typeof indexed)[number] => !!x);
  }, [indexed, filter, recentlyPlayed]);

  const filtered = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return ordered;
    return ordered.filter(
      ({ track }) =>
        track.title.toLowerCase().includes(query) || track.artist.toLowerCase().includes(query)
    );
  }, [ordered, searchQuery]);

  return (
    <div className="flex h-full flex-col gap-3 p-3">
      <SearchBar />
      <div className="flex gap-1">
        {FILTERS.map(({ key, label }) => (
          <Button
            key={key}
            size="sm"
            variant={filter === key ? "secondary" : "ghost"}
            className={cn("flex-1", filter === key && "font-medium")}
            onClick={() => setFilter(key)}
          >
            {label}
          </Button>
        ))}
      </div>
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-0.5 pr-2">
          {filtered.length === 0 ? (
            <p className="p-4 text-center text-sm text-muted-foreground">
              {library.length === 0
                ? "No tracks yet — add .mp3 files to public/music and run npm run songs:generate."
                : "No tracks match."}
            </p>
          ) : (
            filtered.map(({ track, libraryIndex }) => (
              <TrackCard key={track.id} track={track} libraryIndex={libraryIndex} />
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
