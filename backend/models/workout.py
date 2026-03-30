from sqlalchemy import Column, Integer, String, Float, Date
from sqlalchemy.ext.declarative import declarative_base
import datetime

Base = declarative_base()

class WorkoutLog(Base):
    __tablename__ = "workout_logs"

    id         = Column(Integer, primary_key=True, index=True)
    exercise   = Column(String(255), nullable=False)
    sets       = Column(Integer, nullable=False)
    reps       = Column(Integer, nullable=False)
    weight_kg  = Column(Float, nullable=False)
    date       = Column(Date, nullable=False, default=datetime.date.today)
    notes      = Column(String(500), nullable=True)