const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        },
        products: {
            type:[
                {
                    product: {
                        type: mongoose.Types.ObjectId,
                        ref:"books",
                        required: true,
                    },
                quantity: Number,
                _id: false,
                },
            ]
        },
    }
)

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;