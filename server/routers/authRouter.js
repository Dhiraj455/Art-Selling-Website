const express = require("express");
const router = express.Router();
const authentication = require("../middleware/Authentication");
const authcontrol = require("../controllers/authcontroller");

router.post("/register",authcontrol.register);
router.post("/login",authcontrol.login);

router.get("/auth",authentication, (req, res) => {
  console.log("Authorization");
  res.send(req.user);
});

router.get("/logout", (req, res) => {
  console.log("Logout");
  res.clearCookie("jwttoken",{path:"/"});
  res.send("Logout Successful");
});

module.exports = router;
