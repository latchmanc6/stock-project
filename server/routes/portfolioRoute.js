const express = require("express");
const router = express.Router();
const { Users, StockTransactions, Stocks } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");
const Sequelize = require("sequelize");

const fetch = require("node-fetch");
require("dotenv").config();

const FinnhubAPIKey = process.env.FINNHUB_API_KEY;
const FinnhubSandboxAPIKey = process.env.FINNHUB_SANDBOX_API_KEY;
const AlphaVantageAPIKey = process.env.ALPHA_VANTAGE_API_KEY;

// const UpdateQuote = require("../helpers/UpdateQuote")

// router.get("/", validateToken, async (req, res) => {
//   const user = await Users.findByPk(req.user.id);

//   if (!user) {
//     res.json({ error: "user dosen't exist" });
//   } else {
//     res.json(user);
//   }
// });

// const stockList = await StockTransactions.findAll({
//   where: { UserId: id},
//   include: [{
//     model: Stocks,
//     as: "Stocks",
//   }]
// });
// return {
//   ticker: transaction.ticker,
//   quantity: transaction.quantity,
//   // sharePrice: transaction.sharePrice,
// };

// let buyList = buyTransaction.map(({ ticker, quantity }) => {
//   return { ticker, quantity };
// });

// let buyList = buyTransaction.filter(function ({ ticker }) {
//   return !this.has(ticker) && this.add(ticker);
// }, new Set);

// const stockList = await StockTransactions.findAll({
//   where: { UserId },
//   attributes: [
//     "ticker",
//     [
//       Sequelize.fn(
//         "SUM",
//         Sequelize.literal("CASE type WHEN 'buy' THEN quantity else 0 end")
//       ),
//       "buyTotal",
//     ],
//     [
//       Sequelize.fn(
//         "SUM",
//         Sequelize.literal("CASE type WHEN 'sell' THEN quantity else 0 end")
//       ),
//       "sellTotal",
//     ],
//     // [Sequelize.literal('"buyTotal" - "sellTotal"'), 'totalCounts']
//   ],
//   group: ["ticker"],
// });

/* Data needed: 
    find type='buy'
    StockTransactions: ticker, quantity, sharePrice or total StockId
    Stocks: id?, companyName, currentPrice, exchange, sector?
    
    3. create a stockList then send it to client 
    - new table to track stock quantity by stockId
  */
router.get("/stockList", validateToken, async (req, res) => {
  const { id: UserId } = req.user;

  // 1. get stocks and its quantities that user owns
  let stockList = await StockTransactions.findAll({
    where: { UserId },
    attributes: [
      "ticker",
      [
        Sequelize.literal(
          "SUM(CASE type WHEN 'buy' THEN quantity else 0 end) - SUM(CASE type WHEN 'sell' THEN quantity else 0 end)"
        ),
        `totalCounts`,
      ],
    ],
    group: ["ticker"],
  });

  // 2. make api call to get current price

  // const { ticker: stockTicker} = stockList;
  // console.log(ticker)

  stockList.map(async ({ ticker }) => {
    const stockInfo = await Stocks.findOne({
      where: { ticker },
      attributes: [
        "ticker",
        "companyName",
        "currentPrice",
        "exchange",
        "updatedAt",
      ],
    }).then((stock) => {
      const BASE_DATE = new Date(); // set it today

      // if current price hasn't updated today (due to api call limit..)
      // if (new Date(stock.updatedAt).getDay() !== BASE_DATE.getDay()) {
        // fetch(
        //   "https://finnhub.io/api/v1/quote?symbol=" +
        //     stock.ticker +
        //     "&token=" +
        //     FinnhubAPIKey
        // )
        //   .then(async (data) => {
        //     await Stocks.update(
        //       {
        //         currentPrice: data.c,
        //       },
        //       { where: { ticker } }
        //     );
        //     // console.log(data);
        //     stock.currentPrice = data.c;
        //   })
        //   .catch((err) => {
        //     res.json({ error: err });
        //   });
      // }
      // console.log(stock)
      console.log('from stock')
    });
    console.log('from stockList')

  });

  res.json(stockList);
});

module.exports = router;
