const CartModel = require("../../models/CartModel");
const ProductModel = require("../../models/ProductModel");
const WishlistModel = require("../../models/WishlistModel");
const { responseReturn } = require("../../utils/response");
/* const {
  mongo: { ObjectId },
} = require("mongoose"); */
class CartController {
  AddToCart = async (req, res) => {
    const { product_id, userId, quantity } = req.body;

    try {
      const product = await CartModel.findOne({
        $and: [
          {
            productId: {
              $eq: product_id,
            },
          },
          {
            userId: {
              $eq: userId,
            },
          },
        ],
      });
      if (product) {
        responseReturn(res, 400, { error: "Product Already In Cart" });
      } else {
        const product = await CartModel.create({
          productId: product_id,
          userId,
          quantity,
        });
        responseReturn(res, 200, {
          product,
          message: "Product Added To Cart Successfully",
        });
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  GetCartProducts = async (req, res) => {
    const co = 5;
    const { userId } = req.params;
    try {
      const cart_products = await CartModel.aggregate([
        {
          $match: {
            userId: {
              $eq: userId,
              // $eq: new ObjectId(userId),
            },
          },
        },
        {
          $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "_id",
            as: "products",
          },
        },
      ]);
      let buy_product_item = 0;
      let calculatePrice = 0;
      let cart_product_count = 0;
      const out_of_stock_products = cart_products.filter(
        (p) => p.products[0].stock < p.quantity
      );
      for (let i = 0; i < out_of_stock_products.length; i++) {
        cart_product_count =
          cart_product_count + out_of_stock_products[i].quantity;
      }
      const stockProduct = cart_products.filter(
        (p) => p.products[0].stock >= p.quantity
      );
      for (let i = 0; i < stockProduct.length; i++) {
        const { quantity } = stockProduct[i];
        cart_product_count = buy_product_item + quantity;
        buy_product_item = buy_product_item + quantity;
        const { price, discount } = stockProduct[i].products[0];
        if (discount !== 0) {
          calculatePrice =
            calculatePrice +
            quantity * (price - Math.floor((price * discount) / 100));
        } else {
          calculatePrice = calculatePrice + quantity * price;
        }
      } // end for
      let p = [];
      let unique = [
        ...new Set(stockProduct.map((p) => p.products[0].seller_id.toString())),
      ];
      for (let i = 0; i < unique.length; i++) {
        let price = 0;
        for (let j = 0; j < stockProduct.length; j++) {
          const tempProduct = stockProduct[j].products[0];
          if (unique[i] === tempProduct.seller_id.toString()) {
            let pri = 0;
            if (tempProduct.discount !== 0) {
              pri =
                tempProduct.price -
                Math.floor((tempProduct.price * tempProduct.discount) / 100);
            } else {
              pri = tempProduct.price;
            }
            pri = pri - Math.floor((pri * co) / 100);
            price = price + pri * stockProduct[j].quantity;
            p[i] = {
              seller_id: unique[i],
              shopName: tempProduct.shopName,
              price,
              products: p[i]
                ? [
                    ...p[i].products,
                    {
                      _id: stockProduct[j]._id,
                      quantity: stockProduct[j].quantity,
                      productInfo: tempProduct,
                    },
                  ]
                : [
                    {
                      _id: stockProduct[j]._id,
                      quantity: stockProduct[j].quantity,
                      productInfo: tempProduct,
                    },
                  ],
            };
          }
        }
      }
      responseReturn(res, 200, {
        cart_products: p,
        price: calculatePrice,
        cart_product_count,
        shipping_fee: 20 * p.length,
        out_of_stock_products,
        buy_product_item,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  DeleteCartProducts = async (req, res) => {
    const { cart_id } = req.params;
    try {
      await CartModel.findByIdAndDelete(cart_id);
      responseReturn(res, 200, { message: "Product Deleted From Cart" });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
  QuantityInc = async (req, res) => {
    const { cart_id } = req.params;
    try {
      const CartProduct = await CartModel.findById(cart_id);
      const { quantity } = CartProduct;
      const product = await ProductModel.findById(CartProduct.productId);
      if (product.stock < quantity + 1) {
        responseReturn(res, 400, { error: "Product Out Of Stock" });
      } else {
        await CartModel.findByIdAndUpdate(cart_id, {
          quantity: quantity + 1,
        });
        responseReturn(res, 200, { message: "Quantity Increased" });
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
  QuantityDec = async (req, res) => {
    const { cart_id } = req.params;
    try {
      const CartProduct = await CartModel.findById(cart_id);
      const { quantity } = CartProduct;
      if (quantity - 1 < 1) {
        responseReturn(res, 400, { error: "Quantity Can't Be Less Than 1" });
      } else {
        await CartModel.findByIdAndUpdate(cart_id, {
          quantity: quantity - 1,
        });
        responseReturn(res, 200, { message: "Quantity Decreased" });
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  AddToWishlist = async (req, res) => {
    const { productId, userId, name, price, image, discount, rating, slug } =
      req.body;
    try {
      const product = await WishlistModel.findOne({ slug });
      if (product) {
        responseReturn(res, 400, { error: "Product Already In Wishlist" });
      } else {
        await WishlistModel.create({
          productId,
          userId,
          name,
          price,
          image,
          discount,
          rating,
          slug,
        });
      }
      responseReturn(res, 200, { message: "Product Added To Wishlist" });
    } catch (error) {
      console.log(error.message);
    }
  };
  GetWishlistProducts = async (req, res) => {
    const { userId } = req.params;
    try {
      const wishlist_products = await WishlistModel.find({ userId });
      responseReturn(res, 200, { wishlist_products });
    } catch (error) {
      console.log(error.message);
    }
  };
  RemoveWishlistProducts = async (req, res) => {
    const { wishlistId } = req.params;
    try {
      const wishlist = await WishlistModel.findByIdAndDelete(wishlistId);
      responseReturn(res, 200, {
        message: "Product Removed From Wishlist",
        wishlistId,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

module.exports = new CartController();
