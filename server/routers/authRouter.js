const express = require("express");
const router = express.Router();
const authentication = require("../middleware/Authentication");
const authcontrol = require("../controllers/authcontroller");
const set = require("../middleware/image");

router.post(
  "/register",
  authcontrol.register
);

router.post("/login", authcontrol.login);

router.post("/googleLogin", authcontrol.google);

router.post("/refreshToken", authcontrol.refreshToken);

router.get("/auth", authentication, (req, res) => {
  res.send(req.user);
});

router.get("/logout", (req, res) => {
  console.log("Logout");
  res.clearCookie("jwttoken", { path: "/" });
  res.send("Logout Successful");
});

module.exports = router;
