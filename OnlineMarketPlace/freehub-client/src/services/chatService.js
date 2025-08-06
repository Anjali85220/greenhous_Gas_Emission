import api from '../config/axios';

export const sendMessage = async (receiverId, content) => {
  try {
    const response = await api.post('/messages', { receiverId, content });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getMessages = async (userId) => {
  try {
    const response = await api.get(`/messages/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
