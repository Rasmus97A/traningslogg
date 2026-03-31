# Träningslogg
**Rasmus Andersen**

En fullstack CRUD-applikation för att logga träningspass – övningar, set, reps och vikt.

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)

---

## Kom igång

### Backend
```bash
cd backend
pip install -r requirements.txt
python app.py
```

API körs på `http://localhost:8000` — dokumentation på `http://localhost:8000/docs`

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Appen körs på `http://localhost:5173`

---

## Endpoints

| Metod | URL | Beskrivning |
|---|---|---|
| `POST` | `/logs/` | Skapa nytt träningspass |
| `GET` | `/logs/` | Hämta alla pass |
| `GET` | `/logs/{id}` | Hämta ett specifikt pass |
| `PUT` | `/logs/{id}` | Uppdatera ett pass |
| `DELETE` | `/logs/{id}` | Ta bort ett pass |

---

## Projektstruktur
```
traningslogg/
├── backend/
│   ├── app.py
│   ├── database.py
│   ├── requirements.txt
│   ├── models/
│   │   └── workout.py
│   ├── schemas/
│   │   └── workout.py
│   └── routes/
│       └── logs.py
└── frontend/
    └── src/
        ├── App.jsx
        ├── components/
        │   ├── LogCard.jsx
        │   └── LogForm.jsx
        └── services/
            └── logService.js
```
