const ChatController = require("../controllers/chat/ChatController");
const { AuthMiddleware } = require("../middlewares/AuthMiddleware");
const ChatRouter = require("express").Router();

ChatRouter.post(
  "/customer/add-customer-friend",
  ChatController.AddCustomerFriend
);

ChatRouter.post(
  "/customer/send-message-to-seller",
  ChatController.SendMessageToSeller
);

ChatRouter.get("/seller/get-customers/:sellerId", ChatController.GetCustomers);

ChatRouter.get(
  "/seller/get-customer-message/:customerId",
  AuthMiddleware,
  ChatController.GetCustomersSellerMessage
);

ChatRouter.post(
  "/seller/send-message-to-customer",
  AuthMiddleware,
  ChatController.SellerMessageToCustomer
);

module.exports = ChatRouter;
