import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { usePlayer } from "@/context/PlayerContext";

export function SearchBar() {
  const { searchQuery, setSearch } = usePlayer();

  return (
    <div className="relative">
      <Search className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
      <Input
        data-search-input="true"
        value={searchQuery}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search songs or artists…"
        className="pl-8"
        aria-label="Search songs"
      />
    </div>
  );
}
