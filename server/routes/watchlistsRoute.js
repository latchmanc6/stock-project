const express = require("express");
const router = express.Router();
const { Users, Watchlists } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/", validateToken, async (req, res) => {
  const { stockId: StockId } = req.body;
  const { id: UserId } = req.user;
  console.log(StockId, UserId);

  const found = await Watchlists.findOne({
    where: { StockId, UserId },
  });

  if (!found) {
    await Watchlists.create({ Watchlists, UserId });
    res.json({added: true});
  } else {
    await Watchlists.destroy({
      where: { Watchlists, UserId },
    });
    res.json("Removed from watchlist");
  }
});

module.exports = router;
