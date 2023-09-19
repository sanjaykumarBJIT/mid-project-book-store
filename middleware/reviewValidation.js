const { failure } = require("../util/common");
const { body, query, param } = require("express-validator");

const reviewValidator = {
  addReviewValidation: [
    body("reviewMessage")
      .exists()
      .withMessage("reviewMessage should be provided")
      .bail()
      .not()
      .equals("")
      .withMessage("reviewMessage value not was provided in the property")
      .bail()
      .isString()
      .withMessage("reviewMessage should be string")
      .bail()
      .isLength({min:5})
      .withMessage("reviewMessage length should be minimum 5"),

    body("reviewStars")
    .exists()
      .not()
      .withMessage("reviewStars should be provided")
      .equals("")
      .withMessage("reviewStars was not provided in the property")
      .bail()
      .isNumeric()
      .withMessage("reviewStars should be numeric")
      .bail()
      .custom((value, { req, res }) => {
        // console.log(req.body);
        if (value>0) {
          return true;
        } else {
          throw new Error("reviewStars should be greater than or equal 0");
        }
      }),

      body("userId")
      .exists()
      .withMessage("userId should be provided")
      .bail()
      .not()
      .equals("")
      .withMessage("userId value not was provided in the property")
      .bail()
      .isString()
      .withMessage("userId should be string"),

      body("productId")
      .exists()
      .withMessage("userId should be provided")
      .bail()
      .not()
      .equals("")
      .withMessage("userId value not was provided in the property")
      .bail()
      .isString()
      .withMessage("userId should be string"),
    
  ],

  getReviewsbyProductValidation: [
    body("productId")
      .exists()
      .withMessage("productId should be provided")
      .bail()
      .not()
      .equals("")
      .withMessage("productId value not was provided in the property")
      .bail()
      .isString()
      .withMessage("productId should be string"),
  ],

  getReviewsbyUserValidation: [
    body("userId")
      .exists()
      .withMessage("userId should be provided")
      .bail()
      .not()
      .equals("")
      .withMessage("userId value not was provided in the property")
      .bail()
      .isString()
      .withMessage("userId should be string"),
  ],

  removeReviewsValidator: [
    body("userId")
      .exists()
      .withMessage("userId should be provided")
      .bail()
      .not()
      .equals("")
      .withMessage("userId value not was provided in the property")
      .bail()
      .isString()
      .withMessage("userId should be string"),

      body("productId")
      .exists()
      .withMessage("productId should be provided")
      .bail()
      .not()
      .equals("")
      .withMessage("productId value not was provided in the property")
      .bail()
      .isString()
      .withMessage("productId should be string"),
  ],
};

module.exports = reviewValidator;