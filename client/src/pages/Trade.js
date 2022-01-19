import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import StockChart from "./components/StockChart";
import moment from "moment";
import SearchBar from "./components/SearchBar";

function Trade() {
  let { ticker } = useParams();
  const [stockData, setStockData] = useState({});
  const [searchBarData, setSearchBarData] = useState({});

  const getTickerDataFromAPI = async () => {
    await axios
      .get(`http://localhost:3001/api/stock/getStockInfo/${ticker}`)
      .then((response) => {
        console.log(response.data);
        setStockData(response.data);
      });
  };

  const getAllTickers = async () => {
    await axios
      .get("http://localhost:3001/api/stock/getAllStocks")
      .then((response) => {
        // console.log(response.data);
        setSearchBarData(response.data);
      });
  };

  useEffect(() => {
    getTickerDataFromAPI();
    getAllTickers();
  }, []);

  return (
    <div>
      <SearchBar placeholder="Enter a ticker..." data={searchBarData} />
      <div>
        <img className="stockLogo" src={stockData.logo}></img>
        <h1 className="stockHeaderName">{stockData.companyName}</h1>
        <h1 className="stockHeaderTicker">{stockData.ticker}</h1>
      </div>
      <div>
        <p>{stockData.exchange}</p>
        <p>{stockData.sector}</p>
      </div>
      <div>
        <h2>${stockData.currentPrice}</h2>
        <button className="btn">Buy</button>
        <button className="btn">Sell</button>
      </div>
      <StockChart></StockChart>
      <h2>Key Statistics</h2>
      <div className="row">
        <div className="col-6">
          <div>
            <span>Dividend Per Share (Annual): </span>
            <span>${stockData.dividendPerShareAnnual}</span>
          </div>
        </div>
        <div className="col-6">
          <div>
            <span>PE Ratio: </span>
            <span>{stockData.peRatio}</span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <div>
            <span>52 Week High: </span>
            <span>${stockData.high52Week}</span>
          </div>
        </div>
        <div className="col-6">
          <div>
            <span>52 Week High Date: </span>
            <span>{moment(stockData.high52WeekDate).format("MM/DD/YYYY")}</span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <div>
            <span>52 Week Low: </span>
            <span>${stockData.low52Week}</span>
          </div>
        </div>
        <div className="col-6">
          <div>
            <span>52 Week Low Date: </span>
            <span>{moment(stockData.low52WeekDate).format("MM/DD/YYYY")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Trade;
