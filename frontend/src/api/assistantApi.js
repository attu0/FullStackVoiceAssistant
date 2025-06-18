import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; // Change if using a deployed backend

export const sendAudioToAssistant = async (audioBlob, stt, tts, llm) => {
  const formData = new FormData();
  formData.append('audio_file', audioBlob, 'recording.webm');
  formData.append('stt_model', stt);
  formData.append('tts_model', tts);
  formData.append('llm', llm);

  try {
    const response = await axios.post(`${API_BASE_URL}/assistant`, formData, {
      responseType: 'blob',
    });

    const transcript = response.headers['x-transcript'];
    const audioUrl = URL.createObjectURL(response.data);
    return { transcript, audioUrl };
  } catch (error) {
    console.error('Error from assistant API:', error);
    throw error;
  }
};
