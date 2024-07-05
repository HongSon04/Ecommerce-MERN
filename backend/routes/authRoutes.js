const AuthController = require("../controllers/AuthController");
const { AuthMiddleware } = require("../middlewares/AuthMiddleware");

const AuthRouter = require("express").Router();

AuthRouter.post("/admin/login", AuthController.AdminLogin);
AuthRouter.get("/get-user", AuthMiddleware, AuthController.getUser);
AuthRouter.post("/seller-register", AuthController.SellerRegister);
AuthRouter.post("/seller-login", AuthController.SellerLogin);
AuthRouter.post(
  "/profile-image-upload",
  AuthMiddleware,
  AuthController.ProfileImageUpload
);
AuthRouter.post(
  "/profile-info-add",
  AuthMiddleware,
  AuthController.ProfileInfoAdd
);

AuthRouter.get("/logout", AuthController.Logout);

module.exports = AuthRouter;
