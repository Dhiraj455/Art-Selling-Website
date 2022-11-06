require("dotenv").config({ path: "env" });
const { sign } = require("jsonwebtoken");

module.exports.createAccessToken = (User) => {
  let secret;
  secret = process.env.ACCESS_TOKEN;

  const token = sign({ userId: User.id }, secret, {
    expiresIn: "15m",
  });
  return token;
};

module.exports.createRefreshToken = (User) => {
  let secret;
  secret = process.env.REFRESH_TOKEN;

  const token = sign({ userId: User._id }, secret, {
    expiresIn: "15d",
  });
  return token;
};
