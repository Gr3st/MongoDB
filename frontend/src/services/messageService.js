import '../App.css';
import axios from 'axios';
import { useState } from 'react';

export function messageService() {
  const [senderId, setSenderId] = useState("6667fb4535a67514c997edcd");
  const [receiverId, setReceiverId] = useState("6667fd7935a67514c997f2ef");
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

