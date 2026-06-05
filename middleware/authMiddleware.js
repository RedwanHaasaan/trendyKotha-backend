const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

exports.isGuest = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return next();
    }

    jwt.verify(token, process.env.JWT_SECRET);

    return res.status(400).json({
      success: false,
      message: "Already logged in",
    });
  } catch {
    next();
  }
};
