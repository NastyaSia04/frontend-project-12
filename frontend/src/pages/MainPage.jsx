import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchChannels } from '../api/channels'
import { fetchMessages } from '../api/messages'
import { setChannels } from '../store/channelsSlice'
import { setMessages } from '../store/messagesSlice'

const MainPage = () => {
  const dispatch = useDispatch()

  const channels = useSelector((state) => state.channels.list)
  const messages = useSelector((state) => state.messages.list)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const channels = await fetchChannels()
        dispatch(setChannels(channels))

        const messages = await fetchMessages()
        dispatch(setMessages(messages))
      } catch (err) {
        console.error('Ошибка загрузки данных:', err)
      }
    }

    fetchData()
  }, [dispatch])

  return (
    <div className='p-3'>
      <h1>Главная страницв чата</h1>

      <h2>Каналы</h2>
      <ul>
        {channels.map((channel) => (
          <li key={channel.id}>{channel.name}</li>
        ))}
      </ul>

      <h2>Сообщения</h2>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>{message.body}</li>
        ))}
      </ul>      
    </div>
  )
}

export default MainPage
