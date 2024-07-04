const CustomerAuthController = require("../../controllers/home/CustomerAuthController");

const CustomerAuthRouter = require("express").Router();

CustomerAuthRouter.post(
  "/customer-register",
  CustomerAuthController.CustomerRegister
);
CustomerAuthRouter.post(
  "/customer-login",
  CustomerAuthController.CustomerLogin
);

CustomerAuthRouter.get('/logout', CustomerAuthController.CustomerLogout)

module.exports = CustomerAuthRouter;
