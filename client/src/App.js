import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './components/Register.js';
import Home from './components/Home.js';
import Login from './components/Login.js'



function App() {
  

  return (
    <Router>
      <div className="App">
        <div className="container">
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li> {/* Add link to register */}

            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
        
           

          </Routes>

  
            <table className="table mt-5">
            {/* //Stock data table goes here  */}
            </table>
        </div>
      </div>
    </Router>
  );
}

export default App;