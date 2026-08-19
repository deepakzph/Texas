import { useNavigate } from "react-router-dom";
import { useTodos } from "../context/TodoContext";
import { STATUS_ORDER } from "../types";

const TodoList = () => {
  const navigate = useNavigate();
  const { counters, todos, clearTodos, deleteTodo, setStatus } = useTodos();
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex justify-start">
        <button
          onClick={() => navigate("/createTodo")}
          className="bg-blue-600 rounded-2xl ml-6 hover:cursor-pointer hover:bg-blue-700 text-white px-9"
        >
          Create New Todo
        </button>
      </div>
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
      {todos.length > 0 && (
        <div className="gap-2 rounded-3xl border-2 border-slate-300 bg-gray-300 p-4 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <h1 className="w-full text-center text-lg font-bold text-slate-900">
              Todo list
            </h1>
            <div className=" flex flex-col gap-2">
              <button
                onClick={() => clearTodos()}
                className="bg-red-700 px-2.5 rounded-md hover:cursor-pointer hover:bg-red-800"
              >
                Clear Todos
              </button>
              <div className="grid grid-cols-2 gap-3 ">
                {todos.map((todo) => (
                  <div
                    key={todo.id}
                    className="bg-gray-50 rounded-2xl shadow-inherit p-4"
                  >
                    <div className=" flex gap-2 justify-end">
                      <button
                        onClick={() => navigate(`/edit/${todo.id}`)}
                        className="bg-blue-500 px-2 rounded-md hover:cursor-pointer hover:bg-blue-700"
                      >
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
                        onChange={(e) =>
                          setStatus(todo.id, e.target.value as any)
                        }
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
      )}
    </div>
  );
};

export default TodoList;
