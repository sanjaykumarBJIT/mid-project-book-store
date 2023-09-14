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

class Review {
  async addReview(req, res) {
    try {
      const { reviewMessage, reviewStars, userId, productId } = req.body;
      let totalStars, average;
  
      console.log(reviewMessage, reviewStars, userId, productId);
  
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(400).send(failure("User id does not exist"));
      }
  
      const product = await ProductModel.findById(productId);
      if (!product) {
        return res.status(400).send(failure("Product id invalid"));
      }
  
      let existingReview = await ReviewModel.findOne({ productId: productId });
      console.log("existing review::::", existingReview);
  
      if (!existingReview) {
        existingReview = await ReviewModel.create({
          reviews: [
            {
              reviewMessage: reviewMessage,
              reviewStars: reviewStars,
              userId: userId,
            },
          ],
          productId: productId,
          averageRating: reviewStars, // Initialize averageRating
        });
      } else {
        const reviewIndex = existingReview.reviews.findIndex((item) => {
          return String(item.userId) === userId;
        });
        if (reviewIndex >= 0) {
          totalStars = existingReview.reviews.reduce(
            (acc, review) => acc + review.reviewStars,
            0
          );
          console.log("aaaaaaaaaa", totalStars);
          average = (totalStars+reviewStars) / existingReview.reviews.length; // Calculate average
  
          existingReview.reviews[reviewIndex].reviewMessage = reviewMessage;
          existingReview.averageRating = average;
  
          console.log("existing review 2::::");
          await existingReview.save();
        }
        return res
          .status(200)
          .send(success("Successfully edited to Reviews.............", existingReview));
      }
  
      await existingReview.save();
  
      return res
        .status(200)
        .send(success("Successfully added to Reviews", existingReview));
    } catch (error) {
      console.error(error);
      return res.status(500).send(failure("Internal Server Error"));
    }
  }
  

  async getReview(req, res) {
    const { userId, productId } = req.body;

    console.log(userId, productId);
    if (userId) {
      const reviewsByUser = await ReviewModel.find({ "reviews.userId": userId })
        .populate("reviews.userId", "name email")
        .populate("productId", "name price");
      let filteredReviews = [];

      if (reviewsByUser.length > 0) {
        console.log("Products with userId:", userId);
        reviewsByUser.forEach((products) => {
          const tempReviews = products.reviews.filter((review) =>
            review.userId.equals(userId)
          );
          filteredReviews.push({ tempReviews, productId: products.productId });
          console.log("Filtered Reviews:", filteredReviews);
        });
        return res
          .status(200)
          .send(
            success(
              "Successfully retrieved all product Reviews by userId",
              filteredReviews
            )
          );
      } else {
        console.log("No products found for userId:", userId);
        return res
          .status(400)
          .send(failure(`No product Reviews found for userId: '${userId}'`));
      }
    } else if (productId) {
      const reviewsByProducts = await ReviewModel.findOne({ productId });

      if (reviewsByProducts) {
        return res
          .status(200)
          .send(
            success(
              "Successfully retrieved all product Reviews",
              reviewsByProducts.reviews
            )
          );
      } else {
        return res.status(400).send(failure("No product Reviews found"));
      }
    }
  }
}

module.exports = new Review();
