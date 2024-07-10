const moment = require("moment");
const CustomerOrderModel = require("../../models/CustomerOrderModel");
const SellerWalletModel = require("../../models/SellerWalletModel");
const AuthOrderModel = require("../../models/AuthOrderModel");
const CartModel = require("../../models/CartModel");
const { responseReturn } = require("../../utils/response");
const {
  mongo: { ObjectId },
} = require("mongoose");
const MyShopWalletModel = require("../../models/MyShopWalletModel");
const Stripe = require("stripe")(
  "sk_test_51PObsyRrE4qmG8gzn2IXTiCMCSh7VbmmwFhEJ9ZoWo5tNVPl0qWDcLvLkktSS9mIvgYCig6L91kkEnwtC62MZndp00swkGIfLa"
);
class OrderController {
  PaymentCheck = async (id) => {
    try {
      const order = await CustomerOrderModel.findById(id);
      if (order.payment_status === "unpaid") {
        await CustomerOrderModel.findByIdAndUpdate(id, {
          payment_status: "cancelled",
        });
        await AuthOrderModel.updateMany(
          { orderId: id },
          { payment_status: "cancelled" }
        );
      }
      return true;
    } catch (error) {
      console.log(error.message);
    }
  };

  PlaceOrder = async (req, res) => {
    const {
      products,
      price,
      shipping_fee,
      items,
      shippingInfo,
      userId,
      navigate,
    } = req.body;
    let authorOrderData = [];
    let cartID = [];
    const tempDate = moment(Date.now()).format("LLL");
    let CustomerOrderProducts = [];
    for (let i = 0; i < products.length; i++) {
      const pro = products[i].products;
      for (let j = 0; j < pro.length; j++) {
        const tempCusPro = pro[j].productInfo;
        tempCusPro.quantity = pro[j].quantity;
        CustomerOrderProducts.push(tempCusPro);
        if (pro[j]._id) {
          cartID.push(pro[j]._id);
        }
      }
    }
    try {
      const order = await CustomerOrderModel.create({
        customerId: userId,
        shippingInfo: shippingInfo,
        products: CustomerOrderProducts,
        price: price + shipping_fee,
        payment_status: "unpaid",
        delivery_status: "pending",
        date: tempDate,
      });
      for (let i = 0; i < products.length; i++) {
        const pro = products[i].products;
        const pri = products[i].price;
        const sellerId = products[i].seller_id;
        let storePro = [];
        for (let j = 0; j < pro.length; j++) {
          const tempPro = pro[j].productInfo;
          tempPro.quantity = pro[j].quantity;
          storePro.push(tempPro);
        }
        authorOrderData.push({
          orderId: order._id,
          sellerId: sellerId,
          products: storePro,
          price: pri,
          payment_status: "unpaid",
          shippingInfo: "Easy Main Warehouse",
          delivery_status: "pending",
          date: tempDate,
        });
      }
      await AuthOrderModel.insertMany(authorOrderData);
      for (let k = 0; k < cartID.length; k++) {
        await CartModel.findByIdAndDelete(cartID[k]);
      }

      setTimeout(() => {
        this.PaymentCheck(order._id);
      }, 15000);

      responseReturn(res, 200, {
        message: "Order Placed Successfully",
        orderID: order._id,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  GetDashboardData = async (req, res) => {
    const { userID } = req.params;
    try {
      const recentOrders = await CustomerOrderModel.find({
        customerId: new ObjectId(userID),
      }).limit(5);
      const pendingOrder = await CustomerOrderModel.find({
        customerId: new ObjectId(userID),
        delivery_status: "pending",
      }).countDocuments();
      const totalOrder = await CustomerOrderModel.find({
        customerId: new ObjectId(userID),
      }).countDocuments();
      const cancelledOrder = await CustomerOrderModel.find({
        customerId: new ObjectId(userID),
        delivery_status: "cancelled",
      }).countDocuments();

      responseReturn(res, 200, {
        recentOrders,
        pendingOrder,
        totalOrder,
        cancelledOrder,
      });
    } catch (error) {}
  };

  GetOrders = async (req, res) => {
    const { customerId, status } = req.params;
    try {
      let orders = [];
      if (status !== "all") {
        orders = await CustomerOrderModel.find({
          customerId: new ObjectId(customerId),
          delivery_status: status,
        });
      } else {
        orders = await CustomerOrderModel.find({
          customerId: new ObjectId(customerId),
        });
      }
      responseReturn(res, 200, { orders });
    } catch (error) {
      console.log(error.message);
    }
  };

  GetOrderDetails = async (req, res) => {
    const { orderId } = req.params;
    try {
      const order = await CustomerOrderModel.findById(orderId);
      if (!order) {
        responseReturn(res, 404, { message: "Order Not Found" });
      } else {
        responseReturn(res, 200, { order });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  GetAdminOrders = async (req, res) => {
    let { page, searchValue, parPage } = req.query;
    page = parseInt(page);
    parPage = parseInt(parPage);
    const skipPage = parPage * (page - 1);
    try {
      if (searchValue) {
        const orders = await CustomerOrderModel.aggregate([
          {
            $lookup: {
              from: "auth_orders",
              localField: "_id",
              foreignField: "orderId",
              as: "subOrders",
            },
          },
        ])
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });

        responseReturn(res, 200, { orders, totalOrder: orders.length });
      } else {
        const orders = await CustomerOrderModel.aggregate([
          {
            $lookup: {
              from: "auth_orders",
              localField: "_id",
              foreignField: "orderId",
              as: "subOrders",
            },
          },
        ])
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });

        responseReturn(res, 200, { orders, totalOrder: orders.length });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  GetAdminOrder = async (req, res) => {
    const { orderId } = req.params;
    try {
      const order = await CustomerOrderModel.aggregate([
        {
          $match: {
            _id: new ObjectId(orderId),
          },
        },
        {
          $lookup: {
            from: "auth_orders",
            localField: "_id",
            foreignField: "orderId",
            as: "subOrders",
          },
        },
      ]);
      responseReturn(res, 200, { order: order[0] });
    } catch (error) {
      console.log(error.message);
    }
  };

  AdminOrderUpdateStatus = async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;
    try {
      await CustomerOrderModel.findByIdAndUpdate(orderId, {
        delivery_status: status,
      });
      // await AuthOrderModel.updateMany(
      //   { orderId: orderId },
      //   { delivery_status: status }
      // );
      responseReturn(res, 200, {
        message: "Order Status Updated Successfully",
      });
    } catch (error) {
      responseReturn(res, 500, { message: error.message });
    }
  };

  GetSellerOrders = async (req, res) => {
    const { sellerId } = req.params;
    let { page, searchValue, parPage } = req.query;
    page = parseInt(page);
    parPage = parseInt(parPage);

    const skipPage = parPage * (page - 1);
    try {
      if (searchValue) {
      } else {
        const orders = await AuthOrderModel.find({
          sellerId,
        })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });

        const totalOrder = await AuthOrderModel.find({
          sellerId,
        }).countDocuments();
        responseReturn(res, 200, { orders, totalOrder });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  GetSellerOrder = async (req, res) => {
    const { orderId } = req.params;
    try {
      const order = await AuthOrderModel.findById(orderId);
      responseReturn(res, 200, { order });
    } catch (error) {
      console.log(error.message);
    }
  };

  SellerOrderUpdateStatus = async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;
    try {
      await AuthOrderModel.findByIdAndUpdate(orderId, {
        delivery_status: status,
      });

      responseReturn(res, 200, {
        message: "Order Status Updated Successfully",
      });
    } catch (error) {
      responseReturn(res, 500, { message: error.message });
    }
  };

  CreatePayment = async (req, res) => {
    const { price } = req.body;
    try {
      const payment = await Stripe.paymentIntents.create({
        amount: price * 100,
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
        },
      });
      responseReturn(res, 200, { clientSecret: payment.client_secret });
    } catch (error) {
      console.log(error.message);
    }
  };

  OrderConfirm = async (req, res) => {
    const { orderId } = req.params;
    try {
      await CustomerOrderModel.findByIdAndUpdate(orderId, {
        payment_status: "paid",
      });

      await AuthOrderModel.updateMany(
        { orderId: orderId },
        { payment_status: "paid" }
      );
      const CustomerOrder = await CustomerOrderModel.findById(orderId);
      const AuthOrder = await AuthOrderModel.find({ orderId: orderId });

      const time = moment(Date.now()).format("l");
      const splitTime = time.split("/");

      await MyShopWalletModel.create({
        amount: CustomerOrder.price,
        month: splitTime[0],
        year: splitTime[2],
      });

      for (let i = 0; i < AuthOrder.length; i++) {
        await SellerWalletModel.create({
          sellerId: AuthOrder[i].sellerId.toString(),
          amount: AuthOrder[i].price,
          month: splitTime[0],
          year: splitTime[2],
        });
      }

      responseReturn(res, 200, { message: "Order Confirmed" });
    } catch (error) {
      console.log(error.message);
    }
  };
}

module.exports = new OrderController();
