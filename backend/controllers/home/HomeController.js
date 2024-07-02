const CategoryModel = require("../../models/CategoryModel");
const ProductModel = require("../../models/ProductModel");
const { responseReturn } = require("../../utils/response");
const QueryProducts = require("../../utils/QueryProducts");
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
      responseReturn(res, 500, { error: error.message });
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
      responseReturn(res, 500, { error: error.message });
    }
  };

  PriceRangeProduct = async (req, res) => {
    try {
      const PriceRange = {
        low: 0,
        high: 0,
      };
      const products = await ProductModel.find({})
        .limit(9)
        .sort({ createdAt: -1 });
      const LastestProduct = this.fomatProducts(products);
      const GetForPrice = await ProductModel.find({}).sort({ price: 1 });

      if (GetForPrice.length > 0) {
        PriceRange.low = GetForPrice[0].price;
        PriceRange.high = GetForPrice[GetForPrice.length - 1].price;
      }
      responseReturn(res, 200, {
        lastest_products: LastestProduct,
        price_range: PriceRange,
      });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  QueryProducts = async (req, res) => {
    const parPage = 12;
    req.query.parPage = parPage;
    try {
      const products = await ProductModel.find({}).sort({ createdAt: -1 });
      const totalProduct = new QueryProducts(products, req.query)
        .categoryQuery()
        .ratingQuery()
        .searchQuery()
        .priceQuery()
        .sortByPrice()
        .countProducts();

      const result = new QueryProducts(products, req.query)
        .categoryQuery()
        .ratingQuery()
        .searchQuery()
        .priceQuery()
        .sortByPrice()
        .skipPage()
        .limitPage()
        .getProducts();

      responseReturn(res, 200, {
        products: result,
        totalProduct,
        parPage,
      });
    } catch (error) {
      responseReturn(res, 500, error.message);
    }
  };

  GetProductDetails = async (req, res) => {
    const { slug } = req.params;
    try {
      const product = await ProductModel.findOne({ slug });
      const relatedProducts = await ProductModel.find({
        $and: [
          {
            _id: {
              $ne: product._id,
            },
          },
          {
            category: {
              $eq: product.category,
            },
          },
        ],
      }).limit(12);
      const moreProducts = await ProductModel.find({
        $and: [
          {
            _id: {
              $ne: product._id,
            },
          },
          {
            seller_id: {
              $eq: product.seller_id,
            },
          },
        ],
      })
        .limit(3)
        .sort({ createdAt: -1 });
      responseReturn(res, 200, { product, relatedProducts, moreProducts });
    } catch (error) {
      responseReturn(res, 500, error.message);
    }
  };
}

module.exports = new HomeController();
