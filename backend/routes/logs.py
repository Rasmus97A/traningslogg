from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from models.workout import WorkoutLog
from schemas.workout import WorkoutLogCreate, WorkoutLogUpdate, WorkoutLogResponse
from database import get_db

router = APIRouter(prefix="/logs", tags=["logs"])


@router.post("/", response_model=WorkoutLogResponse, status_code=status.HTTP_201_CREATED)
def create_log(log: WorkoutLogCreate, db: Session = Depends(get_db)):
    db_log = WorkoutLog(**log.model_dump())
    db.add(db_log)
    db.commit()
    db.refresh(db_log)
    return db_log


@router.get("/", response_model=List[WorkoutLogResponse], status_code=status.HTTP_200_OK)
def get_logs(db: Session = Depends(get_db)):
    return db.query(WorkoutLog).order_by(WorkoutLog.date.desc()).all()


@router.get("/{log_id}", response_model=WorkoutLogResponse, status_code=status.HTTP_200_OK)
def get_log(log_id: int, db: Session = Depends(get_db)):
    log = db.query(WorkoutLog).filter(WorkoutLog.id == log_id).first()
    if not log:
        raise HTTPException(status_code=404, detail=f"Logg med id {log_id} hittades inte")
    return log


@router.put("/{log_id}", response_model=WorkoutLogResponse, status_code=status.HTTP_200_OK)
def update_log(log_id: int, log_data: WorkoutLogUpdate, db: Session = Depends(get_db)):
    log = db.query(WorkoutLog).filter(WorkoutLog.id == log_id).first()
    if not log:
        raise HTTPException(status_code=404, detail=f"Logg med id {log_id} hittades inte")
    for field, value in log_data.model_dump(exclude_unset=True).items():
        setattr(log, field, value)
    db.commit()
    db.refresh(log)
    return log


@router.delete("/{log_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_log(log_id: int, db: Session = Depends(get_db)):
    log = db.query(WorkoutLog).filter(WorkoutLog.id == log_id).first()
    if not log:
        raise HTTPException(status_code=404, detail=f"Logg med id {log_id} hittades inte")
    db.delete(log)
    db.commit()