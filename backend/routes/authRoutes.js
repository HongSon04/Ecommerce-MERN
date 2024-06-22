const AuthController = require("../controllers/AuthController");
const { AuthMiddleware } = require("../middlewares/AuthMiddleware");

const router = require("express").Router();

router.post("/admin/login", AuthController.AdminLogin);
router.get("/get-user", AuthMiddleware, AuthController.getUser);
router.post("/seller-register", AuthController.SellerRegister);
router.post("/seller-login", AuthController.SellerLogin);
router.post(
  "/profile-image-upload",
  AuthMiddleware,
  AuthController.ProfileImageUpload
);

module.exports = router;
