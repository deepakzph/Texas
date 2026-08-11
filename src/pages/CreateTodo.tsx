import { useState } from "react";
import type { TodoFormSchema } from "../schema/schema";
import type { z } from "zod";

function CreateTodo() {
  const [formValues, setFormValues] = useState<z.infer<typeof TodoFormSchema>>({
    title: "",
    description: "",
  });

  const handleClear = () => {
    setFormValues({ title: "", description: "" });
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formValues);
    // handleClear();
  };

  return (
    <div className="flex w-full items-center justify-center py-8">
      <div className="flex w-96 max-w-full flex-col gap-2 rounded-3xl border-2 border-slate-300 bg-gray-300 p-4 ">
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
            onClick={handleSubmit}
            type="submit"
            className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 hover:cursor-pointer"
          >
            Submit
          </button>
        </div>
      </div>
      <div className="absolute bottom-4 right-4 text-sm text-slate-900">
        <p> Title: {formValues.title || "No title"} </p>
        <p> Description: {formValues.description || "No description"} </p>
      </div>
    </div>
  );
}

export default CreateTodo;
