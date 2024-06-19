import '../Login.css';
import React, { useEffect } from 'react';
import { useFormDataLogin } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

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
    <div className='Login'>
      <div class="slider-thumb"></div>
      <div className='login-panel'>
        <h1>LogIn</h1>
        <h4>Please provide following details to create your account</h4>
  
        {/* <label>Email</label><br /> */}
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email'/><br />
        {/* <label>Password</label><br /> */}
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password'/><br />
      
        {loginStatus && (
          <p>
            {loginStatus === 'success' ? 'Login successful!' : loginStatus === 'failure' ? 'Login failed.' : 'An error occurred.'}
          </p>
        )}
        <button onClick={handleSendData}>Login</button>
        <Link to="/">Back to Home</Link>
      </div>
    </div>
  );
}

export default App;
