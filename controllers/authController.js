const { validationResult } = require("express-validator");
const User = require("../models/User");
const { hashPassword, comparePassword } = require("../utils/hashPass");
const errorFormatter = require("../utils/validatorErrorFormater");
exports.registerUserController = async (req, res, next) => {
  let errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.mapped(),
    });
  }
  try {
    const { username, email, password } = req.body;

    // Create user
    const user = await User.create({
      username,
      email,
      password: await hashPassword(password),
    });

    return res.status(201).json({
      success: true,
      message: "User Registered Successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    let isPasswordValid = await comparePassword(
      password,
      existingUser.password,
    );
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const user = {
      id: existingUser._id,
      username: existingUser.username,
    };
    req.session.isLoggedIn =true;
    req.session.userId = existingUser._id.toString();
    await req.session.save();
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.getUserProfileController = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  res.status(200).json({
    success: true,
    user: req.user,
  });
};

exports.logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({
        success: false,
      });
    }

    res.clearCookie("connect.sid");

    return res.status(200).json({
      success: true,
      message: "Logged out successfully!",
    });
  });
};