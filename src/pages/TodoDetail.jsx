import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TodoDrawer from "../components/TodoDrawer.jsx";
import ConfirmDialog from "../components/ConfirmDialog.jsx";
import { STATUS_LABEL, PRIORITY_LABEL } from "../data/dummyTodos.js";
import { formatDate, getDeadlineInfo } from "../utils.js";

export default function TodoDetail({ todos, onUpdate, onDelete }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showEdit, setShowEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const todo = todos.find((t) => t.id === Number(id));

  if (!todo) {
    return (
      <div className="page narrow">
        <Link to="/" className="back">
          ← Kembali ke papan
        </Link>
        <p className="not-found">Tugas ini tidak ditemukan. Mungkin sudah dihapus.</p>
      </div>
    );
  }

  const deadline = getDeadlineInfo(todo.deadline, todo.status);

  function handleDelete() {
    onDelete(todo.id);
    navigate("/");
  }

  return (
    <div className="page narrow">
      <Link to="/" className="back">
        ← Kembali ke papan
      </Link>

      <div className="detail">
        <div className="detail-main">
          <span className={"chip " + todo.priority}>
            Prioritas {PRIORITY_LABEL[todo.priority].toLowerCase()}
          </span>
          <h1>{todo.title}</h1>
          <h2 className="detail-label">Deskripsi</h2>
          <p className="detail-desc">{todo.description || "Belum ada deskripsi."}</p>
        </div>

        <div className="detail-side">
          <p className="side-label">Status</p>
          <p className="side-value">{STATUS_LABEL[todo.status]}</p>

          <p className="side-label">Deadline</p>
          <p className="side-value">{formatDate(todo.deadline)}</p>
          <p className={"due " + deadline.type}>{deadline.text}</p>

          <div className="side-buttons">
            <button className="btn btn-main" onClick={() => setShowEdit(true)}>
              Ubah tugas
            </button>
            <button className="btn btn-danger-outline" onClick={() => setShowConfirm(true)}>
              Hapus
            </button>
          </div>
        </div>
      </div>

      {showEdit && (
        <TodoDrawer
          todo={todo}
          onClose={() => setShowEdit(false)}
          onSubmit={(data) => onUpdate(todo.id, data)}
        />
      )}

      {showConfirm && (
        <ConfirmDialog
          title={todo.title}
          onCancel={() => setShowConfirm(false)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}
