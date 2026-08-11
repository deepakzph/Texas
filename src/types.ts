export type Status = "pending" | "in_progress" | "completed";

export interface Todo {
  id: string;
  title: string;
  description?: string;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
}

export const STATUS_META: Record<
  Status,
  { label: string; dot: string; badge: string; ring: string }
> = {
  pending: {
    label: "To Do",
    dot: "bg-slate-400",
    badge:
      "bg-slate-100 text-slate-600 dark:bg-slate-500/15 dark:text-slate-300",
    ring: "ring-slate-300 dark:ring-slate-600",
  },
  in_progress: {
    label: "In Progress",
    dot: "bg-amber-400",
    badge:
      "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
    ring: "ring-amber-300 dark:ring-amber-600",
  },
  completed: {
    label: "Completed",
    dot: "bg-emerald-400",
    badge:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
    ring: "ring-emerald-300 dark:ring-emerald-600",
  },
};

export const STATUS_ORDER: Status[] = ["pending", "in_progress", "completed"];
