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

PaymentRouter.get(
  "/seller-payment-details/:sellerId",
  AuthMiddleware,
  PaymentController.GetSellerPaymentDetails
);

PaymentRouter.post(
  "/withdraw-request",
  AuthMiddleware,
  PaymentController.SendWithDrawRequest
);

PaymentRouter.get(
  "/request",
  AuthMiddleware,
  PaymentController.GetPaymentRequest
);

PaymentRouter.put(
  "/request-confirm/:paymentId",
  AuthMiddleware,
  PaymentController.ConfirmPaymentRequest
);

module.exports = PaymentRouter;
