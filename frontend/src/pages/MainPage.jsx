import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { PlusSquare, ArrowRightSquare } from 'react-bootstrap-icons'
import { fetchChannels } from '../api/channels'
import { fetchMessages } from '../api/messages'
import { setChannels } from '../store/channelsSlice'
import { setMessages } from '../store/messagesSlice'

const MainPage = () => {
  const dispatch = useDispatch()
  const [message, setMessage] = useState('')
  const channels = useSelector((state) => state.channels.list)
  const messages = useSelector((state) => state.messages.list)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const channelsData = await fetchChannels()
        dispatch(setChannels(channelsData))

        const messagesData = await fetchMessages()
        dispatch(setMessages(messagesData))
      } catch (err) {
        console.error('Ошибка загрузки данных:', err)
      }
    }

    fetchData()
  }, [dispatch])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim()) {
      //Здесь будет логика отправки сообщения
      console.log('Отправлено:', message)
      setMessage('')
    }
  }

  return (
    <div className='h-100 bg-light'>
      <div className='d-flex flex-column h-100'>
        {/* Навбар */}
        <Navbar bg='white' className='shadow-sm' expand='lg'>
          <Container>
            <Navbar.Brand as={Link} to='/'>Hexlet Chat</Navbar.Brand>
            <button type='button' className='btn btn-primary'>Выйти</button>
          </Container>
        </Navbar>

        {/* Основной контент */}
        <div className='container h-100 my-4 overflow-hidden rounded shadow'>
          <div className='row h-100 bg-white flex-md-row'>

            {/* Боковая панель */}
            <div className='col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex'>
              <div className='d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4'>
                <b>Каналы</b>
                <button
                  type='button'
                  className='p-0 text-primary btn btn-group-vertical'
                  aria-label='Добавить канал'
                >
                  <PlusSquare size={20} />
                  <span className='visually-hidden'>+</span>
                </button>
              </div>

              <ul id='channels-box' className='nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block'>
                {channels.map((channel) => (
                  <li key={channel.id} className='nav-item w-100'>
                    <button type='button' className='w-100 rounded-0 text-start btn btn-secondary'>
                      <span className='me-1'>#</span>{channel.name}
                    </button>
                  </li>
                ))}  
              </ul>
            </div>

            {/* Область чата */}
            <div className='col p-0 h-100'>
              <div className='d-flex flex-column h-100'>
                <div className='bg-light mb-4 p-3 shadow-sm small'>
                  <p className='m-0'><b># general</b></p>
                  <span className='text-muted'>{messages.length} сообщений</span>
                </div>

                <div id='messages-box' className='chat-messages overflow-auto px-5'>
                  {messages.map((message) => (
                    <div key={message.id} className='text-break mb-2'>
                      <b>{message.username}</b>: {message.body}
                    </div>
                  ))}
                </div>

                <div className='mt-auto px-5 py-3'>
                  <form onSubmit={handleSubmit} className='py-1 border rounded-2' noValidate>
                    <div className='input-group has-validation'>
                      <input
                        name='body'
                        placeholder='Введите сообщение...'
                        className='border-0 p-0 ps-2 form-control'
                        aria-label='Новое сообщение'
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                      <button
                        type='submit'
                        className='btn btn-group-vertical'
                        aria-label='Отправить'
                        disabled={!message.trim()}
                      >
                        <ArrowRightSquare size={20} />
                        <span className='visually-hidden'>Отправить</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainPage
