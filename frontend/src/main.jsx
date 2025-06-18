import React from 'react';
import './index.css';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ModelProvider } from './context/ModelContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ModelProvider>
      <App />
    </ModelProvider>
  </React.StrictMode>
);
