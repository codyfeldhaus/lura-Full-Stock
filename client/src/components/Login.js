import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = ({ setIsLoggedIn, setToken, setUserId }) => {
  const navigate = useNavigate();
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
        const { token, userId } = await response.json(); // Ensure userId is correctly received
        console.log("userId:", userId); // Check if userId is received correctly
        setToken(token);
        setIsLoggedIn(true);
        setUserId(userId);
        navigate("/dashboard");
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
      <div>
        <Link to="/">
          {/* Add your home link text here */}
        </Link>
        <Link to="/login">
          <button className="btn btn-primary mr-2">Login</button>
        </Link>
        <Link to="/register">
          <button className="btn btn-primary">Register</button>
        </Link>
      </div>
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

      <button onClick={handleLogin} className="btn btn-success" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </div>
  );
};

export default Login;