const express = require("express");
const router = express.Router();
const Post = require("../models/post");

const editForm = async (req, res) => {
  try {
    const { id } = req.params;
    const editPost = await Post.findById(id);
    res.render("editForm.ejs", { post: editPost });
  } catch (err) {
    console.log(`Something went wrong ${err}`);
  }
};

const editPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, tags, image } = req.body;

    const updatePost = await Post.findByIdAndUpdate(
      id,
      {
        title,
        content,
        tags: tags.split(",").map((tag) => tag.trim()), // Converts tags string back to array
        image,
      },
      { new: true }
    );
    if (updatePost) res.redirect("/posts");
    else console.log("Post Updation Failed !!");
  } catch (err) {
    console.log(`Post Update Failed !! ${err}`);
  }
};

router.get("/:id", editForm);
router.put("/:id", editPost);

module.exports = router;
