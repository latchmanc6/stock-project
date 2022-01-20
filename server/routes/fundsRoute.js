const express = require("express");
const router = express.Router();
const { FundTransactions } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_TEST_SECRET_KEY);

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
    console.log(charge);

    const newDeposit = {
      type: "deposit",
      total: charge.amount / 100,
      chargeId: charge.id,
      UserId: req.user.id,
    };

    await FundTransactions.create(newDeposit);

    res.send({ status: charge.status });

  } catch (error) {

    return res.status(400).send({
      error: {
        message: e.message,
      },
      status: charge.status,
    });
  }
});

module.exports = router;
