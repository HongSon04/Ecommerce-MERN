const routes = require("express").Router();

const AuthRouter = require("./authRoutes");
const CategoryRouter = require("./dashboard/categoryRoutes");
const ProductRouter = require("./dashboard/productRoutes");
const SellerRouter = require("./dashboard/sellerRoutes");

routes.use("/", AuthRouter);
routes.use("/", CategoryRouter);
routes.use("/", ProductRouter);
routes.use("/", SellerRouter);

module.exports = routes;
