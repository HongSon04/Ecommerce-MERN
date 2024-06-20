const formidable = require("formidable");
const { responseReturn } = require("../../utils/response");
const cloudinary = require("cloudinary").v2;
const CategoryModel = require("../../models/CategoryModel");

class CategoryController {
  getCategory = async (req, res) => {};
  addCategory = async (req, res) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        responseReturn(res, 404, { error: "Something went wrong" });
      } else {
        let { name } = fields;
        let { image } = files;
        // name = name.trim();
        // const slug = name.split(" ").join("-");

        cloudinary.config({
          cloud_name: process.env.CLOUD_DINARY_NAME,
          api_key: process.env.CLOUD_DINARY_API_KEY,
          api_secret: process.env.CLOUD_DINARY_API_SECRET,
          secure: true,
        });

        try {
          const result = await cloudinary.uploader.upload(image.filepath, {
            folder: "categories",
          });
          if (result) {
            const category = await CategoryModel.create({
              name,
              image: result.url,
            });
            responseReturn(res, 200, {
              category,
              message: "Category Added Successfully",
            });
          } else {
            responseReturn(res, 500, { error: "Internal Server Error" });
          }
        } catch (error) {
          responseReturn(res, 500, { error: "Internal Server Error" });
        }
      }
    });
  };
}

module.exports = new CategoryController();
