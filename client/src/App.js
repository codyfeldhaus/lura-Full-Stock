import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';
import Dashboard from './components/Dashboard'; // Import the Dashboard component

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState(0); // Corrected the state variable name

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setToken={setToken} setUserId={setUserId} />}
          />
          {/* Pass the isLoggedIn, token, and userId props to the Dashboard component */}
          <Route
            path="/dashboard"
            element={<Dashboard isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} token={token} setToken={setToken} userId={userId} setUserId={setUserId} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;