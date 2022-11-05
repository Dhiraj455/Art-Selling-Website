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

router.post(
    "/isAccepted",
    authentication,
    Controller.isAccepted
)

router.get(
    "/getDeliveredTrack",
    authentication,
    Controller.getDeliveredTrack,
)

router.post(
    "/isDelivered",
    authentication,
    Controller.isDelivered
)

router.post(
    "/isNotDelivered",
    authentication,
    Controller.isNotDelivered
)

module.exports = router;
