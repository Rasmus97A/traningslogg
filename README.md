# Träningslogg
# Rasmus Andersen

## Starta backend
cd backend

pip install -r requirements.txt

python app.py

## Starta frontend

cd frontend

npm install

npm run dev

## Endpoints
- POST   /logs/       - Skapa nytt pass
- GET    /logs/       - Hämta alla pass
- GET    /logs/{id}   - Hämta ett pass
- PUT    /logs/{id}   - Uppdatera ett pass
- DELETE /logs/{id}   - Ta bort ett pass
