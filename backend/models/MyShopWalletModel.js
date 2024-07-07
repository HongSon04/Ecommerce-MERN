const { Schema, model } = require("mongoose");

const MyShopWalletSchema = new Schema(
  {
    ammount: {
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

const MyShopWalletModel = model("my_shop_wallets", MyShopWalletSchema);

module.exports = MyShopWalletModel;
