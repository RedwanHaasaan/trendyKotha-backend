const jwt = require("jsonwebtoken");

const generateToken = (userId,isProfileCompleted) => {
  return jwt.sign(
    { id: userId, isProfileCompleted: isProfileCompleted },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

module.exports = generateToken;