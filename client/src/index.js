import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Import necessary components from 'react-router-dom'
import App from './App';
import Home from './components/Home';
import Register from './components/Register';
import login from './components/login';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router> {/* Wrap your entire app with the Router component */}
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
              {/* Add link to register */}
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<login />} /> 
          </Routes>

          <table className="table mt-5">
            {/* Stock data table goes here */}
          </table>
        </div>
      </div>
    </Router>
  </React.StrictMode>
);


