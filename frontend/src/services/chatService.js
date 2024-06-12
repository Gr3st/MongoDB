import '../App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

export function privateChatGet() {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const userId = localStorage.getItem('senderID') || '';
        const response = await axios.get('https://bookish-adventure-qrv6xv6p4x629x7v-4000.app.github.dev/userChats', {
          params: { userId }
        });
        console.log(response.data);
        setChats(response.data);
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    fetchChats();
  }, []);

  const fetchMessages = async (chat) => {
    try {
      const response = await axios.get(`https://bookish-adventure-qrv6xv6p4x629x7v-4000.app.github.dev/chat/${chat._id}/messages`);
      setMessages(response.data);
      setSelectedChat(chat);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  return {chats, setChats, messages, setMessages, selectedChat, setSelectedChat, fetchMessages};
}


