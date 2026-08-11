import { z } from "zod";

export const statusSchema = z.enum(["pending", "in_progress", "completed"]);

export const TodoSchema = z.object({
  id: z.string().uuid(),
  title: z
    .string()
    .min(1, "Title is required")
    .max(50, "Title must be less than 50 characters"),
  description: z
    .string()
    .max(200, "Description must be less than 200 characters"),
  status: statusSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
});

const TodoArraySchema = z.array(TodoSchema);

export const TodoFormSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(50, "Title must be less than 50 characters"),
  description: z
    .string()
    .max(200, "Description must be less than 200 characters"),
});

type TodoFormInput = z.infer<typeof TodoFormSchema>;
