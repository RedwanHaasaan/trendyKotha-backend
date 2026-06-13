const { validationResult } = require("express-validator");
const User = require("../models/User");
const { hashPassword, comparePassword } = require("../utils/hashPass");
const errorFormatter = require("../utils/validatorErrorFormater");
const generateToken = require("../utils/generateToken");

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
    const token = generateToken(existingUser._id, existingUser.isProfileCompleted);

    const user = {
      id: existingUser._id,
      username: existingUser.username,
      isProfileCompleted: existingUser.isProfileCompleted,
    };
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

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

exports.logoutUser = (req, res) => {
  res.clearCookie("token");

  res.status(200).json({
    success: true,
    message: "Logout successful",
  });
};

exports.changePasswordController = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Old and new passwords are required",
      });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await comparePassword(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect old password",
      });
    }

    user.password = await hashPassword(newPassword);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Error changing password:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.deleteAccountController = async (req, res) => {
  try {
    const userId = req.user._id;

    // Delete profile associated with the user
    const Profile = require("../models/Profile");
    await Profile.findOneAndDelete({ user: userId });

    // Delete user
    await User.findByIdAndDelete(userId);

    // Clear authentication cookie
    res.clearCookie("token");

    return res.status(200).json({
      success: true,
      message: "Account and associated data deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting account:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
