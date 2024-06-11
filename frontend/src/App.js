import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import bcrypt from 'bcryptjs'
import MessageForm from './components/MessageForm';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [list, setList] = useState([]);

  useEffect(()=>{
    axios.get('https://bookish-adventure-qrv6xv6p4x629x7v-4000.app.github.dev/tweets').then((res)=>setList(res.data));
  },[name, email, list,[]])

  const axiosPostData = async () => {
    const hashedPassword = await bcrypt.hash(password, 10);
  //   bcrypt.compare(password, hashedPassword, (err, result) => { -> sprawdzenie poprawnosci hasła
  //     if (err) {
  //         console.error('Błąd porównywania hasła:', err);
  //         return;
  //     }
      
  //     if (result) {
  //         console.log('Hasła są zgodne.');
  //     } else {
  //         console.log('Hasła nie są zgodne.');
  //     }
  // });
    console.log(hashedPassword)
    const postData = {
      username: name,
      email: email,
      password: hashedPassword,
    };

    try {
      const res = await axios.post('https://bookish-adventure-qrv6xv6p4x629x7v-4000.app.github.dev/user', postData);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSendData = (event) => {
    event.preventDefault();
    axiosPostData();
  };

  return (
    <div className="App">
      <form>
        <label>Name</label><br />
        <input type="text" onChange={(e) => setName(e.target.value)} /><br />
        <label>Email</label><br />
        <input type="text" onChange={(e) => setEmail(e.target.value)} /><br />
        <label>Password</label><br />
        <input type="password" onChange={(e) => setPassword(e.target.value)} /><br />
        <input type="submit" value="send" onClick={handleSendData} />
      </form>
      {list.map((res) => (
        <div className='list'>{res.username+" "+res.password}</div>
      ))}
      <MessageForm />
    </div>
  );
}

export default App;
