from fastapi import FastAPI
from routes.startup import router as startup_router
from routes.investor import router as investor_router
from routes.entrepreneur import router as entrepreneur_router
from db import connect_to_mongo, close_mongo

app = FastAPI()

# Register all routes
app.include_router(startup_router)
app.include_router(investor_router)
app.include_router(entrepreneur_router)


# Connect to MongoDB when app starts
@app.on_event("startup")
async def startup_event():
    await connect_to_mongo()


# Close MongoDB when app shuts down
@app.on_event("shutdown")
async def shutdown_event():
    await close_mongo()


@app.get("/")
def root():
    return {"message": "Entangle backend running"}
