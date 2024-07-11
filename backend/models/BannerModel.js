const { Schema, model } = require("mongoose");

const BannerSchema = new Schema(
  {
    productId: {
      type: Schema.ObjectId,
      required: true,
    },
    banner: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const BannerModel = model("banners", BannerSchema);

module.exports = BannerModel;
