import React from 'react';
import Taskbar from './Taskbar'; // Import the Taskbar component




import React, { useState } from 'react';
import Taskbar from './Taskbar'; // Import the Taskbar component

const Dashboard = () => {
  // Define state to store the list of selected stocks
  const [selectedStocks, setSelectedStocks] = useState([]);

  // Function to add a stock to the list of selected stocks
  const addStockToDashboard = (stock) => {
    setSelectedStocks([...selectedStocks, stock]);
  };

  return (
    <div>
      <Taskbar onStockAdd={addStockToDashboard} />
      {/* Display the selected stocks */}
      <div>
        <h2>Selected Stocks</h2>
        <ul>
          {selectedStocks.map((stock, index) => (
            <li key={index}>{stock.symbol} - {stock.openPrice}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
