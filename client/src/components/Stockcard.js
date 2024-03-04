import React from 'react';

const StockCard = ({ stock, handleDelete }) => {

  return (
    <div className="stock-card">
      <div className="graph-container">
        {/* Small square for graph */}
      </div>
      <div className="details-container">
        <div className="row">
          <div className="col-2">
            <strong>Open Price:</strong> {stock.open}
          </div>
          <div className="col-3">
            <strong>Company Name:</strong> {stock.companyName}
          </div>
        </div>
        {/* Additional grid or details */}
      </div>
    </div>
  );
}

export default StockCard;