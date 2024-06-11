
import './App.css';
// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import bcrypt from 'bcryptjs'
import MessageForm from './components/MessageForm';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Chat from './components/Chat';
import Search from './components/Search';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [list, setList] = useState([]);

  // useEffect(()=>{
  //   axios.get('https://bookish-adventure-qrv6xv6p4x629x7v-4000.app.github.dev/tweets').then((res)=>setList(res.data));
  // },[name, email, list,[]])

  // const axiosPostData = async () => {
  //   const hashedPassword = await bcrypt.hash(password, 10);
  // //   bcrypt.compare(password, hashedPassword, (err, result) => { -> sprawdzenie poprawnosci hasła
  // //     if (err) {
  // //         console.error('Błąd porównywania hasła:', err);
  // //         return;
  // //     }
      
  // //     if (result) {
  // //         console.log('Hasła są zgodne.');
  // //     } else {
  // //         console.log('Hasła nie są zgodne.');
  // //     }
  // // });
  //   console.log(hashedPassword)
  //   const postData = {
  //     username: name,
  //     email: email,
  //     password: hashedPassword,
  //   };

  //   try {
  //     const res = await axios.post('https://bookish-adventure-qrv6xv6p4x629x7v-4000.app.github.dev/user', postData);
  //     console.log(res);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const handleSendData = (event) => {
  //   event.preventDefault();
  //   axiosPostData();
  // };

  return (
    <div className="App">
      <Router>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/message">Message</Link>
        <Link to="/chat">Chat</Link>
        <Link to="/search">Search</Link>
         
        <Routes>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/message" element={<MessageForm />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/search" element={<Search />} />
        </Routes>
    

      
      </Router>
    </div>
  );
}

export default App;
