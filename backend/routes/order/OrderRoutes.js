const OrderController = require("../../controllers/order/OrderController");
const OrderRouter = require("express").Router();

OrderRouter.get(
  "/get-dashboard-data/:userID",
  OrderController.GetDashboardData
);
OrderRouter.get(
  "/get-orders/:customerId/:status",
  OrderController.GetOrders
);
OrderRouter.post("/place-order", OrderController.PlaceOrder);

module.exports = OrderRouter;
