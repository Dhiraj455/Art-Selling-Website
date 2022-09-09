const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const set = require("../middleware/image");

router.post(
  "/update",
  set.setDestination("./public/images/UserPic/"),
  set.upload.single("pic"),
  userController.update
);

module.exports = router;
