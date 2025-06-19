import React from 'react';

const ChatHistory = ({ messages }) => (
  <div style={{ marginTop: '2rem' }}>
    {messages.map((msg, idx) => (
      <div
        key={idx}
        style={{
          textAlign: msg.sender === 'user' ? 'left' : 'right',
          marginBottom: '1rem',
          padding: '10px'
        }}
      >
        <strong>{msg.sender === 'user' ? '🧍 You' : '🤖 Cogni'}:</strong>
        <div
          style={{
            display: 'inline-block',
            backgroundColor: msg.sender === 'user' ? '#eee' : '#d0f0ff',
            padding: '10px 15px',
            borderRadius: '12px',
            maxWidth: '75%',
            marginTop: '4px'
          }}
        >
          <p style={{ margin: 0 }}>{msg.text}</p>
          {msg.audioUrl && (
            <audio controls src={msg.audioUrl} style={{ marginTop: '8px' }} />
          )}
        </div>
      </div>
    ))}
  </div>
);

export default ChatHistory;
