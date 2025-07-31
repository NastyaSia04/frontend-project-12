import React from 'react'
import { useSelector } from 'react-redux'
import AddChannelButton from '../../components/MainComponents/AddChannelButton'
import ChannelButton from '../../components/MainComponents/ChannelButton'

const ChannelsPanelContainer = () => {
  const channels = useSelector((state) => state.channels.list)

  const handleAddChannel = () => {
    // здесь в будущем будет логика показа модалки
    console.log('Добавить канал')
  }

  const handleChannelClick = (channelId) => {
    // логика выбора канала — позже добавим
    console.log('Клик по каналу:', channelId)
  }

  return (
    <div className='col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex'>
      <div className='d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4'>
        <b>Каналы</b>
        <AddChannelButton onclick={handleAddChannel} />
      </div>

      <ul id='channels-box' className='nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block'>
        {channels.map((channel) => (
          <ChannelButton
            key={channel.id}
            name={channel.name}
            onClick={() => handleChannelClick(channel.id)}
          />
        ))}  
      </ul>
    </div>
  )
}

export default ChannelsPanelContainer