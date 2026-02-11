from fastapi import APIRouter, Depends
from backend.db import get_db

router = APIRouter()

@router.get("/")
async def test_mongo(db=Depends(get_db)):
    await db.test.insert_one({"status": "working"})
    return {"message": "MongoDB is connected & write works"}
