const { Schema, model } = require("mongoose");
const WithdrawRequestSchema = new Schema(
  {
    sellerId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const WithdrawRequestModel = model("withdraw_requests", WithdrawRequestSchema);

module.exports = WithdrawRequestModel;
