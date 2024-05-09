
import React, { useState, useEffect } from 'react';
import Taskbar from './Taskbar';
import StockCard from './Stockcard';


const Dashboard = ({ isLoggedIn, setIsLoggedIn, token, setToken, userId, setUserId}) => {
  const [selectedStocks, setSelectedStocks] = useState([]);
  const [totalPortfolio, setTotalPortfolio] = useState(0);
  

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/dashboard/stocks?userId=${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          const data = await response.json();
          setSelectedStocks(data);
          console.log('Fetched stock data:', data); // testing
        }
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };
    fetchStockData();
}, [userId]); 

  useEffect(() => {
    updateTotalPortfolio(selectedStocks);
  }, [selectedStocks]);

  const addStockToDashboard = (stock) => {
    setSelectedStocks([...selectedStocks, stock]);
    console.log('Stock added to dashboard:', stock); // testing
  };

  const removeStockFromDashboard = async (stockId) => {
    try {
      const response = await fetch(`http://localhost:3001/delete/${stockId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer YOUR_JWT_TOKEN`, // Replace with your JWT token
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const updatedStocks = selectedStocks.filter(stock => stock.id !== stockId);
        setSelectedStocks(updatedStocks);
      }
    } catch (error) {
      console.error('Error removing stock:', error);
    }
  };

  const updateTotalPortfolio = (stocks) => {
    const total = stocks.reduce((acc, stock) => acc + (parseFloat(stock.open) || 0), 0);
    setTotalPortfolio(total);
    console.log('Updated total portfolio:', total);// testing 
  };

  return (
    <div>
      <Taskbar onStockAdd={addStockToDashboard} totalPortfolio={totalPortfolio} userId={userId} />
      <div className='container' style={{ backgroundColor: '', maxHeight: '400px', overflowY: 'auto' }}>
        <h2 style={{ textAlign: 'center' }}>Selected Stocks</h2>
        <ul className='mt-5 list-unstyled'>
          {selectedStocks.map((stock) => (
            <li key={stock.id}>
              <StockCard stock={stock} handleDelete={() => removeStockFromDashboard(stock.id)} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;