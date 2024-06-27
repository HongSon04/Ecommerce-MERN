const CartController = require("../../controllers/home/CartController");

const CartRouter = require("express").Router();

CartRouter.post("/product/add-to-cart", CartController.AddToCart);
CartRouter.get(
  "/product/get-cart-products/:userId",
  CartController.GetCartProducts
);

module.exports = CartRouter;
