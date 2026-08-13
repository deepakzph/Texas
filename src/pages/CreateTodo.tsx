import { use, useState } from "react";
import { TodoFormSchema } from "../schema/schema";
import { set, type z } from "zod";
import { useTodos } from "../context/TodoContext";
import { STATUS_ORDER } from "../types";

function CreateTodo() {
  const [formValues, setFormValues] = useState<z.infer<typeof TodoFormSchema>>({
    title: "",
    description: "",
  });
  const [editId, setEditId] = useState<string | null>(null);
  const {
    todos,
    addTodo,
    deleteTodo,
    updateTodo,
    setStatus,
    clearTodos,
    counters,
  } = useTodos();

  const handleClear = () => {
    setEditId(null);
    setFormValues({ title: "", description: "" });
  };

  const handleEdit = (id: string) => {
    const edit = id ? todos.find((t) => t.id == id) : undefined;
    setEditId(edit?.id!);
    setFormValues({
      title: edit?.title!,
      description: edit?.description!,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = TodoFormSchema.safeParse(formValues);
    if (!result.success) {
      console.error("Invalid form values:", result.error);
      return;
    }
    if (editId) {
      updateTodo(editId, result.data);
    } else {
      addTodo({ ...result.data, status: "pending" });
    }
    handleClear();
  };

  return (
    <div className="flex flex-col gap-2 w-full items-center justify-center py-8 max-w-6xl">
      <form
        onSubmit={handleSubmit}
        className="flex w-96 max-w-full flex-col gap-2 rounded-3xl border-2 border-slate-300 bg-gray-300 p-4 "
      >
        <h1 className="w-full text-center text-lg font-bold text-slate-900">
          Add Todo
        </h1>

        <input
          value={formValues.title}
          onChange={(e) =>
            setFormValues({ ...formValues, title: e.target.value })
          }
          placeholder="Enter todo..."
          className="rounded-2xl border-2 border-slate-300 bg-white p-2 text-slate-900 outline-none"
        />

        <textarea
          value={formValues.description}
          onChange={(e) =>
            setFormValues({ ...formValues, description: e.target.value })
          }
          placeholder="Enter todo description..."
          rows={3}
          className="resize-none rounded-2xl border-2 border-slate-300 bg-white p-2 text-slate-900 outline-none"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={handleClear}
            type="button"
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 hover:cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 hover:cursor-pointer"
          >
            {editId != null ? "update" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateTodo;
