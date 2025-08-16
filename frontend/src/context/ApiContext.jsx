import { createContext, useRef, useState, useEffect } from 'react'
import { io } from 'socket.io-client'
import axios from 'axios'
import { BASE_URL } from '../config'
import { getAuthHeaders } from '../api/headers'

const ApiContext = createContext()

export const ApiProvider = ({ children }) => {
  const socketRef = useRef(null)
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    // Инициализируем соединение
    const socket = io()
    socket.on('connect', () => {
      setConnected(true)
      console.log('Socket connected:', socket.id)
    })

    socket.on('disconnect', () => {
      setConnected(false)
      console.warn('Socket disconnected')
    })

    socketRef.current = socket

    return () => {
      socket.disconnect()
    }
  }, [])

  const sendMessage = async (messageData) => {
    try {
      // Отправка сообщения через REST API
      await axios.post(`${BASE_URL}/messages`, messageData, getAuthHeaders())
      // Сервер сам рассылает событие newMessage через WebSocket другим клиентам
    }
    catch (error) {
      console.error('Ошибка при отправке сообщения', error)
    }
  }

  return (
    <ApiContext.Provider value={{
      sendMessage,
      socket: socketRef.current,
      connected,
    }}
    >
      {children}
    </ApiContext.Provider>
  )
}

export default ApiContext
