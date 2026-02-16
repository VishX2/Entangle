from fastapi import APIRouter
from controllers.startup_controller import get_startup_dashboard

router = APIRouter()

@router.get("/dashboard/{startup_id}")
async def startup_dashboard(startup_id: str):
    return await get_startup_dashboard(startup_id)
