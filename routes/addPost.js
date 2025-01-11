const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const User = require("../models/user");
const mongoose = require("mongoose");

const addPost = async (req, res) => {
  try {
    const { title, content, tags, image } = req.body;
    const userId = req.user?.id;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).send("Invalid or missing User ID");
    }

    // Fetch user from the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Create a new post
    const newPost = new Post({
      title,
      content,
      tags: tags ? tags.split(" ").map((tag) => tag.trim()) : [],
      image,
      userId: user.id,
      username: user.username, // Ensure username is set correctly
    });

    await newPost.save();
    console.log("New post added.");
    res.redirect("/posts");
  } catch (err) {
    console.error("Error adding post:", err);
    res.status(500).send("Server Error");
  }
};

router.post("/", addPost);

module.exports = router;
