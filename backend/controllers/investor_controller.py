from bson import ObjectId
from db import get_db
from models.investor_model import InvestorModel


# Convert MongoDB document to JSON
def investor_helper(investor) -> dict:
    return {
        "id": str(investor["_id"]),
        "name": investor.get("name"),
        "email": investor.get("email"),
        "location": investor.get("location"),
        "bio": investor.get("bio"),
        "rating": investor.get("rating"),
    }


# Create investor
async def create_investor(data: InvestorModel):
    db = get_db()

    # Convert Pydantic model to dictionary
    investor_dict = data.dict()

    result = await db.investors.insert_one(investor_dict)

    return {"id": str(result.inserted_id)}


# Get all investors
async def get_all_investors():
    db = get_db()
    investors = []

    async for investor in db.investors.find():
        investors.append(investor_helper(investor))

    return investors
