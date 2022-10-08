const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { upload, setDestination } = require("../middleware/image");

router.post(
  "/update",
  setDestination("./public/images/UserPic/"),
  upload.single("pic"),
  userController.update
);

router.get(
  "/profile/:id",
  userController.getProfile
);

module.exports = router;
