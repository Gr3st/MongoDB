import '../Register.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import bcrypt from 'bcryptjs'
import React from 'react';
import { useFormData } from '../services/authService';
import { Link } from 'react-router-dom';

function App() {
  const { name, setName, surname, setSurname, username, setUsername, email, setEmail, password, setPassword, cpassword, setCPassword, error, setError, handleSendData } = useFormData();

  return (
    <div className='Register'>
      <div class="slider-thumb"></div>
      <div className='register-panel'>
        <h1>Sing In</h1>
        <h4>Please provide following details to create your account</h4>
     
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name'/><br />

        <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} placeholder='Surname'/><br />
        
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username'/><br />
      
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email'/><br />
    
        <input type="password"  onChange={(e) => setPassword(e.target.value)} placeholder='Password'/><br />
        
        <input type="password"  onChange={(e) => setCPassword(e.target.value)} placeholder='Confirm Password'/><br />
        {error==='Password do not match'&&password!==''&&cpassword!==''&&<p>{error}</p>}
        
        <button onClick={handleSendData}>Sign up my Account</button>
        <Link to="/">Back to Home</Link>
      </div>
    </div>
  );
}

export default App;
