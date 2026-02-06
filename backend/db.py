import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from pathlib import Path

# Load env explicitly
BASE_DIR = Path(__file__).resolve().parent
load_dotenv(BASE_DIR / ".env")

MONGO_URI = os.getenv("MONGO_URI")
MONGO_DB = os.getenv("MONGO_DB")

print("🔍 MONGO_URI:", MONGO_URI)
print("🔍 MONGO_DB:", MONGO_DB)

if not MONGO_URI or not MONGO_DB:
    raise RuntimeError("MongoDB env vars not loaded")

client: AsyncIOMotorClient | None = None
database = None

async def connect_to_mongo():
    global client, database

    client = AsyncIOMotorClient(MONGO_URI)
    database = client[MONGO_DB]

    await client.admin.command("ping")
    print("MongoDB connected successfully")
    print(f"Database: {database.name}")

async def close_mongo():
    if client:
        client.close()
        print("MongoDB connection closed")

def get_db():
    if database is None:
        raise RuntimeError("Database not initialized")
    return database
