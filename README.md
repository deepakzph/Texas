# Music Player

A music player with playlist support — Vite + React 19 + TypeScript + Tailwind v4 + shadcn/ui (base-ui). State is managed with React Context + `useReducer` (no external store library); audio playback is powered by Howler.js.

## Adding your music

1. Drop audio files (`.mp3`, `.wav`, `.ogg`, `.m4a`, `.flac`) into `public/music/`.
   - Name them `Artist - Title.mp3` to get artist/title auto-parsed, or just `Title.mp3`.
2. Optionally drop matching artwork into `public/covers/` with the **same filename** (e.g. `Artist - Title.jpg`).
3. Run:
   ```bash
   npm run songs:generate
   ```
   This regenerates `src/lib/songs.ts`. It also runs automatically before `npm run dev` (`predev`).

`src/lib/songs.ts` is generated — don't hand-edit it, your changes will be overwritten.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the dev server (regenerates the song list first) |
| `npm run songs:generate` | Rescan `public/music` and rebuild `src/lib/songs.ts` |
| `npm run build` | Type-check and produce a production build |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production build locally |

## Features

- Play / pause, next / previous, seek, volume, mute
- Shuffle and 3-state repeat (off → all → one)
- Playlist sidebar with All / Favorites / Recent filters, search, and a mobile Sheet
- Favorites and recently-played, persisted to `localStorage`
- Dark / light theme toggle, persisted
- Mini player mode
- Keyboard shortcuts (ignored while typing in an input):

  | Key | Action |
  | --- | --- |
  | `Space` | Play / pause |
  | `←` / `→` | Seek −5s / +5s |
  | `Shift+←` / `Shift+→` | Previous / next track |
  | `↑` / `↓` | Volume up / down |
  | `M` | Mute |
  | `S` | Toggle shuffle |
  | `R` | Cycle repeat mode |
  | `F` | Favorite the current track |
  | `/` | Focus search |

- Lock-screen / browser media controls via the Media Session API

**Not built (flagged as follow-ups if you want them):** `.lrc` lyrics, drag-and-drop playlist reordering, an audio visualizer, an equalizer, and PWA offline caching.

## Architecture

- `src/context/PlayerContext.tsx` — all player state (`useReducer`) and the Howler.js lifecycle, exposed via `usePlayer()`
- `src/context/ThemeContext.tsx` — light/dark theme, exposed via `useTheme()`
- `src/hooks/useKeyboardShortcuts.ts`, `src/hooks/useMediaSession.ts` — side-effect hooks wired up in `App.tsx`
- `src/components/player/`, `src/components/playlist/`, `src/components/layout/` — UI
- `scripts/generate-songs.mjs` — build-time library scanner (browsers can't read directories at runtime)
