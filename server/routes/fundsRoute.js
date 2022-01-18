const express = require("express");
const router = express.Router();

require("dotenv").config();
const STRIPE_SECRET = process.env.STRIPE_TEST_SECRET_KEY;
const stripe = require("stripe")(STRIPE_SECRET);

router.post("/add", async (req, res) => {
  // for the test environment, we have to use 'tok_visa' instead of the actual token
  // const { token } = req.body;

  const charge = await stripe.charges.create({
    amount: 2000,
    currency: "usd",
    source: "tok_visa",
    description: "My First Test Charge (created for API docs)",
  });

  res.json("success");
});

module.exports = router;
