const { Schema, model } = require("mongoose");

const SellerWalletSchema = new Schema(
  {
    sellerId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    month: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SellerWalletModel = model("seller_wallets", SellerWalletSchema);

module.exports = SellerWalletModel;
