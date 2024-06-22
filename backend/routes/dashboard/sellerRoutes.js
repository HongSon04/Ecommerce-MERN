const SellerController = require("../../controllers/dashboard/SellerController");
const { AuthMiddleware } = require("../../middlewares/AuthMiddleware");

const SellerRouter = require("express").Router();

SellerRouter.get(
  "/request-seller-get",
  AuthMiddleware,
  SellerController.RequestSellerGet
);

SellerRouter.get(
  "/get-seller/:sellerId",
  AuthMiddleware,
  SellerController.GetSellerById
);

SellerRouter.post(
  "/seller-status-update",
  AuthMiddleware,
  SellerController.SellerStatusUpdate
);

module.exports = SellerRouter;
