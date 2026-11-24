import { useState } from "react";
import TodoCard from "../components/TodoCard.jsx";
import TodoDrawer from "../components/TodoDrawer.jsx";
import ConfirmDialog from "../components/ConfirmDialog.jsx";
import { STATUS_OPTIONS, STATUS_LABEL } from "../data/dummyTodos.js";

export default function Board({ todos, onAdd, onDelete }) {
  const [search, setSearch] = useState("");
  const [showDrawer, setShowDrawer] = useState(false);
  const [newStatus, setNewStatus] = useState("to-do");
  const [todoToDelete, setTodoToDelete] = useState(null);

  // cari berdasarkan judul
  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(search.toLowerCase())
  );
  const doneCount = todos.filter((todo) => todo.status === "done").length;

  function openDrawer(status) {
    setNewStatus(status);
    setShowDrawer(true);
  }

  function handleConfirmDelete() {
    onDelete(todoToDelete.id);
    setTodoToDelete(null);
  }

  return (
    <div className="page">
      <div className="top">
        <div>
          <h1>Papan Tugas</h1>
          <p className="summary">
            {todos.length - doneCount} tugas aktif, {doneCount} selesai
          </p>
        </div>

        <div className="top-right">
          <input
            className="search"
            type="text"
            placeholder="Cari judul tugas"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-main" onClick={() => openDrawer("to-do")}>
            + Tugas baru
          </button>
        </div>
      </div>

      <div className="board">
        {STATUS_OPTIONS.map((status) => {
          const items = filteredTodos.filter((todo) => todo.status === status);

          return (
            <div key={status} className="column">
              <div className="column-head">
                <h2>{STATUS_LABEL[status]}</h2>
                <span className="count">{items.length}</span>
                <button className="add-btn" onClick={() => openDrawer(status)}>
                  +
                </button>
              </div>

              <div className="column-body">
                {items.map((todo) => (
                  <TodoCard key={todo.id} todo={todo} onDelete={setTodoToDelete} />
                ))}
                {items.length === 0 && (
                  <p className="empty">
                    {search ? "Tidak ada yang cocok." : "Belum ada tugas di sini."}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {showDrawer && (
        <TodoDrawer
          defaultStatus={newStatus}
          onClose={() => setShowDrawer(false)}
          onSubmit={onAdd}
        />
      )}

      {todoToDelete && (
        <ConfirmDialog
          title={todoToDelete.title}
          onCancel={() => setTodoToDelete(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}
