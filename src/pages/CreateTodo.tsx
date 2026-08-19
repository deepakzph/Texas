import { useState } from "react";
import { TodoFormSchema } from "../schema/schema";
import { type z } from "zod";
import { useTodos } from "../context/TodoContext";
import { useNavigate, useParams } from "react-router-dom";
import { Calendar } from "../components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

function CreateTodo() {
  const { todos, addTodo, updateTodo } = useTodos();
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("Todo id is: ", id);
  const edit = id ? todos.find((t) => t.id == id) : undefined;
  const [formValues, setFormValues] = useState<z.infer<typeof TodoFormSchema>>({
    title: edit?.title || "",
    description: edit?.description || "",
    dueDate: new Date(),
  });
  // const [editId, setEditId] = useState<string | null>(null);

  const handleClear = () => {
    // setEditId(null);
    setFormValues({ title: "", description: "", dueDate: new Date() });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = TodoFormSchema.safeParse(formValues);
    if (!result.success) {
      console.error("Invalid form values:", result.error);
      return;
    }
    if (edit) {
      updateTodo(edit.id, result.data);
    } else {
      addTodo({ ...result.data, status: "pending" });
    }
    handleClear();
    navigate("/");
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
        <Popover>
          <PopoverTrigger
            render={
              <Button
                variant="outline"
                data-empty={!formValues.dueDate}
                className="justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
              />
            }
          >
            <CalendarIcon />
            {formValues ? format(formValues.dueDate, "PPP") : <span>Pick a date</span>}
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={formValues.dueDate} onSelect={(date) => setFormValues({...formValues, dueDate: date ?? new Date()})} />
          </PopoverContent>
        </Popover>
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
            {edit ? "update" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateTodo;
