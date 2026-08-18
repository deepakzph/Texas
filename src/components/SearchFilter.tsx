import React from "react";
import type { SortKey } from "./types/ShowType";
import { SearchIcon } from "lucide-react";

interface SearchFilterProps {
  query: string;
  onQueryChange: (query: string) => void;
  genre: string;
  onGenreChange: (genre: string) => void;
  genres: String[];
  sortKey: SortKey;
  onSortKeyChange: (value: SortKey) => void;
  resultCount: number;
}

const SORT_OPTION: { value: SortKey; label: String }[] = [
  { value: "weight", label: "Popularity" },
  { value: "rating", label: "Rating" },
  { value: "premiered", label: "Newest first" },
  { value: "name", label: "Name(A-Z)" },
];

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
    <div>
      <div>
        <SearchIcon />
        <input />
      </div>
      <select>
        <option value="">All Genres</option>
      </select>

      <select>
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
