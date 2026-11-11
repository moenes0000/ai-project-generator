# AI Project Generator

A full-stack application that generates structured software project plans from user ideas using a locally running Large Language Model.

## About the Project

I built this project to explore how Large Language Models can be integrated into a web application.

The idea is simple: a user describes a software project, selects the technologies and difficulty level, and receives a structured development plan.

The generated plan includes:
- Project features
- Development tasks
- Project phases

The application uses Qwen2.5 through Ollama, so the language model runs locally rather than relying on an external AI API.

## Technologies

**Backend**
- Python
- FastAPI
- Pydantic
- Requests

**Frontend**
- React
- Vite
- CSS

**AI**
- Ollama
- Qwen2.5:3b

## How It Works

1. The user fills in the project form.
2. React sends the information to the FastAPI endpoint.
3. Pydantic validates the input data.
4. The backend builds a prompt based on the user's information.
5. Ollama sends the prompt to Qwen2.5.
6. The generated response is parsed and validated.
7. React displays the generated project plan.

## Project Structure

```text
ai_project_generator/
│
├── app/
│   ├── api/
│   │   └── routes/
│   ├── schemas/
│   ├── services/
│   └── main.py
│
├── frontend/
│   ├── src/
│   └── package.json
│
├── tests/
├── requirements.txt
├── .env.example
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

Make sure you have installed:

- Python 3.13
- Node.js and npm
- Ollama

### 1. Clone the repository

```bash
git clone https://github.com/moenes0000/ai-project-generator.git
cd ai-project-generator
```

### 2. Set up the AI model

Install Ollama and download the model:

```bash
ollama pull qwen2.5:3b
```

Make sure Ollama is running before generating a project.

### 3. Set up the backend

Create a virtual environment:

```bash
python -m venv .venv
```

Activate it on Windows:

```powershell
.\.venv\Scripts\Activate.ps1
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the API:

```bash
fastapi dev app/main.py
```

The API documentation is available at:

http://127.0.0.1:8000/docs

### 4. Set up the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the application at:

http://localhost:5173/

## API Endpoint

**Generate a project**

```http
POST /projects/generate
```

Example request:

```json
{
  "title": "AI Learning Platform",
  "description": "A platform that helps students learn programming with AI",
  "technologies": ["Python", "FastAPI", "React"],
  "difficulty": "intermediate"
}
```

The response contains the generated project information, including features, tasks and development phases.

## Screenshots
<img width="696" height="812" alt="project generator " src="https://github.com/user-attachments/assets/004ac543-54e1-4614-a0f4-da84fb63b2a0" />
<img width="756" height="841" alt="result 1" src="https://github.com/user-attachments/assets/b8e8d609-f693-41fc-93b8-d0d81d771812" />
<img width="822" height="780" alt="result 2" src="https://github.com/user-attachments/assets/d8937f6a-68c3-4f1b-9558-ad7350e71b58" />

## What I Learned

Through this project, I worked on:

- Building REST APIs with FastAPI.
- Validating structured data with Pydantic.
- Connecting a Python backend to a local LLM using Ollama.
- Building prompts for structured JSON generation.
- Connecting a React frontend to a FastAPI backend.

## Author

**Moenes Gasmi**

GitHub: https://github.com/moenes0000

LinkedIn: https://www.linkedin.com/in/moenes-gasmi/
