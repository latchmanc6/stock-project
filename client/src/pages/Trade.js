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
import { Button } from "components/Styled/style.js";
import styled from "styled-components";
import Image from "react-bootstrap/Image";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  margin: 80px 0 50px 0;
`;

const BtnWrapper = styled.div`
  display: flex;
  width: 180px;
  justify-content: space-between;
  margin: auto;
  margin-top: 30px;
`;

const StaticsWrapper = styled.div`
  margin-bottom: 60px;
`;

function Trade() {
  let { ticker } = useParams();
  const { authState } = useContext(AuthContext);
  const [stockData, setStockData] = useState({});
  // const [searchBarData, setSearchBarData] = useState({});
  const [stockNews, setStockNews] = useState([]);
  const [buyModalShow, setBuyModalShow] = useState(false);
  const [sellModalShow, setSellModalShow] = useState(false);
  const [transactionShareData, setTransactionShareData] = useState({});
  const [transactionUserData, setTransactionUserData] = useState({});
  const [availableQuantity, setAvailableQuantity] = useState(0);
  const [orderStatus, setOrderStatus] = useState(false);
  const [totalCost, setTotalCost] = useState("");
  let navigate = useNavigate();

  const getTickerDataFromAPI = async () => {
    await axios
      .get(
        `https://wetrade-stock-project.herokuapp.com/api/stock/getStockInfoUpdate/${ticker}`
      )
      .then(() => {
        axios
          .get(
            `https://wetrade-stock-project.herokuapp.com/api/stock/getStockInfo/${ticker}`
          )
          .then((response) => {
            setStockData(response.data);
          });
      });
  };

  const getStockNews = () => {
    axios
      .get(
        `https://wetrade-stock-project.herokuapp.com/api/stock/getStockNews/${ticker}`
      )
      .then((response) => {
        setStockNews(response.data.slice(0, 10));
      });
  };

  // const getAllTickers = () => {
  //   axios
  //     .get("https://wetrade-stock-project.herokuapp.com/api/stock/getAllStocks")
  //     .then((response) => {
  //       setSearchBarData(response.data);
  //     });
  // };

  const getStockTransactionData = () => {
    axios
      .get(
        `https://wetrade-stock-project.herokuapp.com/api/stock/updateStockPrice/${ticker}`
      )
      .then((response) => {
        setTransactionShareData(response.data);
      });
  };

  const getUserTransactionData = () => {
    const userId = authState.id;
    axios
      .get(
        `https://wetrade-stock-project.herokuapp.com/funds/getUserInformation/${userId}`
      )
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
      .post(
        "https://wetrade-stock-project.herokuapp.com/funds/getAmountOfStockUserOwns",
        data
      )
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
    setOrderStatus(false);
    setTotalCost("");
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
    setOrderStatus(false);
    setTotalCost("");
  };

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
    getTickerDataFromAPI();
    getStockNews();
    // getAllTickers();
  }, []);

  return (
    <Container>
      <div className="text-center">
        {/* <SearchBar placeholder="Enter a ticker..." data={searchBarData} /> */}
        <WatchlistButton stockId={stockData.id} ticker={ticker} />
        <div className="companyWrapper">
          <Image
            roundedCircle
            className="stockLogo"
            src={stockData.logo === null ? "Default pic" : stockData.logo}
            alt="Company Logo"
          ></Image>
          <h1 className="stockHeaderName">{stockData.companyName}</h1>
          {/* <h1 className="stockHeaderTicker">{stockData.ticker}</h1> */}
        </div>
        <div className="stockInfo">
          <h6>{stockData.exchange}</h6>
          <h6>{stockData.sector}</h6>
        </div>
        <div>
          <h2>${stockData.currentPrice}</h2>

          <BtnWrapper>
            <Button variant="primary" size="sm" onClick={handleBuyModalShow}>
              Buy
            </Button>
            {/* <button onClick={handleBuyModalShow} className="btn btn-primary">
              Buy
            </button> */}
            <BuyModal
              buyModalShow={buyModalShow}
              handleBuyModalClose={handleBuyModalClose}
              shareData={transactionShareData}
              userData={transactionUserData}
              orderStatus={orderStatus}
              setOrderStatus={setOrderStatus}
              totalCost={totalCost}
              setTotalCost={setTotalCost}
            />
            <Button variant="primary" size="sm" onClick={handleSellModalShow}>
              Sell
            </Button>
            {/* <button onClick={handleSellModalShow} className="btn btn-danger">
              Sell
            </button> */}
            <SellModal
              sellModalShow={sellModalShow}
              handleSellModalClose={handleSellModalClose}
              shareData={transactionShareData}
              userData={transactionUserData}
              availableQuantity={availableQuantity}
              orderStatus={orderStatus}
              setOrderStatus={setOrderStatus}
              totalCost={totalCost}
              setTotalCost={setTotalCost}
            />
          </BtnWrapper>
        </div>
        <StockChart></StockChart>
        
        <StaticsWrapper>

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
                <span>
                  {moment(stockData.high52WeekDate).format("DD/MM/YYYY")}
                </span>
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
                <span>
                  {moment(stockData.low52WeekDate).format("DD/MM/YYYY")}
                </span>
              </div>
            </div>
          </div>
        </StaticsWrapper>

        <h2>Related News</h2>
        {stockNews.map((value, key) => {
          return (
            <div key={key} className="newsCard">
              <div className="newsSquare">
                <img className="newsImg" src={value.image} alt="Company News" />
                <div className="newsHeadline">
                  {value.headline.length > 72
                    ? value.headline.slice(0, 69) + "..."
                    : value.headline}
                </div>
                <p className="newsSummary">
                  {value.summary.length > 280
                    ? value.summary.slice(0, 277) + "..."
                    : value.summary}
                </p>
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
    </Container>
  );
}

export default Trade;
