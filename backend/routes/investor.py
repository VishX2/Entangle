from fastapi import APIRouter, HTTPException
from controllers.investor_controller import (
    create_investor,
    get_all_investors,
    get_investor_by_id,
    update_investor,
    delete_investor
)

# Create a router for investor endpoints
router = APIRouter()


# Create investor
@router.post("/investors")
async def create(data: dict):
    return await create_investor(data)


# Get all investors
@router.get("/investors")
async def get_all():
    return await get_all_investors()


# Get one investor
@router.get("/investors/{investor_id}")
async def get_one(investor_id: str):
    investor = await get_investor_by_id(investor_id)

    if not investor:
        raise HTTPException(status_code=404, detail="Investor not found")

    return investor


# Update investor
@router.put("/investors/{investor_id}")
async def update(investor_id: str, data: dict):
    success = await update_investor(investor_id, data)

    if not success:
        raise HTTPException(status_code=404, detail="Investor not found")

    return {"message": "Investor updated"}


# Delete investor
@router.delete("/investors/{investor_id}")
async def delete(investor_id: str):
    success = await delete_investor(investor_id)

    if not success:
        raise HTTPException(status_code=404, detail="Investor not found")

    return {"message": "Investor deleted"}
