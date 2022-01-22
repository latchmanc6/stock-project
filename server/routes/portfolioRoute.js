const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", validateToken, async (req, res) => {
  const user = await Users.findByPk(req.user.id);

  if (!user) {
    res.json({error: "user dosen't exist"});
  } else {
    res.json(user)

  }

  // res.json(user)
});

module.exports = router;
