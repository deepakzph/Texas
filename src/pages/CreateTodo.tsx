import { useState } from "react";
import { TodoFormSchema } from "../schema/schema";
import type { z } from "zod";
import { useTodos } from "../context/TodoContext";
import { STATUS_META, STATUS_ORDER } from "../types";

function CreateTodo() {
  const [formValues, setFormValues] = useState<z.infer<typeof TodoFormSchema>>({
    title: "",
    description: "",
  });

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
    setFormValues({ title: "", description: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = TodoFormSchema.safeParse(formValues);
    if (!result.success) {
      console.error("Invalid form values:", result.error);
      return;
    }
    addTodo({ ...result.data, status: "pending" });
    handleClear();
  };

  return (
    <div className="flex flex-col gap-2 w-full items-center justify-center py-8">
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
            Submit
          </button>
        </div>
      </form>
      <div className="flex w-full flex-col gap-2 rounded-3xl border-2 border-slate-300 bg-gray-300 p-4">
        <div>
          <h1 className="w-full text-center text-lg font-bold text-slate-900">
            Todo Counters
          </h1>
          <div className="flex justify-between">
            <span>All: {counters.all}</span>
            <span>Pending: {counters.pending}</span>
            <span>In Progress: {counters.in_progress}</span>
            <span>Completed: {counters.completed}</span>
          </div>
        </div>
      </div>
      <div className="gap-2 rounded-3xl border-2 border-slate-300 bg-gray-300 p-4 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <h1 className="w-full text-center text-lg font-bold text-slate-900">
            Todo list
          </h1>
          <div className="grid grid-cols-3 gap-3 ">
            {todos.map((todo) => (
              <div
                key={todo.id}
                className="bg-gray-50 rounded-2xl shadow-inherit p-4"
              >
                <div className=" flex gap-2 justify-end">
                  <button className="bg-blue-500 px-2 rounded-md hover:cursor-pointer hover:bg-blue-700">
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="bg-red-500 px-2 rounded-md hover:cursor-pointer hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>

                <p>Todo id: {todo.id}</p>
                <h2>Title: {todo.title}</h2>
                <p>Description: {todo.description}</p>
                <p>
                  Status:
                  <select
                    value={todo.status}
                    onChange={(e) => setStatus(todo.id, e.target.value as any)}
                  >
                    {STATUS_ORDER.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </p>
                <p>Created At: {todo.createdAt.toLocaleString()}</p>
                <p>Updated At: {todo.updatedAt.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTodo;
