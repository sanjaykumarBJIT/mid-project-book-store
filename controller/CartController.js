const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const ProductModel = require("../model/Product");
const { success, failure } = require("../util/common");
const CommonCalculations = require("../util/cartCalculations");
const UserModel = require("../model/user");
const CartModel = require("../model/cart");
const DiscountModel = require("../model/Discount");
const logger = require("../util/log");
const transactionModel = require("../model/transaction");
const HTTP_STATUS = require("../constants/statusCodes");
const ReviewModel = require("../model/review");

class CartClass {
  async getCartById(req, res) {
    try {
      const { userId } = req.body;

      const Validation = validationResult(req).array();
      if (Validation.length > 0) {
        return res.status(422).send(failure("Invalid input", Validation));
      }

      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(400).send(failure("User id does not exist"));
      }

      let cart = await CartModel.findOne({ user: userId });

      const productsInCart = cart.products;

      // Calculate the total price of discounted products in the cart
      let totalPrice = 0;

      for (const cartItem of productsInCart) {
        const product = await ProductModel.findById(cartItem.product);

        if (!product) {
          console.log("product not found");
          continue; // Product not found, skip it
        }

        const userCity = await UserModel.findById(userId).select("city");
        const currentTime = new Date();
        let validDiscounts = 0;
        // Find applicable discounts for the product
        validDiscounts = await DiscountModel.find({
          "discounts.city": String(userCity.city), // Replace with the user's city
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
      let returnObject = {};

      if (cart.products.length > 0) {
        returnObject.Products = cart.products;
        returnObject.Total = totalPrice;
        return res
          .status(200)
          .send(success("Successfully got cart products", returnObject));
      } else {
        return res.status(400).send(failure("No Products in the cart"));
      }
    } catch (error) {
      console.error("Error:", error.message);
      const apiRoute = req.originalUrl + " || Status: " + error.message;
      logger.logMessage(apiRoute);
      return res.status(500).send(failure("Server Error"));
    }
  }

  async addToCart(req, res) {
    try {
      const { userId, productid, quantity } = req.body;

      // console.log(quantity);

      const Validation = validationResult(req).array();
      if (Validation.length > 0) {
        return res.status(422).send(failure("Invalid input", Validation));
      }

      const apiRoute =
        req.originalUrl + " || " + "Status: Successfully accessed ";
      logger.logMessage(apiRoute);

      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(400).send(failure("User id does not exist"));
      }

      const product = await ProductModel.findById(productid);
      if (!product) {
        return res.status(400).send(failure("Product id invalid"));
      }

      let cart = await CartModel.findOne({ user: userId });

      if (cart) {
        if (cart.products.length > 0) {
          if (product.stock < quantity + cart.products[0].quantity) {
            return res.status(400).send(failure("Product stock invalid"));
          }
        } else {
          if (product.stock < quantity) {
            return res.status(400).send(failure("Product stock invalid"));
          }
        }
      }

      console.log("cart:::::::::", cart);

      if (!cart) {
        cart = await CartModel.create({
          user: userId,
          products: [
            {
              product: productid,
              quantity: quantity,
            },
          ],
        });
      } else {
        const existingProduct = cart.products.find(
          (item) => String(item.product) === productid
        );

        if (existingProduct) {
          existingProduct.quantity += quantity;
        } else {
          cart.products.push({
            product: productid,
            quantity: quantity,
          });
        }

        // cart.total = cart.total + quantity * product.price;

        await cart.save();
      }

      return res.status(200).send(success("Successfully added to cart", cart));
    } catch (error) {
      console.error("Error:", error);
      const apiRoute = req.originalUrl + " || Status: " + error.message;
      logger.logMessage(apiRoute);
      return res.status(500).send(failure("Server Error"));
    }
  }

  async removeFromCart(req, res) {
    try {
      const { userId, productid, quantity } = req.body;

      const Validation = validationResult(req).array();
      if (Validation.length > 0) {
        return res.status(422).send(failure("Invalid input", Validation));
      }

      const apiRoute =
        req.originalUrl + " || " + "Status: Successfully accessed ";
      logger.logMessage(apiRoute);

      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(400).send(failure("User id does not exist"));
      }

      const product = await ProductModel.findById(productid);
      if (!product) {
        return res.status(400).send(failure("Product id invalid"));
      }

      const cart = await CartModel.findOne({ user: userId });

      if (cart) {
        if (cart.products.length > 0) {
          if (product.stock < quantity + cart.products[0].quantity) {
            return res.status(400).send(failure("Product stock invalid"));
          }
        } else {
          if (product.stock < quantity) {
            return res.status(400).send(failure("Product stock invalid"));
          }
        }
      }

      if (!cart || cart.products.length < 1) {
        return res
          .status(400)
          .send(
            failure(
              "User does not have a cart Or Does not have any product in the cart"
            )
          );
      }

      const cartProductIndex = cart.products.findIndex(
        (item) => String(item.product) === productid
      );
      if (cartProductIndex === -1) {
        return res.status(400).send(failure("Product is not in the cart"));
      }

      const cartProduct = cart.products[cartProductIndex];

      console.log(cartProduct);
      if (cartProduct.quantity > quantity) {
        cartProduct.quantity -= quantity;
      } else {
        cart.products.splice(cartProductIndex, 1);
      }

      const totalPrice = await CommonCalculations.calculateTotalPrice(userId);
      let returnObject = {};

      returnObject.Products = cart;
      returnObject.Total = totalPrice;

      await cart.save();

      return res
        .status(200)
        .send(success("Successfully removed from cart", returnObject));
    } catch (error) {
      console.error("Error:", error);
      const apiRoute = req.originalUrl + " || Status: " + error.message;
      logger.logMessage(apiRoute);
      return res.status(500).send(failure("Server Error"));
    }
  }

  async checkOut(req, res) {
    try {
      const { userId } = req.body;

      const Validation = validationResult(req).array();
      if (Validation.length > 0) {
        return res.status(422).send(failure("Invalid input", Validation));
      }

      const apiRoute =
        req.originalUrl + " || " + "Status: Successfully accessed ";
      logger.logMessage(apiRoute);

      const user = await UserModel.findById(userId);
      // console.log("USER:::::::::::::::::",user.balance);
      if (!user) {
        return res.status(400).send(failure("User id does not exist"));
      }

      const cart = await CartModel.findOne({ user: userId });

      const userCity = await UserModel.findById(userId).select("city");
      console.log(userCity.city);

      const currentTime = new Date();
      let validDiscounts = 0;

      if (!cart) {
        return res.status(400).send(failure("User does not have a cart"));
      }

      // Fetch all products in the cart and calculate the total price
      const productsInCart = cart.products;

      // Calculate the total price of discounted products in the cart
      let totalPrice = 0;

      for (const cartItem of productsInCart) {
        const product = await ProductModel.findById(cartItem.product);

        if (!product) {
          console.log("product not found");
          continue; // Product not found, skip it
        }

        // Find applicable discounts for the product
        validDiscounts = await DiscountModel.find({
          "discounts.city": String(userCity.city), // Replace with the user's city
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

      // Create a transaction record
      const transaction = new transactionModel({
        user: userId,
        products: productsInCart,
        total: totalPrice,
      });

      await transaction.save();

      user.balance = user.balance - totalPrice;
      cart.products = [];
      // cart.total = 0;
      await cart.save();
      await user.save();

      return res
        .status(200)
        .send(
          success(
            "Checked Out Successfully, New transaction created.",
            transaction
          )
        );
    } catch (error) {
      console.error("Error:", error);
      const apiRoute = req.originalUrl + " || Status: " + error;
      logger.logMessage(apiRoute);
      return res.status(500).send(failure("Server Error"));
    }
  }
}

module.exports = new CartClass();
