const express = require("express");
const routes = express();
const UserController = require("../controller/UserController");
const transactionController = require("../controller/TransactionController");
const AuthValidator = require("../middleware/auth");
const UserValidator = require("../middleware/userValidation");

routes.post("/addFund",UserValidator.addFundValidation, AuthValidator.isAuthorized, AuthValidator.isUser, UserController.addFund);
routes.post("/viewTransactionsById",UserValidator.viewTransactionsByIdValidator, AuthValidator.isAuthorized,AuthValidator.isUser, transactionController.getAllTransactionByUser);

module.exports = routes;