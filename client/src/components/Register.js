
import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = async () => {
    try {
      // Make an HTTP POST request to your server for registration
      const response = await axios.post('http://localhost:3001/register', 
        {
          username: username,
          password: password 
        }
     );

      // Handle the response as needed
      console.log('response data: ', response.data);
    } catch (error) {
      // Handle errors
      console.error('Error during registration:', error);
    }
  };

  return (
    <div>
      <h1>Register for stock sense</h1>
      <input
        type='text'
        placeholder='Username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegistration}>Register</button>
    </div>
  );
};



export default Register;
