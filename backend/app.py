from fastapi import FastAPI
from routes.startup import router as startup_router
from db import connect_to_mongo, close_mongo

app = FastAPI()

app.include_router(startup_router)


@app.on_event("startup")
async def startup_event():
    await connect_to_mongo()


@app.on_event("shutdown")
async def shutdown_event():
    await close_mongo()


@app.get("/")
def root():
    return {"message": "Entangle backend running"}
