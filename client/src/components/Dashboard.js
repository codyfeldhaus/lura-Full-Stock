
import React, { useState, useEffect } from 'react';
import Taskbar from './Taskbar';
import StockCard from './Stockcard';

const Dashboard = () => {
  const [selectedStocks, setSelectedStocks] = useState([]);

  const addStockToDashboard = (stock) => {
    setSelectedStocks([...selectedStocks, stock]);
  };

  const removeStockFromDashboard = (index) => {
    const newSelectedStocks = [...selectedStocks];
    newSelectedStocks.splice(index, 1);
    setSelectedStocks(newSelectedStocks);
  };

  useEffect(() => {
    console.log("useEffect in Dashboard.js ran");
    const fetchStockData = async () => {
      console.log("fetchStockData ran");
      try {
        const response = await fetch('http://localhost:3001/dashboard/stocks', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer YOUR_JWT_TOKEN`, // Replace with your JWT token
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched stock data:', data);
          setSelectedStocks(data);
        }
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };
    console.log("useEffect helper loaded");
    fetchStockData();
  }, []);

  return (
    <div>
      <Taskbar onStockAdd={addStockToDashboard} />
      <div>
        <h2 style={{ textAlign: 'center' }}>Selected Stocks</h2>
        <ul>
          {selectedStocks.map((stock, index) => {
            console.log('Open price for stock', stock.symbol, 'is', stock.open);
            return (
              <li key={index}>
                {stock.symbol} company {stock.company_name} add {stock.open} close {stock.close} high {stock.high} low {stock.low}
                <button onClick={() => removeStockFromDashboard(index)}
                className="btn btn-danger rounded-circle"
                >
                    x   

                </button>

              </li>
            );
          })}
        </ul>
      </div>

    </div>
  );
}

export default Dashboard;
