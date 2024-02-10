import React from 'react';

const Logout = ({ setIsLoggedIn }) => {
  const handleLogout = () => {
    
    setIsLoggedIn(false);
    
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
