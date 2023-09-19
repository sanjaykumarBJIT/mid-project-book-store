const express = require("express");
const routes = express();
const ReviewController = require("../controller/ReviewController");
const AuthValidator = require("../middleware/auth");
const ReviewValidator = require("../middleware/reviewValidation");

routes.post("/addReview",ReviewValidator.addReviewValidation,AuthValidator.isAuthorized, AuthValidator.isUser, ReviewController.addReview);
routes.post("/getReviewByUser",ReviewValidator.getReviewsbyUserValidation,AuthValidator.isAuthorized, AuthValidator.isUser, ReviewController.getReviewByUser);
routes.post("/getReviewByProduct",ReviewValidator.getReviewsbyProductValidation,ReviewController.getReviewByProduct);
routes.post("/removeReviewByUser",ReviewValidator.removeReviewsValidator,AuthValidator.isAuthorized, AuthValidator.isUser, ReviewController.removeReview);



module.exports = routes;