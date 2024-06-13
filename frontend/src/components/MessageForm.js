import '../App.css';
import axios from 'axios';
import { useState } from 'react';
import {messageService} from '../services/messageService';

function App() {
  const {senderId, setSenderId, receiverId, setReceiverId, content, setContent, handleSendData} = messageService();

  return (
    <div className="message-field">
    
        <div className='message-field-type'><input type="text" placeholder='type...' value={content} onChange={(e) => setContent(e.target.value)} /><button onClick={handleSendData}>send</button></div>
        
  
    </div>
  );
}

export default App;
