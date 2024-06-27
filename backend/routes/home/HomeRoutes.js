const HomeController = require("../../controllers/home/HomeController");

const HomeRouter = require("express").Router();

HomeRouter.get("/get-categories", HomeController.GetCategories);
HomeRouter.get("/get-products", HomeController.GetProducts);
HomeRouter.get("/price-range-lastest-product", HomeController.PriceRangeProduct);
HomeRouter.get("/query-products", HomeController.QueryProducts);

module.exports = HomeRouter;
