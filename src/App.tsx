import { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import type { SortKey, Show } from "./components/types/ShowType";
import ShowGrid from "./components/ShowGrid";
import axios from "axios";
import SearchFilter from "./components/SearchFilter";

function App() {
  const [shows, setShows] = useState<Show[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<string>("");
  const [genre, setGenre] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("weight");

  const genres = useMemo(() => {
    const unique = new Set<string>();
    shows.forEach((show) => {
      show.genres.forEach((genre) => unique.add(genre));
    });
    return Array.from(unique).sort();
  }, [shows]);

  const visibleShows = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();

    const filtered = shows.filter((show) => {
      const matchesQuery =
        normalizedQuery === "" ||
        show.name.toLocaleLowerCase().includes(normalizedQuery);
      const matchesGenre = genre === "" || show.genres.includes(genre);
      return matchesQuery && matchesGenre;
    });
    return [...filtered].sort((a, b) => {
      switch (sortKey) {
        case "name":
          return a.name.localeCompare(b.name);
        case "rating":
          return (b.rating?.average ?? -1) - (a.rating?.average ?? -1);
        case "weight":
          return b.weight - a.weight;
        default:
          return 0;
      }
    });
  }, [shows, query, genre, sortKey]);
  // const fetchShows = async () => {
  //   let response;
  //   try {
  //     response = await fetch("https://api.tvmaze.com/shows");
  //   } catch {
  //     throw new Error("Failed to fetch shows");
  //   }

  //   if (response.status === 404) {
  //     throw new Error("Shows not found");
  //   }

  //   if (!response.ok) {
  //     throw new Error("Failed to fetch shows");
  //   }

  //   const data = await response.json();
  //   return data;
  // };

  const fetchShows = async () => {
    let response;
    try {
      response = await axios.get("https://api.tvmaze.com/shows");
    } catch {
      throw new Error("Failed to fetch shows");
    }

    if (response.status === 404) {
      throw new Error("Shows not found");
    }

    if (response.status != 200) {
      throw new Error("Failed to fetch shows");
    }

    const data = await response.data;
    return data;
  };

  useEffect(() => {
    const getShows = async () => {
      setIsLoading(true);
      await fetchShows()
        .then((showsData) => {
          console.log("shows", showsData);
          setShows(showsData);
        })
        .catch((error) => {
          setError(error.message);
          console.log(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    getShows();
  }, []);

  const retry = useCallback(() => {
    fetchShows().then((showsData) => setShows(showsData));
  }, []);

  console.log("shows after set", shows);

  return (
    <>
      <SearchFilter
        query={query}
        onQueryChange={setQuery}
        genre={genre}
        onGenreChange={setGenre}
        genres={genres}
        sortKey={sortKey}
        onSortKeyChange={setSortKey}
        resultCount={visibleShows.length}
      />
      <ShowGrid
        shows={shows}
        isLoading={isLoading}
        onSelect={setSelectedShow}
        error={error}
        onRetry={retry}
      />
    </>
  );
}

export default App;
