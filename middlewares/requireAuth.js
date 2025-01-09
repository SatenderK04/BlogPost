const jwt = require("jsonwebtoken");
const jwtSecret =
  "ec09bb5a857fb5c37bbeb4200c8bbdd50c3e5ff23e31e51a45b57942769b";

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.redirect("/login");
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    console.log("Decoded JWT Payload:", req.user);
    next();
  } catch (err) {
    console.log("Authentication failed:", err);
    return res.redirect("/login");
  }
};

module.exports = requireAuth;
