from fastapi import APIRouter, HTTPException
from controllers.entrepreneur_controller import (
    create_entrepreneur,
    get_all_entrepreneurs,
    get_entrepreneur_by_id,
    update_entrepreneur,
    delete_entrepreneur
)

# Create router for entrepreneur endpoints
router = APIRouter()


# Create entrepreneur
@router.post("/entrepreneurs")
async def create(data: dict):
    return await create_entrepreneur(data)


# Get all entrepreneurs
@router.get("/entrepreneurs")
async def get_all():
    return await get_all_entrepreneurs()


# Get one entrepreneur
@router.get("/entrepreneurs/{entrepreneur_id}")
async def get_one(entrepreneur_id: str):
    entrepreneur = await get_entrepreneur_by_id(entrepreneur_id)

    if not entrepreneur:
        raise HTTPException(status_code=404, detail="Entrepreneur not found")

    return entrepreneur


# Update entrepreneur
@router.put("/entrepreneurs/{entrepreneur_id}")
async def update(entrepreneur_id: str, data: dict):
    success = await update_entrepreneur(entrepreneur_id, data)

    if not success:
        raise HTTPException(status_code=404, detail="Entrepreneur not found")

    return {"message": "Entrepreneur updated"}


# Delete entrepreneur
@router.delete("/entrepreneurs/{entrepreneur_id}")
async def delete(entrepreneur_id: str):
    success = await delete_entrepreneur(entrepreneur_id)

    if not success:
        raise HTTPException(status_code=404, detail="Entrepreneur not found")

    return {"message": "Entrepreneur deleted"}
