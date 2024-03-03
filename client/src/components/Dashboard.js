
import React, { useState, useEffect } from 'react';
import Taskbar from './Taskbar'; 
import StockCard from './StockCard';

const Dashboard = () => {
  const [selectedStocks, setSelectedStocks] = useState([]);
  const [portfolioTotal, setPortfolioTotal] = useState(0);

  useEffect(() => {
    const total = selectedStocks.reduce((accumulator, currentValue) => {
      return accumulator + parseFloat(currentValue.open);
    }, 0);
    setPortfolioTotal(total.toFixed(2));
  }, [selectedStocks])
  

  const addStockToDashboard = (stock) => {
    setSelectedStocks([...selectedStocks, stock]);
  };

  const removeStock = async (stockId) => {
    console.log("removeStock ran, stockId:", stockId)
    try {
      await fetch('http://localhost:3001/delete/', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer YOUR_JWT_TOKEN`, // Replace with your JWT token
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ stockId })
      })

      setSelectedStocks((prevStocks) => prevStocks.filter((stock) => stock.id !== stockId))

    } catch (error) {
      console.error("removeStock error:", error);
    }
  }

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
      <Taskbar onStockAdd={addStockToDashboard} portfolioTotal={portfolioTotal} />
      <div className='container'>
        <h2 style={{ textAlign: 'center' }}>Selected Stocks</h2>
        <ul className='mt-5'>
          {selectedStocks.map((stock, index) => {
            console.log('Open price for stock', stock.symbol, 'is', stock.open);
            return (
              // <li key={index}>
              //   {stock.symbol} add {stock.open} close {stock.close} high {stock.high} low {stock.low}
              // </li>
              <StockCard stock={stock} handleDelete={removeStock}/>
            );
          })}
        </ul>
      </div>
    </div>
  );
        }
export default Dashboard;
