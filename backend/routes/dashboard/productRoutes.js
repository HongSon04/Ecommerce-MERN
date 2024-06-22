const ProductController = require("../../controllers/dashboard/ProductController");
const { AuthMiddleware } = require("../../middlewares/AuthMiddleware");

const ProductRouter = require("express").Router();

ProductRouter.get(
  "/product-get",
  AuthMiddleware,
  ProductController.GetProducts
);
ProductRouter.get(
  "/product-get/:productId",
  AuthMiddleware,
  ProductController.GetProductById
);
ProductRouter.post(
  "/product-add",
  AuthMiddleware,
  ProductController.AddProduct
);
ProductRouter.post(
  "/product-update",
  AuthMiddleware,
  ProductController.UpdateProduct
);
ProductRouter.post(
  "/product-update-image",
  AuthMiddleware,
  ProductController.UpdateProductImage
);

module.exports = ProductRouter;
