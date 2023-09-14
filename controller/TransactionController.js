const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const ProductModel = require("../model/Product");
const { success, failure } = require("../util/common");
const transactionModel = require("../model/transaction");
const cartModel = require("../model/cart");
const productModel = require("../model/Product");
const User = require("../model/user");

class TransactionProduct {
  async getAllTransaction(req, res) {
    try {
      let transactionResult = await transactionModel
        .find({})
        .populate("user", "-access")
        .populate("products.id", "-stock");
        let totalvalueList = [];
        // console.log(transactionResult.User._id);
      if (transactionResult.length > 0) {
        let totalValue = 0;

        for (const transaction of transactionResult) {
          for (const product of transaction.products) {
            const foundProduct = await productModel.findById(product.id);
            console.log(product.id);
            if (foundProduct) {
              totalValue = totalValue + foundProduct.price * product.quantity;
            }
          }
        //   console.log(transaction.user._id);
          totalvalueList.push({"User ID": transaction.user.name, "Total order amount ": totalValue });
          totalValue = 0;
        }

        transactionResult.push(totalvalueList);

        return res
          .status(200)
          .send(
            success("Successfully received all transactions", transactionResult)
          );
      } else {
        return res.status(400).send(success("Didn't received all products"));
      }
    } catch (error) {
      console.log("Found: " + error);
    }
  }

  async createTransaction(req, res) {
    try {
      const { user, products } = req.body;

      const productId = products.map((ele) => ele.id);

      const isValidProductIds = products.every((ele) =>
        mongoose.Types.ObjectId.isValid(ele.id)
      );

      let productsData;
      if (!isValidProductIds) {
        console.log("One or more product IDs are invalid.");
      } else {
        productsData = await ProductModel.find({
          _id: { $in: productId },
        });

        console.log("Products Data:", productsData);
      }

      const total = 0;
      // console.log(".....................", gg);
      if (productsData) {
        const newTransactions = await transactionModel.create({
          user,
          products,
          total,
        });
        // console.log(newTransactions);

        if (newTransactions) {
          return res
            .status(200)
            .send(success("Successfully created new transaction"));
        }
      } else {
        return res.status(400).send(success("Product id invalid"));
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send(failure("internal server error"));
    }
  }
}

module.exports = new TransactionProduct();
