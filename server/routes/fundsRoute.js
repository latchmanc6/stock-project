const express = require("express");
const router = express.Router();
const { FundTransactions, Users, StockTransactions } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_TEST_SECRET_KEY);

router.get("/", validateToken, async (req, res) => {
  const { id } = req.user;

  const cash = await Users.findByPk(id, {
    attributes: ["cash"],
  });

  res.json(cash);
});

router.post("/add", validateToken, async (req, res) => {
  const { amount } = req.body;

  const params = {
    amount: amount * 100,
    currency: "usd",
    source: "tok_visa",
    description: "Deposit money",
  };

  try {
    const charge = await stripe.charges.create(params);
    const userId = req.user.id;

    const newDeposit = {
      type: "deposit",
      total: charge.amount / 100,
      chargeId: charge.id,
      UserId: userId,
    };

    await FundTransactions.create(newDeposit);

    // await Users.findByPk(userId).then((user) => {
    //   return user.increment("cash", { by: newDeposit.total });
    // });

    await Users.increment("cash", {
      by: newDeposit.total,
      where: { id: userId },
    });

    res.send({
      status: charge.status,
      chargedAmount: charge.amount / 100,
    });
  } catch (error) {
    return res.status(400).send({
      error: {
        message: error.message,
      },
    });
  }
});

router.get("/getUserInformation/:userId", async (req, res) => {
  const userId = req.params.userId;
  const user = await Users.findOne({ where: { id: userId } });
  const userInfo = { id: user.id, email: user.email, cash: user.cash };
  res.json(userInfo);
});

router.post("/getAmountOfStockUserOwns", async (req, res) => {
  const userId = req.body.userId;
  const ticker = req.body.ticker;

  let totalBuys = 0;
  let totalSells = 0;
  let availableQuantity = 0;

  const buyTransactions = await StockTransactions.findAll({
    where: { ticker: ticker, type: "buy", UserId: userId },
  });
  const sellTransactions = await StockTransactions.findAll({
    where: { ticker: ticker, type: "sell", UserId: userId },
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
    availableQuantity = totalBuys - totalSells;
  }

  console.log({
    availableQuantity: availableQuantity,
    buyTransactions: buyTransactions,
    totalBuys: totalBuys,
    sellTransactions: sellTransactions,
    totalSells: totalSells,
  });

  res.json(availableQuantity);
});

module.exports = router;
