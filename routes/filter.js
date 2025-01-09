const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

const filter = async (req, res) => {
  const token = req.cookies.jwt;
  const decoded = jwt.verify(token, jwtSecret);
  req.user = decoded;
  // console.log("decoded", decoded.user);
  const { category } = req.query;
  try {
    const filteredPosts = await Post.find({
      $or: [
        { title: { $regex: category, $options: "i" } }, // Case-insensitive title search
        { content: { $regex: category, $options: "i" } },
        { tags: { $regex: category, $options: "i" } },
      ],
    });

    if (filteredPosts.length == 0) {
      res.render("postNotFound.ejs");
    }
    res.render("home.ejs", { posts: filteredPosts, user: req.user });
  } catch (error) {
    console.error("Error fetching filtered posts:", error);
    res.status(500).send("Error fetching posts.");
  }
};

router.get("/", filter);

module.exports = router;
