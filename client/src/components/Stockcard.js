import React from 'react';

const StockCard = ({ stock, handleDelete }) => {
  return (
    <div className="card mb-3" style={{ backgroundColor: '#d9edf7' }}>
      <div className="card-body" style={{ color: 'black' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col p-4">
              <strong>Company Name:</strong> {stock.company_name || "COMPANY MISSING"}
            </div>
            <div className="col p-4">
              <strong>Symbol:</strong> {stock.symbol}
            </div>
            <div className="col p-4">
              <strong>Open Price on {stock.add_date || "DATE*"}: </strong> ${parseFloat(stock.open).toFixed(2) || "ADD PRICE MISSING"}
            </div>
            <div className="col p-4">
              <strong>Close Price on {stock.add_date || "DATE*"}:</strong> {parseFloat(stock.close).toFixed(2) || "CLOSE MISSING"}
            </div>
            <div className="col p-4">
              <strong>High Price on {stock.add_date || "DATE*"}:</strong> {parseFloat(stock.high).toFixed(2) || "HIGH MISSING"}
            </div>
            <div className="col p-4">
              <strong>Low Price on {stock.add_date || "DATE*"}:</strong> {parseFloat(stock.low).toFixed(2) || "LOW MISSING"}
            </div>
            <div className='col-auto'>
              <button className='btn btn-danger' onClick={() => handleDelete(stock.id)}>-</button>
            </div>
          </div>
          {/* Additional grid or details */}
        </div>
      </div>
    </div>
  );
}

export default StockCard;
