const categoryController = require("../../controllers/dashboard/categoryController");
const { AuthMiddleware } = require("../../middlewares/AuthMiddleware");

const router = require("express").Router();

router.get("/category-get", AuthMiddleware, categoryController.getCategory);
router.post("/category-add", AuthMiddleware, categoryController.addCategory);

module.exports = router;
