// messageService.js
import axios from 'axios';
import { useEffect, useState } from 'react';
import EventEmitter from 'events';

const messageEventEmitter = new EventEmitter();

export function messageService() {
  const [senderId, setSenderId] = useState(localStorage.getItem('senderID') || '');
  const [receiverId, setReceiverId] = useState('');
  const [content, setContent] = useState('');

  useEffect(()=>{
    setReceiverId(localStorage.getItem('receiverID') || '');
  },[content,receiverId]);

  const handleSendData = async () => {
    const postData = { senderId, receiverId, content };
    
    try {
      const res = await axios.post('https://bookish-adventure-qrv6xv6p4x629x7v-4000.app.github.dev/message', postData);
      console.log(res);
      // Clear input content after sending message
      setContent('');
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