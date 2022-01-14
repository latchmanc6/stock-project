const express = require("express");
const app = express();
const db = require("./models");
const { StockModel } = require("./models");
const cors = require("cors");
const fetch = require("node-fetch");
require("dotenv").config();

app.use(express.json());
app.use(cors());

const FinnhubAPIKey = process.env.FINNHUB_API_KEY;
const FinnhubSandboxAPIKey = process.env.FINNHUB_SANDBOX_API_KEY;

app.get("/api/test", async (req, res) => {
  const stock = await StockModel.findOne({ where: { ticker: "AAPL" } });
  console.log(stock);
  console.log(stock.updatedAt);
  res.json(stock);
});

// Gets all stocks from Finnhub API and adds a new row in the DB for each one.
app.get("/api/getAllStocks", (req, res) => {
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

// Update stock information if needed.
app.get("/api/getStockInfo", async (req, res) => {
  const stockTicker = req.body;
  const stock = await StockModel.findOne({ where: { ticker: stockTicker } });
  const success = [];
  const error = [];

  // Add basic stock information if it doesn't already exist in the database
  if (stock.logo === null) {
    fetch(
      "https://finnhub.io/api/v1/stock/profile?symbol=" +
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

  // Update latest stock price
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

  res.json({ success: success, error: error });
});

// Start server.
db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001.");
  });
});
