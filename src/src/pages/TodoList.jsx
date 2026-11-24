import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TodoModal from "../components/TodoModal.jsx";
import ConfirmModal from "../components/ConfirmModal.jsx";

export default function TodoList({ todos, onAdd, onDelete }) {
  const navigate = useNavigate();
  const [showAdd, setShowAdd] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  return (
    <div className="container">
      <header className="page-header">
        <h1>Todo List</h1>
        <button className="btn btn-blue" onClick={() => setShowAdd(true)}>
          Tambah Todo
        </button>
      </header>

      <table className="table">
        <thead>
          <tr>
            <th>Judul</th>
            <th>Status</th>
            <th>Prioritas</th>
            <th>Deadline</th>
            <th className="center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {todos.length === 0 && (
            <tr>
              <td colSpan={5} className="empty">
                Belum ada tugas. Klik "Tambah Todo" untuk membuat tugas pertama.
              </td>
            </tr>
          )}
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td className="truncate" title={todo.title}>{todo.title}</td>
              <td>{todo.status}</td>
              <td>{todo.priority}</td>
              <td>{todo.deadline}</td>
              <td className="center actions">
                <button className="icon-btn icon-blue" aria-label={`Lihat detail ${todo.title}`} onClick={() => navigate(`/todo/${todo.id}`)}>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></svg>
                </button>
                <button className="icon-btn icon-red" aria-label={`Hapus ${todo.title}`} onClick={() => setToDelete(todo)}>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14M10 10v6M14 10v6" /></svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAdd && <TodoModal mode="add" onClose={() => setShowAdd(false)} onSubmit={onAdd} />}
      {toDelete && (
        <ConfirmModal
          title={toDelete.title}
          onCancel={() => setToDelete(null)}
          onConfirm={() => {
            onDelete(toDelete.id);
            setToDelete(null);
          }}
        />
      )}
    </div>
  );
}
