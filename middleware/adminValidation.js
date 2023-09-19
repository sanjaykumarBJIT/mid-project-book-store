const { failure } = require("../util/common");
const { body, query, param } = require("express-validator");

const userValidators = {
  updateUserDataValidation: [
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

    body("name")
      .exists()
      .withMessage("name not provided")
      .bail()
      .not()
      .equals("")
      .withMessage("name was not provided in the property")
      .bail()
      .isString()
      .withMessage("name should be string"),

    body("access")
      .exists()
      .withMessage("access not provided")
      .bail()
      .not()
      .equals("")
      .withMessage("access was not provided in the property")
      .bail()
      .isString()
      .withMessage("access should be string")
      .bail()
      .custom((value, { req, res }) => {
        if (value === "user") {
          return true;
        } else if (value === "admin") {
          return true;
        } else {
          throw new Error("access should be either user or admin");
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

  editBookDataValidation: [
    body("bookId")
      .exists()
      .withMessage("bookId not provided")
      .bail()
      .not()
      .equals("")
      .withMessage("bookId was not provided in the property")
      .bail()
      .isString()
      .withMessage("bookId should be string"),

    body("genre")
      .optional()
      .not()
      .equals("")
      .withMessage("genre was provided in the property")
      .bail()
      .isArray()
      .withMessage("genre should be array"),

    body("synonyms")
      .optional()
      .not()
      .equals("")
      .withMessage("synonyms was provided in the property")
      .isArray()
      .withMessage("synonyms should be an array"),

    body("demographic")
      .optional()
      .not()
      .equals("")
      .withMessage("demographic was provided in the property")
      .bail()
      .isString()
      .withMessage("demographic should be string")
      .isLength({ min: 4 })
      .withMessage("demographic length can't be less than 4"),

    body("price")
      .optional()
      .not()
      .equals("")
      .withMessage("Price was not provided in the property")
      .custom((value, { req, res }) => {
        // console.log(req.query);
        if (value > 4) {
          return true;
        } else {
          throw new Error("Price must be greater than 4");
        }
      }),

    body("stock")
      .optional()
      .not()
      .equals("")
      .withMessage("stock was not provided in the property")
      .custom((value, { req, res }) => {
        // console.log(req.query);
        if (value > 0) {
          return true;
        } else {
          throw new Error("Stock must be greater than 0");
        }
      }),

    body("author")
      .optional()
      .not()
      .equals("")
      .withMessage("author was provided in the property")
      .bail()
      .isString()
      .withMessage("author should be string"),

    body("releaseDate")
      .optional()
      .not()
      .equals("")
      .withMessage("releaseDate was provided in the property"),
  ],

  addNewBookValidation: [
    body("name")
      .exists()
      .withMessage("name not provided")
      .bail()
      .not()
      .equals("")
      .withMessage("name was not provided in the property")
      .bail()
      .isString()
      .withMessage("name should be string"),

    body("genre")
      .exists()
      .withMessage("genre not provided")
      .not()
      .equals("")
      .withMessage("genre was provided in the property")
      .bail()
      .isArray()
      .withMessage("genre should be array"),

    body("synonyms")
      .exists()
      .withMessage("synonyms not provided")
      .not()
      .equals("")
      .withMessage("synonyms was provided in the property")
      .isArray()
      .withMessage("synonyms should be an array"),

    body("demographic")
      .exists()
      .withMessage("demographic not provided")
      .not()
      .equals("")
      .withMessage("demographic was provided in the property")
      .bail()
      .isString()
      .withMessage("demographic should be string")
      .isLength({ min: 4 })
      .withMessage("demographic length can't be less than 4"),

    body("price")
      .exists()
      .withMessage("price not provided")
      .not()
      .equals("")
      .withMessage("Price was not provided in the property")
      .custom((value, { req, res }) => {
        // console.log(req.query);
        if (value > 4) {
          return true;
        } else {
          throw new Error("Price must be greater than 4");
        }
      }),

    body("stock")
      .exists()
      .withMessage("stock not provided")
      .not()
      .equals("")
      .withMessage("stock was not provided in the property")
      .custom((value, { req, res }) => {
        // console.log(req.query);
        if (value > 0) {
          return true;
        } else {
          throw new Error("Stock must be greater than 0");
        }
      }),

    body("author")
      .exists()
      .withMessage("author not provided")
      .not()
      .equals("")
      .withMessage("author was provided in the property")
      .bail()
      .isString()
      .withMessage("author should be string"),

    body("releaseDate")
      .exists()
      .withMessage("releaseDate not provided")
      .not()
      .equals("")
      .withMessage("releaseDate was provided in the property"),
  ],

  deleteUserDataValidation: [
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

  deleteBookDataValidation: [
    body("bookId")
      .exists()
      .withMessage("bookId not provided")
      .bail()
      .not()
      .equals("")
      .withMessage("bookId was not provided in the property")
      .bail()
      .isString()
      .withMessage("bookId should be string"),
  ],

  addDiscountValidaiton: [
    body("productId")
      .exists()
      .withMessage("productId not provided")
      .bail()
      .not()
      .equals("")
      .withMessage("productId was not provided in the property")
      .bail()
      .isString()
      .withMessage("productId should be string"),

    body("startDate")
      .exists()
      .withMessage("startDate not provided")
      .bail()
      .not()
      .equals("")
      .withMessage("startDate was not provided in the property")
      .bail()
      .isString()
      .withMessage("startDate should be string"),

    body("endDate")
      .exists()
      .withMessage("endDate not provided")
      .bail()
      .not()
      .equals("")
      .withMessage("endDate was not provided in the property")
      .bail()
      .isString()
      .withMessage("endDate should be string"),

      body("city")
      .exists()
      .not()
      .withMessage("city should be provided")
      .equals("")
      .withMessage("city was not provided in the property")
      .bail()
      .isString()
      .withMessage("city should be String")
      .bail()
      .custom((value, { req, res }) => {
        // console.log(req.body);
        if (value === "dhaka" || value === "sylhet" || value === "khulna" || value === "rajshahi") {
          return true;
        } else {
          throw new Error("City should be either dhaka, sylhet, khulna or rajshahi");
        }
    }),

    body("discountAmount")
      .exists()
      .not()
      .withMessage("discountAmount should be provided")
      .equals("")
      .withMessage("discountAmount was not provided in the property")
      .bail()
      .isNumeric()
      .withMessage("discountAmount should be numeric")
      .bail()
      .custom((value, { req, res }) => {
        // console.log(req.body);
        if (value > 0) {
          return true;
        } else {
          throw new Error("discountAmount should be greater than or equal 0");
        }
      }),
  ],
};

module.exports = userValidators;
