const AdminSellerMessageModel = require("../../models/chat/AdminSellerMessageModel");
const SellerCustomerMessageModel = require("../../models/chat/SellerCustomerMessageModel");
const SellerCustomerModel = require("../../models/chat/SellerCustomerModel");
const CustomerModel = require("../../models/CustomerModel");
const SellerModel = require("../../models/SellerModel");
const { responseReturn } = require("../../utils/response");

class ChatController {
  AddCustomerFriend = async (req, res) => {
    const { sellerId, userId } = req.body;
    try {
      if (sellerId !== "") {
        const seller = await SellerModel.findById(sellerId);
        const user = await CustomerModel.findById(userId);
        const checkSeller = await SellerCustomerModel.findOne({
          $and: [
            {
              myId: {
                $eq: userId,
              },
            },
            {
              myFriends: {
                $elemMatch: {
                  fdId: sellerId,
                },
              },
            },
          ],
        });

        if (!checkSeller) {
          await SellerCustomerModel.updateOne(
            {
              myId: userId,
            },
            {
              $push: {
                myFriends: {
                  fdId: sellerId,
                  name: seller.shopInfo?.shopName,
                  image: seller.image,
                },
              },
            }
          );
        }

        const checkCustomer = await SellerCustomerModel.findOne({
          $and: [
            {
              myId: {
                $eq: sellerId,
              },
            },
            {
              myFriends: {
                $elemMatch: {
                  fdId: userId,
                },
              },
            },
          ],
        });

        if (!checkCustomer) {
          await SellerCustomerModel.updateOne(
            {
              myId: sellerId,
            },
            {
              $push: {
                myFriends: {
                  fdId: userId,
                  name: user.name,
                  image: user.image || "",
                },
              },
            }
          );
        }

        const messages = await SellerCustomerMessageModel.find({
          $or: [
            {
              $and: [
                {
                  receverId: {
                    $eq: sellerId,
                  },
                },
                {
                  senderId: {
                    $eq: userId,
                  },
                },
              ],
            },
            {
              $and: [
                {
                  receverId: {
                    $eq: userId,
                  },
                },
                {
                  senderId: {
                    $eq: sellerId,
                  },
                },
              ],
            },
          ],
        });

        const MyFriends = await SellerCustomerModel.findOne({
          myId: userId,
        });

        const currentFriend = MyFriends.myFriends.find(
          (s) => s.fdId === sellerId
        );

        responseReturn(res, 200, {
          MyFriends: MyFriends.myFriends,
          currentFd: currentFriend,
          messages,
        });
      } else {
        const MyFriends = await SellerCustomerModel.findOne({
          myId: userId,
        });
        responseReturn(res, 200, {
          MyFriends: MyFriends.myFriends,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  SendMessageToSeller = async (req, res) => {
    const { sellerId, userId, text, name } = req.body;
    try {
      const message = await SellerCustomerMessageModel.create({
        senderId: userId,
        senderName: name,
        receverId: sellerId,
        message: text,
      });
      const data = await SellerCustomerModel.findOne({
        myId: userId,
      });
      let myFriends = data.myFriends;
      let index = myFriends.findIndex((f) => f.fdId === sellerId);
      while (index > 0) {
        let temp = myFriends[index];
        myFriends[index] = myFriends[index - 1];
        myFriends[index - 1] = temp;
        index--;
      }
      await SellerCustomerModel.updateOne({ myId: userId }, { myFriends });

      const data2 = await SellerCustomerModel.findOne({
        myId: sellerId,
      });
      let myFriends2 = data2.myFriends;
      let index2 = myFriends2.findIndex((f) => f.fdId === userId);
      while (index2 > 0) {
        let temp2 = myFriends2[index2];
        myFriends2[index2] = myFriends2[index2 - 1];
        myFriends2[index2 - 1] = temp2;
        index2--;
      }
      await SellerCustomerModel.updateOne({ myId: sellerId }, { myFriends2 });

      responseReturn(res, 200, { message });
    } catch (error) {
      console.log(error.message);
    }
  };

  GetCustomers = async (req, res) => {
    const { sellerId } = req.params;
    try {
      const data = await SellerCustomerModel.findOne({
        myId: sellerId,
      });
      responseReturn(res, 200, { customers: data.myFriends });
    } catch (error) {
      console.log(error.message);
    }
  };

  GetCustomersSellerMessage = async (req, res) => {
    const { customerId } = req.params;
    const { id } = req;
    try {
      const messages = await SellerCustomerMessageModel.find({
        $or: [
          {
            $and: [
              {
                receverId: customerId,
              },
              {
                senderId: {
                  $eq: id,
                },
              },
            ],
          },
          {
            $and: [
              {
                receverId: id,
              },
              {
                senderId: {
                  $eq: customerId,
                },
              },
            ],
          },
        ],
      });
      const currentCustomer = await CustomerModel.findById(customerId);

      responseReturn(res, 200, { messages, currentCustomer });
    } catch (error) {
      console.log(error.message);
    }
  };

  SellerMessageToCustomer = async (req, res) => {
    const { senderId, receverId, text, name } = req.body;
    try {
      const message = await SellerCustomerMessageModel.create({
        senderId: senderId,
        senderName: name,
        receverId: receverId,
        message: text,
      });
      const data = await SellerCustomerModel.findOne({
        myId: senderId,
      });
      let myFriends = data.myFriends;
      let index = myFriends.findIndex((f) => f.fdId === receverId);
      while (index > 0) {
        let temp = myFriends[index];
        myFriends[index] = myFriends[index - 1];
        myFriends[index - 1] = temp;
        index--;
      }
      await SellerCustomerModel.updateOne({ myId: senderId }, { myFriends });

      const data2 = await SellerCustomerModel.findOne({
        myId: receverId,
      });
      let myFriends2 = data2.myFriends;
      let index2 = myFriends2.findIndex((f) => f.fdId === senderId);
      while (index2 > 0) {
        let temp2 = myFriends2[index2];
        myFriends2[index2] = myFriends2[index2 - 1];
        myFriends2[index2 - 1] = temp2;
        index2--;
      }
      await SellerCustomerModel.updateOne({ myId: receverId }, { myFriends2 });

      responseReturn(res, 200, { message });
    } catch (error) {
      console.log(error.message);
    }
  };

  GetSellers = async (req, res) => {
    try {
      const sellers = await SellerModel.find();
      responseReturn(res, 200, { sellers });
    } catch (error) {
      console.log(error.message);
    }
  };
  SellerAdminMessage = async (req, res) => {
    const { senderId, receverId, message, senderName } = req.body;
    try {
      const messageData = await AdminSellerMessageModel.create({
        senderId,
        receverId,
        message,
        senderName,
      });
      responseReturn(res, 200, { message: messageData });
    } catch (error) {}
  };
  GetAdminMessages = async (req, res) => {
    const { receverId } = req.params;
    const id = "";
    try {
      const messages = await AdminSellerMessageModel.find({
        $or: [
          {
            $and: [
              {
                receverId: receverId,
              },
              {
                senderId: {
                  $eq: id,
                },
              },
            ],
          },
          {
            $and: [
              {
                receverId: id,
              },
              {
                senderId: {
                  $eq: receverId,
                },
              },
            ],
          },
        ],
      });
      let currentSeller = {};
      if (receverId) {
        currentSeller = await SellerModel.findById(receverId);
      }

      responseReturn(res, 200, { messages, currentSeller });
    } catch (error) {
      console.log(error.message);
    }
  };
  GetSellerMessage = async (req, res) => {
    const receverId = "";
    const { id } = req;
    try {
      const messages = await AdminSellerMessageModel.find({
        $or: [
          {
            $and: [
              {
                receverId: { $eq: receverId },
              },
              {
                senderId: {
                  $eq: id,
                },
              },
            ],
          },
          {
            $and: [
              {
                receverId: { $eq: id },
              },
              {
                senderId: {
                  $eq: receverId,
                },
              },
            ],
          },
        ],
      });
      responseReturn(res, 200, { messages });
    } catch (error) {
      console.log(error.message);
    }
  };
}

module.exports = new ChatController();
