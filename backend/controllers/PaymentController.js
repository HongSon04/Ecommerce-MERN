const { v4: uuidv4 } = require("uuid");
const StripeModel = require("../models/StripeModel");
const stripe = require("stripe")(
  "sk_test_51PObsyRrE4qmG8gzn2IXTiCMCSh7VbmmwFhEJ9ZoWo5tNVPl0qWDcLvLkktSS9mIvgYCig6L91kkEnwtC62MZndp00swkGIfLa"
);
const { responseReturn } = require("../utils/response");

class PaymentController {
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
}

module.exports = new PaymentController();
