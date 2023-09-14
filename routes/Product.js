const express = require("express");
const routes = express();
const validator = require("../middleware/validation");
const ProductController = require("../controller/ProductController");
const transactionController = require("../controller/TransactionController");
const AuthValidator = require("../middleware/auth");
const FilterValidator = require("../middleware/filterValidation");
// const updateValidation = require("../middleware/validation");

routes.get("/getAll", ProductController.getAll);
// routes.get("/filterProductsAdvanced", FilterValidator.filterValidation, ProductController.filterProducts);
// routes.get("/getByID", ProductController.getOneById);
// routes.post("/create",AuthValidator.isAuthorized , validator.createProductValidation, ProductController.create);


// routes.delete("/deleteById", ProductController.deleteById);
// routes.put("/updateById", validator.updateValidation, ProductController.updateById);

routes.get("/getAllTransaction", transactionController.getAllTransaction);
routes.post("/create", validator.createTransactionValidation, transactionController.createTransaction);


module.exports = routes;