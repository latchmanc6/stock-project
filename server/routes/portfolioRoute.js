const express = require("express");
const router = express.Router();
const { Users, StockTransactions, Stocks } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");
const Sequelize = require("sequelize");

const fetch = require("node-fetch");
const { response } = require("express");
require("dotenv").config();

// const stockList = await StockTransactions.findAll({
//   where: { UserId },
//   attributes: [
//     "ticker",
//     [
//       Sequelize.literal(
//         "SUM(CASE type WHEN 'buy' THEN quantity else 0 end) - SUM(CASE type WHEN 'sell' THEN quantity else 0 end)"
//       ),
//       `totalCounts`,
//     ],
//     [Sequelize.literal("SUM(CASE type WHEN 'buy' THEN total else 0 end)"),`buyTotal`],
//     [Sequelize.literal("buyTotal / SUM(CASE type WHEN 'buy' THEN quantity else 0 end)"),`buyAvg`],
//   ],
//   include: [{
//     model: Stocks,
//     as: "Stocks",
//     attributes: ['id', 'companyName', 'currentPrice', 'exchange', 'updatedAt'],
//   }],
//   group: ["ticker", "Stocks.ticker"],
// });

const FinnhubAPIKey = process.env.FINNHUB_API_KEY;

router.get("/stockList", validateToken, async (req, res) => {
  const { id: UserId } = req.user;
  

  // 1. get stocks and its quantities that user owns
  const stockList = await StockTransactions.findAll({
    where: { UserId },
    attributes: [
      "ticker",
      [
        Sequelize.literal(
          "SUM(CASE type WHEN 'buy' THEN quantity else 0 end) - SUM(CASE type WHEN 'sell' THEN quantity else 0 end)"
        ),
        `totalCounts`,
      ],
      [
        Sequelize.literal("SUM(CASE type WHEN 'buy' THEN total else 0 end)"),
        `buyTotal`,
      ],
      [
        Sequelize.literal(
          "SUM(CASE type WHEN 'buy' THEN total else 0 end) / SUM(CASE type WHEN 'buy' THEN quantity else 0 end)"
        ),
        `buyAvg`,
      ],
    ],
    include: [
      {
        model: Stocks,
        as: "Stocks",
        attributes: [
          "id",
          "companyName",
          "currentPrice",
          "exchange",
          "updatedAt",
        ],
      },
    ],
    group: ["ticker", "Stocks.ticker"],
  });

  await Promise.all(
    stockList.map(async (stock) => {
      console.log(`==========> fetching current price of : ${stock.ticker}`);
      fetch(
        "https://finnhub.io/api/v1/quote?symbol=" +
          stock.ticker +
          "&token=" +
          FinnhubAPIKey
      ).then(async (data) => {
        await Stocks.update(
          {
            currentPrice: data.c,
          },
          { where: { ticker: stock.ticker } }
        );
        stock.currentPrice = data.c;
      })
      .catch((err) => {
        return res.json({error: err});
      });
    })
  );
  res.json(stockList);
});

module.exports = router;
