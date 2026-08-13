import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { TodoSchema } from "../schema/schema";
import type { Status, Todo } from "../types";

const STORAGE_KEY = "todo-app-todos";

function getTodosFromLocalStorage(): Todo[] {
  try {
    const todosString = localStorage.getItem(STORAGE_KEY);
    if (!todosString) {
      return [];
    }
    const todos = JSON.parse(todosString) as Todo[];
    if (!Array.isArray(todos)) {
      return [];
    }
    return todos.flatMap((todo) => {
      const parse = {
        ...todo,
        createdAt: new Date(todo.createdAt),
        updatedAt: new Date(todo.updatedAt),
      };
      const result: Todo[] = TodoSchema.safeParse(parse).success ? [parse] : [];
      return result;
    });
  } catch (error) {
    console.error("Error parsing todos from localStorage:", error);
  }
  return [];
}

export type newTodoInput = {
  title: string;
  description: string;
  status: Status;
};

export type counter = {
  all: number;
  pending: number;
  in_progress: number;
  completed: number;
};

type TodosContextValue = {
  todos: Todo[];
  addTodo: (todo: newTodoInput) => void;
  updateTodo: (id: string, updatedFields: Partial<newTodoInput>) => void;
  deleteTodo: (id: string) => void;
  setStatus: (id: string, status: Status) => void;
  clearTodos: () => void;
  counters: counter;
};

const TodosContext = createContext<TodosContextValue | undefined>(undefined);

export function TodosProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>(getTodosFromLocalStorage());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = useCallback((input: newTodoInput) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title: input.title,
      description: input.description,
      status: input.status || "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    return newTodo;
  }, []);

  const updateTodo = useCallback(
    (id: string, updatedFields: Partial<newTodoInput>) => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id
            ? { ...todo, ...updatedFields, updatedAt: new Date() }
            : todo,
        ),
      );
    },
    [],
  );

  const deleteTodo = useCallback((id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }, []);

  const setStatus = useCallback((id: string, status: Status) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, status, updatedAt: new Date() } : todo,
      ),
    );
  }, []);

  const clearTodos = useCallback(() => {
    setTodos([]);
  }, []);

  const counters = useMemo(() => {
    const all = todos.length;
    const pending = todos.filter((todo) => todo.status === "pending").length;
    const in_progress = todos.filter(
      (todo) => todo.status === "in_progress",
    ).length;
    const completed = todos.filter(
      (todo) => todo.status === "completed",
    ).length;

    return { all, pending, in_progress, completed };
  }, [todos]);

  const value = useMemo<TodosContextValue>(
    () => ({
      todos,
      addTodo,
      updateTodo,
      deleteTodo,
      setStatus,
      clearTodos,
      counters,
    }),
    [todos, addTodo, updateTodo, deleteTodo, setStatus, clearTodos, counters],
  );

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
}

export function useTodos() {
  const ctx = useContext(TodosContext);
  if (!ctx) throw new Error("useTodos must be used within a TodoProvider");
  return ctx;
}
