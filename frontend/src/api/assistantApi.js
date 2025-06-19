import axios from 'axios';

export const sendAudioToAssistant = async (audioBlob, sttModel, ttsModel, llmModel) => {
  const formData = new FormData();
  formData.append('audio', audioBlob, 'input.wav');
  formData.append('stt_model', sttModel);
  formData.append('tts_model', ttsModel);
  formData.append('llm', llmModel);

  const response = await axios.post('http://localhost:8000/assistant', formData, {
    responseType: 'blob'
  });

  const audioUrl = URL.createObjectURL(response.data);
  const transcript = response.headers['x-transcript'];
  const llmResponse = response.headers['x-response'];

  return { transcript, llmResponse, audioUrl };
};

