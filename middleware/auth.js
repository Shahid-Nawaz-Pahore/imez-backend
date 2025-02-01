const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function (req, res, next) {
  let token = req.header("Authorization");

  if (token && token.startsWith("Bearer ")) {
    token = token.slice(7, token.length); // Remove 'Bearer ' prefix
  }

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
