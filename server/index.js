const express = require("express");
require("dotenv").config();
let db;
const app = express();
const cors = require("cors");
const fetch = require("node-fetch");
const cron = require("node-cron");
const moment = require("moment");
const { StockTransactions, Users, UserChartData } = require("./models");

app.use(express.json());
app.use(cors());

const FinnhubAPIKey = process.env.FINNHUB_API_KEY;

db = require("./models");

// Routers
const stockRouter = require("./routes/stockRoute");
app.use("/api/stock", stockRouter);
const usersRouter = require("./routes/usersRoute");
app.use("/auth", usersRouter);
const fundsRouter = require("./routes/fundsRoute");
app.use("/funds", fundsRouter);
const portfolioRouter = require("./routes/portfolioRoute");
app.use("/portfolio", portfolioRouter);
const watchlistsRouter = require("./routes/watchlistsRoute");
app.use("/watchlist", watchlistsRouter);
const profileRouter = require("./routes/profileRoute");
app.use("/profile", profileRouter);


// Scheduled tasks
cron.schedule(
  "0 30 23 * * 1-5",
  async () => {
    const allUsers = await Users.findAll();
    allUsers.forEach(async (user) => {
      let totalAccountValue = 0;

      totalAccountValue += parseFloat(user.cash);

      const stockTransactions = await StockTransactions.findAll({
        where: { UserId: user.id },
      });
      let arrayTickers = [];
      stockTransactions.forEach((transaction) => {
        arrayTickers.push(transaction.ticker);
      });
      let uniqueTickers = [...new Set(arrayTickers)];

      let counter = 0;
      uniqueTickers.forEach(async (ticker) => {
        fetch(
          "https://finnhub.io/api/v1/quote?symbol=" +
            ticker +
            "&token=" +
            FinnhubAPIKey
        )
          .then((response) => response.json())
          .then(async (data) => {
            let totalBuys = 0;
            let totalSells = 0;
            const buyTransactions = await StockTransactions.findAll({
              where: { ticker: ticker, type: "buy", UserId: user.id },
            });
            const sellTransactions = await StockTransactions.findAll({
              where: { ticker: ticker, type: "sell", UserId: user.id },
            });

            if (buyTransactions.length !== 0) {
              buyTransactions.forEach((element) => {
                totalBuys += element.quantity;
              });
            }

            if (sellTransactions.length !== 0) {
              sellTransactions.forEach((element) => {
                totalSells += element.quantity;
              });
            }

            if (totalBuys - totalSells > 0) {
              const totalQuantity = totalBuys - totalSells;
              const totalValue = data.c * totalQuantity;
              const totalValueRounded = Math.round(totalValue);
              totalAccountValue += totalValueRounded;
            }
            counter++;
          })
          .then(async () => {
            if (counter === uniqueTickers.length) {
              counter = 0;
              await UserChartData.create({
                totalAccountValue: Math.round(totalAccountValue),
                date: moment(new Date()).format("DD/MM/YYYY"),
                UserId: user.id,
              });
            }
          })
          .catch((err) => {});
      });
    });
  },
  {
    scheduled: true,
    timezone: "America/Toronto",
  }
);

// Start server.
db.sequelize
  .sync()
  .then(() => {
    app.listen(process.env.PORT || 3001, () => {
      console.log("Server running on port 3001.");
    });
  })
  .catch((err) => {
    console.log(err);
  });
