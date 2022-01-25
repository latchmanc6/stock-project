const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
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

// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   const user = await Users.findOne({
//     where: { email },
//   });

//   if (!user) {
//     res.json({ error: "Email doesn't exist" });
//     return;
//   }

//   bcrypt
//     .compare(password, user.password)
//     .then((match) => {
//       if (!match) {
//         res.json({ error: "Wrong email and password entered" });

//       } else {
//         const accessToken = sign(
//           { email: user.email, id: user.id },
//           "importantsecret"
//         );
//         res.json({ token: accessToken, email, id: user.id });
//       }
//     })
//     .catch((error) => {
//       res.json({ error: error.messages });
//     });
// });

// router.get("/token", validateToken, (req, res) => {
//   res.json(req.user);
// });

module.exports = router;
