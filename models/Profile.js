const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    fullname: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    bio: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },
    profilepicture: {
      type: String,
      default: "",
    },
    links: {
      website: {
        type: String,
        default: "",
      },
      twitter: {
        type: String,
        default: "",
      },
      linkedin: {
        type: String,
        default: "",
      },
      github: {
        type: String,
        default: "",
      },
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Profile = model("Profile", userSchema);

module.exports = Profile;
