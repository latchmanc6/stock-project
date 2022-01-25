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
