const express = require("express");
const router = express.Router();

const logOut = (req, res) => {
  res.clearCookie("jwt");
  res.redirect("/login");
};

router.post("/", logOut);

module.exports = router;
