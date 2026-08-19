const PREFIX = "music-player:";

export const STORAGE_KEYS = {
  favorites: `${PREFIX}favorites`,
  recentlyPlayed: `${PREFIX}recently-played`,
  volume: `${PREFIX}volume`,
  theme: `${PREFIX}theme`,
} as const;

export function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage full or unavailable — fail silently, persistence is a nice-to-have
  }
}
