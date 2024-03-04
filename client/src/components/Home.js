import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import Row from 'react-bootstrap/Row';
import { Image } from 'react-bootstrap';


function Home() {
  return (
    <div>
      <h1>Welcome to Stock Sense</h1>
      
      <div>
        <Link to="/login">
          <button className="btn btn-primary mr-2">Login</button>
        </Link>
        <Link to="/register">
          <button className="btn btn-primary">Register</button>
        </Link>
      </div>
      
    </div>
  );
}

export default Home;