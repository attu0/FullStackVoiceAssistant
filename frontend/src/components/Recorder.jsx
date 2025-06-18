// src/components/Recorder.jsx
import React, { useRef, useState } from 'react';
import { useModel } from '../context/ModelContext';
import axios from 'axios';
import './Recorder.css';

const Recorder = ({ onResponse }) => {
  const mediaRecorderRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const { selectedSTT, selectedTTS, selectedLLM } = useModel();

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    const chunks = [];

    recorder.ondataavailable = (e) => chunks.push(e.data);
    recorder.onstop = async () => {
      const blob = new Blob(chunks, { type: 'audio/webm' });
      const formData = new FormData();
      formData.append('audio_file', blob);
      formData.append('stt_model', selectedSTT);
      formData.append('tts_model', selectedTTS);
      formData.append('llm', selectedLLM);

      try {
        const res = await axios.post('http://localhost:8000/assistant', formData, {
          responseType: 'blob',
        });
        const transcript = res.headers['x-transcript'];
        const audioUrl = URL.createObjectURL(res.data);
        onResponse({ transcript, audioUrl });
      } catch (err) {
        console.error('Error:', err);
      }
    };

    recorder.start();
    mediaRecorderRef.current = recorder;
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  return (
    <div className="recorder">
      <button className={`record-btn ${isRecording ? 'recording' : ''}`} onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? '🛑 Stop Recording' : '🎙 Start Recording'}
      </button>
    </div>
  );
};

export default Recorder;
