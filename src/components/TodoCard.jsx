const STATUS_LIST = ["to-do", "in progress", "done"];

const STATUS_LABEL = {
  "to-do": "Belum dikerjakan",
  "in progress": "Sedang dikerjakan",
  done: "Selesai",
};

const PRIORITY_LABEL = {
  low: "Rendah",
  medium: "Sedang",
  high: "Tinggi",
};

// "2026-11-30" -> Date lokal (hindari geser zona waktu)
function parseDate(str) {
  const [y, m, d] = str.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function formatDate(str) {
  return parseDate(str).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function isOverdue(deadline, status) {
  if (!deadline || status === "done") return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return parseDate(deadline) < today;
}

export default function TodoCard({ todo, onDelete, onChangeStatus }) {
  const overdue = isOverdue(todo.deadline, todo.status);

  return (
    <div className={todo.status === "done" ? "card done" : "card"}>
      <span className={"chip " + todo.priority}>{PRIORITY_LABEL[todo.priority]}</span>

      <h3>{todo.title}</h3>

      {todo.description && <p className="desc">{todo.description}</p>}

      {todo.deadline && (
        <p className={overdue ? "deadline overdue" : "deadline"}>
          Deadline: {formatDate(todo.deadline)}
          {overdue && " (terlambat)"}
        </p>
      )}

      <div className="card-bottom">
        <select value={todo.status} onChange={(e) => onChangeStatus(todo.id, e.target.value)}>
          {STATUS_LIST.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABEL[s]}
            </option>
          ))}
        </select>

        <button className="delete-btn" onClick={() => onDelete(todo.id)}>
          Hapus
        </button>
      </div>
    </div>
  );
}
