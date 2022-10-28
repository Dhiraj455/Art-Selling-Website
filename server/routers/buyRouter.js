const express = require("express");
const router = express.Router();
const Controller = require("../controllers/buyController");

router.post("/addtocart", Controller.addToCart);

router.get("/mycart/:id", Controller.getMyCart);

router.delete("/deleteItem", Controller.deleteItem);

router.post("/buyCart", Controller.buyCart);

router.put("/updateCart", Controller.updateCart);

module.exports = router;
