import { useState } from "react";
import { STATUS_OPTIONS, PRIORITY_OPTIONS } from "../data/dummyTodos.js";

const emptyForm = {
  title: "",
  description: "",
  status: "to-do",
  priority: "low",
  deadline: "",
};

// Dipakai untuk "Tambah Todo" (tanpa initialData) dan "Update Todo" (dengan initialData)
export default function TodoModal({ mode, initialData, onClose, onSubmit }) {
  const [form, setForm] = useState(
    initialData
      ? {
          title: initialData.title,
          description: initialData.description,
          status: initialData.status,
          priority: initialData.priority,
          deadline: initialData.deadline,
        }
      : emptyForm
  );
  const [error, setError] = useState("");

  const isEdit = mode === "edit";

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.deadline) {
      setError("Judul dan deadline wajib diisi.");
      return;
    }
    onSubmit({ ...form, title: form.title.trim(), description: form.description.trim() });
    onClose();
  };

  return (
    <div className="overlay" onClick={onClose}>
      <form className="modal" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <h2 className="modal-title">{isEdit ? "Update Todo" : "Tambah Todo"}</h2>

        <label className="label" htmlFor="title">Judul</label>
        <input id="title" name="title" className="input" value={form.title} onChange={handleChange} autoFocus />

        <label className="label" htmlFor="description">Deskripsi</label>
        <textarea id="description" name="description" className="input textarea" rows={3} value={form.description} onChange={handleChange} />

        <div className="row">
          <div className="col">
            <label className="label" htmlFor="status">Status</label>
            <select id="status" name="status" className="input" value={form.status} onChange={handleChange}>
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="col">
            <label className="label" htmlFor="priority">Prioritas</label>
            <select id="priority" name="priority" className="input" value={form.priority} onChange={handleChange}>
              {PRIORITY_OPTIONS.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>

        <label className="label" htmlFor="deadline">Deadline</label>
        <input id="deadline" name="deadline" type="date" className="input" value={form.deadline} onChange={handleChange} />

        {error && <p className="error">{error}</p>}

        <div className="form-actions">
          <button type="button" className="btn btn-red" onClick={onClose}>Batal</button>
          <button type="submit" className="btn btn-blue">{isEdit ? "Update" : "Tambah"}</button>
        </div>
      </form>
    </div>
  );
}
