import { use, useCallback, useEffect, useState } from "react";
import "./App.css";
import ShowCard from "./components/ShowCard";
import type { Show } from "./components/types/ShowType";
import ShowGrid from "./components/ShowGrid";
import axios from "axios";
import SearchFilter from "./components/SearchFilter";

function App() {
  const [shows, setShows] = useState<Show[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);
  const [error, setError] = useState<string | null>(null);

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
      <SearchFilter />
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
