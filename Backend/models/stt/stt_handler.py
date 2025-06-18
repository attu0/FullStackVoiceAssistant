import os
import requests
from dotenv import load_dotenv

load_dotenv()
DEEPGRAM_API_KEY = os.getenv("DEEPGRAM_API_KEY")

def transcribe_audio(audio_path: str) -> str:
    url = "https://api.deepgram.com/v1/listen"
    headers = {
        "Authorization": f"Token {DEEPGRAM_API_KEY}",
        "Content-Type": "audio/wav",
    }

    with open(audio_path, "rb") as audio:
        response = requests.post(url, headers=headers, data=audio)

    if response.status_code == 200:
        return response.json()["results"]["channels"][0]["alternatives"][0]["transcript"]
    else:
        raise Exception(f"Deepgram STT Error: {response.status_code} - {response.text}")
