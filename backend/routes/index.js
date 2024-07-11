const routes = require("express").Router();

const AuthRouter = require("./authRoutes");
const ChatRouter = require("./ChatRoutes");
const CategoryRouter = require("./dashboard/categoryRoutes");
const DashboardRouter = require("./dashboard/DashboardRoutes");
const ProductRouter = require("./dashboard/productRoutes");
const SellerRouter = require("./dashboard/sellerRoutes");
const CartRouter = require("./home/CartRoutes");
const CustomerAuthRouter = require("./home/CustomerAuthRoutes");
const HomeRouter = require("./home/HomeRoutes");
const OrderRouter = require("./order/OrderRoutes");
const PaymentRouter = require("./PaymentRoutes");

routes.use("/", AuthRouter);
routes.use("/", CategoryRouter);
routes.use("/", ProductRouter);
routes.use("/", SellerRouter);

routes.use("/home", HomeRouter);
routes.use("/home", CartRouter);

routes.use("/customer", CustomerAuthRouter);

routes.use("/order", OrderRouter);
routes.use("/chat", ChatRouter);
routes.use("/payment", PaymentRouter);

routes.use("/", DashboardRouter);

module.exports = routes;
