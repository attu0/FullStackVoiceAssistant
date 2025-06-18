from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from models.stt.stt_handler import transcribe_audio
from models.llm.llm_handler import call_llm
from models.tts.tts_handler import synthesize_speech
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow any origin for now, restrict in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "AI Voice Assistant Backend is running."}


@app.post("/pipeline/")
async def full_pipeline(
    audio: UploadFile = File(...),
    stt_model: str = Form(None),
    tts_model: str = Form(None),
    llm: str = Form(None),
):
    stt_model = stt_model or os.getenv("DEFAULT_STT_MODEL", "whisper")
    tts_model = tts_model or os.getenv("DEFAULT_TTS_MODEL", "gtts")
    llm = llm or os.getenv("DEFAULT_LLM", "openai")

    # Save uploaded file
    audio_path = f"temp_input_{audio.filename}"
    with open(audio_path, "wb") as f:
        f.write(await audio.read())

    # STT
    transcribed_text = transcribe_audio(stt_model, audio_path)

    # LLM
    response = call_llm(llm, transcribed_text)

    # TTS
    output_audio_path = synthesize_speech(tts_model, response)

    return {
        "transcription": transcribed_text,
        "response": response,
        "audio_file": output_audio_path,
    }
