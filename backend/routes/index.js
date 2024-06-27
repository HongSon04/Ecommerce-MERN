const routes = require("express").Router();

const AuthRouter = require("./authRoutes");
const CategoryRouter = require("./dashboard/categoryRoutes");
const ProductRouter = require("./dashboard/productRoutes");
const SellerRouter = require("./dashboard/sellerRoutes");
const CartRouter = require("./home/CartRoutes");
const CustomerAuthRouter = require("./home/CustomerAuthRoutes");
const HomeRouter = require("./home/HomeRoutes");

routes.use("/", AuthRouter);
routes.use("/", CategoryRouter);
routes.use("/", ProductRouter);
routes.use("/", SellerRouter);

routes.use("/home", HomeRouter);
routes.use("/home", CartRouter);

routes.use("/customer", CustomerAuthRouter);

module.exports = routes;
