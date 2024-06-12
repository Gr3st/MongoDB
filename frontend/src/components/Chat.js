import '../App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
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

  return (
    <>
      <h1>Private Chats</h1>
      <ul>
        {chats.map(chat => (
          <li key={chat._id} onClick={() => fetchMessages(chat)}>
            {localStorage.getItem('senderID') === chat.user1Id._id ? chat.user2Id.username : chat.user1Id.username}
          </li>
        ))}
      </ul>
      {selectedChat && (
        <div>
          <h2>Messages</h2>
          <ul>
            {messages.map(message => (
              <li key={message._id}>
                {message.senderId === selectedChat.user1Id._id
                  ? selectedChat.user1Id.username
                  : selectedChat.user2Id.username}: {message.content}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default App;
