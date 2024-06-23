import axios from 'axios';
import { useEffect, useState } from 'react';

export function searchMechanics() {
  const [search, setSearch] = useState('');
  const [usersData, setUsersData] = useState([]);
  const [receiverID, setReceiverID] = useState('');
  const [activeUser, setActiveUser] = useState(false);

  const getSearchUsers = async () => {
    try {
      const res = await axios.get('https://bookish-adventure-qrv6xv6p4x629x7v-4000.app.github.dev/userData');
      const users = res.data.filter(user => 
        activeUser 
          ? user._id === receiverID 
          : user.username.toLowerCase().includes(search.toLowerCase()) 
      );
      setUsersData(users);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    if (search) {
      getSearchUsers();
    } else {
      setUsersData([]); // Reset usersData if search is empty
      localStorage.removeItem('receiverID');
      localStorage.setItem('search', true);
      setActiveUser(false);
    }
  }, [search]);

  useEffect(() => {
    const createChat = async () => {
      if (receiverID) {
        setActiveUser(true);
        localStorage.setItem('receiverID', receiverID);
        const senderID = localStorage.getItem('senderID');
        await axios.post('https://bookish-adventure-qrv6xv6p4x629x7v-4000.app.github.dev/createChat', {
          user1Id: senderID,
          user2Id: receiverID
        });
      } else {
        setActiveUser(false);
      }
    };

    createChat();
  }, [receiverID]);

  // Delete chat if no messages are sent before receiverID changes
  useEffect(() => {
    const deleteChatIfEmpty = async () => {
      if (localStorage.getItem('previousReceiverID') && !activeUser) {
        const previousReceiverID = localStorage.getItem('previousReceiverID');
        const senderID = localStorage.getItem('senderID');
        
        // Fetch the chat ID using the senderID and previousReceiverID
        const res = await axios.get('https://bookish-adventure-qrv6xv6p4x629x7v-4000.app.github.dev/userChats', {
          params: { userId: senderID }
        });
        
        const chat = res.data.find(c => 
          (c.user1Id._id === senderID && c.user2Id._id === previousReceiverID) ||
          (c.user1Id._id === previousReceiverID && c.user2Id._id === senderID)
        );
        
        if (chat) {
          // Check if there are no messages in this chat
          const messagesRes = await axios.get(`https://bookish-adventure-qrv6xv6p4x629x7v-4000.app.github.dev/chat/${chat._id}/messages`);
          if (messagesRes.data.length === 0) {
            await axios.delete(`https://bookish-adventure-qrv6xv6p4x629x7v-4000.app.github.dev/chat/${chat._id}`);
          }
        }
      }
      
      localStorage.setItem('previousReceiverID', receiverID);
    };

    deleteChatIfEmpty();
  }, [receiverID]);

  return { search, setSearch, usersData, setUsersData, receiverID, setReceiverID, activeUser, setActiveUser };
}
