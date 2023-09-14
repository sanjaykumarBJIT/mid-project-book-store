const { failure } = require("../util/common");
const { body, query, param } = require("express-validator");

const filterValidator = {
  filterValidation: [
    query("page")
      .optional()
      .isNumeric()
      .withMessage("page should be numeric")
      .bail()
      .not()
      .equals("")
      .withMessage("page was not provided in the property")
      .custom((value, { req, res }) => {
        console.log(req.query);
        if (value && req.query.limit) {
          return true;
        } else {
          throw new Error("if page exists then limit must also exist");
        }
      }),

    query("limit")
      .optional()
      .not()
      .equals("")
      .withMessage("limit was provided in the property")
      .custom((value, { req, res }) => {
        console.log(req.query);
        if (value && req.query.page) {
          return true;
        } else {
          throw new Error("if limit exists then page must also exist");
        }
      }),

    query("price")
      .optional()
      .not()
      .equals("")
      .withMessage("Price was not provided in the property")
      .custom((value, { req, res }) => {
        // console.log(req.query);
        if (value && req.query.priceFill) {
          return true;
        } else {
          throw new Error("if price exists then priceFill must also exist");
        }
      }),

    query("priceFill")
      .optional()
      .not()
      .equals("")
      .withMessage("priceFill was provided in the property")
      .custom((value, { req, res }) => {
        // console.log(req.query);
        if (value && req.query.price) {
          return true;
        } else {
          throw new Error("if priceFill exists then price must also exist");
        }
      }),

      query("stock")
      .optional()
      .not()
      .equals("")
      .withMessage("stock was not provided in the property")
      .custom((value, { req, res }) => {
        // console.log(req.query);
        if (value && req.query.stockFill) {
          return true;
        } else {
          throw new Error("if stock exists then stockFill must also exist");
        }
      }),

    query("stockFill")
      .optional()
      .not()
      .equals("")
      .withMessage("stockFill was provided in the property")
      .custom((value, { req, res }) => {
        // console.log(req.query);
        if (value && req.query.stock) {
          return true;
        } else {
          throw new Error("if stockFill exists then stock must also exist");
        }
      }),


    query("releaseDate")
      .optional()
      .not()
      .equals("")
      .withMessage("releaseDate was provided in the property")
      .custom((value, { req, res }) => {
        // console.log(req.query);
        if (value && req.query.releaseDateFill) {
          return true;
        } else {
          throw new Error(
            "if releaseDate exists then releaseDateFill must also exist"
          );
        }
      }),

    query("releaseDateFill")
      .optional()
      .not()
      .equals("")
      .withMessage("releaseDateFill was provided in the property")
      .custom((value, { req, res }) => {
        // console.log(req.query);
        if (value && req.query.releaseDateFill) {
          return true;
        } else {
          throw new Error(
            "if releaseDateFill exists then releaseDate must also exist"
          );
        }
      }),

    query("sortOrder")
      .optional()
      .not()
      .equals("")
      .withMessage("sortOrder was provided in the property")
      .custom((value, { req, res }) => {
        console.log(req.query);
        if (value && req.query.sortParams) {
          return true;
        } else {
          throw new Error(
            "if sortOrder exists then sortParams must also exist"
          );
        }
      }),

    query("sortParams")
      .optional()
      .isString()
      .withMessage("sortParams should be string")
      .bail()
      .not()
      .equals("")
      .withMessage("page was not provided in the property")
      .custom((value, { req, res }) => {
        console.log(req.query);
        if (value && req.query.sortOrder) {
          return true;
        } else {
          throw new Error(
            "if sortParams exists then sortOrder must also exist"
          );
        }
      }),

    query("search")
      .optional()
      .isString()
      .withMessage("search should be string")
      .not()
      .equals("")
      .withMessage("search was provided in the property"),

    query("authorNames")
      .optional()
      .isString()
      .withMessage("search should be string")
      .not()
      .equals("")
      .withMessage("search was provided in the property"),
  ],
};

module.exports = filterValidator;
