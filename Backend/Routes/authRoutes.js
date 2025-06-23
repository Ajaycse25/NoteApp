const express = require("express");
const passport = require("passport");
const {
  signUp,
  requestOTP,
  login,
  googleLogin,
  verify,
  logout,
} = require("../Controller/authController");

const router = express.Router();
router.post("/signup", signUp);
router.post("/login", login);
router.post("/request-otp", requestOTP);
router.get("/verify", verify);
router.post("/logout", logout);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback after Google login
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleLogin
);

module.exports = router;
