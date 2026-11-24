export default function ConfirmDialog({ title, onCancel, onConfirm }) {
  return (
    <div className="overlay center" onClick={onCancel}>
      <div className="dialog" onClick={(e) => e.stopPropagation()}>
        <h2>Hapus tugas ini?</h2>
        <p>"{title}" akan dihapus dan tidak bisa dikembalikan.</p>
        <div className="dialog-buttons">
          <button className="btn btn-outline" onClick={onCancel}>
            Batal
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}
