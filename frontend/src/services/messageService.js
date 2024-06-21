import { useEffect, useState } from 'react';
import axios from 'axios';
import EventEmitter from 'events';
import { privateChatGet } from './chatService';

const messageEventEmitter = new EventEmitter();

export function useMessageService() {
  const { fetchMessages, fetchChats, chats } = privateChatGet();
  const [senderId, setSenderId] = useState(localStorage.getItem('senderID') || '');
  const [receiverId, setReceiverId] = useState(localStorage.getItem('receiverID') || '');
  const [content, setContent] = useState('');

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  const handleSendData = async () => {
    const postData = { senderId, receiverId, content };

    try {
      const res = await axios.post('https://bookish-adventure-qrv6xv6p4x629x7v-4000.app.github.dev/message', postData);
      setContent(''); // Clear input content after sending message

      const chat = chats.find(chat =>
        (chat.user1Id._id === senderId && chat.user2Id._id === receiverId) ||
        (chat.user2Id._id === senderId && chat.user1Id._id === receiverId)
      );

      if (chat) {
        fetchMessages(chat._id);
      }

      messageEventEmitter.emit('messageSent');
      
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  return {
    senderId,
    setSenderId,
    receiverId,
    setReceiverId,
    content,
    setContent,
    handleSendData,
  };
}

export { messageEventEmitter };
