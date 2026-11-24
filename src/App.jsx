import { useState } from "react";
import TodoForm from "./components/TodoForm.jsx";
import TodoCard from "./components/TodoCard.jsx";
import { dummyTodos } from "./data/dummyTodos.js";

const STATUS_LIST = ["to-do", "in progress", "done"];

const STATUS_LABEL = {
  "to-do": "Belum dikerjakan",
  "in progress": "Sedang dikerjakan",
  done: "Selesai",
};

export default function App() {
  const [todos, setTodos] = useState(dummyTodos);
  const [search, setSearch] = useState("");

  function addTodo({ title, description, deadline, priority }) {
    const newTodo = {
      id: Date.now(),
      title: title,
      description: description,
      deadline: deadline,
      priority: priority,
      status: "to-do",
    };
    setTodos([...todos, newTodo]);
  }

  function deleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function changeStatus(id, newStatus) {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, status: newStatus };
      }
      return todo;
    });
    setTodos(newTodos);
  }

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page">
      <h1>Papan Tugas</h1>
      <p className="subtitle">Catat tugasmu dan pindahkan sesuai progres.</p>

      <TodoForm onAdd={addTodo} />

      <input
        className="search"
        type="text"
        placeholder="Cari tugas..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="board">
        {STATUS_LIST.map((status) => {
          const items = filteredTodos.filter((todo) => todo.status === status);

          return (
            <div key={status} className="column">
              <h2>
                {STATUS_LABEL[status]} <span className="count">{items.length}</span>
              </h2>

              {items.map((todo) => (
                <TodoCard
                  key={todo.id}
                  todo={todo}
                  onDelete={deleteTodo}
                  onChangeStatus={changeStatus}
                />
              ))}

              {items.length === 0 && <p className="empty">Belum ada tugas.</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
