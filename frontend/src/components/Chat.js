
import '../App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [list, setList] = useState([]);
  useEffect(()=>{
    axios.get('https://bookish-adventure-qrv6xv6p4x629x7v-4000.app.github.dev/chat').then((res)=>setList(res.data));
  },[])


  return (
    <>
        {list.map((res)=><div>{res.username+" email:"+res.email}</div>)}
    </>
  );
}

export default App;
