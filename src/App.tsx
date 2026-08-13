import CreateTodo from "./pages/CreateTodo";
import { TodosProvider } from "./context/TodoContext";
import { Route, Routes } from "react-router-dom";
import TodoList from "./pages/TodoList";

function App() {
  return (
    <TodosProvider>
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/createTodo" element={<CreateTodo />} />
        <Route path="/edit/:id" element={<CreateTodo />} />
      </Routes>
    </TodosProvider>
  );
}

export default App;
