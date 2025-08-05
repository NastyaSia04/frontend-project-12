import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AddChannelButton from '../../components/MainComponents/AddChannelButton'
import ChannelButton from '../../components/MainComponents/ChannelButton'
import { openModal } from '../../store/entities/uiSlice'
import { setCurrentChannelId } from '../../store/entities/channelsSlice'

const ChannelsPanelContainer = () => {
  const dispatch = useDispatch()
  const channels = useSelector((state) => state.channels.list)
  const currentChannelId = useSelector((state) => state.channels.currentChannelId)

  //  логика показа модалки добавления канала
  const handleAddChannel = () => {
    dispatch(openModal({ type: 'add' }))
  }

  const handleChannelClick = (channelId) => {
    dispatch(setCurrentChannelId(channelId))
  }

  // логика показа модалки удаления канала
  const handleRemove = (channelId) => {
    dispatch(openModal({
      type: 'remove',
      extra: { channelId },
    }))
  }

  const handleRename = (channelId, name) => {
    console.log('Переименовать канал', channelId, name)
  }

  return (
    <div className='col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex'>
      <div className='d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4'>
        <b>Каналы</b>
        <AddChannelButton onClick={handleAddChannel} />
      </div>

      <ul id='channels-box' className='nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block'>
        {channels.map((channel) => (
          <ChannelButton
            key={channel.id}
            id={channel.id}
            name={channel.name}
            currentChannelId={currentChannelId}
            removable={channel.removable} // по умолчанию канал не управляемый removable = false
            onClick={() => handleChannelClick(channel.id)}
            onRemove={() => handleRemove(channel.id)}
            onRename={() => handleRename(channel.id, channel.name)}
          />
        ))}  
      </ul>
    </div>
  )
}

export default ChannelsPanelContainer
