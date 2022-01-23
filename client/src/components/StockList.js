import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import axios from "axios";

import Table from "react-bootstrap/Table";

const StockList = () => {
  const [stockList, setstockList] = useState([]);
  const tableHead = [
    "Ticker",
    "Today's price",
    "Total value",
    "All time return",
  ];

  useEffect(() => {
    axios
      .get("http://localhost:3001/portfolio/stockList", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        console.log(response.data);
        setstockList(response.data);
      });
  }, []);

  return (
    <div>
      <h5 className="text-left text-muted">Your portfolio</h5>
      <Table striped bordered hover>

        <thead>
          <tr>
            {tableHead.map((head, key) => {
              return <th key={key}>{head}</th>;
            })}
          </tr>
        </thead>

        <tbody>
            {stockList.map((value, key) => {
              return (
                <tr key={key}>
                  <td>{value.ticker}</td>
                  <td>{value.Stocks.currentPrice}</td>
                </tr>
              )
            })}
        </tbody>

      </Table>
    </div>
  );
};

export default StockList;
