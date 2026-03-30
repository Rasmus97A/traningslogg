from pydantic import BaseModel, Field, field_validator
from typing import Optional
import datetime


class WorkoutLogBase(BaseModel):
    exercise:  str   = Field(..., min_length=1, max_length=255)
    sets:      int   = Field(..., ge=1, le=100)
    reps:      int   = Field(..., ge=1, le=1000)
    weight_kg: float = Field(..., ge=0.0, le=1000.0)
    date:      datetime.date = Field(default_factory=datetime.date.today)
    notes:     Optional[str] = Field(None, max_length=500)

    @field_validator("exercise")
    @classmethod
    def strip_whitespace(cls, v: str) -> str:
        return v.strip()


class WorkoutLogCreate(WorkoutLogBase):
    pass


class WorkoutLogUpdate(BaseModel):
    exercise:  Optional[str]   = Field(None, min_length=1, max_length=255)
    sets:      Optional[int]   = Field(None, ge=1, le=100)
    reps:      Optional[int]   = Field(None, ge=1, le=1000)
    weight_kg: Optional[float] = Field(None, ge=0.0, le=1000.0)
    date:      Optional[datetime.date] = None
    notes:     Optional[str]   = Field(None, max_length=500)


class WorkoutLogResponse(WorkoutLogBase):
    id: int

    model_config = {"from_attributes": True}