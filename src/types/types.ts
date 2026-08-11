import { z } from "zod";
import type { statusSchema, TodoSchema } from "../schema/schema";

type Status = z.infer<typeof statusSchema>;
export type Todo = z.infer<typeof TodoSchema>;

const STATUS_META: Record<Status, { label: string; color: string }> = {
  pending: { label: "Pending", color: "bg-yellow-500" },
  in_progress: { label: "In Progress", color: "bg-blue-500" },
  completed: { label: "Completed", color: "bg-green-500" },
};

const STATUS_ORDER: Status[] = ["pending", "in_progress", "completed"];
