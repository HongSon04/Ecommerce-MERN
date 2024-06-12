const AuthController = require("../controllers/AuthController");
const { AuthMiddleware } = require("../middlewares/AuthMiddleware");

const router = require("express").Router();

router.post("/admin/login", AuthController.AdminLogin);
router.get("/get-user", AuthMiddleware, AuthController.getUser);

module.exports = router;
