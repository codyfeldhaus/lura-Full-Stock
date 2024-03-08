import React, { useState } from 'react';

const StockCard = ({ stock, handleDelete }) => {
  const currentDate = new Date().toLocaleDateString();
  const [shares, setShares] = useState(0);

  const handleSharesChange = (event) => {
    setShares(event.target.value);
  };

  const handleAddShares = () => {
    alert(`Added ${shares} shares of ${stock.symbol}`);
    // Add logic here to update total shares or perform other actions
  };

  return (
    <div className="card mb-3" style={{ backgroundColor: '#070049' }}>
      <div className="card-body" style={{ color: 'white' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col p-4">
              <strong>Company Name:</strong> {stock.company_name || "COMPANY MISSING"}
            </div>
            <div className="col p-4">
              <strong>Symbol:</strong> {stock.symbol}
            </div>
            <div className="col p-4">
              <strong>Open Price on {currentDate}: </strong> ${parseFloat(stock.open).toFixed(2) || "ADD PRICE MISSING"}
            </div>
            <div className="col p-4">
              <strong>Close Price on {currentDate}:</strong> {parseFloat(stock.close).toFixed(2) || "CLOSE MISSING"}
            </div>
            <div className="col p-4">
              <strong>High Price on {currentDate}:</strong> {parseFloat(stock.high).toFixed(2) || "HIGH MISSING"}
            </div>
            <div className="col p-4">
              <strong>Low Price on {currentDate}:</strong> {parseFloat(stock.low).toFixed(2) || "LOW MISSING"}
            </div>
            <div className='col p-4'>
              <div className="input-group">
                <input type="number" className="form-control" value={shares} onChange={handleSharesChange} />
                <div className="input-group-append">
                  <button className="btn btn-info" type="button" onClick={handleAddShares}>Add Shares</button>
                </div>
              </div>
            </div>
            <div className='col-auto'>
              <button className='btn btn-secondary' onClick={() => handleDelete(stock.id)}>x</button>
            </div>
          </div>
          {/* Additional grid or details */}
        </div>
      </div>
    </div>
  );
}

export default StockCard;
