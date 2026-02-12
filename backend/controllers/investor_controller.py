from bson import ObjectId
from db import get_db


# Helper function to convert MongoDB document to JSON-friendly format
def investor_helper(investor) -> dict:
    return {
        "id": str(investor["_id"]),
        "name": investor.get("name"),
        "email": investor.get("email"),
        "investment_focus": investor.get("investment_focus"),
        "budget": investor.get("budget"),
        "rating": investor.get("rating"),
    }


# Create a new investor
async def create_investor(data: dict):
    db = get_db()

    # Insert investor data into the "investors" collection
    result = await db.investors.insert_one(data)

    # Return the new investor ID
    return {"id": str(result.inserted_id)}


# Get all investors
async def get_all_investors():
    db = get_db()
    investors = []

    # Loop through all investor documents
    async for investor in db.investors.find():
        investors.append(investor_helper(investor))

    return investors


# Get a single investor by ID
async def get_investor_by_id(investor_id: str):
    db = get_db()

    investor = await db.investors.find_one({"_id": ObjectId(investor_id)})

    if investor:
        return investor_helper(investor)

    return None


# Update investor data
async def update_investor(investor_id: str, data: dict):
    db = get_db()

    result = await db.investors.update_one(
        {"_id": ObjectId(investor_id)},
        {"$set": data}
    )

    return result.modified_count > 0


# Delete an investor
async def delete_investor(investor_id: str):
    db = get_db()

    result = await db.investors.delete_one(
        {"_id": ObjectId(investor_id)}
    )

    return result.deleted_count > 0
