const express = require("express");
const routes = express();
const AuthValidator = require("../middleware/auth");
const AdminValidator = require("../middleware/adminValidation");
const AdminController = require("../controller/AdminController");

routes.get("/getAllUser", AuthValidator.isAuthorized, AuthValidator.isAdmin, AdminController.getAllUsers);
routes.patch("/updateUserData",AdminValidator.updateUserDataValidation, AuthValidator.isAuthorized, AuthValidator.isAdmin, AdminController.updateUserData);
routes.delete("/deleteUserData", AdminValidator.deleteUserDataValidation, AuthValidator.isAuthorized, AuthValidator.isAdmin, AdminController.deleteUserData);
routes.patch("/editBookData",AdminValidator.editBookDataValidation, AuthValidator.isAuthorized, AuthValidator.isAdmin, AdminController.editBookData);
routes.post("/addNewBook", AdminValidator.addNewBookValidation, AuthValidator.isAuthorized, AuthValidator.isAdmin, AdminController.addNewBook);
routes.post("/addDiscount", AdminValidator.addDiscountValidaiton, AuthValidator.isAuthorized, AuthValidator.isAdmin, AdminController.addDiscount);
routes.delete("/deleteBookData", AdminValidator.deleteBookDataValidation, AuthValidator.isAuthorized, AuthValidator.isAdmin, AdminController.deleteBookData);

module.exports = routes;