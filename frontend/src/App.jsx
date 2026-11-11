import { useState } from "react";
import "./App.css";

const DIFFICULTIES = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

// Numérotation sur deux chiffres : 1 -> "01"
const pad = (n) => String(n).padStart(2, "0");

function App() {
  // Les informations saisies par l'utilisateur
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [difficulty, setDifficulty] = useState("beginner");

  // Les états de génération
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fonction appelée quand l'utilisateur clique sur Generate
  async function handleGenerate(event) {
    event.preventDefault();

    setLoading(true);
    setError("");
    setResult(null);

    // Préparer les données à envoyer à FastAPI
    const projectData = {
      title,
      description,
      technologies: technologies
        .split(",")
        .map((tech) => tech.trim())
        .filter((tech) => tech !== ""),
      difficulty,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/projects/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          typeof data.detail === "string"
            ? data.detail
            : JSON.stringify(data.detail)
        );
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container">
      <header className="header">
        <p className="eyebrow">AI · Project planning</p>
        <h1>
          Project <em>Generator</em>
        </h1>
        <p>Turn your ideas into structured software projects with AI.</p>
      </header>

      <section className="form-section">
        <h2 className="section-title">
          <span>01</span>Describe your project
        </h2>

        <form onSubmit={handleGenerate}>
          <div className="field">
            <label htmlFor="title">Project title</label>
            <input
              id="title"
              type="text"
              placeholder="AI Learning Platform"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="description">Project description</label>
            <textarea
              id="description"
              placeholder="Describe your project idea..."
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="technologies">Technologies</label>
            <input
              id="technologies"
              type="text"
              placeholder="Python, FastAPI, React"
              value={technologies}
              onChange={(event) => setTechnologies(event.target.value)}
              required
            />
            <small>Separate technologies with commas.</small>
          </div>

          <fieldset>
            <legend>Difficulty level</legend>
            <div className="segmented">
              {DIFFICULTIES.map((level) => (
                <label
                  key={level.value}
                  className={difficulty === level.value ? "active" : ""}
                >
                  <input
                    type="radio"
                    name="difficulty"
                    value={level.value}
                    checked={difficulty === level.value}
                    onChange={(event) => setDifficulty(event.target.value)}
                  />
                  {level.label}
                </label>
              ))}
            </div>
          </fieldset>

          <button type="submit" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner" aria-hidden="true" />
                Generating
              </>
            ) : (
              <>
                Generate project
                <span className="arrow" aria-hidden="true">→</span>
              </>
            )}
          </button>
        </form>
      </section>

      {error && (
        <div className="error" role="alert">
          <strong>Something went wrong</strong>
          {error}
        </div>
      )}

      {result && (
        <section className="results">
          <div className="results-header">
            <p className="eyebrow">Your project</p>
            <h2>{result.title}</h2>
            <p>{result.description}</p>

            <ul className="tags">
              {(result.technologies ?? []).map((tech, index) => (
                <li key={index}>{tech}</li>
              ))}
            </ul>
          </div>

          <div className="block">
            <h3>
              <span>02</span>Features
            </h3>
            <ul className="list">
              {(result.features ?? []).map((feature, index) => (
                <li key={index}>
                  <span className="index">{pad(index + 1)}</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="block">
            <h3>
              <span>03</span>Tasks
            </h3>
            <ul className="list">
              {(result.tasks ?? []).map((task, index) => (
                <li key={index}>
                  <span className="index">{pad(index + 1)}</span>
                  <span>{task}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="block">
            <h3>
              <span>04</span>Project phases
            </h3>
            <ol className="timeline">
              {(result.phases ?? []).map((phase, index) => (
                <li key={index}>
                  <span className="phase-label">Phase {pad(index + 1)}</span>
                  {phase}
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      <footer className="footer">AI Project Generator</footer>
    </main>
  );
}

export default App;
