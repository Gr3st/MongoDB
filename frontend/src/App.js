import './App.css';
import MessageForm from './components/MessageForm';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
// import Chat from './components/Chat';
import Search from './components/Search';
import LogOut from './components/LogOut'; // Ensure the import is correct

import { privateChatGet } from './services/chatService';
import PrivateChats from './components/ChatPrivate';
import PrivateChatsActive from './components/ChatPrivateActive';
import PrivateMessages from './components/ChatMessage';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const {chats, setChats, messages, setMessages, selectedChat, setSelectedChat, fetchMessages, LastMessages, lastMessages} = privateChatGet();

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

  const handleLogin = () => {
    setIsLogged(true);
  };

  const handleLogout = () => {
    setIsLogged(false);
  };

  const Home = () => {
    return <div>Welcome to the Home Page</div>;
  };

  return (
    <div className="App">
      <Router>
        <div className='left-panel'>
          
    
          <PrivateChats lastMessages={lastMessages} messages={messages} chats={chats} fetchMessages={fetchMessages} />

          <div className='sign-btn'>{isLogged
            ? <Link to="/logout">Logout</Link>
            :     
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>}
          </div>
        </div>
        
        <div className='right-panel'>
          <div className='user-panel'>{<PrivateChatsActive chats={chats} setSelectedChat={setSelectedChat} fetchMessages={fetchMessages}/>}</div>
          {selectedChat && <div className='messages-panel'><PrivateMessages messages={messages} selectedChat={selectedChat} /></div>}
          <MessageForm />
        </div>

        <Routes>
          <Route path="*" element={<></>}/>
          <Route path='/logout' element={<LogOut onLogout={handleLogout} />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm onLogin={handleLogin}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
