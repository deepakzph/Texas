export interface Track {
  id: string;
  title: string;
  artist: string;
  cover: string | null;
  src: string;
  duration?: number;
}

export type RepeatMode = "off" | "one" | "all";

export type PlaylistFilter = "all" | "favorites" | "recent";
