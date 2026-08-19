import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// base-ui's Slider onValueChange/onValueCommitted emits a plain number when the
// interaction is a pointer drag on the track, but an array (e.g. [value]) when
// it's driven through the underlying native input (keyboard, programmatic change) —
// even for a single-thumb slider whose `value` prop is always passed as an array.
// Normalize both shapes so callers get a single number either way.
export function sliderValue(value: number | readonly number[]): number {
  return Array.isArray(value) ? value[0] : (value as number);
}

export function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00"
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, "0")}`
}
