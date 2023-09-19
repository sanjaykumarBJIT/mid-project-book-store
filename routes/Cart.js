const express = require("express");
const routes = express();
const cartValidator = require("../middleware/cartValidation");
const CartController = require("../controller/CartController");
const AuthValidator = require("../middleware/auth");

routes.get("/getCartById",cartValidator.getCartValidation,AuthValidator.isAuthorized,AuthValidator.isUser,CartController.getCartById);
routes.post("/addToCart",cartValidator.cartValidation,AuthValidator.isAuthorized,AuthValidator.isUser,CartController.addToCart);
routes.post("/removeFromCart",cartValidator.cartValidation,AuthValidator.isAuthorized,AuthValidator.isUser,CartController.removeFromCart);
routes.post("/checkOut",cartValidator.getCartValidation,AuthValidator.isAuthorized,AuthValidator.isUser,CartController.checkOut);

module.exports = routes;