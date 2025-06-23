const User = require("../Models/userSchema");
const getProfile = async (req, res) => {
  const userId = req.user.id;
  // Fetch user profile from database using userId
  const userProfile = await User.findById(userId);
  if (!userProfile) {
    return res.status(404).json({ message: "User not found" });
  }
  // Return user profile data in response
  res.status(200).json({ userProfile });
};

const updateProfile = async (req, res) => {
  const userId = req.user.id;
  const { name, email } = req.body;
  // Update user profile in database
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { name, email },
    { new: true }
  );
  if (!updatedUser) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ updatedUser });
};

module.exports = {
  getProfile,
  updateProfile,
};
