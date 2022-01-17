const express = require("express");
const router = express.Router();
const { UsersModel } = require("../models");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    UsersModel.create({
      email,
      password: hash,
    });
    res.json("Success");
  });
});

module.exports = router;
