import { TodoList } from "./Todolist";

const App = () => {
  return (
    <div style={{ display: "flex", gap: 5 }}>
      <div style={{ marginTop: 40 }}>
        <TodoList />
      </div>
    </div>
  );
};

export default App;
