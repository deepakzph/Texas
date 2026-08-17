import { AlertCircleIcon } from "lucide-react";
import React from "react";
import { Skeleton } from "./ui/skeleton";
import ShowCard from "./ShowCard";
import type { Show } from "./types/ShowType";

interface ShowGridProps {
  shows: Show[];
  isLoading: boolean;
  error: string | null;
  onSelect: (show: Show) => void;
  onRetry: () => void;
}

const ShowGrid = ({
  shows,
  isLoading,
  error,
  onSelect,
  onRetry,
}: ShowGridProps) => {
  if (error) {
    return (
      <div>
        <AlertCircleIcon />
        <p>{error}</p>
        <button onClick={onRetry}>Try Again</button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i}>
            <Skeleton className=" aspect-2/3 w-full rounded-xl" />
            <Skeleton className="mt-2 h-4 w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4 rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  if (shows?.length === 0) {
    <div>
      <p>No shows match your filters.</p>
    </div>;
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {shows.map((show) => (
        <ShowCard key={show?.id} show={show} onSelect={onSelect} />
      ))}
    </div>
  );
};

export default ShowGrid;
