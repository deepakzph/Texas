import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  type ReactNode,
} from "react";
import { Howl } from "howler";
import { songs } from "@/lib/songs";
import { STORAGE_KEYS, readStorage, writeStorage } from "@/lib/storage";
import type { RepeatMode, Track } from "@/types/music";

const MAX_RECENT = 20;

interface PlayerState {
  library: Track[];
  playOrder: number[]; // indices into `library`, in play order
  orderPosition: number; // position within playOrder, -1 = nothing selected
  isPlaying: boolean;
  progress: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  shuffle: boolean;
  repeatMode: RepeatMode;
  favorites: string[];
  recentlyPlayed: string[];
  searchQuery: string;
  isMiniPlayer: boolean;
}

type Action =
  | { type: "PLAY_TRACK"; libraryIndex: number }
  | { type: "TOGGLE_PLAY" }
  | { type: "SET_PLAYING"; isPlaying: boolean }
  | { type: "NEXT" }
  | { type: "PREVIOUS" }
  | { type: "SET_PROGRESS"; progress: number; duration: number }
  | { type: "SET_VOLUME"; volume: number }
  | { type: "TOGGLE_MUTE" }
  | { type: "TOGGLE_SHUFFLE" }
  | { type: "CYCLE_REPEAT" }
  | { type: "TOGGLE_FAVORITE"; id: string }
  | { type: "SET_SEARCH"; query: string }
  | { type: "TOGGLE_MINI_PLAYER" };

function identityOrder(length: number): number[] {
  return Array.from({ length }, (_, i) => i);
}

// Fisher-Yates, with `keepFirst` (if given) pinned to position 0.
function shuffledOrder(length: number, keepFirst?: number): number[] {
  const rest = identityOrder(length).filter((i) => i !== keepFirst);
  for (let i = rest.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [rest[i], rest[j]] = [rest[j], rest[i]];
  }
  return keepFirst === undefined ? rest : [keepFirst, ...rest];
}

function pushRecent(recent: string[], id: string): string[] {
  return [id, ...recent.filter((r) => r !== id)].slice(0, MAX_RECENT);
}

function initState(): PlayerState {
  return {
    library: songs,
    playOrder: identityOrder(songs.length),
    orderPosition: -1,
    isPlaying: false,
    progress: 0,
    duration: 0,
    volume: readStorage(STORAGE_KEYS.volume, 0.8),
    isMuted: false,
    shuffle: false,
    repeatMode: "off",
    favorites: readStorage<string[]>(STORAGE_KEYS.favorites, []),
    recentlyPlayed: readStorage<string[]>(STORAGE_KEYS.recentlyPlayed, []),
    searchQuery: "",
    isMiniPlayer: false,
  };
}

function reducer(state: PlayerState, action: Action): PlayerState {
  switch (action.type) {
    case "PLAY_TRACK": {
      const track = state.library[action.libraryIndex];
      if (!track) return state;
      const playOrder = state.shuffle
        ? shuffledOrder(state.library.length, action.libraryIndex)
        : identityOrder(state.library.length);
      const orderPosition = state.shuffle ? 0 : action.libraryIndex;
      return {
        ...state,
        playOrder,
        orderPosition,
        isPlaying: true,
        progress: 0,
        recentlyPlayed: pushRecent(state.recentlyPlayed, track.id),
      };
    }
    case "TOGGLE_PLAY": {
      if (state.orderPosition === -1) {
        if (state.library.length === 0) return state;
        const track = state.library[state.playOrder[0]];
        return {
          ...state,
          orderPosition: 0,
          isPlaying: true,
          recentlyPlayed: pushRecent(state.recentlyPlayed, track.id),
        };
      }
      return { ...state, isPlaying: !state.isPlaying };
    }
    case "SET_PLAYING":
      return { ...state, isPlaying: action.isPlaying };
    case "NEXT": {
      if (state.playOrder.length === 0) return state;
      let nextPos = state.orderPosition + 1;
      let isPlaying = true;
      if (nextPos >= state.playOrder.length) {
        if (state.repeatMode === "off") {
          nextPos = state.orderPosition;
          isPlaying = false;
        } else {
          nextPos = 0;
        }
      }
      const track = state.library[state.playOrder[nextPos]];
      return {
        ...state,
        orderPosition: nextPos,
        progress: 0,
        isPlaying,
        recentlyPlayed: track ? pushRecent(state.recentlyPlayed, track.id) : state.recentlyPlayed,
      };
    }
    case "PREVIOUS": {
      if (state.playOrder.length === 0) return state;
      const prevPos =
        state.repeatMode === "off"
          ? Math.max(0, state.orderPosition - 1)
          : (state.orderPosition - 1 + state.playOrder.length) % state.playOrder.length;
      const track = state.library[state.playOrder[prevPos]];
      return {
        ...state,
        orderPosition: prevPos,
        progress: 0,
        isPlaying: true,
        recentlyPlayed: track ? pushRecent(state.recentlyPlayed, track.id) : state.recentlyPlayed,
      };
    }
    case "SET_PROGRESS":
      return { ...state, progress: action.progress, duration: action.duration };
    case "SET_VOLUME":
      writeStorage(STORAGE_KEYS.volume, action.volume);
      return { ...state, volume: action.volume, isMuted: false };
    case "TOGGLE_MUTE":
      return { ...state, isMuted: !state.isMuted };
    case "TOGGLE_SHUFFLE": {
      const shuffle = !state.shuffle;
      const currentLibraryIndex =
        state.orderPosition >= 0 ? state.playOrder[state.orderPosition] : undefined;
      const playOrder = shuffle
        ? shuffledOrder(state.library.length, currentLibraryIndex)
        : identityOrder(state.library.length);
      const orderPosition =
        currentLibraryIndex === undefined
          ? -1
          : shuffle
            ? 0
            : currentLibraryIndex;
      return { ...state, shuffle, playOrder, orderPosition };
    }
    case "CYCLE_REPEAT": {
      const order: RepeatMode[] = ["off", "all", "one"];
      const next = order[(order.indexOf(state.repeatMode) + 1) % order.length];
      return { ...state, repeatMode: next };
    }
    case "TOGGLE_FAVORITE": {
      const favorites = state.favorites.includes(action.id)
        ? state.favorites.filter((id) => id !== action.id)
        : [...state.favorites, action.id];
      writeStorage(STORAGE_KEYS.favorites, favorites);
      return { ...state, favorites };
    }
    case "SET_SEARCH":
      return { ...state, searchQuery: action.query };
    case "TOGGLE_MINI_PLAYER":
      return { ...state, isMiniPlayer: !state.isMiniPlayer };
    default:
      return state;
  }
}

interface PlayerContextValue extends PlayerState {
  currentTrack: Track | null;
  playTrack: (libraryIndex: number) => void;
  togglePlay: () => void;
  next: () => void;
  previous: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  toggleShuffle: () => void;
  cycleRepeat: () => void;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  setSearch: (query: string) => void;
  toggleMiniPlayer: () => void;
}

const PlayerContext = createContext<PlayerContextValue | null>(null);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, initState);
  const howlRef = useRef<Howl | null>(null);
  const rafRef = useRef<number | null>(null);
  // onend's closure is fixed at Howl-creation time; a ref keeps it reading live repeat state.
  const repeatModeRef = useRef(state.repeatMode);
  useEffect(() => {
    repeatModeRef.current = state.repeatMode;
  }, [state.repeatMode]);

  const currentLibraryIndex =
    state.orderPosition >= 0 ? state.playOrder[state.orderPosition] : -1;
  const currentTrack = currentLibraryIndex >= 0 ? state.library[currentLibraryIndex] ?? null : null;

  // (Re)create the Howl instance whenever the selected track changes.
  useEffect(() => {
    howlRef.current?.unload();
    howlRef.current = null;
    if (!currentTrack) return;

    const howl = new Howl({
      src: [currentTrack.src],
      html5: true,
      volume: state.isMuted ? 0 : state.volume,
      onload: () => dispatch({ type: "SET_PROGRESS", progress: 0, duration: howl.duration() }),
      onend: () => {
        if (repeatModeRef.current === "one") {
          howl.seek(0);
          howl.play();
        } else {
          dispatch({ type: "NEXT" });
        }
      },
    });
    howlRef.current = howl;
    if (state.isPlaying) howl.play();

    return () => {
      howl.unload();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrack?.id]);

  // Keep Howler's play/pause state in sync.
  useEffect(() => {
    const howl = howlRef.current;
    if (!howl) return;
    if (state.isPlaying) {
      if (!howl.playing()) howl.play();
    } else {
      howl.pause();
    }
  }, [state.isPlaying]);

  // Keep Howler's volume in sync.
  useEffect(() => {
    howlRef.current?.volume(state.isMuted ? 0 : state.volume);
  }, [state.volume, state.isMuted]);

  // Progress polling loop while playing.
  useEffect(() => {
    if (!state.isPlaying) return;
    const tick = () => {
      const howl = howlRef.current;
      if (howl && howl.playing()) {
        const progress = howl.seek();
        if (typeof progress === "number") {
          dispatch({ type: "SET_PROGRESS", progress, duration: howl.duration() || state.duration });
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.isPlaying]);

  useEffect(() => () => {
    howlRef.current?.unload();
  }, []);

  const seek = useCallback((time: number) => {
    howlRef.current?.seek(time);
    dispatch({ type: "SET_PROGRESS", progress: time, duration: howlRef.current?.duration() ?? 0 });
  }, []);

  const value = useMemo<PlayerContextValue>(
    () => ({
      ...state,
      currentTrack,
      playTrack: (libraryIndex) => dispatch({ type: "PLAY_TRACK", libraryIndex }),
      togglePlay: () => dispatch({ type: "TOGGLE_PLAY" }),
      next: () => dispatch({ type: "NEXT" }),
      previous: () => dispatch({ type: "PREVIOUS" }),
      seek,
      setVolume: (volume) => dispatch({ type: "SET_VOLUME", volume }),
      toggleMute: () => dispatch({ type: "TOGGLE_MUTE" }),
      toggleShuffle: () => dispatch({ type: "TOGGLE_SHUFFLE" }),
      cycleRepeat: () => dispatch({ type: "CYCLE_REPEAT" }),
      toggleFavorite: (id) => dispatch({ type: "TOGGLE_FAVORITE", id }),
      isFavorite: (id) => state.favorites.includes(id),
      setSearch: (query) => dispatch({ type: "SET_SEARCH", query }),
      toggleMiniPlayer: () => dispatch({ type: "TOGGLE_MINI_PLAYER" }),
    }),
    [state, currentTrack, seek]
  );

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components -- context hook lives alongside its provider
export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within a PlayerProvider");
  return ctx;
}
