const { v4: uuidv4 } = require("uuid");
const StripeModel = require("../models/StripeModel");
const stripe = require("stripe")(
  "sk_test_51PObsyRrE4qmG8gzn2IXTiCMCSh7VbmmwFhEJ9ZoWo5tNVPl0qWDcLvLkktSS9mIvgYCig6L91kkEnwtC62MZndp00swkGIfLa"
);
const SellerModel = require("../models/SellerModel");
const { responseReturn } = require("../utils/response");
const WithdrawRequestModel = require("../models/WithDrawRequestModel");
const SellerWalletModel = require("../models/SellerWalletModel");
const {
  mongo: { ObjectId },
} = require("mongoose");
class PaymentController {
  sumAmount = (data) => {
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      sum += data[i].amount;
    }
    return sum;
  };

  CreateStripeConnectAccount = async (req, res) => {
    const { id } = req;
    const uid = uuidv4();
    try {
      const stripeInfo = await StripeModel.findOne({ sellerId: id });
      if (stripeInfo) {
        await StripeModel.deleteOne({ sellerId: id });
        const account = await stripe.accounts.create({
          type: "express",
        });
        const accountLink = await stripe.accountLinks.create({
          account: account.id,
          refresh_url: "http://localhost:3001/refresh",
          return_url: `http://localhost:3001/success?activeCode=${uid}`,
          type: "account_onboarding",
        });
        await StripeModel.create({
          sellerId: id,
          stripeId: account.id,
          code: uid,
        });
        responseReturn(res, 200, { url: accountLink.url });
      } else {
        const account = await stripe.accounts.create({
          type: "express",
        });
        const accountLink = await stripe.accountLinks.create({
          account: account.id,
          refresh_url: "http://localhost:3000/refresh",
          return_url: `http://localhost:3000/success?activeCode=${uid}`,
          type: "account_onboarding",
        });
        await StripeModel.create({
          sellerId: id,
          stripeId: account.id,
          code: uid,
        });
        responseReturn(res, 200, { url: accountLink.url });
      }
    } catch (error) {
      responseReturn(res, 500, { message: error.message });
    }
  };

  ActiveStripeConnectAccount = async (req, res) => {
    const { activeCode } = req.params;
    const { id } = req;
    try {
      const userStripeInfo = await StripeModel.findOne({ code: activeCode });
      if (userStripeInfo) {
        await SellerModel.findByIdAndUpdate(id, {
          payment: "active",
        });
        responseReturn(res, 200, { message: "Payment Active Successfully" });
      } else {
        responseReturn(res, 404, { message: "Payment Active Fails" });
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  GetSellerPaymentDetails = async (req, res) => {
    const { sellerId } = req.params;
    try {
      // ? Get all payments
      const payments = await SellerWalletModel.find({ sellerId }).sort({
        createdAt: -1,
      });

      const pendingWithdraws = await WithdrawRequestModel.find({
        $and: [
          {
            sellerId: {
              $eq: sellerId,
            },
          },
          {
            status: {
              $eq: "pending",
            },
          },
        ],
      });

      const successWithdraws = await WithdrawRequestModel.find({
        $and: [
          {
            sellerId: {
              $eq: sellerId,
            },
          },
          {
            status: {
              $eq: "success",
            },
          },
        ],
      });
      // ! End of get all payments
      // ? Calculate all amount
      const pendingAmount = this.sumAmount(pendingWithdraws);
      const withdrawAmount = this.sumAmount(successWithdraws);
      const totalAmount = this.sumAmount(payments);

      let availableAmount = 0;
      if (availableAmount >= 0) {
        availableAmount = totalAmount - (pendingAmount + withdrawAmount);
      }

      responseReturn(res, 200, {
        pendingWithdraws,
        successWithdraws,
        totalAmount,
        withdrawAmount,
        pendingAmount,
        availableAmount,
      });
      // ! End of calculate all amount
    } catch (error) {
      console.log(error.message);
    }
  };

  SendWithDrawRequest = async (req, res) => {
    const { amount, sellerId } = req.body;
    try {
      const withdraw = await WithdrawRequestModel.create({
        sellerId,
        amount: parseInt(amount),
      });
      responseReturn(res, 200, {
        withdraw,
        message: "Withdraw Request Send Successfully",
      });
    } catch (error) {
      console.log(error.message);
      responseReturn(res, 500, { message: "Internal Server Error" });
    }
  };

  GetPaymentRequest = async (req, res) => {
    try {
      const withdrawRequest = await WithdrawRequestModel.find().sort({
        createdAt: -1,
      });
      responseReturn(res, 200, { withdrawRequest });
    } catch (error) {
      console.log(error.message);
      responseReturn(res, 500, { message: "Internal Server Error" });
    }
  };

  ConfirmPaymentRequest = async (req, res) => {
    const { paymentId } = req.params;
    try {
      const payment = await WithdrawRequestModel.findByIdAndUpdate(paymentId, {
        status: "success",
      });
      const { stripeId } = await StripeModel.findOne({
        sellerId: new ObjectId(payment.sellerId),
      });
      await stripe.transfers.create({
        amount: payment.amount * 100,
        currency: "usd",
        destination: stripeId,
      });

      await WithdrawRequestModel.findByIdAndUpdate(paymentId, {
        status: "success",
      });
      responseReturn(res, 200, {
        payment,
        message: "Payment Confirm Successfully",
      });
    } catch (error) {
      console.log(error.message);
      responseReturn(res, 500, { message: "Internal Server Error" });
    }
  };
}

module.exports = new PaymentController();
