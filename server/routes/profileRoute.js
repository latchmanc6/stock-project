const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", validateToken, async (req, res) => {
  const { id } = req.user;

  const userInfo = await Users.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
  res.json(userInfo);
});

router.put("/phoneNumber", validateToken, async (req, res) => {
  const { phone } = req.body;
  const { id } = req.user;

  await Users.update({ phone }, { where: { id } });
  res.json(phone);
});

router.put("/address", validateToken, async (req, res) => {
  const { address, postalCode } = req.body;
  const { id } = req.user;
  console.log(address);
  console.log(id);

  await Users.update({ address, postalCode }, { where: { id } });
  res.json({ address, postalCode });
});

router.put("/password", validateToken, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const { id } = req.user;

  const user = await Users.findOne({ where: { id } });

  bcrypt.compare(oldPassword, user.password).then((match) => {
    if (!match) res.json({ error: "Wrong password entered" });

    bcrypt.hash(newPassword, 10).then((hash) => {
      Users.update({ password: hash }, { where: { id } });
      res.json({ message: "SUCCESS" });
    });
  });
});

module.exports = router;
