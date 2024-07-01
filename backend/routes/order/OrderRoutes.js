const OrderController = require("../../controllers/order/OrderController");
const OrderRouter = require("express").Router();

OrderRouter.post("/place-order", OrderController.PlaceOrder);

module.exports = OrderRouter;
