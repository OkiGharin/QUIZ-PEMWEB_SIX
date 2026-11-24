import { useState } from "react";
import {
  STATUS_OPTIONS,
  PRIORITY_OPTIONS,
  STATUS_LABEL,
  PRIORITY_LABEL,
} from "../data/dummyTodos.js";

// Panel dari kanan. Kalau ada prop "todo" berarti mode ubah, kalau tidak berarti tambah.
export default function TodoDrawer({ todo, defaultStatus, onClose, onSubmit }) {
  const [title, setTitle] = useState(todo ? todo.title : "");
  const [description, setDescription] = useState(todo ? todo.description : "");
  const [status, setStatus] = useState(todo ? todo.status : defaultStatus);
  const [priority, setPriority] = useState(todo ? todo.priority : "low");
  const [deadline, setDeadline] = useState(todo ? todo.deadline : "");

  const [titleError, setTitleError] = useState("");
  const [deadlineError, setDeadlineError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    // validasi sederhana
    let valid = true;
    if (title.trim() === "") {
      setTitleError("Judul tugas belum diisi.");
      valid = false;
    } else {
      setTitleError("");
    }
    if (deadline === "") {
      setDeadlineError("Pilih tanggal deadline.");
      valid = false;
    } else {
      setDeadlineError("");
    }
    if (!valid) return;

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      status: status,
      priority: priority,
      deadline: deadline,
    });
    onClose();
  }

  return (
    <div className="overlay" onClick={onClose}>
      <form className="drawer" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <div className="drawer-head">
          <h2>{todo ? "Ubah tugas" : "Tugas baru"}</h2>
          <button type="button" className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="field">
          <label>Judul</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Apa yang perlu dikerjakan?"
          />
          {titleError && <span className="error">{titleError}</span>}
        </div>

        <div className="field">
          <label>Deskripsi</label>
          <textarea
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Catatan atau detail tugas"
          />
        </div>

        <div className="field">
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {STATUS_LABEL[s]}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label>Prioritas</label>
          <div className="priority-options">
            {PRIORITY_OPTIONS.map((p) => (
              <button
                key={p}
                type="button"
                className={priority === p ? "priority-btn active " + p : "priority-btn"}
                onClick={() => setPriority(p)}
              >
                {PRIORITY_LABEL[p]}
              </button>
            ))}
          </div>
        </div>

        <div className="field">
          <label>Deadline</label>
          <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
          {deadlineError && <span className="error">{deadlineError}</span>}
        </div>

        <div className="drawer-buttons">
          <button type="button" className="btn btn-outline" onClick={onClose}>
            Batal
          </button>
          <button type="submit" className="btn btn-main">
            {todo ? "Simpan perubahan" : "Tambah tugas"}
          </button>
        </div>
      </form>
    </div>
  );
}
