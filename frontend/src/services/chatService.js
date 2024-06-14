// chatService.js
import '../App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { messageService, messageEventEmitter } from './messageService';
import { searchMechanics } from './searchService';

export function privateChatGet() {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const { receiverID, setReceiverID } = searchMechanics();
  const fetchChats = async () => {
    try {
      const userId = localStorage.getItem('senderID') || '';
      const response = await axios.get('https://bookish-adventure-qrv6xv6p4x629x7v-4000.app.github.dev/userChats', {
        params: { userId }
      });
      setChats(response.data);
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };
  useEffect(() => {
    fetchChats();
  }, []);

  const fetchMessages = async (chat) => {
    try {
      localStorage.setItem('receiverID', localStorage.getItem('senderID') === chat.user1Id._id ? chat.user2Id._id : chat.user1Id._id);
      const response = await axios.get(`https://bookish-adventure-qrv6xv6p4x629x7v-4000.app.github.dev/chat/${chat._id}/messages`);
      setMessages(response.data);
      setSelectedChat(chat);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    if (selectedChat) {
      fetchMessages(selectedChat);
    }
  }, [selectedChat]);

  useEffect(() => {
    const handleMessageSent = () => {
      if (selectedChat) {
        fetchMessages(selectedChat);
      }
      fetchChats();
    };
    
    messageEventEmitter.on('messageSent', handleMessageSent);

    return () => {
      messageEventEmitter.off('messageSent', handleMessageSent);
    };
  }, [selectedChat,receiverID]);

  return { chats, setChats, messages, setMessages, selectedChat, setSelectedChat, fetchMessages };
}
