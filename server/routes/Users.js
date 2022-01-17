const express = require("express");
const router = express.Router();
const { UsersModel } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");

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

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UsersModel.findOne({
    where: { email },
  });

  if (!user) {
    res.json({ error: "Email doesn't exist" });
    return;
  }

  bcrypt
    .compare(password, user.password)
    .then((match) => {
      if (!match) {
        res.json({ error: "Wrong email and password entered" });

      } else {
        const accessToken = sign(
          { email: user.email, id: user.id },
          "importantsecret"
        );
        res.json({ token: accessToken, email, id: user.id });
      }
    })
    .catch((error) => {
      res.json({ error: error.messages });
    });
});

module.exports = router;
