import React, { useRef, useState } from 'react';
import { useModel } from '../context/ModelContext';
import { sendAudioToAssistant } from '../api/assistantApi';
import './Recorder.css';

const Recorder = ({ onConversation }) => {
  const mediaRecorderRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const { selectedSTT, selectedTTS, selectedLLM } = useModel();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);

      recorder.onstop = async () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });

        try {
          const { transcript, llmResponse, audioUrl } = await sendAudioToAssistant(
            blob,
            selectedSTT,
            selectedTTS,
            selectedLLM
          );

          console.log("🧍 User Transcript:", transcript);
          console.log("🤖 AI Response:", llmResponse);
          onConversation(transcript, llmResponse, audioUrl);

        } catch (err) {
          console.error('❌ Error sending audio:', err);
        }
      };

      recorder.start();
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
    } catch (err) {
      console.error('🎤 Microphone error:', err);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  return (
    <div className="recorder">
      <button
        className={`record-btn ${isRecording ? 'recording' : ''}`}
        onClick={isRecording ? stopRecording : startRecording}
      >
        {isRecording ? '🛑 Stop Recording' : '🎙 Start Talking'}
      </button>
    </div>
  );
};

export default Recorder;
