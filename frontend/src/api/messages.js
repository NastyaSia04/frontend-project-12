import axios from 'axios'
import { getAuthHeaders } from './headers'
import { BASE_URL } from '../config'

export const fetchMessages = () => {
  return axios.get(`${BASE_URL}/messages`, getAuthHeaders())
    .then((response) => response.data)
}