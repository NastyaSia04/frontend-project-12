import React, { useEffect } from 'react'
import { fetchChannels } from '../api/channels'
import { fetchMessages } from '../api/messages'

const MainPage = () => {
  useEffect(() => {
    const loadData = async () => {
      try {
        const channels = await fetchChannels()
        const messages = await fetchMessages()
        console.log('Каналы:', channels)
        console.log('Сообщения:', messages)
      } catch (err) {
        console.error('Ошибка загрузки данных:', err)
      }
    }

    loadData()
  }, [])

  return (
    <div className='p-3'>
      <h2>Чат</h2>
      <p> Список каналов и сообщений</p>
    </div>
  )
}

export default MainPage
