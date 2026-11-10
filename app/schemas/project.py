from pydantic import BaseModel, Field
from enum import Enum

class DifficultyLevel(str, Enum):
    beginner = "beginner"
    intermediate = "intermediate"
    advanced = "advanced"

class ProjectBase(BaseModel):
    title: str = Field(min_length=3, title="Project Title", description="The title of the project")
    description: str = Field(min_length=10, title="Project Description", description="A brief description of the project")
    technologies: list[str] = Field(min_length=1, title="Technologies Used", description="Technologies used in the project")
    difficulty: DifficultyLevel = Field( title="Project Difficulty", description="The difficulty level of the project")

class ProjectRequest(ProjectBase):
    pass

class ProjectResponse(ProjectBase):
    features: list[str] = Field(min_length=1, title="Project Features", description="Key features of the project")
    tasks: list[str] = Field(min_length=1, title="Project Tasks", description="Tasks involved in the project")
    phases: list[str] = Field(min_length=1, title="Project Phases", description="Phases of the project")