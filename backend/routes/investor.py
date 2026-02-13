from fastapi import APIRouter, HTTPException
from controllers.investor_controller import (
    create_investor,
    get_all_investors
)
from models.investor_model import InvestorModel

router = APIRouter()


# Create investor
@router.post("/investors")
async def create(data: InvestorModel):
    return await create_investor(data)


# Get all investors
@router.get("/investors")
async def get_all():
    return await get_all_investors()
