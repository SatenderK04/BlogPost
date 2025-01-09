const express = require("express");
const authenticateUser = require("../middlewares/getActiveUser");
const router = express.Router();
const Post = require("../models/post");

router.use(authenticateUser);

const home = async (req, res) => {
  try {
    const posts = await Post.find();
    const user = req.user;
    res.render("home.ejs", { posts, user });
  } catch (error) {
    console.log("Error fetching posts:", error);
    res.status(500).send("Error fetching posts");
  }
};

router.get("/", home);

module.exports = router;
