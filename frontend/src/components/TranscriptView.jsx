import React from 'react';

const TranscriptView = ({ transcript }) => (
  <div style={{ marginTop: '1rem' }}>
    <h4>📝 Transcript:</h4>
    <p>{transcript || 'No transcript yet.'}</p>
  </div>
);

export default TranscriptView;
