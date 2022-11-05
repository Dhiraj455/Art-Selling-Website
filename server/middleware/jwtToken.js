require("dotenv").config({ path: "env" });
const { sign } = require("jsonwebtoken");

module.exports.createAccessToken = (User) => {
  let secret;
//   if (process.env.NODE_ENV == "prod") secret = process.env.ACCESS_TOKEN_SECRET;
//   if (process.env.NODE_ENV == "test")
//     secret = process.env.ACCESS_TOKEN_TEST_SECRET;
//   if (process.env.NODE_ENV == "dev")
    secret = process.env.ACCESS_TOKEN;

  const token = sign({ userId: User.id }, secret, {
    expiresIn: "15m",
  });
  return token;
};

module.exports.createRefreshToken = (User) => {
  let secret;
//   if (process.env.NODE_ENV == "prod") secret = process.env.REFRESH_TOKEN_SECRET;
//   if (process.env.NODE_ENV == "test")
//     secret = process.env.REFRESH_TOKEN_TEST_SECRET;
//   if (process.env.NODE_ENV == "dev")
    secret = process.env.REFRESH_TOKEN;

  const token = sign({ userId: User._id }, secret, {
    expiresIn: "15d",
  });
  return token;
};