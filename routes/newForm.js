const express = require("express");
const router = express.Router();

const newForm = (req, res) => {
  res.render("createPost.ejs");
};

router.get("/", newForm);

module.exports = router;
