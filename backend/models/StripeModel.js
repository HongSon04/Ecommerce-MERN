const { Schema, model } = require("mongoose");
const StripeSchema = new Schema(
  {
    sellerId: {
      type: Schema.ObjectId,
      required: true,
    },
    stripeId: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const StripeModel = model("stripes", StripeSchema);

module.exports = StripeModel;
