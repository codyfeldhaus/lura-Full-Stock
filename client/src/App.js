import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from "./components/Login";
import Home from './components/Home';
import Register from './components/Register';
import navigation from "./components/navigation";

const App = () => {
  const [token, setToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router> 
      <div className="App">
        <div className="container">
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/register"
              element={<Register />}
             
            />
            <Route
              path="/login"
              element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} token={token} setToken={setToken} />}
            />
            <Route
              path="/Navigation"
              element={<Navigation />}
            />
          </Routes>

          <table className="table mt-5">
            {/* Stock data table goes stock table.js */}
          </table>
        </div>
      </div>
    </Router>
  );
};

export default App;
