import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import StockChart from "../components/StockChart";
import moment from "moment";
import SearchBar from "../components/SearchBar";
import BuyModal from "../components/StockTransactionModal/BuyModal";
import SellModal from "../components/StockTransactionModal/SellModal";
import { AuthContext } from "../helpers/AuthContext";
import WatchlistButton from "components/Watchlist/WatchlistButton";

function Trade() {
  let { ticker } = useParams();
  const { authState } = useContext(AuthContext);
  const [stockData, setStockData] = useState({});
  const [searchBarData, setSearchBarData] = useState({});
  const [stockNews, setStockNews] = useState([]);
  const [buyModalShow, setBuyModalShow] = useState(false);
  const [sellModalShow, setSellModalShow] = useState(false);
  const [transactionShareData, setTransactionShareData] = useState({});
  const [transactionUserData, setTransactionUserData] = useState({});
  const [availableQuantity, setAvailableQuantity] = useState(0);

  const getTickerDataFromAPI = async () => {
    await axios
      .get(`http://localhost:3001/api/stock/getStockInfoUpdate/${ticker}`)
      .then(() => {
        axios
          .get(`http://localhost:3001/api/stock/getStockInfo/${ticker}`)
          .then((response) => {
            setStockData(response.data);
          });
      });
  };

  const getStockNews = () => {
    axios
      .get(`http://localhost:3001/api/stock/getStockNews/${ticker}`)
      .then((response) => {
        setStockNews(response.data.slice(0, 10));
      });
  };

  const getAllTickers = () => {
    axios
      .get("http://localhost:3001/api/stock/getAllStocks")
      .then((response) => {
        setSearchBarData(response.data);
      });
  };

  const getStockTransactionData = () => {
    axios
      .get(`http://localhost:3001/api/stock/updateStockPrice/${ticker}`)
      .then((response) => {
        setTransactionShareData(response.data);
      });
  };

  const getUserTransactionData = () => {
    const userId = authState.id;
    axios
      .get(`http://localhost:3001/funds/getUserInformation/${userId}`)
      .then((response) => {
        setTransactionUserData(response.data);
      });
  };

  const getAvailableQuantity = () => {
    const data = {
      userId: authState.id,
      ticker: ticker,
    };
    axios
      .post("http://localhost:3001/funds/getAmountOfStockUserOwns", data)
      .then((response) => {
        setAvailableQuantity(response.data);
      });
  };

  const handleBuyModalShow = () => {
    getStockTransactionData();
    getUserTransactionData();
    setBuyModalShow(true);
  };
  const handleBuyModalClose = () => {
    setTransactionShareData({});
    setBuyModalShow(false);
  };

  const handleSellModalShow = () => {
    getStockTransactionData();
    getUserTransactionData();
    getAvailableQuantity();
    setSellModalShow(true);
  };
  const handleSellModalClose = () => {
    setTransactionShareData({});
    setSellModalShow(false);
  };

  useEffect(() => {
    getTickerDataFromAPI();
    getStockNews();
    getAllTickers();
  }, []);

  return (
    <div className="text-center">
      <SearchBar placeholder="Enter a ticker..." data={searchBarData} />
      <WatchlistButton stockId={stockData.id} ticker={ticker} />
      <div>
        <img
          className="stockLogo"
          src={stockData.logo === null ? "Default pic" : stockData.logo}
          alt="Company Logo"
        ></img>
        <h1 className="stockHeaderName">{stockData.companyName}</h1>
        <h1 className="stockHeaderTicker">{stockData.ticker}</h1>
      </div>
      <div>
        <p>{stockData.exchange}</p>
        <p>{stockData.sector}</p>
      </div>
      <div>
        <h2>${stockData.currentPrice}</h2>
        <button onClick={handleBuyModalShow} className="btn btn-primary">
          Buy
        </button>
        <BuyModal
          buyModalShow={buyModalShow}
          handleBuyModalClose={handleBuyModalClose}
          shareData={transactionShareData}
          userData={transactionUserData}
        />
        <button onClick={handleSellModalShow} className="btn btn-danger">
          Sell
        </button>
        <SellModal
          sellModalShow={sellModalShow}
          handleSellModalClose={handleSellModalClose}
          shareData={transactionShareData}
          userData={transactionUserData}
          availableQuantity={availableQuantity}
        />
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
            <span>
              {stockData.peRatio === null ? "N/A" : stockData.peRatio}
            </span>
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
            <span>{moment(stockData.high52WeekDate).format("DD/MM/YYYY")}</span>
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
            <span>{moment(stockData.low52WeekDate).format("DD/MM/YYYY")}</span>
          </div>
        </div>
      </div>
      <h2>Related News</h2>
      {stockNews.map((value, key) => {
        return (
          <div key={key} className="newsCard">
            <div className="newsSquare">
              <img className="newsImg" src={value.image} alt="Company News" />
              <div className="newsHeadline">{value.headline.length > 72 ? value.headline.slice(0, 69) + "..." : value.headline}</div>
              <p className="newsSummary">{value.summary.length > 280 ? value.summary.slice(0, 277) + "..." : value.summary}</p>
              <div>
                <a
                  href={value.url}
                  target="_"
                  className="newsButton btn btn-primary"
                >
                  Read More
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Trade;
