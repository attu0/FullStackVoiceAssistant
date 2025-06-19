from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from dotenv import load_dotenv
import os
from models.stt.stt_handler import transcribe_audio
from models.llm.llm_handler import generate_response
from models.tts.tts_handler import tts_generate

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["X-Transcript", "X-Response"]  # 🔥 Needed for frontend to access
)

chat_history = [
    {
        "role": "system",
        "content": "You are Cogni, a calm and caring voice assistant for mental wellness. Always respond in 1–2 short sentences. Be soothing, supportive, and concise."
    }
]

@app.post("/assistant")
async def assistant(
    audio: UploadFile = File(...),
    stt_model: str = Form("deepgram"),
    tts_model: str = Form("deepgram"),
    llm: str = Form("groq")
):
    input_path = "input.wav"
    with open(input_path, "wb") as f:
        f.write(await audio.read())

    os.environ["DEFAULT_STT_MODEL"] = stt_model
    os.environ["DEFAULT_TTS_MODEL"] = tts_model
    os.environ["DEFAULT_LLM"] = llm

    transcript = transcribe_audio(input_path)
    if not transcript:
        return {"error": "No speech detected."}

    chat_history.append({"role": "user", "content": transcript})
    response = generate_response(chat_history)
    chat_history.append({"role": "assistant", "content": response})

    output_path = tts_generate(response)

    return FileResponse(
        output_path,
        media_type="audio/wav",
        filename="response.wav",
        headers={
            "X-Transcript": transcript,
            "X-Response": response
        }
    )
