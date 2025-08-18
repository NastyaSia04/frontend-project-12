import { useEffect, useState, useCallback, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ChatHeader from '../../components/MainComponents/ChatHeader'
import Messages from '../../components/MainComponents/Messages'
import MessageInput from '../../components/MainComponents/MessageInput'
import {
  selectCurrentChannel,
  selectCurrentChannelId,
  setCurrentChannelId,
} from '../../store/entities/channelsSlice'
import { selectUsername } from '../../store/entities/userSlice'
import { selectMessagesByChannelId } from '../../store/entities/messagesSlice'
import useApi from '../../hooks/useApi'
import useNetworkStatus from '../../hooks/useNetworkStatus'
import { useChatApi } from '../../pages/Chat/ChatApi'
import { useApiError } from '../../hooks/useApiError'

const ChatWindowContainer = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const handleApiError = useApiError()

  const [message, setMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [offlineMessages, setOfflineMessages] = useState([])

  const isOnline = useNetworkStatus()
  const { socket } = useApi()
  const {
    sendMessage,
    setupMessagesHandlers,
    getChannels,
    getMessages,
  } = useChatApi(socket)

  // Селекторы
  const currentChannelId = useSelector(selectCurrentChannelId)
  const currentChannel = useSelector(selectCurrentChannel)
  const username = useSelector(selectUsername)
  const messages = useSelector(state => selectMessagesByChannelId(state, currentChannelId))
  const currentChannelIdRef = useRef(currentChannelId)

  // Отправка оффлайн-сообщений при восстановлении соединения
  const sendOfflineMessages = useCallback(async () => {
    if (offlineMessages.length === 0) return

    try {
      setIsSending(true)
      for (const msg of offlineMessages) {
        await sendMessage(msg)
      }
      setOfflineMessages([])
      toast.success(t('notifications.offlineMessagesSent'))
    }
    catch (err) {
      toast.error(t('notifications.offlineMessagesSendError'))
      console.error('Не удалось отправить некоторые сообщения:', err)
    }
    finally {
      setIsSending(false)
    }
  }, [offlineMessages, sendMessage, t])

  useEffect(() => {
    currentChannelIdRef.current = currentChannelId
  }, [currentChannelId])

  // Инициализация чата
  useEffect(() => {
    const initializeChat = async () => {
      try {
        const channels = await getChannels()

        if (!channels || channels.length === 0) {
          throw new Error('Не удалось загрузить каналы: пустой ответ')
        }

        if (!currentChannelIdRef.current) {
          const generalChannel = channels.find(channel => channel.name === 'general')
          if (generalChannel) {
            dispatch(setCurrentChannelId(generalChannel.id))
          }
        }

        await getMessages()
      }
      catch (error) {
        console.error('Ошибка при загрузке чата:', error)
        handleApiError(error, { defaultMessageKey: 'notifications.chatLoadError' })
      }
    }

    initializeChat()

    // При подключении сокета перезагружаем данные
    const handleConnect = () => {
      getMessages()
      getChannels()
    }

    socket?.on('connect', handleConnect)
    window.addEventListener('online', sendOfflineMessages)

    return () => {
      socket?.off('connect', handleConnect)
      window.removeEventListener('online', sendOfflineMessages)
    }
  }, [dispatch, sendOfflineMessages, getChannels, getMessages, socket, t, handleApiError])

  // Настройка обработчиков сообщений
  useEffect(() => {
    if (!socket) return

    const cleanupMessages = setupMessagesHandlers()
    return cleanupMessages
  }, [socket, setupMessagesHandlers])

  // Отправка сообщения
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!message.trim()) return

    const messageData = {
      body: message,
      channelId: currentChannel.id,
      username,
    }

    try {
      setIsSending(true)

      if (!isOnline) {
        setOfflineMessages(prev => [...prev, messageData])
        toast.warn(t('notifications.messageSavedOffline'))
        setMessage('')
        return
      }

      await sendMessage(messageData)
      setMessage('')
    }
    catch (error) {
      console.error('Ошибка отправки сообщения:', error)
      handleApiError(error, { defaultMessageKey: 'notifications.messageSendError' })
    }
    finally {
      setIsSending(false)
    }
  }

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <ChatHeader
          channelName={currentChannel?.name || 'general'}
          messageCount={messages.length}
        />

        <Messages messages={messages} />

        <MessageInput
          message={message}
          onChange={e => setMessage(e.target.value)}
          onSubmit={handleSubmit}
          disabled={isSending || !currentChannelId}
        />
      </div>
    </div>
  )
}

export default ChatWindowContainer
