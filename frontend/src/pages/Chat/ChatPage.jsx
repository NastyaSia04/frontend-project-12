import React from 'react'
import Navbar from '../../components/SharedComponents/Navbar'
import ChannelsPanelContainer from '../../containers/MainContainers/ChannelsPanelContainer'
import ChatWindowContainer from '../../containers/MainContainers/ChatWindowContainer'

const ChatPage = () => {
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    window.location.reload() // или navigate('/login')
  }

  return (
    <div className='h-100 bg-light'>
      <div className='d-flex flex-column h-100'>
        {/* Навигационная панель */}
        <Navbar>
          <button type='button' className='btn btn-primary' onClick={handleLogout}>
            Выйти
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
  )
}

export default ChatPage