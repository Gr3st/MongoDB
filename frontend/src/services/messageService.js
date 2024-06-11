import '../App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

export function messageService() {
  const [senderId, setSenderId] = useState(localStorage.getItem('senderID') || '');
  const [receiverId, setReceiverId] = useState(localStorage.getItem('receiverID') || '');
  const [content, setContent] = useState('');


  
  const handleSendData = async (event) => {
    event.preventDefault();

    const postData = { senderId, receiverId, content };

    try {
      const res = await axios.post('https://bookish-adventure-qrv6xv6p4x629x7v-4000.app.github.dev/message', postData);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return {senderId, setSenderId,receiverId, setReceiverId,content, setContent,handleSendData};
}

