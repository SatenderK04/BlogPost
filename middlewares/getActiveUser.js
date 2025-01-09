const jwt = require("jsonwebtoken");

const jwtSecret =
  "ec09bb5a857fb5c37bbeb4200c8bbdd50c3e5ff23e31e51a45b57942769b";
const authenticateUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("JWT verification failed:", err);
    req.user = null; // Invalidate user if token verification fails
    next();
  }
};

module.exports = authenticateUser;
