import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { BASE_URL } from '../../config'
import filter from 'leo-profanity'
import { getAuthHeaders } from '../../api/headers'
import {
  addChannel as addChannelAction,
  removeChannel as removeChannelAction,
  renameChannel as renameChannelAction,
  fetchChannelsAsync,
} from '../../store/entities/channelsSlice'
import { addMessage as addMessageAction, fetchMessagesAsync } from '../../store/entities/messagesSlice'
import { useApiError } from '../../hooks/useApiError'

export const useChatApi = (socket) => {
  const dispatch = useDispatch()
  const handleApiError = useApiError()

  // === Обработчики каналов ===
  const setupChannelsHandlers = useCallback(() => {
    if (!socket) return () => {}

    const handleNewChannel = (payload) => {
      dispatch(addChannelAction(payload))
    }

    const handleRemoveChannel = (payload) => {
      dispatch(removeChannelAction(payload.id))
    }

    const handleRenameChannel = (payload) => {
      dispatch(renameChannelAction(payload))
    }

    const handleChannelError = (error) => {
      console.error('Ошибка канала:', error.message)
      handleApiError(error, { defaultMessageKey: 'notifications.dataLoadError' })
    }

    socket.on('newChannel', handleNewChannel)
    socket.on('removeChannel', handleRemoveChannel)
    socket.on('renameChannel', handleRenameChannel)
    socket.on('channelError', handleChannelError)

    return () => {
      socket.off('newChannel', handleNewChannel)
      socket.off('removeChannel', handleRemoveChannel)
      socket.off('renameChannel', handleRenameChannel)
      socket.off('channelError', handleChannelError)
    }
  }, [socket, dispatch, handleApiError])

  // === Обработчики сообщений ===
  const setupMessagesHandlers = useCallback(() => {
    if (!socket) return () => {}

    const handleNewMessage = (payload) => {
      dispatch(addMessageAction(payload))
    }

    socket.on('newMessage', handleNewMessage)

    return () => {
      socket.off('newMessage', handleNewMessage)
    }
  }, [socket, dispatch])

  // === API методы ===
  const sendMessage = useCallback(async (messageData) => {
    try {
      const cleanedMessageData = {
        ...messageData,
        body: filter.clean(messageData.body.trim()),
      }
      await axios.post(`${BASE_URL}/messages`, cleanedMessageData, getAuthHeaders())

      // Не вызываем dispatch здесь - сервер пришлет сообщение через сокет
    }
    catch (error) {
      console.error('Ошибка отправки', error)
      handleApiError(error, { defaultMessageKey: 'notifications.messageSendError' })
      throw error
    }
  }, [handleApiError])

  const getChannels = useCallback(async () => {
    try {
      return await dispatch(fetchChannelsAsync())
    }
    catch (error) {
      handleApiError(error, { defaultMessageKey: 'notifications.chatLoadError' })
    }
  }, [dispatch, handleApiError])

  const getMessages = useCallback(async () => {
    try {
      return await dispatch(fetchMessagesAsync())
    }
    catch (error) {
      handleApiError(error, { defaultMessageKey: 'notifications.chatLoadError' })
    }
  }, [dispatch, handleApiError])

  return {
    setupChannelsHandlers,
    setupMessagesHandlers,
    sendMessage,
    getChannels,
    getMessages,
  }
}
