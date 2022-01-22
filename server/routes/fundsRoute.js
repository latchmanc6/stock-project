const express = require("express");
const router = express.Router();
const { FundTransactions, Users } = require("../models");
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

module.exports = router;
