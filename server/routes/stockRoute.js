const express = require("express");
const router = express.Router();
const { StockModel } = require("../models");
const fetch = require("node-fetch");

require("dotenv").config();

const FinnhubAPIKey = process.env.FINNHUB_API_KEY;
const FinnhubSandboxAPIKey = process.env.FINNHUB_SANDBOX_API_KEY;

// Gets all stocks from Finnhub API and adds a new row in the DB for each one. ** THIS IS ONLY TO FILL THE DATABASE WITH BASIC INFORMATION **
router.get("/getAllStocks", (req, res) => {
  fetch(
    "https://finnhub.io/api/v1/stock/symbol?exchange=US&token=" + FinnhubAPIKey
  )
    .then((response) => response.json())
    .then((data) => {
      data.forEach(async (item) => {
        await StockModel.create({
          ticker: item.symbol,
          companyName: item.description,
          currentPrice: 0.0,
        });
      });
      res.json({ success: data });
    })
    .catch((err) => {
      res.json({ error: err });
    });
});

// Update stock information if neeeded, called everytime user accesses stock trade.
router.get("/getStockInfo", async (req, res) => {
  const stockTicker = req.body.ticker;
  const stock = await StockModel.findOne({ where: { ticker: stockTicker } });
  const THREE_MIN = 3 * 60 * 1000;
  const success = [];
  const error = [];

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
        await StockModel.update(
          {
            companyName: data.name,
            exchange: data.exchange,
            sector: data.finnhubIndustry,
            logo: data.logo,
          },
          { where: { ticker: stockTicker } }
        );
        success.push({ SuccessCompanyProfileData: data });
      })
      .catch((err) => {
        error.push({ ErrorCompanyProfileData: err });
      });
  }

  // Update latest stock price for trade page
  if (new Date() - new Date(stock.updatedAt) > THREE_MIN) {
    fetch(
      "https://finnhub.io/api/v1/quote?symbol=" +
        stockTicker +
        "&token=" +
        FinnhubAPIKey
    )
      .then((response) => response.json())
      .then(async (data) => {
        await StockModel.update(
          {
            currentPrice: data.c,
          },
          { where: { ticker: stockTicker } }
        );
        success.push({ SuccessStockQuoteData: data });
      })
      .catch((err) => {
        error.push({ ErrorStockQuoteData: err });
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
      .then(async (data) => {
        await StockModel.update(
          {
            high52Week: data.metric["52WeekHigh"],
            high52WeekDate: data.metric["52WeekHighDate"],
            low52Week: data.metric["52WeekLow"],
            low52WeekDate: data.metric["52WeekLowDate"],
            peRatio: data.metric.peNormalizedAnnual,
            dividendPerShareAnnual: data.metric.dividendPerShareAnnual,
          },
          { where: { ticker: stockTicker } }
        );
        success.push({ SuccessBasicFinanceData: data });
      })
      .catch((err) => {
        error.push({ ErrorBasicFinanceData: err });
      });
  }
  res.json({ success: success, error: error });
});

// Update the stock price at the time of purchase, no time restriction.
router.get("/updateStockPrice", async (req, res) => {
  const stockTicker = req.body;
  fetch(
    "https://finnhub.io/api/v1/quote?symbol=" +
      stockTicker +
      "&token=" +
      FinnhubAPIKey
  )
    .then((response) => response.json())
    .then(async (data) => {
      await StockModel.update(
        {
          currentPrice: data.c,
        },
        { where: { ticker: stockTicker } }
      );
      res.json({ success: data });
    })
    .catch((err) => {
      res.json({ error: err });
    });
});

module.exports = router;
