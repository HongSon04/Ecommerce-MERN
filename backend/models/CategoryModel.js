const { Schema, model } = require("mongoose");
const slug = require("slug");

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      slug: "name",
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

CategorySchema.index({ name: "text" });

module.exports = model("categories", CategorySchema);
