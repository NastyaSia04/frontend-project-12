import axios from 'axios';
import { getAuthHeaders } from './headers';
import { BASE_URL } from '../config';

/**
 * Получает список всех сообщений
 * @returns {Promise<Array>} Массив сообщений
 */
export const fetchMessages = () => {
  return axios.get(`${BASE_URL}/messages`, getAuthHeaders())
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error fetching messages:', error);
      throw error;
    });
};

/**
 * Отправляет новое сообщение
 * @param {Object} messageData - Данные сообщения
 * @param {string} messageData.body - Текст сообщения
 * @param {number} messageData.channelId - ID канала
 * @param {string} messageData.username - Имя пользователя
 * @returns {Promise<Object>} Созданное сообщение
 */
export const sendMessage = (messageData) => {
  return axios.post(`${BASE_URL}/messages`, messageData, getAuthHeaders())
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error sending message:', error);
      throw error;
    });
};

/**
 * Удаляет ВСЕ сообщения в указанном канале
 * (используется при удалении канала)
 * @param {number} channelId - ID канала
 * @returns {Promise<void>}
 */
export const deleteChannelMessages = (channelId) => {
  return axios.delete(`${BASE_URL}/messages/channel/${channelId}`, getAuthHeaders())
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error deleting channel messages:', error);
      throw error;
    });
};

export default {
  fetchMessages,
  sendMessage,
  deleteChannelMessages
};
