const bcrypt = require("bcrypt");

exports.hashPassword = async (password) => {

  const pepperedPassword =password + process.env.PASSWORD_PEPPER;

  const hashedPassword = await bcrypt.hash(
    pepperedPassword,
    12
  );

  return hashedPassword;
};

exports.comparePassword = async (
  plainPassword,
  hashedPassword
) => {

  const pepperedPassword =
    plainPassword + process.env.PASSWORD_PEPPER;

  return await bcrypt.compare(
    pepperedPassword,
    hashedPassword
  );
};


