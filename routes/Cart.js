const express = require("express");
const routes = express();
const cartValidator = require("../middleware/cartValidation");
const CartController = require("../controller/CartController");

routes.get("/getCartById",cartValidator.getCartValidation,CartController.getCartById);
routes.post("/addToCart",cartValidator.cartValidation,CartController.addToCart);
routes.post("/removeFromCart",cartValidator.cartValidation,CartController.removeFromCart);
routes.post("/checkOut",CartController.checkOut);

module.exports = routes;