const { Schema, model } = require("mongoose");

const AdminSellerMessageSchema = new Schema(
  {
    senderName: {
      type: String,
      required: true,
    },
    senderId: {
      type: String,
      default: "",
    },
    receverId: {
      type: String,
      default: "",
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "unseen",
    },
  },
  {
    timestamps: true,
  }
);

const AdminSellerMessageModel = model(
  "admin_seller_message",
  AdminSellerMessageSchema
);

module.exports = AdminSellerMessageModel;
