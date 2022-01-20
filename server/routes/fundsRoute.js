const express = require("express");
const router = express.Router();

require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_TEST_SECRET_KEY);

router.post("/add", async (req, res) => {
  const { amount } = req.body;

  const params = {
    amount: amount * 100,
    currency: "usd",
    source: "tok_visa",
    description: "Deposit money",
  };

  try {
    const charge = await stripe.charges.create(params);

    res.send({
      status: charge.status,
    });
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
