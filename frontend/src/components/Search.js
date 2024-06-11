import '../App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import bcrypt from 'bcryptjs'
import React from 'react';


function App() {
  const [search, setSearch] = useState('');
  useEffect(()=>{
    axios.get('https://bookish-adventure-qrv6xv6p4x629x7v-4000.app.github.dev/chat').then((res)=>setList(res.data));
  },[])


  return (
    <>
      <input type="text" placeholder='search...' onChange={(e)=>setSearch(e.target.value)}/>
    </>
  );
}

export default App;
