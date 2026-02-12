from bson import ObjectId
from db import get_db


# Helper function to convert MongoDB document to JSON-friendly format
def entrepreneur_helper(entrepreneur) -> dict:
    return {
        "id": str(entrepreneur["_id"]),
        "name": entrepreneur.get("name"),
        "email": entrepreneur.get("email"),
        "idea_stage": entrepreneur.get("idea_stage"),
        "industry": entrepreneur.get("industry"),
        "rating": entrepreneur.get("rating"),
    }


# Create a new entrepreneur
async def create_entrepreneur(data: dict):
    db = get_db()

    # Insert entrepreneur data into the "entrepreneurs" collection
    result = await db.entrepreneurs.insert_one(data)

    # Return the new entrepreneur ID
    return {"id": str(result.inserted_id)}


# Get all entrepreneurs
async def get_all_entrepreneurs():
    db = get_db()
    entrepreneurs = []

    # Loop through all entrepreneur documents
    async for entrepreneur in db.entrepreneurs.find():
        entrepreneurs.append(entrepreneur_helper(entrepreneur))

    return entrepreneurs


# Get a single entrepreneur by ID
async def get_entrepreneur_by_id(entrepreneur_id: str):
    db = get_db()

    entrepreneur = await db.entrepreneurs.find_one(
        {"_id": ObjectId(entrepreneur_id)}
    )

    if entrepreneur:
        return entrepreneur_helper(entrepreneur)

    return None


# Update entrepreneur data
async def update_entrepreneur(entrepreneur_id: str, data: dict):
    db = get_db()

    result = await db.entrepreneurs.update_one(
        {"_id": ObjectId(entrepreneur_id)},
        {"$set": data}
    )

    return result.modified_count > 0


# Delete an entrepreneur
async def delete_entrepreneur(entrepreneur_id: str):
    db = get_db()

    result = await db.entrepreneurs.delete_one(
        {"_id": ObjectId(entrepreneur_id)}
    )

    return result.deleted_count > 0
