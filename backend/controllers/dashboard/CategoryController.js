const formidable = require("formidable");
const { responseReturn } = require("../../utils/response");
const cloudinary = require("cloudinary").v2;
const CategoryModel = require("../../models/CategoryModel");

class CategoryController {
  // ? Get Category
  getCategory = async (req, res) => {
    let { page, parPage, searchValue } = req.query;

    try {
      let skipPage = "";
      if (page && parPage) {
        skipPage = parseInt(parPage) * (parseInt(page) - 1);
      }
      if (searchValue && page && parPage) {
        const categories = await CategoryModel.find({
          $text: { $search: searchValue },
        })
          .skip(skipPage)
          .limit(parseInt(parPage))
          .sort({ createdAt: -1 });

        const totalCategories = await CategoryModel.find({
          $text: { $search: searchValue },
        }).countDocuments();
        responseReturn(res, 200, {
          categories,
          totalCategories,
          message: "Categories Fetched Successfully",
        });
      } else if (searchValue === "" && page && parPage) {
        const categories = await CategoryModel.find({})
          .skip(skipPage)
          .limit(parseInt(parPage))
          .sort({ createdAt: -1 });

        const totalCategories = await CategoryModel.find({}).countDocuments();
        responseReturn(res, 200, {
          categories,
          totalCategories,
          message: "Categories Fetched Successfully",
        });
      } else {
        const categories = await CategoryModel.find({}).sort({ createdAt: -1 });

        const totalCategories = await CategoryModel.find({}).countDocuments();
        responseReturn(res, 200, {
          categories,
          totalCategories,
          message: "Categories Fetched Successfully",
        });
      }
    } catch (error) {
      responseReturn(res, 500, { error: "Internal Server Error" });
    }
  };

  // ! End of getCategory
  // ? Add Category
  addCategory = async (req, res) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        responseReturn(res, 404, { error: "Something went wrong" });
      } else {
        let { name } = fields;
        let { image } = files;

        cloudinary.config({
          cloud_name: process.env.CLOUD_DINARY_NAME,
          api_key: process.env.CLOUD_DINARY_API_KEY,
          api_secret: process.env.CLOUD_DINARY_API_SECRET,
          secure: true,
        });

        try {
          const result = await cloudinary.uploader.upload(image.filepath, {
            folder: "categories",

            transformation: [
              { width: 250, crop: "scale" },
              { quality: 35 },
              { fetch_format: "auto" },
            ],
          });
          if (result) {
            const category = await CategoryModel.create({
              name,
              image: result.secure_url,
            });
            responseReturn(res, 200, {
              category,
              message: "Category Added Successfully",
            });
          } else {
            responseReturn(res, 500, { error: "Internal Server Error" });
          }
        } catch (error) {
          responseReturn(res, 500, { error: error.message });
        }
      }
    });
  };

  // ! End of addCategory
}

module.exports = new CategoryController();
