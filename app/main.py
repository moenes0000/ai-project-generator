from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes.projects import router as projects_router
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
def home():
    return {"Hello": "World"}

@app.get("/health")
def health():
    return {"status": "healthy"}
app.include_router(projects_router)