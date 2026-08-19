import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePlayer } from "@/context/PlayerContext";
import { cn } from "@/lib/utils";

export function FavoriteButton({ trackId, size = "icon-sm" }: { trackId: string; size?: "icon-sm" | "icon" }) {
  const { isFavorite, toggleFavorite } = usePlayer();
  const favorite = isFavorite(trackId);

  return (
    <Button
      variant="ghost"
      size={size}
      onClick={(e) => {
        e.stopPropagation();
        toggleFavorite(trackId);
      }}
      aria-pressed={favorite}
      aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart className={cn(favorite && "fill-destructive text-destructive")} />
    </Button>
  );
}
