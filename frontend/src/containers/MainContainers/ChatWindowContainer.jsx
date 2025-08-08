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
  setCurrentChannelId,
} from '../../store/entities/channelsSlice';
import { selectUsername } from '../../store/entities/userSlice';
import { selectMessagesByChannelId } from '../../store/entities/messagesSlice';
import useApi from '../../hooks/useApi';
import useNetworkStatus from '../../hooks/useNetworkStatus';
import { useChatApi } from '../../pages/Chat/ChatApi';

const ChatWindowContainer = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [offlineMessages, setOfflineMessages] = useState([]);
  
  const isOnline = useNetworkStatus();
  const { socket } = useApi();
  const { 
    sendMessage,
    setupMessagesHandlers,
    getChannels,
    getMessages
  } = useChatApi(socket);

  // Селекторы
  const currentChannelId = useSelector(selectCurrentChannelId);
  const currentChannel = useSelector(selectCurrentChannel);
  const username = useSelector(selectUsername);
  const messages = useSelector((state) => selectMessagesByChannelId(state, currentChannelId));

  // Отправка оффлайн-сообщений при восстановлении соединения
  const sendOfflineMessages = useCallback(async () => {
    if (offlineMessages.length === 0) return;

    try {
      setIsSending(true);
      for (const msg of offlineMessages) {
        await sendMessage(msg);
      }
      setOfflineMessages([]);
      toast.success('Оффлайн-сообщения отправлены');
    } catch (error) {
      toast.error('Не удалось отправить некоторые сообщения');
      console.error('Ошибка отправки оффлайн-сообщений:', error);
    } finally {
      setIsSending(false);
    }
  }, [offlineMessages, sendMessage]);

  // Инициализация чата
  useEffect(() => {
    const initializeChat = async () => {
      try {
        const channelsAction = await getChannels();
        if (!channelsAction || !channelsAction.payload) {
          throw new Error('Не удалось загрузить каналы: пустой ответ');
        }

        const channels = channelsAction.payload;

        if (!currentChannelId) {
          const generalChannel = channels.find(channel => channel.name === 'general');
          if (generalChannel) {
            dispatch(setCurrentChannelId(generalChannel.id));
          }
        }
        
        await getMessages();
      } catch (err) {
        console.error('Ошибка инициализации чата:', err);
        toast.error('Ошибка при загрузке чата');
      }
    };

    initializeChat();
    
    // При подключении сокета перезагружаем данные
    const handleConnect = () => {
      getMessages();
      getChannels();
    };

    socket?.on('connect', handleConnect);
    window.addEventListener('online', sendOfflineMessages);
    
    return () => {
      socket?.off('connect', handleConnect);
      window.removeEventListener('online', sendOfflineMessages);
    };
  }, [dispatch, sendOfflineMessages, currentChannelId, getChannels, getMessages, socket]);

  // Настройка обработчиков сообщений
  useEffect(() => {
    if (!socket) return;
    
    const cleanupMessages = setupMessagesHandlers();
    return cleanupMessages;
  }, [socket, setupMessagesHandlers]);

  // Отправка сообщения (без изменений)
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
