const bcrypt = require("bcrypt");

exports.hashPassword = async (password) => {

  const pepperedPassword =password + process.env.PASSWORD_PEPPER;

  const hashedPassword = await bcrypt.hash(
    pepperedPassword,
    12
  );

  return hashedPassword;
};


