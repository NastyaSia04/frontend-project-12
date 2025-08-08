import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { getAuthHeaders } from '../../api/headers';
import { 
  addChannel as addChannelAction,
  removeChannel as removeChannelAction,
  renameChannel as renameChannelAction,
  fetchChannelsAsync
} from '../../store/entities/channelsSlice';
import { addMessage as addMessageAction, fetchMessagesAsync } from '../../store/entities/messagesSlice';

export const useChatApi = (socket) => {
  const dispatch = useDispatch();

  // === Обработчики каналов ===
  const setupChannelsHandlers = useCallback(() => {
    if (!socket) return () => {};

    const handleNewChannel = (payload) => {
      dispatch(addChannelAction(payload));
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

    socket.on('newChannel', handleNewChannel);
    socket.on('removeChannel', handleRemoveChannel);
    socket.on('renameChannel', handleRenameChannel);
    socket.on('channelError', handleChannelError);

    return () => {
      socket.off('newChannel', handleNewChannel);
      socket.off('removeChannel', handleRemoveChannel);
      socket.off('renameChannel', handleRenameChannel);
      socket.off('channelError', handleChannelError);
    };
  }, [socket, dispatch]);

  // === Обработчики сообщений ===
  const setupMessagesHandlers = useCallback(() => {
    if (!socket) return () => {};

    const handleNewMessage = (payload) => {
      console.log('📩 Received newMessage:', payload); // Лог полученного сообщения
      dispatch(addMessageAction(payload));
    };

    socket.on('newMessage', handleNewMessage);

    return () => {
      socket.off('newMessage', handleNewMessage);
    };
  }, [socket, dispatch]);


  // === API методы ===
  const sendMessage = useCallback(async (messageData) => {
    try {
      console.log('Отправка сообщения через REST API:', messageData); // Добавил лог
      await axios.post(`${BASE_URL}/messages`, messageData, getAuthHeaders());
      
      // Не вызываем dispatch здесь - сервер пришлет сообщение через сокет
    } catch (error) {
      toast.error('Ошибка отправки сообщения');
      console.error('Ошибка отправки:', { // Улучшил лог ошибки
        error: error.response?.data || error.message,
        config: error.config
      });
      throw error;
    }
  }, []);

  const getChannels = useCallback(async () => {
    return await dispatch(fetchChannelsAsync());
  }, [dispatch]);

  const getMessages = useCallback(async () => {
    return await dispatch(fetchMessagesAsync());
  }, [dispatch]);

  return {
    setupChannelsHandlers,
    setupMessagesHandlers,
    sendMessage,
    getChannels,
    getMessages
  };
};