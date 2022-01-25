import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";
import axios from "axios";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";

import Table from "react-bootstrap/Table";
import { TableRound } from 'components/Styled/style.js';

const StockList = () => {
  const [stockList, setstockList] = useState([]);
  const tableHead = [
    "Ticker",
    "Today's price",
    "Total value",
    "All time return",
  ];

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  useEffect(() => {
    axios
      .get("https://wetrade-stock-project.herokuapp.com/portfolio/stockList", {
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
      <TableRound striped bordered hover>
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
                <td>
                  <p>{value.ticker}</p>
                  <span className="text-muted">{value.Stocks.companyName}</span>
                  <br />
                  <span className="text-muted">{value.Stocks.exchange}</span>
                </td>
                <td>
                  <p>${value.Stocks.currentPrice}</p>
                  <span className="text-muted">USD</span>
                </td>
                <td>
                  <p>${value.Stocks.currentPrice * value.totalCounts}</p>
                  <span className="text-muted">{value.totalCounts} shares</span>
                </td>
                <td>
                  
                  {value.Stocks.currentPrice - value.buyAvg > 0 ? (
                    <TiArrowSortedUp style={{color: "#377674", fontSize: 18}} />
                  ) : (
                    <TiArrowSortedDown style={{color: "#b90e0a", fontSize: 18}} />
                  )}
                  <p>{formatter.format(value.Stocks.currentPrice - value.buyAvg)}</p>
                  {/* FIXME: move the calculation to sever side */}
                  <span className="text-muted">
                    {(
                      (value.Stocks.currentPrice / value.buyAvg - 1) *
                      100
                    ).toFixed(2)}
                    %
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </TableRound>
    </div>
  );
};

export default StockList;
