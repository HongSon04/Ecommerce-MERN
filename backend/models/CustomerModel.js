const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
const CustomerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    method: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const CustomerModel = model("customers", CustomerSchema);

module.exports = CustomerModel;
