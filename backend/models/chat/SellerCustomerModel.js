const { Schema, model } = require("mongoose");

const SellerCustomerSchema = new Schema(
  {
    myId: {
      type: String,
      required: true,
    },
    myFriends: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);
const SellerCustomerModel = model("seller_customers", SellerCustomerSchema);

module.exports = SellerCustomerModel;
