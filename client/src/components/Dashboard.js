
import React, { useState, useEffect } from 'react';
import Taskbar from './Taskbar';
import StockCard from './Stockcard';

const Dashboard = () => {
  const [selectedStocks, setSelectedStocks] = useState([]);
  const [totalPortfolio, setTotalPortfolio] = useState(0);

  useEffect(() => {
    const fetchStockData = async () => {
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
          console.log("DATA IS: ", data);
          setSelectedStocks(data);
        }
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };
    fetchStockData();
  }, []);

  useEffect(() => {
    console.log("useEffect to update total ran")
    updateTotalPortfolio(selectedStocks);
  }, [selectedStocks]);

  const addStockToDashboard = (stock) => {
    setSelectedStocks([...selectedStocks, stock]);
  };

  const removeStockFromDashboard = (index) => {
    const newSelectedStocks = [...selectedStocks];
    newSelectedStocks.splice(index, 1);
    setSelectedStocks(newSelectedStocks);
  };

  const updateTotalPortfolio = (stocks) => {
    console.log("updateTotalPortfolio ran")
    const total = stocks.reduce((acc, stock) => acc + (parseFloat(stock.open) || 0), 0);
    console.log("stock total is ", total);
    setTotalPortfolio(total);
  };

  return (
    <div>
      <Taskbar onStockAdd={addStockToDashboard} totalPortfolio={totalPortfolio} />
      <div className='container' style={{ backgroundColor: '', maxHeight: '400px', overflowY: 'auto' }}>
        <h2 style={{ textAlign: 'center' }}>Selected Stocks</h2>
        <ul className='mt-5 list-unstyled'>
          {selectedStocks.map((stock, index) => (
            <li key={index}>
              <StockCard stock={stock} handleDelete={() => removeStockFromDashboard(index)} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;