import React from 'react';

const StockCard = ({ stock, handleDelete }) => {
  //convert date from db to readable format
  let add_date = new Date(stock.add_date);
  add_date = add_date.toLocaleDateString();

  return (
    <div className="card mb-3 bg-primary p-3" key={stock.id}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col p-4">
            {/* <strong>Open Price:</strong> {stock.open} */}
            <strong>Open Price on {add_date || "DATE*"}: </strong> ${parseFloat(stock.open).toFixed(2) || "ADD PRICE MISSING"}
          </div>
          <div className="col p-4">
            <strong>Company Name:</strong> {stock.company_name || "COMPANY MISSING"}
          </div>
          <div className="col p-4">
            <strong>Symbol:</strong> {stock.symbol || "SYMBOL MISSING"}
          </div>
          <div className="col p-4">
            <strong>Close Price on {add_date || "DATE*"}:</strong> {parseFloat(stock.close).toFixed(2) || "CLOSE MISSING"}
          </div>
          <div className="col p-4">
            <strong>High Price on {add_date || "DATE*"}:</strong> {parseFloat(stock.high).toFixed(2) || "HIGH MISSING"}
          </div>
          <div className="col p-4">
            <strong>Low Price on {add_date || "DATE*"}:</strong> {parseFloat(stock.low).toFixed(2) || "LOW MISSING"}
          </div>
          <div className='col-auto'>
            <button className='btn btn-danger' onClick={()=> handleDelete(stock.id)}>-</button>
          </div>
        </div>
        {/* Additional grid or details */}
      </div>
    </div>
  );
}

export default StockCard;