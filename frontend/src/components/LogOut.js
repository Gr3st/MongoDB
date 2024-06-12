
// src/components/LogOut.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogOut = ({ onLogout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user-related data from localStorage
    localStorage.removeItem('senderID');
    localStorage.removeItem('receiverID');
    
    // Call the onLogout callback to update the login status
    onLogout();

    // Redirect to login page
    navigate('/login');
  }, [navigate, onLogout]);

  return null;
};

export default LogOut;
