import React from "react";
import type { Show } from "./types/ShowType";
import { StarIcon, TvIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

interface ShowCardProps {
  show: Show;
  onSelect: (show: Show) => void;
}

const STATUS_STYLES: Record<string, string> = {
  Running: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  Ended: "bg-muted text-muted-foreground",
  "To Be Determined": "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  "In Development": "bg-sky-500/15 text-sky-600 dark:text-sky-400",
};

const ShowCard = ({ show, onSelect }: ShowCardProps) => {
  const year = show.premiered?.slice(0, 4);
  const network = show.network?.name ?? show.webChannel?.name;
  return (
    <button
      type="button"
      onClick={() => onSelect(show)}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card text-left shadow-xs transition-all hover:shadow-md focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <div className="aspect-2/3 w-full overflow-hidden bg-muted">
        {show.image ? (
          <img
            src={show?.image?.medium}
            alt={show?.name}
            loading="lazy"
            className=" size-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex size-full items-center justify-center text-muted-foreground">
            <TvIcon className="size-10" aria-hidden />
          </div>
        )}
      </div>

      <div className=" flex flex-1 flex-col gap-2 p-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="line-clamp-2 text-sm leading-snug font-semibold">
            {show?.name}
          </h3>
          {show?.rating?.average != null && (
            <span className="flex shrink-0 items-center gap-0.5 text-xs font-medium text-amber-600">
              <StarIcon className="size-3.5 fill-current" />
              {show?.rating?.average.toFixed(1)}
            </span>
          )}
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        {[year, network].filter(Boolean).join(" . ") || "[]"}
      </p>

      <div className="mt-auto flex flex-wrap items-center gap-1 pt-1">
        <span
          className={cn(
            "inline-flex rounded-md px-1.5 py-o.5 text[0.7rem] font-medium",
            STATUS_STYLES[show.status] ?? "bg-muted text-muted-foreground",
          )}
        >
          {show.genres?.slice(0, 2).map((genre) => (
            <Badge key={genre} variant="outline" className="text-[0.7rem]">
              {genre}
            </Badge>
          ))}
        </span>
      </div>
    </button>
  );
};

export default ShowCard;
