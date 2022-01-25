import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";
import axios from "axios";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";

import Table from "react-bootstrap/Table";
import styled from "styled-components";

const ReturnWrapper = styled.div`
  display: flex;
`;

const StyledTable = styled.table`
  border-radius: 10px;
  background-color: rgb(255,255,255);
  box-shadow: rgb(59 59 59 / 5%) 0px 5px 15px 0px;
  width: 100%;

  border-collapse: collapse;
  
  th, td {
    padding: 15px;
  }

  tr {
    border-bottom: 1px solid rgb(230, 228, 227);
  }

  .point {
    cursor: pointer;
  }

`;

const StockList = () => {
  let navigate = useNavigate(); 

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

  const routeStockPage = (ticker) =>{ 
    console.log('click')
    navigate(`/trade/${ticker}`);
  }

  return (
    <div>
      <h5 className="text-left text-muted">Your portfolio</h5>
      <StyledTable>
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
              <tr key={key} className="point" onClick={() => routeStockPage(value.ticker)}>
                <td>
                  <h5>{value.ticker}</h5>
                  <span className="text-muted">{value.Stocks.companyName}</span>
                  <br />
                  <span className="text-muted">{value.Stocks.exchange}</span>
                </td>
                <td>
                  <h5>${value.Stocks.currentPrice}</h5>
                  <span className="text-muted">USD</span>
                </td>
                <td>
                  <h5>${value.Stocks.currentPrice * value.totalCounts}</h5>
                  <span className="text-muted">{value.totalCounts} shares</span>
                </td>
                <td>
                  <ReturnWrapper>
                    {value.Stocks.currentPrice - value.buyAvg > 0 ? (
                      <TiArrowSortedUp style={{color: "#377674", fontSize: 18}} />
                    ) : (
                      <TiArrowSortedDown style={{color: "#b90e0a", fontSize: 18}} />
                    )}
                    <h5>{formatter.format(value.Stocks.currentPrice - value.buyAvg)}</h5>
                    {/* FIXME: move the calculation to sever side */}
                  </ReturnWrapper>
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
      </StyledTable>
    </div>
  );
};

export default StockList;
