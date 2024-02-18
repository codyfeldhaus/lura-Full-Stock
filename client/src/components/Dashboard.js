import React, { useState } from 'react';
import Taskbar from './Taskbar'; // Import the Taskbar component

const Dashboard = () => {
  // State to store search results
  const [searchResults, setSearchResults] = useState([]);

  // Function to handle search results update
  const handleSearchResultsUpdate = (results) => {
    setSearchResults(results);
  };

  return (
    <div>
      {/* Pass searchResults and setSearchResults as props to the Taskbar component */}
      <Taskbar searchResults={searchResults} setSearchResults={handleSearchResultsUpdate} />
      {/* Your other dashboard content goes here */}
    </div>
  );
}

export default Dashboard;
