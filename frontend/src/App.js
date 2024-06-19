import './App.css';
import MessageForm from './components/MessageForm';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
// import Chat from './components/Chat';
import Search from './components/Search';
import LogOut from './components/LogOut'; // Ensure the import is correct

import { privateChatGet } from './services/chatService';
import PrivateChats from './components/ChatPrivate';
import PrivateMessages from './components/ChatMessage';


import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const {chats, setChats, messages, setMessages, selectedChat, setSelectedChat, fetchMessages} = privateChatGet();

  const handleCheckStatus = () => {
    if (localStorage.getItem('senderID')) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  };
  useEffect(() => {
    handleCheckStatus();
  }, []);

  // const handleLogin = () => {
  //   setIsLogged(true);
  // };
  const handleLogin = () => {
    setIsLogged(true);
  };
  const handleLogout = () => {
    setIsLogged(false);
  };

  return (
    <div className="App">
      <Router>
        <div className='left-panel'>
          {/* <Link to="/search">Search</Link> */}
          <Search />
    
          <PrivateChats messages={messages} chats={chats} fetchMessages={fetchMessages} />

          {isLogged
            ? <Link to="/logout">Logout</Link>
            :     
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>}
        </div>
        
      
        {/* <Chat /> */}
        <div className='right-panel'>
          {selectedChat && <div className='messages-panel'><PrivateMessages messages={messages} selectedChat={selectedChat} /></div>}
          <MessageForm />
        </div>
        {/* <Link to="/register">Register</Link> */}
        {/* <Link to="/message">Message</Link>
        <Link to="/chat">Chat</Link> */}
        
         
        <Routes>
          <Route path='/logout' element={<LogOut onLogout={handleLogout} />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm onLogin={handleLogin}/>} />
          {/* <Route path="/message" element={<MessageForm />} /> */}
          {/* <Route path="/chat" element={<Chat />} /> */}
          {/* <Route path="/search" element={<Search />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
