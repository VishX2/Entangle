from bson import ObjectId
from db import get_db


async def get_startup_dashboard(startup_id: str):

    db = get_db()
    startup = await db.startups.find_one({
        "_id": ObjectId(startup_id)
    })

    if not startup:
        return {"error": "Startup not found"}

    return {
        "startupName": startup.get("name"),
        "stage": startup.get("stage"),
        "seeking": startup.get("seeking"),
        "equity": startup.get("equity"),
        "tractionScore": startup.get("traction_score", 0),
        "profileStrength": startup.get("profile_strength", 0),
        "stats": {
            "profileViews": startup.get("profile_views", 0),
            "investorInterest": startup.get("investor_interest", 0)
        }
    }
