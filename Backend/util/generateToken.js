const jwt = require("jsonwebtoken");
const generateAccessToken = async ({_id, email, name}) => {
  try {
    // Create payload with user information
    const payload = {
      id: _id,
      email: email,
      name: name,
    };

    // Generate access token with a validity of 1 hour
    const accessToken = await jwt.sign(payload, process.env.SECRET_TOKEN);
    return accessToken;
  } catch (error) {
    console.error("Error generating access token:", error);
    throw new Error("Could not generate access token");
  }
};

const generateRefreshToken = async ({_id, email}) => {
  const payload = {
    id: _id,
    email: email,
  };

  try {
    // Generate refresh token with a validity of 7 days
    const refreshToken = await jwt.sign(payload, process.env.SECRET_TOKEN, {
      expiresIn: "7d",
    });

    return refreshToken;
  } catch (error) {
    console.error("Error generating refresh token:", error);
    throw new Error("Could not generate refresh token");
  }
};

module.exports = { generateAccessToken, generateRefreshToken };
