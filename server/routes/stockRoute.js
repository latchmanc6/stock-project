const express = require("express");
const router = express.Router();
const { Stocks, StockTransactions, Users } = require("../models");
const fetch = require("node-fetch");
const moment = require("moment");

require("dotenv").config();

const FinnhubAPIKey = process.env.FINNHUB_API_KEY;
const FinnhubSandboxAPIKey = process.env.FINNHUB_SANDBOX_API_KEY;
const AlphaVantageAPIKey = process.env.ALPHA_VANTAGE_API_KEY;

// Gets all stocks from Finnhub API and adds a new row in the DB for each one. ** THIS IS ONLY TO FILL THE DATABASE WITH BASIC INFORMATION **
router.get("/addAllStocksToDB", (req, res) => {
  fetch(
    "https://finnhub.io/api/v1/stock/symbol?exchange=US&token=" + FinnhubAPIKey
  )
    .then((response) => response.json())
    .then((data) => {
      data.forEach(async (item) => {
        await Stocks.create({
          ticker: item.symbol,
          companyName: item.description,
          currentPrice: 0.0,
        });
      });
      res.json(data);
    })
    .catch((err) => {
      res.json({ error: err });
    });
});

// Update stock information if neeeded, called everytime user accesses stock trade.
router.get("/getStockInfoUpdate/:ticker", async (req, res) => {
  const stockTicker = req.params.ticker;
  let stock = await Stocks.findOne({ where: { ticker: stockTicker } });
  const THREE_MIN = 3 * 60 * 1000;
  const success = [];
  const error = [];

  // Update latest stock price for trade page
  if (new Date() - new Date(stock.updatedAt) > THREE_MIN) {
    fetch(
      "https://finnhub.io/api/v1/quote?symbol=" +
        stockTicker +
        "&token=" +
        FinnhubAPIKey
    )
      .then((response) => response.json())
      .then((data) => {
        stock.update({
          currentPrice: data.c,
          change: data.d,
          percentChange: data.dp,
        });
        console.log(data.c);
        success.push({ SuccessStockQuoteData: data });
      })
      .catch((err) => {
        error.push({ ErrorStockQuoteData: err });
      });
  }

  // Add basic stock information if it doesn't already exist in the database
  if (stock.logo === null) {
    fetch(
      "https://finnhub.io/api/v1/stock/profile2?symbol=" +
        stockTicker +
        "&token=" +
        FinnhubAPIKey
    )
      .then((response) => response.json())
      .then(async (data) => {
        stock.update({
          companyName: data.name,
          exchange: data.exchange,
          sector: data.finnhubIndustry,
          logo: data.logo,
        });
        success.push({ SuccessCompanyProfileData: data });
      })
      .catch((err) => {
        error.push({ ErrorCompanyProfileData: err });
      });
  }

  // Update stock basic financials for trade page
  if (new Date() - new Date(stock.updatedAt) > THREE_MIN) {
    fetch(
      "https://finnhub.io/api/v1/stock/metric?symbol=" +
        stockTicker +
        "&token=" +
        FinnhubAPIKey
    )
      .then((response) => response.json())
      .then((data) => {
        stock
          .update({
            high52Week: data.metric["52WeekHigh"],
            high52WeekDate: data.metric["52WeekHighDate"],
            low52Week: data.metric["52WeekLow"],
            low52WeekDate: data.metric["52WeekLowDate"],
            peRatio: data.metric.peNormalizedAnnual,
            dividendPerShareAnnual: data.metric.dividendPerShareAnnual,
          })
          .then((result) => {
            res.json(result);
          });
        success.push({ SuccessBasicFinanceData: data });
      })
      .catch((err) => {
        error.push({ ErrorBasicFinanceData: err });
      });
  } else {
    res.json(stock);
  }
});

// Get a stock's information.
router.get("/getStockInfo/:ticker", async (req, res) => {
  const stockTicker = req.params.ticker;
  const stock = await Stocks.findOne({ where: { ticker: stockTicker } });
  res.json(stock);
});

// Update the stock price at the time of purchase, no time restriction.
router.get("/updateStockPrice/:ticker", async (req, res) => {
  const stockTicker = req.params.ticker;
  fetch(
    "https://finnhub.io/api/v1/quote?symbol=" +
      stockTicker +
      "&token=" +
      FinnhubAPIKey
  )
    .then((response) => response.json())
    .then(async (data) => {
      await Stocks.update(
        {
          currentPrice: data.c,
          change: data.d,
          percentChange: data.dp,
        },
        { where: { ticker: stockTicker } }
      );
    })
    .catch((err) => {
      res.json({ error: err });
    });

  const stock = await Stocks.findOne({ where: { ticker: stockTicker } });
  res.json(stock);
});

// Get stock chart data.
router.get("/getStockChartData/:ticker", async (req, res) => {
  const stockTicker = req.params.ticker;
  fetch(
    "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" +
      stockTicker +
      "&outputsize=full&apikey=" +
      AlphaVantageAPIKey
  )
    .then((response) => response.json())
    .then(async (data) => {
      res.json(data["Time Series (Daily)"]);
    })
    .catch((err) => {
      console.log(err);
      res.json({ error: err });
    });
});

// Gets all stocks from DB.
router.get("/getAllStocks", async (req, res) => {
  const allStocks = await Stocks.findAll();

  res.json(allStocks);
});

// Get stock chart data.
router.get("/getStockNews/:ticker", async (req, res) => {
  const stockTicker = req.params.ticker;
  let currentDate = new Date();
  currentDate = moment(currentDate).format("YYYY-MM-DD");
  let pastYear = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
  pastYear = moment(pastYear).format("YYYY-MM-DD");

  fetch(
    "https://finnhub.io/api/v1/company-news?symbol=" +
      stockTicker +
      "&from=" +
      pastYear +
      "&to=" +
      currentDate +
      "&token=" +
      FinnhubAPIKey
  )
    .then((response) => response.json())
    .then(async (data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ error: err });
    });
});

// Buy a stock, trade page.
router.post("/buyStock", async (req, res) => {
  const orderData = req.body.data;
  const userData = req.body.userData;

  await StockTransactions.create(orderData);

  await Users.decrement("cash", {
    by: orderData.total,
    where: { id: userData.id },
  });

  res.json(orderData);
});

// Sell a stock, trade page.
router.post("/sellStock", async (req, res) => {
  const orderData = req.body.data;
  const userData = req.body.userData;

  await StockTransactions.create(orderData);

  await Users.increment("cash", {
    by: orderData.total,
    where: { id: userData.id },
  });

  res.json(orderData);
});

// Get stock chart data.
router.get("/getUserAssetData/:userId", async (req, res) => {});

module.exports = router;
