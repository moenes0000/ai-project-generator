from fastapi import APIRouter, HTTPException
from app.schemas.project import ProjectRequest, ProjectResponse
from app.services.project_generator import generate_project

router = APIRouter(prefix="/projects", tags=["Projects"])


@router.post("/generate", response_model=ProjectResponse)
def create_project(project: ProjectRequest):

    try:
        # Générer le projet avec l'IA
        result = generate_project(project)

        return result

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Project generation failed: {str(e)}"
        )