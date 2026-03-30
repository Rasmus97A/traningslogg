import { useState, useEffect } from "react";
import LogCard from "./components/LogCard";
import LogForm from "./components/LogForm";
import { getLogs, createLog, updateLog, deleteLog } from "./services/logService";
import "./App.css";

export default function App() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editLog, setEditLog] = useState(null);
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(null);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await getLogs();
      setLogs(res.data);
      setError(null);
    } catch {
      setError("Kunde inte ansluta till backend. Kontrollera att servern körs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLogs(); }, []);

  const notify = (msg, type = "success") => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleCreate = async (data) => {
    try {
      await createLog(data);
      await fetchLogs();
      setShowForm(false);
      notify("Pass loggat! 💪");
    } catch (e) {
      notify(e.response?.data?.detail || "Fel vid skapande", "error");
    }
  };

  const handleUpdate = async (data) => {
    try {
      await updateLog(editLog.id, data);
      await fetchLogs();
      setEditLog(null);
      notify("Logg uppdaterad ✅");
    } catch (e) {
      notify(e.response?.data?.detail || "Fel vid uppdatering", "error");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Ta bort denna logg?")) return;
    try {
      await deleteLog(id);
      await fetchLogs();
      notify("Logg borttagen 🗑️");
    } catch {
      notify("Fel vid borttagning", "error");
    }
  };

  const filtered = logs.filter((l) =>
    l.exercise.toLowerCase().includes(filter.toLowerCase()) ||
    (l.notes || "").toLowerCase().includes(filter.toLowerCase())
  );

  const totalVolume = logs.reduce((sum, l) => sum + l.sets * l.reps * l.weight_kg, 0);
  const uniqueExercises = new Set(logs.map((l) => l.exercise)).size;
  const heaviest = logs.reduce((max, l) => l.weight_kg > (max?.weight_kg ?? 0) ? l : max, null);

  return (
    <div className="app">
      {notification && (
        <div className={`notification ${notification.type}`}>{notification.msg}</div>
      )}

      <header className="app-header">
        <div className="header-content">
          <div>
            <h1>🏋️ Träningslogg</h1>
            <p className="subtitle">{logs.length} pass loggade</p>
          </div>
          <button className="btn-primary" onClick={() => { setShowForm(true); setEditLog(null); }}>
            + Logga pass
          </button>
        </div>

        {logs.length > 0 && (
          <div className="stats-bar">
            <div className="stat-pill">
              <span className="stat-pill-val">{totalVolume.toLocaleString("sv-SE")} kg</span>
              <span className="stat-pill-lbl">Total volym</span>
            </div>
            <div className="stat-pill">
              <span className="stat-pill-val">{logs.length}</span>
              <span className="stat-pill-lbl">Loggade set</span>
            </div>
            <div className="stat-pill">
              <span className="stat-pill-val">{uniqueExercises}</span>
              <span className="stat-pill-lbl">Övningar</span>
            </div>
            {heaviest && (
              <div className="stat-pill">
                <span className="stat-pill-val">{heaviest.weight_kg} kg</span>
                <span className="stat-pill-lbl">Tyngst lyft</span>
              </div>
            )}
          </div>
        )}
      </header>

      <main className="app-main">
        {(showForm || editLog) && (
          <div className="modal-overlay" onClick={() => { setShowForm(false); setEditLog(null); }}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <h2>{editLog ? "Redigera logg" : "Logga nytt pass"}</h2>
              <LogForm
                initial={editLog}
                onSubmit={editLog ? handleUpdate : handleCreate}
                onCancel={() => { setShowForm(false); setEditLog(null); }}
              />
            </div>
          </div>
        )}

        <div className="search-bar">
          <input
            type="text"
            placeholder="🔍 Filtrera på övning eller anteckning..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>

        {loading && <div className="status-msg">Laddar loggar...</div>}
        {error && <div className="status-msg error">{error}</div>}
        {!loading && !error && filtered.length === 0 && (
          <div className="status-msg">
            {filter ? "Inga loggar matchar filtret." : "Inga pass loggade än. Dags att träna! 💪"}
          </div>
        )}

        <div className="logs-grid">
          {filtered.map((log) => (
            <LogCard
              key={log.id}
              log={log}
              onEdit={(l) => { setEditLog(l); setShowForm(false); }}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </main>
    </div>
  );
}