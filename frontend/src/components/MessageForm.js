import '../App.css';
import axios from 'axios';
import { useState } from 'react';
import {messageService} from '../services/messageService';

function App() {
  const {senderId, setSenderId, receiverId, setReceiverId, content, setContent, handleSendData} = messageService();

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendData();
    }
  };

  return (
    <div className="message-field">
        <div className='message-field-type'><input type="text" placeholder='Type a message...' value={content} onChange={(e) => setContent(e.target.value)} onKeyDown={handleKeyPress}/></div>
        <button onClick={handleSendData}><img width="20" height="20" src="https://img.icons8.com/material-rounded/24/FFFFFF/sent.png" alt="sent"/></button>
    </div>
  );
}

export default App;
