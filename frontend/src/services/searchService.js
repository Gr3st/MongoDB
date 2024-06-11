import axios from 'axios';
import { useEffect, useState } from 'react';
import React from 'react';

export function searchMechanics() {
  const [search, setSearch] = useState('');
  const [usersData, setUsersData] = useState([]);
  const [receiverID, setReceiverID] = useState('');
  const [activeUser, setActiveUser] = useState(false);

  const getSearchUsers = async () => {
    try {
      const res = await axios.get('https://bookish-adventure-qrv6xv6p4x629x7v-4000.app.github.dev/userData');
      const users = res.data.filter(user => activeUser ? user._id === receiverID : user.username.includes(search));
      setUsersData(users);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    if (search) {
      getSearchUsers();
      setActiveUser(!activeUser);
    } else {
      setUsersData([]); // Reset usersData if search is empty
    }
  }, [search, receiverID]);

  useEffect(() => {
    if (receiverID) {
      localStorage.setItem('receiverID', receiverID);
    }
  }, [receiverID]);

  return { search, setSearch, usersData, setUsersData, receiverID, setReceiverID, activeUser, setActiveUser };
}
