import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';

export function useFormData() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Commenting this out as it's not clear if this is needed currently.
  // useEffect(() => {
  //   axios.get('https://bookish-adventure-qrv6xv6p4x629x7v-4000.app.github.dev/tweets')
  //     .then((res) => setList(res.data));
  // }, [name, email, list]);

  const axiosPostData = async () => {
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const postData = {
      name: name,
      surname: surname,
      username: username,
      email: email,
      password: hashedPassword,
      cpassword: cpassword,
    };

    try {
      const res = await axios.post('https://bookish-adventure-qrv6xv6p4x629x7v-4000.app.github.dev/user', postData);
      console.log(res);
      navigate('/');
    } catch (err) {
      setError(err.response ? err.response.data : err.message);
      console.log(err);
    }
  };

  const handleSendData = (event) => {
    event.preventDefault();
    setCPassword(password===cpassword);
    axiosPostData();

  };

  return { name, setName, surname, setSurname, username, setUsername, email, setEmail, password, setPassword, cpassword, setCPassword, error, setError, handleSendData };
}

export function useFormDataLogin() {
  const navigate = useNavigate();
  const [senderId, setSenderId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(null);

  useEffect(() => {
    if (loginStatus==="success") {
      localStorage.setItem('senderID', senderId);
    }
  }, [senderId,loginStatus]);
  
  const fetchUserData = async () => {
    if (!email) return;
    try {
      const res = await axios.get('https://bookish-adventure-qrv6xv6p4x629x7v-4000.app.github.dev/userData');
      const user = res.data.find(user => user.email === email);
      setSenderId(user._id);
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        setLoginStatus(isMatch ? 'success' : 'failure');
      } else {
        setLoginStatus('failure');
      }
    } catch (err) {
      console.error('Error fetching user data:', err);
      setLoginStatus('error');
    }
  };

  
  const handleSendData = (event) => {
    event.preventDefault();
    fetchUserData();
    // Validation and side effects are handled in useEffect based on state changes
  };

  return { email, setEmail, password, setPassword, handleSendData, loginStatus };
}