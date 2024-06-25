const HomeController = require("../../controllers/home/HomeController");

const HomeRouter = require("express").Router();

HomeRouter.get("/get-categories", HomeController.GetCategories);
HomeRouter.get("/get-products", HomeController.GetProducts);

module.exports = HomeRouter;
