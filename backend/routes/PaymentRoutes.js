const PaymentController = require("../controllers/PaymentController");
const { AuthMiddleware } = require("../middlewares/AuthMiddleware");
const PaymentRouter = require("express").Router();

PaymentRouter.get(
  "/create-stripe-connect-account",
  AuthMiddleware,
  PaymentController.CreateStripeConnectAccount
);

PaymentRouter.put(
  "/active-stripe-connect-account/:activeCode",
  AuthMiddleware,
  PaymentController.ActiveStripeConnectAccount
);

module.exports = PaymentRouter;
