const express = require("express");
const router = express.Router();
const authentication = require("../middleware/Authentication");
const { upload, setDestination } = require("../middleware/image");
const postController = require("../controllers/postController");

router.post(
  "/postArt",
  setDestination("./public/images/Posts/"),
  upload.single("post"),
  postController.postArt
);

router.get("/getPosts", postController.getPosts);

router.get("/getSomePosts", postController.getSomePosts);

router.get("/getUsersPosts/:id", postController.getUsersPosts);

router.delete("/deletePost", postController.deletePost);

router.put(
  "/updatePost",
  setDestination("./public/images/Posts/"),
  upload.single("pic"),
  postController.updatePost
);

router.get(
  "/getMyPosts",
  authentication,
  postController.getMyPosts,
)

router.get(
  "/getBoughtItems",
  authentication,
  postController.getBoughtItems,
)

router.get("/getAPost/:id", postController.getAPost);

module.exports = router;
