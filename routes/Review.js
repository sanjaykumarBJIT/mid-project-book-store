const express = require("express");
const routes = express();
const ReviewController = require("../controller/ReviewController");
const AuthValidator = require("../middleware/auth");

routes.post("/addReview",AuthValidator.isAuthorized ,ReviewController.addReview);
routes.post("/getReview",ReviewController.getReview);

module.exports = routes;