const streamifier = require("streamifier");
const cloudinary = require("../config/cloudinary");

const uploadImage = (buffer) => {

  return new Promise((resolve, reject) => {

    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "blog-app/profiles",
      },
      (error, result) => {

        if (error) reject(error);

        resolve(result);
      }
    );

    streamifier
      .createReadStream(buffer)
      .pipe(stream);
  });
};

module.exports = uploadImage;