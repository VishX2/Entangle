from fastapi import FastAPI
from db import connect_to_mongo, close_mongo
from routes import entrepreneur
from routes import startup


app = FastAPI()

@app.on_event("startup")
async def startup_event():
    await connect_to_mongo()

@app.on_event("shutdown")
async def shutdown_event():
    await close_mongo()

app.include_router(entrepreneur.router, prefix="/entrepreneur")
app.include_router(startup.router, prefix="/startup")   # 👈 ADD THIS
