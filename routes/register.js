const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const User = require("../models/user");
const postData = require("../data/postData");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const jwtSecret = process.env.JWT_SECRET;
// const jwtSecret = crypto.randomBytes(20).toString("hex");

const register = (req, res) => {
  res.render("register.ejs", { showSignup: true, showLogin: false });
};

if (!jwtSecret) {
  console.error("JWT_SECRET is not defined. Check your .env file.");
  process.exit(1); // Exit the application if secret is missing
}

const saveUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hash, email });

    const maxAge = 2 * 60 * 60; // 2 hours
    const token = jwt.sign({ id: user._id, username, email }, jwtSecret, {
      expiresIn: maxAge,
    });

    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.redirect("/posts");
  } catch (err) {
    console.error("Error saving user:", err.message);
    res.status(500).json({ message: "Something went wrong.", error: err });
  }
};
router.get("/", register);
router.post("/", saveUser);

module.exports = router;
