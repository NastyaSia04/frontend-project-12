import axios from 'axios'
import { BASE_URL } from '../config'

export const login = async (username, password) => {
  const response = await axios.post(`${BASE_URL}/login`, {
    username,
    password,
  })

  return response.data  // { token, username }
}

//Эта функция делает POST-запрос на /api/v1/login и возвращает ответ от сервера.
//Если логин/пароль неправильные, axios выбросит ошибку — я ее обрабатываю в LoginPage