// src/components/AssistantUI.jsx
import React, { useState } from 'react';
import Recorder from './Recorder';
import TranscriptView from './TranscriptView';
import AudioPlayer from './AudioPlayer';

const AssistantUI = () => {
  const [transcript, setTranscript] = useState('');
  const [audioUrl, setAudioUrl] = useState('');

  const handleResponse = ({ transcript, audioUrl }) => {
    setTranscript(transcript);
    setAudioUrl(audioUrl);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <Recorder onResponse={handleResponse} />
      <TranscriptView transcript={transcript} />
      <AudioPlayer audioUrl={audioUrl} />
    </div>
  );
};

export default AssistantUI;
