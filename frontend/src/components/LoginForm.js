import '../App.css';
import React from 'react';
import { useFormDataLogin } from '../services/authService';

function App() {
  const { email, setEmail, password, setPassword, handleSendData, loginStatus } = useFormDataLogin();

  return (
    <>
      <form onSubmit={handleSendData}>
        <label>Email</label><br />
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
        <label>Password</label><br />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
        <input type="submit" value="Send" />
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
