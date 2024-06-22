const CategoryController = require("../../controllers/dashboard/CategoryController");
const { AuthMiddleware } = require("../../middlewares/AuthMiddleware");

const CategoryRouter = require("express").Router();

CategoryRouter.get(
  "/category-get",
  AuthMiddleware,
  CategoryController.getCategory
);

CategoryRouter.post(
  "/category-add",
  AuthMiddleware,
  CategoryController.addCategory
);

module.exports = CategoryRouter;
