const express = require("express");
const router = express.Router();
const { Users, StockTransactions, Stocks } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", validateToken, async (req, res) => {
  const user = await Users.findByPk(req.user.id);

  if (!user) {
    res.json({ error: "user dosen't exist" });
  } else {
    res.json(user);
  }
});

router.get("/stockList", validateToken, async (req, res) => {
  const { id } = req.user;


  const stockList = await StockTransactions.findAll({
    where: { UserId: id }, 
    include: [{
      model: Stocks,
      as: "Stocks",
    }]
  });
  res.json(stockList);
});

module.exports = router;
