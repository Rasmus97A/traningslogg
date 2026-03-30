export default function LogCard({ log, onEdit, onDelete }) {
  const volume = log.sets * log.reps * log.weight_kg;

  return (
    <div className="log-card">
      <div className="log-header">
        <span className="exercise-name">{log.exercise}</span>
        <span className="log-date">{log.date}</span>
      </div>

      <div className="stats-row">
        <div className="stat">
          <span className="stat-value">{log.sets}</span>
          <span className="stat-label">SET</span>
        </div>
        <div className="stat-sep">×</div>
        <div className="stat">
          <span className="stat-value">{log.reps}</span>
          <span className="stat-label">REPS</span>
        </div>
        <div className="stat-sep">@</div>
        <div className="stat">
          <span className="stat-value">{log.weight_kg}</span>
          <span className="stat-label">KG</span>
        </div>
      </div>

      <div className="volume-bar">
        <span className="volume-label">Volym</span>
        <span className="volume-value">{volume.toLocaleString("sv-SE")} kg</span>
      </div>

      {log.notes && <p className="log-notes">💬 {log.notes}</p>}

      <div className="card-actions">
        <button className="btn-edit" onClick={() => onEdit(log)}>✏️ Redigera</button>
        <button className="btn-delete" onClick={() => onDelete(log.id)}>🗑️ Ta bort</button>
      </div>
    </div>
  );
}