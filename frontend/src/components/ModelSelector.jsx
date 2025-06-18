// src/components/ModelSelector.jsx
import React from 'react';
import { useModel } from '../context/ModelContext';
import './ModelSelector.css';

const ModelSelector = () => {
  const { selectedSTT, setSelectedSTT, selectedTTS, setSelectedTTS, selectedLLM, setSelectedLLM } = useModel();

  return (
    <div className="model-selector">
      <select value={selectedSTT} onChange={(e) => setSelectedSTT(e.target.value)}>
        <option value="whisper">STT: Whisper</option>
        <option value="vosk">STT: Vosk</option>
      </select>

      <select value={selectedTTS} onChange={(e) => setSelectedTTS(e.target.value)}>
        <option value="piper">TTS: Piper</option>
        <option value="coqui">TTS: Coqui</option>
      </select>

      <select value={selectedLLM} onChange={(e) => setSelectedLLM(e.target.value)}>
        <option value="openai">LLM: OpenAI</option>
        <option value="local">LLM: Local</option>
      </select>
    </div>
  );
};

export default ModelSelector;
