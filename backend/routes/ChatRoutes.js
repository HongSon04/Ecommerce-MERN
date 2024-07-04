const ChatController = require("../controllers/chat/ChatController");

const ChatRouter = require("express").Router();

ChatRouter.post(
  "/customer/add-customer-friend",
  ChatController.AddCustomerFriend
);

ChatRouter.post(
  "/customer/send-message-to-seller",
  ChatController.SendMessageToSeller
);

module.exports = ChatRouter;
