const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

const login = (req, res) => {
  res.render("login.ejs", { showSignup: false, showLogin: true });
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username: username });
    console.log(user);
    if (!user) {
      return res.render("userNotFound.ejs");
    }
    const hashedPassword = user.password;

    bcrypt.compare(password, hashedPassword).then((result) => {
      if (result) {
        const maxAge = 2 * 60 * 60;
        const token = jwt.sign({ id: user._id, username }, jwtSecret, {
          expiresIn: maxAge,
        });
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: maxAge * 1000,
        });
        // res.status(201).json({ message: "User Successfully Logged in", user });
        res.redirect("/posts");
      } else {
        res.status(404).json({ message: "Login Failed" });
      }
    });
  } catch (err) {
    res.status(404).json({ message: "Something went wrong !", err });
  }
};

router.get("/", login);
router.post("/", loginUser);

module.exports = router;
