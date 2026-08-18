import React from "react";
import type { SortKey } from "./types/ShowType";
import { SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchFilterProps {
  query: string;
  onQueryChange: (query: string) => void;
  genre: string;
  onGenreChange: (genre: string) => void;
  genres: string[];
  sortKey: SortKey;
  onSortKeyChange: (value: SortKey) => void;
  resultCount: number;
}

const SORT_OPTION: { value: SortKey; label: string }[] = [
  { value: "weight", label: "Popularity" },
  { value: "rating", label: "Rating" },
  { value: "premiered", label: "Newest first" },
  { value: "name", label: "Name(A-Z)" },
];

const selectClasses =
  "h-8 rounded-lg border border-input bg-transparent px-2.5 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30";

const SearchFilter = ({
  query,
  onQueryChange,
  genre,
  onGenreChange,
  genres,
  sortKey,
  onSortKeyChange,
  resultCount,
}: SearchFilterProps) => {
  return (
    <div className=" flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <SearchIcon className="pointer-events-none absolute top-1/2 left-2.53 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search shows on this page"
          className="pl-8"
          aria-label="Search Shows"
        />
      </div>
      <select
        value={genre}
        onChange={(e) => onGenreChange(e.target.value)}
        className={cn(selectClasses, "sm:w-40")}
        aria-label="Filter by genre"
      >
        <option value="">All Genres</option>
        {genres.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>

      <select
        value={sortKey}
        onChange={(e) => onSortKeyChange(e.target.value as SortKey)}
      >
        {SORT_OPTION.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <span>
        {resultCount} {resultCount === 1 ? "show" : "shows"}
      </span>
    </div>
  );
};

export default SearchFilter;
