const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await Post.findByIdAndDelete(id);
    console.log(`Post with ID ${id} deleted.`);
    res.redirect("/posts");
  } catch (error) {
    console.log("delete failed");
    console.log(error);
  }
};

router.delete("/:id", deletePost);

module.exports = router;
