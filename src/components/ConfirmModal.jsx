export default function ConfirmModal({ title, onCancel, onConfirm }) {
  return (
    <div className="overlay" onClick={onCancel}>
      <div className="modal modal-sm" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">Hapus Todo</h2>
        <p className="confirm-text">
          Yakin ingin menghapus tugas <strong>{title}</strong>? Tindakan ini tidak dapat
          dibatalkan.
        </p>
        <div className="form-actions">
          <button className="btn btn-red" onClick={onCancel}>
            Batal
          </button>
          <button className="btn btn-blue" onClick={onConfirm}>
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}
