from fastapi import APIRouter, HTTPException
from controllers.startup_controller import (
    create_startup,
    get_all_startups,
    get_startup_by_id,
    update_startup,
    delete_startup
)

router = APIRouter()


@router.post("/startups")
async def create(data: dict):
    return await create_startup(data)


@router.get("/startups")
async def get_all():
    return await get_all_startups()


@router.get("/startups/{startup_id}")
async def get_one(startup_id: str):
    startup = await get_startup_by_id(startup_id)
    if not startup:
        raise HTTPException(status_code=404, detail="Startup not found")
    return startup


@router.put("/startups/{startup_id}")
async def update(startup_id: str, data: dict):
    success = await update_startup(startup_id, data)
    if not success:
        raise HTTPException(status_code=404, detail="Startup not found")
    return {"message": "Startup updated"}


@router.delete("/startups/{startup_id}")
async def delete(startup_id: str):
    success = await delete_startup(startup_id)
    if not success:
        raise HTTPException(status_code=404, detail="Startup not found")
    return {"message": "Startup deleted"}
