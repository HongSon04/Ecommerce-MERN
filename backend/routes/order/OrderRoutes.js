const OrderController = require("../../controllers/order/OrderController");
const OrderRouter = require("express").Router();

OrderRouter.get(
  "/get-dashboard-data/:userID",
  OrderController.GetDashboardData
);
OrderRouter.get("/get-orders/:customerId/:status", OrderController.GetOrders);
OrderRouter.get("/get-order-details/:orderId", OrderController.GetOrderDetails);
OrderRouter.post("/place-order", OrderController.PlaceOrder);

OrderRouter.post("/create-payment", OrderController.CreatePayment);
OrderRouter.get("/confirm/:orderId", OrderController.OrderConfirm);

// ? Admin
OrderRouter.get("/get-admin-orders", OrderController.GetAdminOrders);
OrderRouter.get("/get-admin-order/:orderId", OrderController.GetAdminOrder);
OrderRouter.put(
  "/admin/order-status/:orderId",
  OrderController.AdminOrderUpdateStatus
);

// ? Seller
OrderRouter.get(
  "/seller/get-seller-orders/:sellerId",
  OrderController.GetSellerOrders
);
OrderRouter.get(
  "/seller/get-seller-order/:orderId",
  OrderController.GetSellerOrder
);
OrderRouter.put(
  "/seller/order-status/:orderId",
  OrderController.SellerOrderUpdateStatus
);
module.exports = OrderRouter;
