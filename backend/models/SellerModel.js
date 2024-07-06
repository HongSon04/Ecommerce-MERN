const { Schema, model } = require("mongoose");

const SellerSchema = new Schema(
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
      select: false, // ? This will hide the password from the response
    },
    image: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "seller",
    },
    status: {
      type: String,
      default: "pending",
    },
    payment: {
      type: String,
      default: "pending",
    },
    method: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    shopInfo: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

SellerSchema.index(
  {
    name: "text",
    email: "text",
  },
  {
    weights: {
      name: 5,
      email: 4,
    },
  }
);

const SellerModel = model("sellers", SellerSchema);

module.exports = SellerModel;
