const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const ProductModel = require("../model/Product");
const { success, failure } = require("../util/common");
const UserModel = require("../model/user");
const CartModel = require("../model/cart");
const DiscountModel = require("../model/Discount");
const logger = require("../util/log");
const transactionModel = require("../model/transaction");
const HTTP_STATUS = require("../constants/statusCodes");
const ReviewModel = require("../model/review");

class CommonCalculations{
    async calculateTotalPrice(userId) {
        try {
          const cart = await CartModel.findOne({ user: userId });
          const productsInCart = cart.products;
          let totalPrice = 0;
      
          for (const cartItem of productsInCart) {
            const product = await ProductModel.findById(cartItem.product);
      
            if (!product) {
              console.log("product not found");
              continue; // Product not found, skip it
            }
      
            const user = await UserModel.findById(userId);
            const userCity = user.city; // Assuming user has a 'city' property
            const currentTime = new Date();
      
            // Find applicable discounts for the product
            const validDiscounts = await DiscountModel.find({
              "discounts.city": userCity, // Replace with the user's city
              "discounts.startTime": { $lte: currentTime },
              "discounts.endTime": { $gte: currentTime },
              productId: product._id,
            });
      
            if (validDiscounts.length > 0) {
              const discountAmount = validDiscounts[0].discounts[0].discountAmount;
              const discountedPrice =
                product.price - (product.price * discountAmount) / 100;
              totalPrice += discountedPrice * cartItem.quantity;
            } else {
              totalPrice += product.price * cartItem.quantity;
            }
          }
      
          return totalPrice;
        } catch (error) {
          console.error("Error calculating total price:", error);
          throw error;
        }
      }
}

module.exports = new CommonCalculations();

