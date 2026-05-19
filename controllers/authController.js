const User = require("../models/User");
const { hashPassword, comparePassword } = require("../utils/hashPass");

exports.registerUserController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    // Create user
    const user = await User.create({
      name,
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
    const user = existingUser.toObject();
    delete user.password;
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
