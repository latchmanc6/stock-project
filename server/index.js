const express = require("express");
const app = express();
const db = require("./models");
const cors = require("cors");

app.use(express.json());
app.use(cors());

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
app.use("/watchlists", watchlistsRouter);


// Start server.
db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001.");
  });
});
