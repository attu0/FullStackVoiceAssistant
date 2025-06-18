// src/App.jsx
import React from 'react';
import ModelSelector from './components/ModelSelector';
import AssistantUI from './components/AssistantUI';

const App = () => {
  return (
    <div className="app-container">
      <h2>🧠 AI Voice Assistant</h2>
      <ModelSelector />
      <AssistantUI />
    </div>
  );
};

export default App;
