const CategoryModel = require("../../models/CategoryModel");
const ProductModel = require("../../models/ProductModel");
const { responseReturn } = require("../../utils/response");

class HomeController {
  fomatProducts = (products) => {
    const productArray = [];
    let i = 0;
    while (i < products.length) {
      let temp = [];
      let j = i;
      while (j < i + 3) {
        if (products[j]) {
          temp.push(products[j]);
        }
        j++;
      }
      productArray.push([...temp]);
      i = j;
    }
    return productArray;
  };

  GetCategories = async (req, res) => {
    try {
      const categories = await CategoryModel.find({});
      responseReturn(res, 200, categories);
    } catch (error) {
      responseReturn(res, 500, error.message);
    }
  };
  GetProducts = async (req, res) => {
    try {
      const products = await ProductModel.find({})
        .limit(12)
        .sort({ createdAt: -1 });

      const AllProducts = await ProductModel.find({})
        .limit(9)
        .sort({ createdAt: -1 });
      const LastestProducts = this.fomatProducts(AllProducts);

      const AllProducts2 = await ProductModel.find({})
        .limit(9)
        .sort({ rating: -1 });
      const TopRatedProducts = this.fomatProducts(AllProducts2);

      const AllProducts3 = await ProductModel.find({})
        .limit(9)
        .sort({ discount: -1 });
      const DiscountProduct = this.fomatProducts(AllProducts3);

      responseReturn(res, 200, {
        products,
        lastest_products: LastestProducts,
        top_rated_products: TopRatedProducts,
        discount_products: DiscountProduct,
      });
    } catch (error) {
      responseReturn(res, 500, error.message);
    }
  };
}

module.exports = new HomeController();
