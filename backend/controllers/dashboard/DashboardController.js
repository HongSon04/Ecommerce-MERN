const CustomerOrderModel = require("../../models/CustomerOrderModel");
const MyShopWalletModel = require("../../models/MyShopWalletModel");
const SellerWalletModel = require("../../models/SellerWalletModel");
const ProductModel = require("../../models/ProductModel");
const SellerModel = require("../../models/SellerModel");
const { responseReturn } = require("../../utils/response");
const AdminSellerMessageModel = require("../../models/chat/AdminSellerMessageModel");
const SellerCustomerMessageModel = require("../../models/chat/SellerCustomerMessageModel");
const AuthOrderModel = require("../../models/AuthOrderModel");
const BannerModel = require("../../models/BannerModel");
const {
  mongo: { ObjectId },
} = require("mongoose");
class DashboardController {
  GetDashboardData = async (req, res) => {
    try {
      const totalSale = await MyShopWalletModel.aggregate([
        {
          $group: {
            _id: null,
            totalAmount: { $sum: "$amount" },
          },
        },
      ]);
      const totalProduct = await ProductModel.find({}).countDocuments();
      const totalOrder = await CustomerOrderModel.find({}).countDocuments();
      const totalSeller = await SellerModel.find({}).countDocuments();
      const messages = await AdminSellerMessageModel.find({})
        .limit(3)
        .sort({ createdAt: -1 });
      const recentOrders = await CustomerOrderModel.find({})
        .limit(5)
        .sort({ createdAt: -1 });
      responseReturn(res, 200, {
        totalSale: totalSale[0]?.totalAmount || 0,
        totalOrder,
        totalProduct,
        totalSeller,
        recentOrders,
        recentMessage: messages,
      });
    } catch (error) {
      console.log(error);
    }
  };
  GetSellerDashboardData = async (req, res) => {
    const { id } = req;
    try {
      const totalSale = await SellerWalletModel.aggregate([
        {
          $match: {
            sellerId: {
              $eq: id,
            },
          },
        },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: "$amount" },
          },
        },
      ]);
      const totalProduct = await ProductModel.find({
        seller_id: new ObjectId(id),
      }).countDocuments();
      const totalOrder = await AuthOrderModel.find({
        sellerId: new ObjectId(id),
      }).countDocuments();
      const totalPendingOrder = await AuthOrderModel.find({
        $and: [
          {
            sellerId: {
              $eq: new ObjectId(id),
            },
          },
          {
            delivery_status: {
              $eq: "pending",
            },
          },
        ],
      }).countDocuments();

      const messages = await SellerCustomerMessageModel.find({
        $or: [
          {
            senderId: {
              $eq: id,
            },
          },
          {
            receiverId: {
              $eq: id,
            },
          },
        ],
      })
        .limit(3)
        .sort({ createdAt: -1 });
      const recentOrders = await AuthOrderModel.find({
        sellerId: new ObjectId(id),
      })
        .limit(5)
        .sort({ createdAt: -1 });

      responseReturn(res, 200, {
        totalSale: totalSale[0]?.totalAmount || 0,
        totalOrder,
        totalProduct,
        totalPendingOrder,
        recentOrders,
        recentMessage: messages,
      });
    } catch (error) {
      console.log(error);
    }
  };
  AddBanner = async (req, res) => {
    const form = formidable({ multiples: true });
    form.parse(req, async (err, field, files) => {
      const { productId } = field;
      const { mainban } = files;
      cloudinary.config({
        cloud_name: process.env.cloud_name,
        api_key: process.env.api_key,
        api_secret: process.env.api_secret,
        secure: true,
      });

      try {
        const { slug } = await productModel.findById(productId);
        const result = await cloudinary.uploader.upload(mainban.filepath, {
          folder: "banners",
        });
        const banner = await BannerModel.create({
          productId,
          banner: result.url,
          link: slug,
        });
        responseReturn(res, 200, { banner, message: "Banner Add Success" });
      } catch (error) {
        responseReturn(res, 500, { error: error.message });
      }
    });
  };
  //end Method

  GetBanner = async (req, res) => {
    const { productId } = req.params;
    try {
      const banner = await BannerModel.findOne({
        productId: new ObjectId(productId),
      });
      responseReturn(res, 200, { banner });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
  GetBanners = async (req, res) => {
    try {
      const banners = await BannerModel.aggregate([
        {
          $sample: {
            size: 5,
          },
        },
      ]);
      responseReturn(res, 200, { banners });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
}

module.exports = new DashboardController();
