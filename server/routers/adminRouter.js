const express = require("express");
const router = express.Router();
const authentication = require("../middleware/Authentication");
const AdminController = require("../controllers/adminController");

router.get("/users", AdminController.getAllUsers);
router.get("/someUsers", AdminController.getSomeUsers);
router.post("/suspend", AdminController.suspend);

module.exports = router;