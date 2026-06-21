import axios from 'axios';

const API_BASE_URL = 'https://onconavigator-ai-production.up.railway.app/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const predictTumor = async (file) => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await api.post('/prediction', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const generateMask = async (predictionId) => {
  const response = await api.post(`/segmentation?prediction_id=${predictionId}`);
  return response.data;
};

export const getRagInformation = async (tumorName) => {
  const response = await api.post('/rag', {
    tumor_name: tumorName,
  });
  return response.data;
};

export const sendChatMessage = async (sessionId, query) => {
  const response = await api.post('/chatbot', {
    session_id: sessionId,
    query: query,
  });
  return response.data;
};

export const findSpecialist = async (tumorName, city) => {
  const response = await api.post('/specialist', {
    tumor_name: tumorName,
    city: city,
  });
  return response.data;
};
