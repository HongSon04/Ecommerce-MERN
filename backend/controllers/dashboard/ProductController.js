const formidable = require("formidable");
const { responseReturn } = require("../../utils/response");
const cloudinary = require("cloudinary").v2;
const ProductModel = require("../../models/ProductModel");

class ProductController {
  GetProducts = async (req, res) => {
    const { page, searchValue, parPage } = req.query;
    const { id } = req;

    const skipPage = parseInt(parPage) * (parseInt(page) - 1);

    try {
      if (searchValue) {
        const products = await ProductModel.find({
          $text: { $search: searchValue },
          seller_id: id,
        })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });
        const totalProduct = await ProductModel.find({
          $text: { $search: searchValue },
          seller_id: id,
        }).countDocuments();
        responseReturn(res, 200, { products, totalProduct });
      } else {
        const products = await ProductModel.find({ seller_id: id })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });
        const totalProduct = await ProductModel.find({
          seller_id: id,
        }).countDocuments();
        responseReturn(res, 200, { products, totalProduct });
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  GetProductById = async (req, res) => {
    const { productId } = req.params;
    try {
      const product = await ProductModel.findById(productId);
      if (product) {
        responseReturn(res, 200, { product });
      } else {
        responseReturn(res, 404, { message: "Product not found" });
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  AddProduct = async (req, res) => {
    const { id } = req;
    const form = formidable({ multiples: true });
    form.parse(req, async (err, field, files) => {
      let {
        name,
        category,
        description,
        stock,
        discount,
        price,
        shopName,
        brand,
      } = field;
      const { images } = files;

      cloudinary.config({
        cloud_name: process.env.CLOUD_DINARY_NAME,
        api_key: process.env.CLOUD_DINARY_API_KEY,
        api_secret: process.env.CLOUD_DINARY_API_SECRET,
        secure: true,
      });

      try {
        let allImageUrl = [];
        for (let i = 0; i < images.length; i++) {
          const result = await cloudinary.uploader.upload(images[i].filepath, {
            folder: "products",

            transformation: [
              { width: 500, crop: "scale" },
              { quality: 35 },
              { fetch_format: "auto" },
            ],
          });
          allImageUrl.push(result.secure_url);
        }

        await ProductModel.create({
          seller_id: id,
          name,
          shopName,
          category: category.trim(),
          description: description.trim(),
          stock: parseInt(stock),
          discount: parseInt(discount),
          price: parseInt(price),
          images: allImageUrl,
          brand: brand.trim(),
        });
        responseReturn(res, 201, { message: "Product added successfully" });
      } catch (error) {
        responseReturn(res, 500, { error: error.message });
      }
    });
  };

  UpdateProduct = async (req, res) => {
    let { name, description, stock, discount, price, productId, brand } =
      req.body;
    try {
      await ProductModel.findByIdAndUpdate(productId, {
        name,
        description,
        stock,
        discount,
        price,
        brand,
      });
      const product = await ProductModel.findById(productId);
      responseReturn(res, 200, {
        product,
        message: "Product Updated Successfully",
      });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
  UpdateProductImage = async (req, res) => {
    const form = formidable({ multiples: true });
    form.parse(req, async (err, field, files) => {
      const { oldImage, productId } = field;
      const { newImage } = files;
      if (err) {
        responseReturn(res, 400, { error: err.message });
      } else {
        try {
          cloudinary.config({
            cloud_name: process.env.CLOUD_DINARY_NAME,
            api_key: process.env.CLOUD_DINARY_API_KEY,
            api_secret: process.env.CLOUD_DINARY_API_SECRET,
            secure: true,
          });

          const result = await cloudinary.uploader.upload(newImage.filepath, {
            folder: "products",
            transformation: [
              { width: 500, crop: "scale" },
              { quality: 35 },
              { fetch_format: "auto" },
            ],
          });
          if (result) {
            let { images } = await ProductModel.findById(productId);
            const index = images.indexOf(oldImage);
            images[index] = result.secure_url;
            await ProductModel.findByIdAndUpdate(productId, { images });
            const product = await ProductModel.findById(productId);
            responseReturn(res, 200, {
              product,
              message: "Product Image Updated Successfully",
            });
          } else {
            responseReturn(res, 500, { error: "Image upload failed" });
          }
        } catch (error) {
          responseReturn(res, 500, { error: error.message });
        }
      }
    });
  };
}

module.exports = new ProductController();
