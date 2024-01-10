import React, { useState } from 'react';


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