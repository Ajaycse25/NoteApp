const express = require("express");
const {
  getProfile,
  updateProfile,
} = require("../Controller/profileController");
const { verifyAccessToken } = require("../Middlewares/verifyAccessToken");
const profileRouter = express.Router();
// Route to get user profile
profileRouter.get("/profile", verifyAccessToken, getProfile);
// Route to update user profile
profileRouter.put("/profile", verifyAccessToken, updateProfile);
module.exports = profileRouter;
