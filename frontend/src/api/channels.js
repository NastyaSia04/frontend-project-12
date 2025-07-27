import axios from 'axios'
import { getAuthHeaders } from './headers'
import { BASE_URL } from '../config'


export const fetchChannels = () => {
  return axios.get(`${BASE_URL}/channels`, getAuthHeaders())
    .then((response) => response.data)
}