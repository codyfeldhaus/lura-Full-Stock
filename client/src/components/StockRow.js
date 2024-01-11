import React, { useState } from 'react';
import axios from 'axios';
//const axios = require('axios');
// test
const API_BASE_URL = 'https://api.polygon.io/v1/open-close'
const API_KEY = '5xHHbQylCoepucqudYPs7vjYd9Meaiuq';
const ticker = 'AAPL'
const date = '2024-01-10'
const fetchStockByTicker = async (ticker, date) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${ticker}/${date}`, {
        params: {
          apiKey: API_KEY
        }
      });
  
      return response.data;
    } catch (error) {
      console.error("Error fetching StockData:", error);
      throw error; 
    }
  }

//   fetchStockByTicker(ticker, date)
//     .then((data) => {
//         console.log(data)
//     })

const StockRow = (props) => {
    //code state for sockdata
    const [stockData, setStockData] = useState({
        price: 5,
        date: '1-9-24',
        time: '09:45',
        companyName: 'Apple',
    });

    return (
        <tr>
            <td>{props.ticker}</td>
            <td>{stockData.price}</td>
            <td>{stockData.date}</td>
            <td>{stockData.time}</td>
            <td>{stockData.companyName}</td>
        </tr>
    );
}
export default StockRow;