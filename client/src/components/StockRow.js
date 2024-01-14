import React, { useState, useEffect } from 'react';
import axios from 'axios';

import polygon from './polygon';
// test
const API_BASE_URL = 'https://api.polygon.io/v1/open-close'
const API_KEY = '5xHHbQylCoepucqudYPs7vjYd9Meaiuq';
const ticker = '';
const date = '';
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
    //code state case
    const [stockData, setStockData] = useState({
        price: 0,
        date: '',
        time: '',
        companyName: '',
    });

    useEffect(() => {
     //fetch data
      const fetchStockData = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/${props.ticker}/${date}`, {
            params: {
              apiKey: API_KEY,
            },
          });
  
          const stockInfo = response.data;
  
          // Update state with fetched stock data
          setStockData({
            price: stockInfo.close,
            date: stockInfo.day,
            time: stockInfo.timestamp,
            companyName: stockInfo.ticker,
          });
        } catch (error) {
          console.error('Error fetching StockData:', error);
         
        }
      };
  
      fetchStockData();
    }, [props.ticker]); 
  
    return (
      <tr>
        <td>{props.ticker}</td>
        <td>{stockData.price}</td>
        <td>{stockData.date}</td>
        <td>{stockData.time}</td>
        <td>{stockData.companyName}</td>
      </tr>
    );
  };
  
  export default StockRow;