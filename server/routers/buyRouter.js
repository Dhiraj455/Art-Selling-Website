const express = require("express");
const router = express.Router();
const Controller = require("../controllers/buyController")

router.post(
    "/addtocart",
    Controller.addToCart
);

router.get(
    "/mycart/:id",
    Controller.getMyCart,
);

module.exports = router;