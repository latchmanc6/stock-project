const express = require("express");
const router = express.Router();
const { Watchlists, Stocks } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/", validateToken, async (req, res) => {
  const { stockId: StockId } = req.body;
  const { id: UserId } = req.user;
  console.log(StockId, UserId);

  const found = await Watchlists.findOne({
    where: { StockId, UserId },
  });

  if (!found) {
    await Watchlists.create({ StockId, UserId });
    res.json({ onWatch: true });
  } else {
    await Watchlists.destroy({
      where: { StockId, UserId },
    });
    res.json({ onWatch: false });
  }
});

router.get("/", validateToken, async (req, res) => {
  const { id: UserId } = req.user;
  console.log(UserId);

  const watchlist = await Watchlists.findAll({
    where: { UserId },
    include: [
      {
        model: Stocks,
        as: "Stocks",
        attributes: [
          "id",
          "ticker",
          "companyName",
          "currentPrice",
          "change",
          "percentChange",
          "updatedAt",
        ],
      },
    ],
  });

  if (watchlist) {
    res.json(watchlist);
  } else {
    res.json({ message: "No watchlist" });
  }
});

router.get("/:ticker", validateToken, async (req, res) => {
  const { ticker } = req.params;
  const { id: UserId } = req.user;

  const stock = await Stocks.findOne({
    where: { ticker },
    attributes: ["id"],
  });

  const found = await Watchlists.findOne({
    where: { StockId: stock.id, UserId },
  });

  if (found) {
    return res.json({ onWatchlist: true });
  } else {
    return res.json({ onWatchlist: false });
  }
});

module.exports = router;
