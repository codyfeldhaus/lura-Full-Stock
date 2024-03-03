import React from 'react';

const StockCard = ({ stock }) => {
  //convert date from db to readable format
  let add_date = new Date(stock.add_date);
  add_date = add_date.toLocaleDateString();

  return (
    <div className="stock-card card mb-3 bg-primary p-3 ">
      <div className="graph-container">
        {/* Small square for graph */}
      </div>
      <div className="details-container">
        <div className="row">
          <div className="col-2 p-4">
            {/* <strong>Open Price:</strong> {stock.open} */}
            <strong>Open Price on {add_date || "DATE*"}: </strong> ${stock.open || "ADD PRICE MISSING"}
          </div>
          <div className="col-2 p-4">
            <strong>Company Name:</strong> {stock.companyName || "COMPANY MISSING"}
          </div>
          <div className="col-2 p-4">
            <strong>Symbol:</strong> {stock.symbol || "SYMBOL MISSING"}
          </div>
          <div className="col-2 p-4">
            <strong>Close Price on {add_date || "DATE*"}:</strong> {stock.close || "CLOSE MISSING"}
          </div>
          <div className="col-2 p-4">
            <strong>High Price on {add_date || "DATE*"}:</strong> {stock.high || "HIGH MISSING"}
          </div>
          <div className="col-2 p-4">
            <strong>Low Price on {add_date || "DATE*"}:</strong> {stock.low || "LOW MISSING"}
          </div>
        </div>
        {/* Additional grid or details */}
      </div>
    </div>
  );
}

export default StockCard;