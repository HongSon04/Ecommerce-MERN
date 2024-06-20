const CategoryController = require("../../controllers/dashboard/CategoryController");
const { AuthMiddleware } = require("../../middlewares/AuthMiddleware");

const router = require("express").Router();

router.get("/category-get", AuthMiddleware, CategoryController.getCategory);

router.post("/category-add", AuthMiddleware, CategoryController.addCategory);

module.exports = router;
