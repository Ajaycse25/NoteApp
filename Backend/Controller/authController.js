const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../Models/userSchema");
const transporter = require("../util/nodemailer_transporter");
const Otp = require("../Models/otpSchema");
const generateOtp = require("../util/otp_generation");
require("dotenv").config();
const {
  ValidationError,
  BadRequestError,
} = require("../custom-errors/customError");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../util/generateToken");

const signUp = async (req, res, next) => {
  const { name, dob, email, otp } = req.body.formData;
  if (!name || !dob || !email || !otp) {
    return next(
      new ValidationError("missing required fields: name, dob, email, or otp")
    );
  }
  // finding user by email to verify for the OTP
  const existingOtp = await Otp.find({ email, otp });
  if (!existingOtp || existingOtp.length === 0) {
    return next(new BadRequestError("Invalid OTP or email does not match"));
  }
  // Check if user already exists

  const existingUser = await User.find({ email });
  if (existingUser && existingUser.length > 0) {
    return next(new BadRequestError("User already exists with this email"));
  }
  const user = new User({
    name,
    dob,
    email,
  });

  await user.save();
  // Delete the OTP after successful signup
  res.status(201).json({
    success: true,
    message: "User registered successfully",
  });
};

const requestOTP = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return next(new ValidationError("Email is required to request OTP !"));
  }

  // Generate OTP
  const otp = generateOtp();

  // Define email options
  const mailOptions = {
    from: "ajaybhagel1117@gmail.com",
    to: email,
    subject: "Your Otp from Notes App",
    text: `This is a test email sent from Notes App! Your OTP is: ${otp}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error("Error:", error);
    }
  });
  // Store OTP in database (not implemented here)
  const otpData = new Otp({
    email,
    otp,
  });
  // Send OTP to user's email (not implemented here)
  await otpData.save(otpData);

  res.status(200).json({
    success: true,
    message: "OTP sent successfully",
  });
};

const login = async (req, res, next) => {
  const { email, otp } = req.body.formData;
  if (!email || !otp) {
    return next(new ValidationError("Email and OTP are required for login"));
  }
  // Verify OTP
  const existingOtp = await Otp.find({ email, otp });
  if (!existingOtp || existingOtp.length === 0) {
    return next(new BadRequestError("Invalid OTP or email does not match"));
  }
  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    return next(new BadRequestError("User not found with this email"));
  }
  // Generate JWT token
  const refreshToken = await generateRefreshToken(user);
  user.refreshToken = refreshToken;
  await user.save();
  const accessToken = await generateAccessToken(user);

  res
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 20 * 60 * 1000, // 20 min
    });

  return res.status(200).json({
    message: "Login successful",
    userId: user._id,
  });
};

const googleLogin = async (req, res) => {
  try {
    const user = req.user;
    const accessToken = await generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);

    // Save refreshToken in DB
    user.refreshToken = refreshToken;
    await user.save();

    // Set tokens in cookies
    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false, // ✅ set to true in production
        sameSite: "Lax",
        maxAge: 2 * 60 * 1000, // 2 minutes
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false, // ✅ set to true in production
        sameSite: "Lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

    // Redirect without token in URL
    res.redirect("http://localhost:5173/dashboard");
  } catch (err) {
    console.error("Google login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const verify = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json({ message: "Not authenticated" });

  jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Token is not valid" });
    return res.status(200).json({ message: "Authenticated", user: decoded });
  });
};

const logout = async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;
  const accessToken = req.cookies.accessToken;
  if (!refreshToken || !accessToken) {
    return next(new BadRequestError("refresh or access Token is missing", 400));
  }
  const payload = jwt.verify(refreshToken, process.env.SECRET_TOKEN);
  const user = await User.findById(payload.id);
  if (!user || user.refreshToken !== refreshToken) {
    return next(new ValidationError("malformed token", 401));
  }
  user.refreshToken = null;
  await user.save();
  res.clearCookie("refreshToken", { path: "/" });
  res.clearCookie("accessToken", { path: "/" });
  return res.status(200).json({
    message: "logout successfull",
  });
};

const refreshToken = async (req, res, next) => {};

module.exports = {
  signUp,
  requestOTP,
  login,
  googleLogin,
  verify,
  refreshToken,
  logout,
};
