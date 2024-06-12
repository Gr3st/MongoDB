import '../App.css';
import React, { useEffect } from 'react';
import { useFormDataLogin } from '../services/authService';
import { useNavigate } from 'react-router-dom';

function App({onLogin}) {
  const navigate = useNavigate();
  const { email, setEmail, password, setPassword, handleSendData, loginStatus } = useFormDataLogin();
  useEffect(()=>{
    if(loginStatus==='success'){
      onLogin();
      navigate('/'); 
    }
  },[loginStatus])
  
  return (
    <>
      <form>
        <label>Email</label><br />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
        <label>Password</label><br />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
        <input type="submit" value="Send"  onClick={handleSendData}/>
      </form>
      {loginStatus && (
        <p>
          {loginStatus === 'success' ? 'Login successful!' : loginStatus === 'failure' ? 'Login failed.' : 'An error occurred.'}
        </p>
      )}
    </>
  );
}

export default App;
