import axios from 'axios';
import { getAuthHeaders } from './headers';
import { BASE_URL } from '../config';

/**
 * Получает список всех каналов
 * @returns {Promise<Array>} Массив каналов
 */
export const fetchChannels = () => {
  return axios.get(`${BASE_URL}/channels`, getAuthHeaders())
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error fetching channels:', error);
      throw error;
    });
};

/**
 * Создает новый канал
 * @param {string} channelName - Название канала
 * @returns {Promise<Object>} Созданный канал
 */
export const addChannel = (channelName) => {
  return axios.post(`${BASE_URL}/channels`, { name: channelName }, getAuthHeaders())
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error adding channel:', error);
      throw error;
    });
};

/**
 * Переименовывает канал
 * @param {number} id - ID канала
 * @param {string} name - Новое название канала
 * @returns {Promise<Object>} Обновленный канал
 */
export const renameChannel = (id, name) => {
  return axios.patch(`${BASE_URL}/channels/${id}`, { name }, getAuthHeaders())
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error renaming channel:', error);
      throw error;
    });
};

/**
 * Удаляет канал
 * @param {number} channelId - ID канала
 * @returns {Promise<Object>} Результат удаления
 */
export const removeChannel = (channelId) => {
  return axios.delete(`${BASE_URL}/channels/${channelId}`, getAuthHeaders())
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error removing channel:', error);
      throw error;
    });
};

// Экспортируем функции под другими именами для использования в слайсе
export const apiFetchChannels = fetchChannels;
export const apiAddChannel = addChannel;
export const apiRenameChannel = renameChannel;
export const apiRemoveChannel = removeChannel;

export default {
  fetchChannels,
  addChannel,
  renameChannel,
  removeChannel,
  apiFetchChannels,
  apiAddChannel,
  apiRenameChannel,
  apiRemoveChannel
};
