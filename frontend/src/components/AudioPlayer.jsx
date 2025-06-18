// src/components/AudioPlayer.jsx
import React from 'react';

const AudioPlayer = ({ audioUrl }) => {
  return (
    <div style={{ marginTop: '1rem' }}>
      <h4>🔊 AI Response:</h4>
      {audioUrl ? (
        <audio controls src={audioUrl} />
      ) : (
        <p>No response audio yet.</p>
      )}
    </div>
  );
};

export default AudioPlayer;
