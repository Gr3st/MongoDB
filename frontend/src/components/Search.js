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
          placeholder='Search...'
          onChange={(e) => {setSearch(e.target.value); localStorage.setItem('search',e.target.value===''?true:false)}}
        />
      </div>
      {usersData.length > 0 ? (
        <div className="search-result">
          {/* <h3>Matching Users</h3> */}
          {usersData.map(user => (
            <div  className="search-result-text" key={user._id} onClick={() => { setReceiverID(user._id); setSearch(user.username); setActiveUser(true); }}>
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

