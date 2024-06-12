const AuthController = require("../controllers/AuthController");

const router = require("express").Router();

router.post("/admin/login", AuthController.AdminLogin);

module.exports = router;
