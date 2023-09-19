const { failure } = require("../util/common");
const { body, query, param } = require("express-validator");

const userValidators = {
  addFundValidation: [
    body("userId")
      .exists()
      .withMessage("userId not provided")
      .bail()
      .not()
      .equals("")
      .withMessage("userId was not provided in the property")
      .bail()
      .isString()
      .withMessage("userId should be string"),

    body("amount")
      .exists()
      .withMessage("amount not provided")
      .bail()
      .notEmpty()
      .withMessage("amount was not provided in the property")
      .bail()
      .isNumeric()
      .withMessage("amount should be Number")
      .custom((value, { req, res }) => {
        if (value > 10) {
          return true;
        } else {
          throw new Error("amount should be greater than 10");
        }
      }),
  ],

  viewTransactionsByIdValidator: [
    body("userId")
      .exists()
      .withMessage("userId not provided")
      .bail()
      .not()
      .equals("")
      .withMessage("userId was not provided in the property")
      .bail()
      .isString()
      .withMessage("userId should be string"),
  ],
};

module.exports = userValidators;
