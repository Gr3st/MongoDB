import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [list, setList] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:4000/tweets').then((res)=>setList(res.data));
    console.log('e')
  },[name, email, list])

  const axiosPostData = async () => {
    const postData = {
      name: name,
      email: email,
    };

    try {
      const res = await axios.post('http://localhost:4000/user', postData);
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
        <input type="submit" value="send" onClick={handleSendData} />
      </form>
      {list.map((res)=>res.name)}
    </div>
  );
}

export default App;
