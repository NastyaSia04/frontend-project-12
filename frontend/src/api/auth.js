import axios from 'axios'
import { BASE_URL } from '../config'

export const login = async (username, password) => {
  const responseLogin = await axios.post(`${BASE_URL}/login`, {
    username,
    password,
  })

  return responseLogin.data // { token, username }
}

export const signup = async (username, password) => {
  const responseSignup = await axios.post(`${BASE_URL}/signup`, {
    username,
    password,
  })
  return responseSignup.data // { token, username }
}
