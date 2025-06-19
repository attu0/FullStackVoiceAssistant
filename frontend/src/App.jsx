import React, { useState } from 'react';
import Recorder from './components/Recorder';
import ModelSelector from './components/ModelSelector';
import ChatHistory from './components/ChatHistory';

const App = () => {
  const [messages, setMessages] = useState([]);

  const handleNewMessage = (userText, aiText, aiAudioUrl) => {
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: userText },
      { sender: 'ai', text: aiText, audioUrl: aiAudioUrl }
    ]);
  };

  return (
    <div className="app-container" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2>🧠 Cogni: Voice Assistant</h2>
      <ModelSelector />
      <Recorder onConversation={handleNewMessage} />
      <ChatHistory messages={messages} />
    </div>
  );
};

export default App;
