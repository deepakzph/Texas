import CreateTodo from "./pages/CreateTodo";
import { TodosProvider } from "./context/TodoContext";

function App() {
  return (
    <TodosProvider>
      <div>
        <CreateTodo />
      </div>
    </TodosProvider>
  );
}

export default App;
