const ProductController = require("../../controllers/dashboard/ProductController");
const { AuthMiddleware } = require("../../middlewares/AuthMiddleware");

const router = require("express").Router();

router.get("/product-get", AuthMiddleware, ProductController.GetProducts);
router.get(
  "/product-get/:productId",
  AuthMiddleware,
  ProductController.GetProductById
);
router.post("/product-add", AuthMiddleware, ProductController.AddProduct);
router.post("/product-update", AuthMiddleware, ProductController.UpdateProduct);
router.post("/product-update-image",AuthMiddleware ,ProductController.UpdateProductImage);

module.exports = router;
