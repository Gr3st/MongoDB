import '../App.css';
import axios from 'axios';
import { useState } from 'react';
import {messageService} from '../services/messageService';

function App() {
  const {senderId, setSenderId, receiverId, setReceiverId, content, setContent, handleSendData} = messageService();

  return (
    <div className="App">
      <form>
        <label>Content</label><br />
        <input type="text" value={content} onChange={(e) => setContent(e.target.value)} /><br />
        <input type="submit" value="send" onClick={handleSendData}/>
      </form>
    </div>
  );
}

export default App;
