import axios from 'axios'
import { getAuthHeaders } from './headers'
import { BASE_URL } from '../config'

export const fetchMessages = () => {
  return axios.get(`${BASE_URL}/messages`, getAuthHeaders())
    .then(response => response.data)
    .catch((error) => {
      console.error('Error fetching messages:', error)
      throw error
    })
}

export const sendMessage = (messageData) => {
  return axios.post(`${BASE_URL}/messages`, messageData, getAuthHeaders())
    .then(response => response.data)
    .catch((error) => {
      console.error('Error sending message:', error)
      throw error
    })
}

export const deleteChannelMessages = (channelId) => {
  return axios.delete(`${BASE_URL}/messages/channel/${channelId}`, getAuthHeaders())
    .then(response => response.data)
    .catch((error) => {
      console.error('Error deleting channel messages:', error)
      throw error
    })
}

export default {
  fetchMessages,
  sendMessage,
  deleteChannelMessages,
}
