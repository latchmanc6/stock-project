const express = require("express");
const router = express.Router();
const { Users, Watchlists } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/", validateToken, async (req, res) => {
  res.json('heelo!')
});

module.exports = router;
