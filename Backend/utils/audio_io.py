import sounddevice as sd
import soundfile as sf

def record_audio(filename="input.wav", duration=5, fs=16000):
    print("🎙️ Recording...")
    recording = sd.rec(int(duration * fs), samplerate=fs, channels=1)
    sd.wait()
    sf.write(filename, recording, fs)
    print("✅ Saved to", filename)

def play_audio(filename):
    print("🔊 Playing:", filename)
    data, fs = sf.read(filename, dtype='float32')
    sd.play(data, fs)
    sd.wait()
