const jwt = require("jsonwebtoken");
const { ValidationError,BadRequestError } = require("../custom-errors/customError");
require("dotenv").config();
async function verifyAccessToken(req, res, next) {
  const token = req.cookies.accessToken;
  console.log("access Token ", token);
  if (!token) {
    return next(new BadRequestError("missing token", 401));
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
    console.log("verify middleware data" + decoded);
    req.user = decoded;
    next();
  } catch (err) {
    return next(new ValidationError("malformed token", 401));
  }
}

module.exports = { verifyAccessToken };
