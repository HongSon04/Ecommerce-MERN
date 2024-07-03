const { Schema, model } = require("mongoose");
const ReviewSchema = new Schema(
  {
    productId: {
      type: Schema.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    review: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ReviewModel = model("reviews", ReviewSchema);

module.exports = ReviewModel;
