const { Schema, model } = require("mongoose");

const CustomerOrderSchema = new Schema(
  {
    customerId: {
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
      type: Object,
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

const CustomerOrderModel = model("customer_order", CustomerOrderSchema);

module.exports = CustomerOrderModel;
