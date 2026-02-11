from fastapi import FastAPI
from backend.db import connect_to_mongo, close_mongo
from backend.routes import entrepreneur

app = FastAPI()

@app.on_event("startup")
async def startup():
    await connect_to_mongo()

@app.on_event("shutdown")
async def shutdown():
    await close_mongo()

app.include_router(entrepreneur.router, prefix="/entrepreneur")
