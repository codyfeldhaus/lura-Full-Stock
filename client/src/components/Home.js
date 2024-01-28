import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

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

      <table className="table mt-5">
        {/* Stock data table goes here */}
      </table>
    </div>
  );
}

export default Home;