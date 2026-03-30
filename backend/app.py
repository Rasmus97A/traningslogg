from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import engine
from models.workout import Base
from routes.logs import router as logs_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Träningslogg API",
    description="API för att logga träningspass",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(logs_router)

@app.get("/")
def root():
    return {"message": "Träningslogg API körs!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)