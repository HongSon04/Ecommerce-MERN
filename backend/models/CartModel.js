const { Schema, model } = require("mongoose");
const CartSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    productId: {
      type: Schema.ObjectId,
      required: true,
    },
    quantity: {
      required: true,
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const CartModel = model("carts", CartSchema);

module.exports = CartModel;
