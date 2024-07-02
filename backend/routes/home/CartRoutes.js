const CartController = require("../../controllers/home/CartController");

const CartRouter = require("express").Router();

CartRouter.post("/product/add-to-cart", CartController.AddToCart);
CartRouter.get(
  "/product/get-cart-products/:userId",
  CartController.GetCartProducts
);
CartRouter.delete(
  "/product/delete-cart-products/:cart_id",
  CartController.DeleteCartProducts
);

CartRouter.put("/product/quantity-inc/:cart_id", CartController.QuantityInc);

CartRouter.put("/product/quantity-dec/:cart_id", CartController.QuantityDec);

CartRouter.post("/product/add-to-wishlist", CartController.AddToWishlist);

CartRouter.get(
  "/product/get-wishlist-products/:userId",
  CartController.GetWishlistProducts
);
CartRouter.delete(
  "/product/remove-wishlist-products/:wishlistId",
  CartController.RemoveWishlistProducts
);

module.exports = CartRouter;
