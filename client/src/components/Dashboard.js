
import React, { useState, useEffect } from 'react';
import Taskbar from './Taskbar'; // Import the Taskbar component

const Dashboard = () => {
  
  const [selectedStocks, setSelectedStocks] = useState([]);

 
  const addStockToDashboard = (stock) => {
    setSelectedStocks([...selectedStocks, stock]);
  };

  // useEffect to fetch stock data when component mounts or selectedStocks changes
  useEffect(() => {
    // Fetch stock data from the server
    const fetchStockData = async () => {
      try {
        // Make a request to fetch the stock data
        const response = await fetch('http://localhost:3001/dashboard/stocks', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer YOUR_JWT_TOKEN`, // Replace with your JWT token
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch stock data');
        }
        // Parse the response JSON
        const data = await response.json();
        // Update the selectedStocks state with the fetched data
        setSelectedStocks(data);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    // Call the fetchStockData function
    fetchStockData();
  }, [selectedStocks]); // Run useEffect whenever selectedStocks changes

  return (
    <div>
      {/* Pass the addStockToDashboard function as a prop to the Taskbar component */}
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
