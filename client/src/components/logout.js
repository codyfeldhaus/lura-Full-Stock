import React from 'react';

const Logout = ({ setIsLoggedIn }) => {
  const handleLogout = () => {
    // Perform logout actions, such as clearing authentication state
    setIsLoggedIn(false);
    // Optionally, make an API call to logout endpoint on the server
    fetch('/logout', {
      method: 'POST',
    })
      .then(response => {
        if (response.ok) {
          console.log('Logged out successfully');
        } else {
          console.error('Failed to logout');
        }
      })
      .catch(error => {
        console.error('Error during logout:', error);
      });
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
