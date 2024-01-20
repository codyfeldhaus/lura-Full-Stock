import React, { useState } from "react";
import Login from "./login"; // Adjust the import path based on your project structure

function App() {
  // Define your handleLogin function here
  const handleLogin = (username, password) => {
    // Your login logic goes here
    console.log(
      `Logging in with username: ${username} and password: ${password}`
    );
  };

  return (
    <div>
      <h1>Your App</h1>
      <Login handleLogin={handleLogin} />
    </div>
  );
}

export default App;
