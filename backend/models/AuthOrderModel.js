const { Schema, model } = require("mongoose");

const AuthOrderSchema = new Schema(
  {
    orderId: {
      type: Schema.ObjectId,
      required: true,
    },
    sellerId: {
      type: Schema.ObjectId,
      required: true,
    },
    products: {
      type: Array,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    shippingInfo: {
      type: String,
      required: true,
    },
    payment_status: {
      type: String,
      required: true,
    },
    delivery_status: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const AuthOrderModel = model("auth_order", AuthOrderSchema);

module.exports = AuthOrderModel;
