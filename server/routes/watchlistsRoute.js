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
          "companyName",
          "currentPrice",
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

module.exports = router;
