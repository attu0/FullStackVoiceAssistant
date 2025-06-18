import os
from dotenv import load_dotenv
from utils.audio_io import record_audio, play_audio
from models.stt.stt_handler import transcribe_audio
from models.llm.llm_handler import generate_response
from models.tts.tts_handler import tts_generate
import soundfile as sf
import sounddevice as sd

# Load .env variables
load_dotenv()

# Constants from .env
STT_MODEL = os.getenv("DEFAULT_STT_MODEL", "deepgram")
TTS_MODEL = os.getenv("DEFAULT_TTS_MODEL", "deepgram")
LLM_MODEL = os.getenv("DEFAULT_LLM", "groq")
DEEPGRAM_API_KEY = os.getenv("DEEPGRAM_API_KEY")
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

chat_history = [
    {
        "role": "system",
        "content": "You are Cogni, a calm and caring voice assistant for mental wellness. Always respond in 1–2 short sentences. Be soothing, supportive, and concise."
    }
]

def main():
    input_path = "input.wav"

    # Step 1: Record voice
    record_audio(input_path)

    # Step 2: Transcribe
    user_text = transcribe_audio(input_path)
    if not user_text:
        print("⚠️ No speech detected.")
        return

    print("🧠 You said:", user_text)
    chat_history.append({"role": "user", "content": user_text})

    # Step 3: Generate response from LLM
    response = generate_response(chat_history)
    print("🤖 Cogni:", response)
    chat_history.append({"role": "assistant", "content": response})

    # Step 4: TTS synthesis
    output_path = tts_generate(response)

    # Step 5: Playback
    print("🔊 Playing response...")
    data, fs = sf.read(output_path, dtype='float32')
    sd.play(data, fs)
    sd.wait()

if __name__ == "__main__":
    main()
