
import requests

def generate_with_ollama(prompt: str) -> str:
    # URL de l'API locale d'Ollama.
    # Ollama écoute généralement sur le port 11434.
    url = "http://localhost:11434/api/generate"

    # Préparer les données à envoyer à Ollama.
    # model : le modèle IA que nous voulons utiliser.
    # prompt : les instructions construites par prompt_builder.py.
    # stream=False : recevoir toute la réponse en une seule fois.
    payload = {
        "model": "qwen2.5:3b",
        "prompt": prompt,
        "stream": False
    }

    # Envoyer une requête HTTP POST à l'API Ollama.
    # json=payload transforme automatiquement le dictionnaire en JSON.
    response = requests.post(url, json=payload)

    # Vérifier si la requête HTTP a rencontré une erreur.
    # Par exemple : serveur indisponible ou erreur HTTP.
    response.raise_for_status()

    # Convertir la réponse JSON en dictionnaire Python.
    result = response.json()

    # Récupérer le texte généré par le modèle IA.
    generated_text = result["response"]

    # Retourner le texte au reste de notre application.
    return generated_text
