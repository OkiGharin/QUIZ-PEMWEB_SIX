// "2026-11-26" -> "26 Nov 2026"
export function formatDate(dateString) {
  if (!dateString) return "-";
  const date = new Date(dateString + "T00:00:00");
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// Hitung sisa hari, lalu kembalikan teks dan jenis warnanya
export function getDeadlineInfo(deadline, status) {
  if (status === "done") {
    return { text: formatDate(deadline), type: "normal" };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(deadline + "T00:00:00");
  const days = Math.round((due - today) / (1000 * 60 * 60 * 24));

  if (days < 0) return { text: "Terlambat " + Math.abs(days) + " hari", type: "late" };
  if (days === 0) return { text: "Hari ini", type: "soon" };
  if (days <= 3) return { text: days + " hari lagi", type: "soon" };
  return { text: formatDate(deadline), type: "normal" };
}
