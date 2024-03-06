
import React, { useState, useEffect } from 'react';
import Taskbar from './Taskbar';
import StockCard from './Stockcard';

const Dashboard = () => {
  const [selectedStocks, setSelectedStocks] = useState([]);
  const [totalPortfolio, setTotalPortfolio] = useState(0);

  useEffect(() => {
    // Fetch data or perform other initialization logic here
  }, []);

  const addStockToDashboard = (stock) => {
    setSelectedStocks([...selectedStocks, stock]);
    updateTotalPortfolio([...selectedStocks, stock]);
  };

  const removeStockFromDashboard = (index) => {
    const newSelectedStocks = [...selectedStocks];
    newSelectedStocks.splice(index, 1);
    setSelectedStocks(newSelectedStocks);
    updateTotalPortfolio(newSelectedStocks);
  };

  const updateTotalPortfolio = (stocks) => {
    const total = stocks.reduce((acc, stock) => acc + (stock.open || 0), 0);
    setTotalPortfolio(total);
  };

  return (
    <div>
      <Taskbar onStockAdd={addStockToDashboard} totalPortfolio={totalPortfolio} />
      <div className='container'>
        <h2 style={{ textAlign: 'center' }}>Selected Stocks</h2>
        <ul className='mt-5'>
          {selectedStocks.map((stock, index) => (
            <li key={index}>
              <StockCard stock={stock} handleDelete={() => removeStockFromDashboard(index)} updateTotalPortfolio={updateTotalPortfolio} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;