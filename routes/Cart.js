const express = require("express");
const routes = express();
const CartController = require("../controller/CartController");

routes.post("/addToCart",CartController.addToCart);
routes.post("/removeFromCart",CartController.removeFromCart);
routes.post("/checkOut",CartController.checkOut);

module.exports = routes;