import React from 'react'
import { useTranslation } from 'react-i18next'
import Navbar from '../../components/SharedComponents/Navbar'
import ChannelsPanelContainer from '../../containers/MainContainers/ChannelsPanelContainer'
import ChatWindowContainer from '../../containers/MainContainers/ChatWindowContainer'
import { ApiProvider } from '../../context/ApiContext'
import ModalRoot from '../../containers/MainContainers/ModalRoot'

const ChatPage = () => {
  const { t } = useTranslation()
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    window.location.reload() // или navigate('/login')
  }

  return (
    <ApiProvider>
      <div className='h-100 bg-light'>
        <div className='d-flex flex-column h-100'>
          {/* Навигационная панель */}
          <Navbar>
            <button type='button' className='btn btn-primary' onClick={handleLogout}>
              {t('navbar.exit')}
            </button>
          </Navbar>

          {/* Основной контент */}
          <div className='container h-100 my-4 overflow-hidden rounded shadow'>
            <div className='row h-100 bg-white flex-md-row'>

              {/* Боковая панель с каналами */}
              <ChannelsPanelContainer />

              {/* Область чата */}
              <ChatWindowContainer />

            </div>
          </div>
        </div>
      </div>
    <ModalRoot/>
    </ApiProvider>
  )
}

export default ChatPage
