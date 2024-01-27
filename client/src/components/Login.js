import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
const Login = ({ isLoggedIn, setIsLoggedIn, token, setToken }) => {
  const history = useHistory(); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setIsLoading(true);

      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const { token } = await response.json();
        setToken(token);
        setIsLoggedIn(true);
        
        // Redirect to the new home page or landing page
        history.push('./Navigation');
      } else {
        const errorMessage = await response.text();
        alert(`Login failed: ${errorMessage}`);
      }
    } catch (error) {
      console.error('An error occurred while logging in:', error);
      alert('An unexpected error occurred while logging in.');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div>
      <label>Username:</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin} disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </div>
  );
};

export default Login;
