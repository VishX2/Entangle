from pydantic import BaseModel
from typing import List
from datetime import datetime


class InvestmentPreferences(BaseModel):
    industries: List[str]
    stages: List[str]
    min_investment: float
    max_investment: float


class Background(BaseModel):
    years_experience: int
    investments_made: int


class InvestorModel(BaseModel):
    name: str
    email: str
    location: str
    bio: str
    joined_date: str

    investment_preferences: InvestmentPreferences
    background: Background

    rating: float = 0.0
    created_at: datetime = datetime.utcnow()
