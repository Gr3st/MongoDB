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
            <div  className="chat" key={user._id} onClick={() => { setReceiverID(user._id); setSearch(user.username); setActiveUser(true); }}>
               <img
                  width='40'
                  height='40'
                  src='https://img.icons8.com/color/48/circled-user-female-skin-type-6--v1.png'
                  alt='circled-user-female-skin-type-6--v1'
                />
               <div className='chat-data'>
                 
                <div className='chat-name'>
                  <p>{user.name+" "+user.surname}</p>
                </div>
                <div className='last-message'>
                  {user.username}
              </div>
              </div>
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

