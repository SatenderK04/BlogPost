const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;
const search = async (req, res) => {
  const token = req.cookies.jwt;
  const decoded = jwt.verify(token, jwtSecret);
  req.user = decoded;
  try {
    const { query } = req.query;
    const filteredPosts = await Post.find({
      $or: [
        { title: { $regex: query, $options: "i" } }, // Case-insensitive title search
        { content: { $regex: query, $options: "i" } },
        { tags: { $regex: query, $options: "i" } }, // Case-insensitive content search
      ],
    });
    if (filteredPosts.length === 0) res.render("postNotFound.ejs");
    else res.render("home.ejs", { posts: filteredPosts, user: req.user });
  } catch (error) {
    console.log("Error searching posts:", error);
  }
};

router.get("/", search);

module.exports = router;
