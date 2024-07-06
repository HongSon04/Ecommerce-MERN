const OrderController = require("../../controllers/order/OrderController");
const OrderRouter = require("express").Router();

OrderRouter.get(
  "/get-dashboard-data/:userID",
  OrderController.GetDashboardData
);
OrderRouter.get("/get-orders/:customerId/:status", OrderController.GetOrders);
OrderRouter.get("/get-order-details/:orderId", OrderController.GetOrderDetails);
OrderRouter.post("/place-order", OrderController.PlaceOrder);

// ? Admin
OrderRouter.get("/get-admin-orders", OrderController.GetAdminOrders);

module.exports = OrderRouter;
