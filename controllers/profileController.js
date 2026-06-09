const Profile = require("../models/Profile");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const uploadImage = require("../utils/uploadImage");

exports.getUserProfileController = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

exports.createProfileController = async (req, res) => {
  try {
    const existingProfile = await Profile.findOne({
      user: req.user._id,
    });

    if (existingProfile) {
      return res.status(400).json({
        success: false,
        message: "Profile already exists",
      });
    }
    let imageUrl = "";
    if (req.file) {
      const image = await uploadImage(req.file.buffer);
      imageUrl = image.secure_url;
    }
    const profile = await Profile.create({
      user: req.user._id,
      fullname: req.body.fullName,
      bio: req.body.bio,
      profilepicture: imageUrl,
      links: {
        website: req.body.website,
        twitter: req.body.twitter,
        linkedin: req.body.linkedin,
        github: req.body.github,
      },
    });
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        isProfileCompleted: true,
      },
      {
        new: true,
      },
    );
    const token = generateToken(
      updatedUser._id,
      updatedUser.isProfileCompleted,
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(201).json({
      success: true,
      profile,
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
