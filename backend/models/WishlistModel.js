const { Schema, model } = require("mongoose");
const WishlistSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    productId: {
      type: Schema.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      required: true,
      type: Number,
    },
    image: {
      type: String,
      required: true,
    },
    discount: {
      required: true,
      type: Number,
    },
    rating: {
      required: true,
      type: Number,
    },
    slug: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const WishlistModel = model("wishlists", WishlistSchema);

module.exports = WishlistModel;
