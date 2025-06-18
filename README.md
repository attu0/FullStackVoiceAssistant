# 🧠 Cogni Voice Assistant

A full-stack mental wellness voice assistant powered by:

- 🎙️ **STT**: Deepgram (speech-to-text)
- 🧠 **LLM**: Groq (LLaMA3-8B)
- 🔊 **TTS**: Deepgram (text-to-speech)
- ⚙️ **Backend**: FastAPI (Python)
- 🎛️ **Frontend**: (optional, React-ready)

---

## 🚀 Features

- Record voice input via microphone
- Transcribe using Deepgram's Whisper-level accuracy
- Get AI responses using Groq's blazing fast LLMs (like `llama3-8b-8192`)
- Generate natural-sounding speech via Deepgram TTS
- Fully configurable using `.env`

---

## 🧱 Folder Structure

```
FullStackVoiceAssistant/
├── Backend/
│   ├── test_voice_assistant.py   # CLI pipeline
│   ├── models/
│   │   ├── stt/
│   │   ├── llm/
│   │   └── tts/
│   └── utils/
│       └── audio_io.py
├── .env                         # Your secret API keys (not committed)
├── requirements.txt             # All dependencies
└── README.md
```

---

## 🔧 Setup

### 1. Clone the repo
```bash
git clone https://github.com/your-username/voice-assistant-deepgram-groq.git
cd voice-assistant-deepgram-groq
```

### 2. Create and activate conda environment
```bash
conda create -n assistant-backend python=3.10 -y
conda activate assistant-backend
```

### 3. Install dependencies
```bash
pip install -r requirements.txt
```

### 4. Add `.env`
```env
DEFAULT_STT_MODEL=deepgram
DEFAULT_TTS_MODEL=deepgram
DEFAULT_LLM=groq
DEEPGRAM_API_KEY=your_deepgram_key
GROQ_API_KEY=your_groq_key
```

---

## ▶️ Run

```bash
python test_voice_assistant.py
```

> It will record your voice, transcribe it, send it to Groq, and play the AI’s response.

---

## ✅ TODO
- [ ] Web frontend (React) integration
- [ ] Real-time streaming support
- [ ] Conversation history export
- [ ] Multi-model selector UI

---

## 🧠 Model Info

- STT: Deepgram `v1/listen`
- TTS: Deepgram `aura-asteria-en`
- LLM: Groq `llama3-8b-8192`

---

## 🔒 Security
- `.env` is excluded via `.gitignore`
- No API keys are exposed or logged

---

## 📄 License
[MIT License](LICENSE)
