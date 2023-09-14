const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const ProductModel = require("../model/Product");
const { success, failure } = require("../util/common");
const UserModel = require("../model/user");
const CartModel = require("../model/cart");
const transactionModel = require("../model/transaction");
const HTTP_STATUS = require("../constants/statusCodes");
const Cart = require("../model/cart");
const ReviewModel = require("../model/review");

class Product {

  async getAll(req, res) {
    try {
      // const products = await ProductModel.getAll();
      const allProducts = await ProductModel.find({});
      if (allProducts.length > 0) {
        return res
          .status(HTTP_STATUS.OK)
          .send(success("Successfully received all products", allProducts));
      }
      return res.status(HTTP_STATUS.NOT_FOUND).send(success("No Products found"));
    } catch (error) {
      console.log(error);
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(failure("Internal server error"));
    }
  }

}

module.exports = new Product();
