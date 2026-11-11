import { useState } from "react";
import "./App.css";

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
      const response = await fetch(
        "http://127.0.0.1:8000/projects/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(projectData),
        }
      );

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
        <h1>AI Project Generator</h1>
        <p>Turn your ideas into structured software projects with AI.</p>
      </header>

      <section className="form-section">
        <h2>Describe your project</h2>

        <form onSubmit={handleGenerate}>
          <label>Project title</label>
          <input
            type="text"
            placeholder="Example: AI Learning Platform"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />

          <label>Project description</label>
          <textarea
            placeholder="Describe your project idea..."
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          />

          <label>Technologies</label>
          <input
            type="text"
            placeholder="Python, FastAPI, React..."
            value={technologies}
            onChange={(event) => setTechnologies(event.target.value)}
            required
          />
          <small>Separate technologies with commas.</small>

          <label>Difficulty level</label>
          <select
            value={difficulty}
            onChange={(event) => setDifficulty(event.target.value)}
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>

          <button type="submit" disabled={loading}>
            {loading ? "Generating..." : "Generate Project"}
          </button>
        </form>
      </section>

      {error && <p className="error">{error}</p>}

      {result && (
        <section className="results">
          <h2>{result.title}</h2>
          <p>{result.description}</p>

          <h3>Technologies</h3>
          <p>{result.technologies.join(", ")}</p>

          <h3>Features</h3>
          <ul>
            {result.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>

          <h3>Tasks</h3>
          <ul>
            {result.tasks.map((task, index) => (
              <li key={index}>{task}</li>
            ))}
          </ul>

          <h3>Project phases</h3>
          <ol>
            {result.phases.map((phase, index) => (
              <li key={index}>{phase}</li>
            ))}
          </ol>
        </section>
      )}
    </main>
  );
}

export default App;