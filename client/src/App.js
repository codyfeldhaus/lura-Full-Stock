import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';
import Logout from './components/Logout';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken ] = useState('');
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            {isLoggedIn && (
              <li>
                <Logout setIsLoggedIn={setIsLoggedIn} />
              </li>
            )}
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setToken={setToken} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
