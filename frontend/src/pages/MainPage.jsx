import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PlusSquare, ArrowRightSquare } from 'react-bootstrap-icons'
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
    <div className="bg-light d-flex flex-column" style={{ height: 'calc(100vh - 56px)' }}>
      {/* Контейнер с автоматическими отступами */}
      <div className="container my-auto py-4" style={{ flex: '1 1 auto' }}>
        <div className="overflow-hidden rounded shadow bg-white" style={{ height: '100%' }}>
          <div className="row h-100 g-0"> {/* g-0 убирает внутренние отступы строки */}
            
            {/* Боковая панель каналов (20% ширины) */}
            <div className="col-md-2 border-end bg-light d-flex flex-column h-100">
              <div className="d-flex mt-1 justify-content-between align-items-center p-3">
                <b>Каналы</b>
                <button 
                  type="button" 
                  className="p-0 text-primary btn btn-group-vertical"
                  aria-label="Добавить канал"
                >
                  <PlusSquare size={20} />
                  <span className="visually-hidden">+</span>
                </button>
              </div>
              
              <ul className="nav flex-column nav-pills nav-fill px-2 overflow-auto flex-grow-1">
                {/* Каналы будут здесь */}
              </ul>
            </div>

            {/* Область чата (80% ширины) */}
            <div className="col-md-10 d-flex flex-column h-100">
              {/* Шапка канала */}
              <div className="bg-light p-3 shadow-sm">
                <p className="m-0"><b># Название канала</b></p>
                <span className="text-muted">0 сообщений</span>
              </div>

              {/* Область сообщений с автоматической прокруткой */}
              <div className="flex-grow-1 overflow-auto px-4">
                {/* Сообщения будут здесь */}
              </div>

              {/* Форма ввода (прижата к низу) */}
              <div className="p-3 border-top">
                <form className="py-1 rounded-2">
                  <div className="input-group">
                    <input 
                      name="body"
                      placeholder="Введите сообщение..."
                      className="border-0 p-2 form-control"
                      aria-label="Новое сообщение"
                    />
                    <button 
                      type="submit" 
                      className="btn btn-group-vertical"
                      aria-label="Отправить"
                    >
                      <ArrowRightSquare size={20} />
                      <span className="visually-hidden">Отправить</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainPage
