const formidable = require("formidable");
const { responseReturn } = require("../../utils/response");
const cloudinary = require("cloudinary").v2;
const SellerModel = require("../../models/SellerModel");

class SellerController {
  GetSellerById = async (req, res) => {
    const { sellerId } = req.params;
    try {
      const seller = await SellerModel.findById(sellerId).select("-password");
      if (seller) {
        responseReturn(res, 200, { seller });
      } else {
        responseReturn(res, 404, { message: "Seller not found" });
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  RequestSellerGet = async (req, res) => {
    const { page, searchValue, parPage } = req.query;
    const skipPage = parseInt(parPage) * (parseInt(page) - 1);
    try {
      if (searchValue) {
        const sellers = await SellerModel.find({
          $text: { $search: searchValue },
          status: "pending",
        })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });
        const totalProduct = await SellerModel.find({
          $text: { $search: searchValue },
          status: "pending",
        }).countDocuments();
        responseReturn(res, 200, { sellers, totalProduct });
      } else {
        const sellers = await SellerModel.find({ status: "pending" })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });
        const totalSeller = await SellerModel.find({
          status: "pending",
        }).countDocuments();
        responseReturn(res, 200, { sellers, totalSeller });
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  SellerStatusUpdate = async (req, res) => {
    const { sellerId, status } = req.body;
    try {
      await SellerModel.findByIdAndUpdate(sellerId, {
        status,
      });
      const seller = await SellerModel.findById(sellerId).select("-password");
      responseReturn(res, 200, { seller, message: "Seller Status Updated" });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
  GetActiveSellers = async (req, res) => {
    let { page, searchValue, parPage } = req.query;
    page = parseInt(page);
    parPage = parseInt(parPage);
    const skipPage = parPage * (page - 1);

    try {
      if (searchValue) {
        const sellers = await SellerModel.find({
          $text: { $search: searchValue },
          status: "active",
        })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });

        const totalSeller = await SellerModel.find({
          $text: { $search: searchValue },
          status: "active",
        }).countDocuments();
        responseReturn(res, 200, { sellers, totalSeller });
      } else {
        const sellers = await SellerModel.find({ status: "active" })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });
        const totalSeller = await SellerModel.find({
          status: "active",
        }).countDocuments();
        responseReturn(res, 200, { sellers, totalSeller });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  GetDeactiveSellers = async (req, res) => {
    let { page, searchValue, parPage } = req.query;
    page = parseInt(page);
    parPage = parseInt(parPage);
    const skipPage = parPage * (page - 1);

    try {
      if (searchValue) {
        const sellers = await SellerModel.find({
          $text: { $search: searchValue },
          status: "deactive",
        })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });

        const totalSeller = await SellerModel.find({
          $text: { $search: searchValue },
          status: "deactive",
        }).countDocuments();
        responseReturn(res, 200, { sellers, totalSeller });
      } else {
        const sellers = await SellerModel.find({ status: "deactive" })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });
        const totalSeller = await SellerModel.find({
          status: "deactive",
        }).countDocuments();
        responseReturn(res, 200, { sellers, totalSeller });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
}

module.exports = new SellerController();
