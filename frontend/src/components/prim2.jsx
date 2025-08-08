import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import AddChannelButton from '../../components/MainComponents/AddChannelButton';
import ChannelButton from '../../components/MainComponents/ChannelButton';
import { openModal } from '../../store/entities/uiSlice';
import { 
  setCurrentChannelId,
  selectChannels,
  selectCurrentChannelId,
  addChannel as addChannelAction,
  removeChannel as removeChannelAction,
  renameChannel as renameChannelAction
} from '../../store/entities/channelsSlice';
import useApi from '../../hooks/useApi';

const ChannelsPanelContainer = () => {
  const dispatch = useDispatch();
  const channels = useSelector(selectChannels);
  const currentChannelId = useSelector(selectCurrentChannelId);
  const { socket, getChannels } = useApi(); // ✅ getChannels нужен для перезагрузки

  useEffect(() => {
    if (!socket) return;

    // --- Глобальные обработчики соединения ---
    const handleConnectError = (err) => {
      console.error('Socket connect error:', err);
      toast.error('Ошибка соединения с сервером');
    };

    const handleDisconnect = (reason) => {
      console.warn('Socket disconnected:', reason);
      toast.warn('Соединение потеряно');
    };

    const handleReconnect = () => {
      console.info('Socket reconnected, reloading channels...');
      toast.info('Соединение восстановлено, обновляем каналы...');
      getChannels(); // ✅ повторная загрузка каналов
    };

    socket.on('connect_error', handleConnectError);
    socket.on('disconnect', handleDisconnect);
    socket.on('connect', handleReconnect); // при переподключении будет вызываться

    // --- Обработчики каналов ---
    const handleNewChannel = (payload) => {
      console.log('Payload from socket newChannel:', payload);
      // ✅ проверка на уникальность ID
      if (!channels.some(c => c.id === payload.id)) {
        dispatch(addChannelAction(payload));
      } else {
        console.warn(`Канал с id=${payload.id} уже существует, пропускаем`);
      }
    };

    const handleRemoveChannel = (payload) => {
      dispatch(removeChannelAction(payload.id));
    };

    const handleRenameChannel = (payload) => {
      dispatch(renameChannelAction(payload));
    };

    const handleChannelError = (error) => {
      toast.error(`Ошибка канала: ${error.message}`);
    };

    // --- Подписка на события каналов ---
    socket.on('newChannel', handleNewChannel);
    socket.on('removeChannel', handleRemoveChannel);
    socket.on('renameChannel', handleRenameChannel);
    socket.on('channelError', handleChannelError);

    // --- Отписка при размонтировании ---
    return () => {
      socket.off('connect_error', handleConnectError);
      socket.off('disconnect', handleDisconnect);
      socket.off('connect', handleReconnect);

      socket.off('newChannel', handleNewChannel);
      socket.off('removeChannel', handleRemoveChannel);
      socket.off('renameChannel', handleRenameChannel);
      socket.off('channelError', handleChannelError);
    };
  }, [socket, dispatch, channels, getChannels]);

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
        <b>Каналы</b>
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