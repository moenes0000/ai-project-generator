from fastapi import FastAPI
from app.api.routes.projects import router as projects_router
app = FastAPI()
@app.get("/")
def home():
    return {"Hello": "World"}

@app.get("/health")
def health():
    return {"status": "healthy"}
app.include_router(projects_router)