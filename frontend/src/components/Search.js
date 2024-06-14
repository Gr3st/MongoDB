import '../App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import React from 'react';
import {searchMechanics} from '../services/searchService';

function App() {
  const { search, setSearch, usersData, setUsersData, receiverID, setReceiverID, activeUser, setActiveUser } = searchMechanics();

  return (
    <>
      <div className='search'>
        <input
          type="text"
          placeholder='search...'
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {usersData.length > 0 ? (
        <div>
          {/* <h3>Matching Users</h3> */}
          {usersData.map(user => (
            <div key={user._id} onClick={() => { setReceiverID(user._id); setSearch(user.username); setActiveUser(true); }}>
              <p>Username: {user.username}</p>
            </div>
          ))}
        </div>
      ) : (
        search && <p>No users found</p>
      )}
    </>
  );
}

export default App;

