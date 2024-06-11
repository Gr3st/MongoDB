import axios from 'axios';
import { useEffect, useState } from 'react';
import bcrypt from 'bcryptjs';

export function useFormData() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [list, setList] = useState([]);

//   useEffect(() => {
//     axios.get('https://bookish-adventure-qrv6xv6p4x629x7v-4000.app.github.dev/tweets')
//       .then((res) => setList(res.data));
//   }, [name, email, list]);

  const axiosPostData = async () => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const postData = {
      username: name,
      email: email,
      password: hashedPassword,
    };

    try {
      const res = await axios.post('https://bookish-adventure-qrv6xv6p4x629x7v-4000.app.github.dev/user', postData);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSendData = (event) => {
    event.preventDefault();
    axiosPostData();
  };

  return { name, setName, email, setEmail, password, setPassword, list, handleSendData };
}
