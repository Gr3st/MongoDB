import '../App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import bcrypt from 'bcryptjs'
import React from 'react';
import { useFormData } from '../services/authService';

function App() {
  const { name, setName, surname, setSurname, username, setUsername, email, setEmail, password, setPassword, list, handleSendData } = useFormData();

  return (
    <>
      <form>
        <label>Name</label><br />
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} /><br />
        <label>Surname</label><br />
        <input type="text" value={name} onChange={(e) => setSurname(e.target.value)} /><br />
        <label>Username</label><br />
        <input type="text" value={name} onChange={(e) => setUserame(e.target.value)} /><br />
        <label>Email</label><br />
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
        <label>Password</label><br />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
        <input type="submit" value="send" onClick={handleSendData} />
      </form>
    </>
  );
}

export default App;
