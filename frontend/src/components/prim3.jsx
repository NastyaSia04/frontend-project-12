import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ChatHeader from '../../components/MainComponents/ChatHeader';
import Messages from '../../components/MainComponents/Messages';
import MessageInput from '../../components/MainComponents/MessageInput';

import {
  selectCurrentChannel,
  selectCurrentChannelId,
  fetchChannelsAsync, 
  setCurrentChannelId,
} from '../../store/entities/channelsSlice';
import { selectUsername } from '../../store/entities/userSlice';
import { 
  fetchMessagesAsync,
  addMessage as addMessageAction,
  selectMessagesByChannelId
} from '../../store/entities/messagesSlice';

import useApi from '../../hooks/useApi';
import useNetworkStatus from '../../hooks/useNetworkStatus';

const ChatWindowContainer = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [offlineMessages, setOfflineMessages] = useState([]);
  
  const isOnline = useNetworkStatus();
  const { sendMessage, socket } = useApi();

  // Селекторы
  const currentChannelId = useSelector(selectCurrentChannelId);
  const currentChannel = useSelector(selectCurrentChannel);
  const username = useSelector(selectUsername);
  const messages = useSelector(
    (state) => selectMessagesByChannelId(state, currentChannelId)
  );

  // Мемоизированная функция для отправки оффлайн-сообщений
  const sendOfflineMessages = useCallback(async () => {
    if (offlineMessages.length === 0) return; // лишняя проверка

    try {
      setIsSending(true);
      // Последовательно отправляем, можно сделать параллельно через Promise.all
      for (const msg of offlineMessages) {
        await sendMessage(msg);
      }
      setOfflineMessages([]);
      toast.success('Оффлайн-сообщения отправлены');
    } catch (error) {
      toast.error('Не удалось отправить некоторые сообщения');
      // Можно логировать ошибку в консоль или в сервис мониторинга
      console.error('Ошибка отправки оффлайн-сообщений:', error);
    } finally {
      setIsSending(false);
    }
  }, [offlineMessages, sendMessage])

  // Инициализация чата
  useEffect(() => {
    const initializeChat = async () => {
      try {
        const channelsAction = await dispatch(fetchChannelsAsync());
        const channels = channelsAction.payload;

        // Устанавливаем текущий канал, если нет выбранного
        if (!currentChannelId) {
          const generalChannel = channels.find(channel => channel.name === 'general');
          if (generalChannel) {
            dispatch(setCurrentChannelId(generalChannel.id));
          }
        }
        
        await dispatch(fetchMessagesAsync());
      } catch (err) {
        toast.error('Ошибка при загрузке чата');
        console.error('Ошибка инициализации чата:', err);
      }
    };

    initializeChat();
    
    // Обработка восстановления соединения
    const handleOnline = () => {
      if (offlineMessages.length > 0) {
        sendOfflineMessages();
      }
    };
    
    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, [dispatch, offlineMessages.length, sendOfflineMessages, currentChannelId]);

  // Сокет-обработчики
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (payload) => {
      dispatch(addMessageAction(payload));
    };

    const handleConnectError = (err) => {
      toast.warn('Проблемы с соединением');
      console.error('Socket connect error:', err);
    };

    const handleDisconnect = (reason) => {
      toast.warn(`Соединение потеряно: ${reason}`);
      console.warn('Socket disconnected:', reason);
    };

    const handleReconnect = () => {
      toast.info('Соединение восстановлено, обновляем сообщения...');
      // При переподключении логично обновить сообщения и каналы,
      // чтобы синхронизироваться с сервером
      dispatch(fetchMessagesAsync());
      dispatch(fetchChannelsAsync());
    };

    socket.on('newMessage', handleNewMessage);
    socket.on('connect_error', handleConnectError);
    socket.on('disconnect', handleDisconnect);
    socket.on('connect', handleReconnect);

    return () => {
      socket.off('newMessage', handleNewMessage);
      socket.off('connect_error', handleConnectError);
      socket.off('disconnect', handleDisconnect);
      socket.off('connect', handleReconnect);
    };
  }, [socket, dispatch]);

  // Отправка сообщения
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const messageData = {
      body: message,
      channelId: currentChannel.id,
      username,
    };

    try {
      setIsSending(true);
      
      if (!isOnline) {
        setOfflineMessages((prev) => [...prev, messageData]);
        toast.warn('Сообщение сохранено локально');
        setMessage('');
        return;
      }
      
      await sendMessage(messageData);
      setMessage('');
    } catch (error) {
      toast.error('Ошибка отправки сообщения');
      console.error('Ошибка отправки сообщения:', error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className='col p-0 h-100'>
      <div className='d-flex flex-column h-100'>
        <ChatHeader 
          channelName={currentChannel?.name || 'general'} 
          messageCount={messages.length}
        />
        
        <Messages messages={messages} />
        
        <MessageInput
          message={message}
          onChange={(e) => setMessage(e.target.value)}
          onSubmit={handleSubmit}
          disabled={isSending || !currentChannelId}
        />
        
        <ToastContainer position="bottom-right" autoClose={5000} />
      </div>
    </div>
  );
};

export default ChatWindowContainer;