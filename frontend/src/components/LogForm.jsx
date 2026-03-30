import { useState, useEffect } from "react";

const EXERCISES = [
  "Bänkpress", "Marklyft", "Knäböj", "Militärpress", "Skivstångsrodd",
  "Chins", "Dips", "Bicepscurl", "Tricepspress", "Benpress", "Annan"
];

const today = () => new Date().toISOString().split("T")[0];

export default function LogForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    exercise: "Bänkpress",
    sets: 3,
    reps: 8,
    weight_kg: 60,
    date: today(),
    notes: "",
    ...initial,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initial) setForm({ ...form, ...initial });
  }, [initial]);

  const validate = () => {
    const e = {};
    if (!form.exercise.trim()) e.exercise = "Övning krävs";
    if (!form.sets || form.sets < 1) e.sets = "Minst 1 set";
    if (!form.reps || form.reps < 1) e.reps = "Minst 1 rep";
    if (form.weight_kg === "" || form.weight_kg < 0) e.weight_kg = "Vikt måste vara ≥ 0";
    if (!form.date) e.date = "Datum krävs";
    return e;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) return setErrors(errs);
    onSubmit({
      ...form,
      sets: parseInt(form.sets),
      reps: parseInt(form.reps),
      weight_kg: parseFloat(form.weight_kg),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="log-form">
      <div className="form-grid">
        <div className="field full-width">
          <label>Övning *</label>
          <select name="exercise" value={form.exercise} onChange={handleChange}>
            {EXERCISES.map((ex) => <option key={ex}>{ex}</option>)}
          </select>
          {errors.exercise && <span className="error">{errors.exercise}</span>}
        </div>
        <div className="field">
          <label>Set *</label>
          <input name="sets" type="number" min="1" value={form.sets} onChange={handleChange} />
          {errors.sets && <span className="error">{errors.sets}</span>}
        </div>
        <div className="field">
          <label>Reps *</label>
          <input name="reps" type="number" min="1" value={form.reps} onChange={handleChange} />
          {errors.reps && <span className="error">{errors.reps}</span>}
        </div>
        <div className="field">
          <label>Vikt (kg) *</label>
          <input name="weight_kg" type="number" min="0" step="0.5" value={form.weight_kg} onChange={handleChange} />
          {errors.weight_kg && <span className="error">{errors.weight_kg}</span>}
        </div>
        <div className="field">
          <label>Datum *</label>
          <input name="date" type="date" value={form.date} onChange={handleChange} />
          {errors.date && <span className="error">{errors.date}</span>}
        </div>
        <div className="field full-width">
          <label>Anteckningar</label>
          <textarea name="notes" rows={2} value={form.notes || ""} onChange={handleChange} placeholder="t.ex. Ny PR, kämpigt..." />
        </div>
      </div>
      <div className="form-actions">
        <button type="button" className="btn-secondary" onClick={onCancel}>Avbryt</button>
        <button type="submit" className="btn-primary">
          {initial ? "Spara ändringar" : "Logga pass"}
        </button>
      </div>
    </form>
  );
}
