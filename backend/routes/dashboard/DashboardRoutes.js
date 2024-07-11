const DashboardController = require("../../controllers/dashboard/DashboardController");
const { AuthMiddleware } = require("../../middlewares/AuthMiddleware");

const DashboardRouter = require("express").Router();

DashboardRouter.get(
  "/admin/get-dashboard-data",
  AuthMiddleware,
  DashboardController.GetDashboardData
);

DashboardRouter.get(
  "/seller/get-seller-dashboard-data",
  AuthMiddleware,
  DashboardController.GetSellerDashboardData
);

DashboardRouter.post(
  "/banner/add",
  AuthMiddleware,
  DashboardController.AddBanner
);

DashboardRouter.get(
  "/banner/get/:productId",
  AuthMiddleware,
  DashboardController.GetBanner
);

DashboardRouter.get("/banners", DashboardController.GetBanners);

module.exports = DashboardRouter;
