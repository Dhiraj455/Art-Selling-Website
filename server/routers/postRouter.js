const express = require("express");
const router = express.Router();
const { upload, setDestination } = require("../middleware/image");
const postController = require("../controllers/postController");

router.post(
  "/postArt",
  setDestination("./public/images/Posts/"),
  upload.single("post"),
  postController.postArt
);

module.exports = router;
