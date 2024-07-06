const PaymentController = require("../controllers/PaymentController");
const { AuthMiddleware } = require("../middlewares/AuthMiddleware");
const PaymentRouter = require("express").Router();

PaymentRouter.get(
  "/create-stripe-connect-account",
  AuthMiddleware,
  PaymentController.CreateStripeConnectAccount
);

module.exports = PaymentRouter;
