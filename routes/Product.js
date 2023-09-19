const express = require("express");
const routes = express();
const validator = require("../middleware/validation");
const ProductController = require("../controller/ProductController");
const transactionController = require("../controller/TransactionController");
const AuthValidator = require("../middleware/auth");
const cartValidator = require("../middleware/cartValidation");
const FilterValidator = require("../middleware/filterValidation");


routes.get("/getAllwithDiscount",FilterValidator.getAllValidation, ProductController.getAllwithDiscount);
routes.get("/filterProducts", FilterValidator.filterValidation, ProductController.filterProducts);
routes.get("/viewTransactionsByAdmin", AuthValidator.isAuthorized,AuthValidator.isAdmin, transactionController.getAllTransactionByAdmin);


module.exports = routes;