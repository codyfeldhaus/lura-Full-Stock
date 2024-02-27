import React, { useState } from 'react';
import Taskbar from './Taskbar'; // Import the Taskbar component

const Dashboard = () => {
  // State to store search results
  const [searchResults, setSearchResults] = useState();

  // Function to handle search results update
  const handleSearchResultsUpdate = (results) => {
    setSearchResults(results);
  };

  return (
    <div>

      <Taskbar searchResults={searchResults} setSearchResults={handleSearchResultsUpdate} />
      {JSON.stringify(searchResults)}
      {/* {searchResults.map(result => {
      <div>
        <p>result</p>
        {JSON.stringify(result)}
      </div>
      })} */}
    </div>
  );
}

export default Dashboard;
