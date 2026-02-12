from bson import ObjectId
from db import get_db


# Convert Mongo document to JSON-friendly format
def startup_helper(startup) -> dict:
    return {
        "id": str(startup["_id"]),
        "name": startup.get("name"),
        "industry": startup.get("industry"),
        "description": startup.get("description"),
        "funding_needed": startup.get("funding_needed"),
        "rating": startup.get("rating"),
    }


# Create startup
async def create_startup(data: dict):
    db = get_db()
    result = await db.startups.insert_one(data)
    return {"id": str(result.inserted_id)}


# Get all startups
async def get_all_startups():
    db = get_db()
    startups = []
    async for startup in db.startups.find():
        startups.append(startup_helper(startup))
    return startups


# Get one startup
async def get_startup_by_id(startup_id: str):
    db = get_db()
    startup = await db.startups.find_one({"_id": ObjectId(startup_id)})
    if startup:
        return startup_helper(startup)
    return None


# Update startup
async def update_startup(startup_id: str, data: dict):
    db = get_db()
    result = await db.startups.update_one(
        {"_id": ObjectId(startup_id)},
        {"$set": data}
    )
    return result.modified_count > 0


# Delete startup
async def delete_startup(startup_id: str):
    db = get_db()
    result = await db.startups.delete_one(
        {"_id": ObjectId(startup_id)}
    )
    return result.deleted_count > 0
