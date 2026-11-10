
from app.schemas.project import ProjectRequest


def build_project_prompt(project: ProjectRequest) -> str:
    """
    Build a prompt to generate a structured software project plan.
    """

    technologies = ", ".join(project.technologies)

    prompt = f"""
    You are an expert software engineer and project manager.

    Generate a structured software project plan based on the following information:

    Project title: {project.title}
    Description: {project.description}
    Technologies: {technologies}
    Difficulty: {project.difficulty.value}

    Your task is to generate:
    - Main features
    - Development tasks
    - Development phases

    Rules:
    - Do not generate source code.
    - Return only valid JSON.
    - Use exactly these keys:
      title, description, technologies, difficulty,
      features, tasks, phases.
    - Features, tasks and phases must be lists of strings.
    """

    return prompt
