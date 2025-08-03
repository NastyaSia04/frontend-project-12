import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ChatHeader from '../../components/MainComponents/ChatHeader'
import Messages from '../../components/MainComponents/Messages'
import MessageInput from '../../components/MainComponents/MessageInput'

import { fetchChannels } from '../../api/channels'
import { fetchMessages } from '../../api/messages'
import { setChannels } from '../../store/entities/channelsSlice'
import { setCurrentChannelId } from '../../store/entities/channelsSlice'
import { setMessages, addMessage } from '../../store/entities/messagesSlice'
import useApi from '../../hooks/useApi'

const ChatWindowContainer = () => {
  const dispatch = useDispatch()
  const [message, setMessage] = useState('')

  const { sendMessage, socket } = useApi()

  const messages = useSelector((state) => state.messages.list)
  const currentChannel = useSelector((state) =>
    state.channels.list.find((c) => c.id === state.channels.currentChannelId)
  )
  const username = useSelector((state) => state.user.username)

  // добавляем useEffect для начальной загрузки
  useEffect(() => {
    const fetchData = async () => {
      try {
        const channelsData = await fetchChannels()
        dispatch(setChannels(channelsData))
        // Найдём канал с именем 'general'
        const generalChannel = channelsData.find((c) => c.name === 'general')
        if (generalChannel) {
          dispatch(setCurrentChannelId(generalChannel.id))
        }

        const messagesData = await fetchMessages()
        dispatch(setMessages(messagesData))
      } catch (err) {
        console.error('Ошибка загрузки данных:', err)
      }
    }

    fetchData()
  }, [dispatch])

  // Слушаем входящие сообщения через socket
  useEffect(() => {
    if (!socket) return

    const handleNewMessage = (payload) => {
      dispatch(addMessage(payload))
    }

    socket.on('newMessage', (payload) => {
      handleNewMessage(payload)
    })

    // Очистка слушателя при размонтировании
    return () => {
      socket.off('newMessage', handleNewMessage)
    }
  }, [socket, dispatch])
  
  // логика отправки сообщения
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!message.trim()) return

    const messageData = {
      body: message,
      channelId: currentChannel.id,
      username,
    }

    try {
      await sendMessage(messageData)
      setMessage('')
    } catch (error) {
      console.error('Ошибка при отправке сообщения:', error)
      // Здесь можно добавить уведомление пользователю, что отправка не удалась
    }
  }

  return (
    <div className='col p-0 h-100'>
      <div className='d-flex flex-column h-100'>
        <ChatHeader channelName={currentChannel?.name || 'general'} messageCount={messages.length} />
        <Messages messages={messages} />
        <MessageInput
          message={message}
          onChange={(e) => setMessage(e.target.value)}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  )
}

export default ChatWindowContainer
