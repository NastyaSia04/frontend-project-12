import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import AddChannelButton from '../../components/MainComponents/AddChannelButton'
import ChannelButton from '../../components/MainComponents/ChannelButton'
import { openModal } from '../../store/entities/uiSlice'
import { 
  setCurrentChannelId,
  selectChannels,
  selectCurrentChannelId,
} from '../../store/entities/channelsSlice'
import { useChatApi } from '../../pages/Chat/ChatApi'
import useApi from '../../hooks/useApi'

const ChannelsPanelContainer = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch();
  const channels = useSelector(selectChannels);
  const currentChannelId = useSelector(selectCurrentChannelId);
  const { socket } = useApi();
  const { 
    setupChannelsHandlers,
    getChannels
  } = useChatApi(socket);

  // Настройка обработчиков каналов
  useEffect(() => {
    if (!socket) return;
    
    const cleanupChannels = setupChannelsHandlers();

    // При подключении сокета загружаем каналы
    const handleConnect = () => {
      getChannels();
    };

    socket.on('connect', handleConnect);

    return () => {
      cleanupChannels();
      socket.off('connect', handleConnect);
    };
  }, [socket, setupChannelsHandlers, getChannels]);

  // UI обработчики (остаются без изменений)
  const handleAddChannel = () => {
    dispatch(openModal({ type: 'add' }));
  };

  const handleChannelClick = (channelId) => {
    dispatch(setCurrentChannelId(channelId));
  };

  const handleRemove = (channelId) => {
    dispatch(openModal({
      type: 'remove',
      extra: { channelId },
    }));
  };

  const handleRename = (channelId) => {
    const channel = channels.find(c => c.id === channelId);
    if (channel) {
      dispatch(openModal({
        type: 'rename',
        extra: { channelId, currentName: channel.name },
      }));
    }
  };

  return (
    <div className='col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex'>
      <div className='d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4'>
        <b>{t('channels.title')}</b>
        <AddChannelButton onClick={handleAddChannel} />
      </div>

      <ul id='channels-box' className='nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block'>
        {channels.map((channel) => (
          <ChannelButton
            key={channel.id}
            channel={channel}
            currentChannelId={currentChannelId}
            onClick={handleChannelClick}
            onRemove={handleRemove}
            onRename={handleRename}
          />
        ))}  
      </ul>
    </div>
  );
};

export default ChannelsPanelContainer;