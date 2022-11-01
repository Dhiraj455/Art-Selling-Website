const express = require("express");
const router = express.Router();
const Controller = require("../controllers/buyController");
const authentication = require("../middleware/Authentication");

router.post("/addtocart", Controller.addToCart);

router.get("/mycart/:id", Controller.getMyCart);

router.delete("/deleteItem", Controller.deleteItem);

router.post("/buyCart", Controller.buyCart);

router.post("/updateCart", Controller.updateCart);

router.get(
    "/getTrack",
    authentication,
    Controller.getTrack
)

module.exports = router;
