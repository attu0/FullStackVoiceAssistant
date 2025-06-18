import { createContext, useContext, useState } from 'react';

const ModelContext = createContext();

export const ModelProvider = ({ children }) => {
  const [selectedSTT, setSelectedSTT] = useState('whisper');
  const [selectedTTS, setSelectedTTS] = useState('piper');
  const [selectedLLM, setSelectedLLM] = useState('openai');

  return (
    <ModelContext.Provider value={{
      selectedSTT, setSelectedSTT,
      selectedTTS, setSelectedTTS,
      selectedLLM, setSelectedLLM
    }}>
      {children}
    </ModelContext.Provider>
  );
};

export const useModel = () => useContext(ModelContext);
    