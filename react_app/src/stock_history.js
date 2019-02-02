import React from "react";

const StockHistory = function(props) {
  return (
    <div className="customers--list">
      <table
        className="table w3-table w3-striped w3-border w3-centered w3-hoverable w3-card-4"
      >
        <thead key="thead">
          <tr>
            <th>Date</th>
            <th>Symbol</th>
            <th>Open</th>
            <th>Close</th>
            <th>Low</th>
            <th>High</th>
            <th>Volume</th>
          </tr>
        </thead>
        <tbody>
          {props.stockList.map(c => (
            <tr key={c.id}>
              <td>{c.date}</td>
              <td>{c.symbol}</td>
              <td>{c.open1}</td>
              <td>{c.close}</td>
              <td>{c.low}</td>
              <td>{c.high}</td>
              <td>{c.volume} </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockHistory;
