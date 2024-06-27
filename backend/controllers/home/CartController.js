const CartModel = require("../../models/CartModel");
const ProductModel = require("../../models/ProductModel");
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
        const product = new CartModel({
          userId,
          productId: product_id,
          quantity,
        });
        await product.save();
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
    const { userId } = req.params;
    try {
      const card_products = await CartModel.aggregate([
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
      let calculated_price = 0;
      let cart_product_count = 0;
      const out_of_stock_products = card_products.filter(
        (product) => product.products[0].stock < product.quantity
      );
      for (let i = 0; i < out_of_stock_products.length; i++) {
        cart_product_count =
          cart_product_count + out_of_stock_products[i].quantity;
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
}

module.exports = new CartController();

//? Hoc lai bai 331