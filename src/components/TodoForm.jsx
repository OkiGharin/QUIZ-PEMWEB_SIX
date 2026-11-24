import { useState } from "react";

export default function TodoForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("low");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (title.trim() === "") {
      setError("Judul tugas tidak boleh kosong.");
      return;
    }

    onAdd({
      title: title.trim(),
      description: description.trim(),
      deadline: deadline,
      priority: priority,
    });

    setTitle("");
    setDescription("");
    setDeadline("");
    setPriority("low");
    setError("");
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        className="field-title"
        type="text"
        placeholder="Tugas baru..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="low">Prioritas rendah</option>
        <option value="medium">Prioritas sedang</option>
        <option value="high">Prioritas tinggi</option>
      </select>

      <label className="deadline-field">
        <span>Deadline</span>
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
      </label>

      <textarea
        className="field-desc"
        rows="3"
        placeholder="Deskripsi tugas (opsional)..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button type="submit">Tambah</button>

      {error && <p className="error">{error}</p>}
    </form>
  );
}
