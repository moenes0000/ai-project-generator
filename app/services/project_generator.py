import json

from app.schemas.project import ProjectRequest, ProjectResponse
from app.services.prompt_builder import build_project_prompt
from app.services.ollama import generate_with_ollama
def generate_project(project: ProjectRequest) -> ProjectResponse:

    prompt = build_project_prompt(project)

    generated_text = generate_with_ollama(prompt)
    print("REPONSE BRUTE DE QWEN :")
    print(repr(generated_text))

    generated_data = json.loads(generated_text)

    project_response = ProjectResponse.model_validate(generated_data)

    return project_response