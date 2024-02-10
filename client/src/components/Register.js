
import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registrationMessage, setRegistrationMessage] = useState('');

  const handleRegistration = async () => {
    try {
      // Make an HTTP POST request 
      const response = await axios.post('http://localhost:3001/register', 
        {
          username: username,
          password: password 
        }
      );

      
      console.log('response data: ', response.data);
      
      setRegistrationMessage(response.data.message);
      // Clear input fields after successful registration
      setUsername('');
      setPassword('');
    } catch (error) {
      // Handle errors
      console.error('Error during registration:', error);
    }
  };

  return (
    <div>
      <h1>Register for Stock Sense</h1>
      <form>
        <div>
          <label>Username:</label>
          <input
            type='text'
            placeholder='Enter username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleRegistration}>Register</button>
      </form>
      {registrationMessage && <p>{registrationMessage}</p>}
    </div>
  );
};

export default Register;
