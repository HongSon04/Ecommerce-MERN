const AdminModel = require("../models/AdminModel");
const { responseReturn } = require("../utils/response");
const bcrypt = require("bcryptjs");
const { createToken } = require("../utils/createToken");

class AuthController {
  // ? Admin Login
  AdminLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
      const admin = await AdminModel.findOne({ email }).select("+password");
      if (admin) {
        const match = await bcrypt.compareSync(password, admin.password);
        if (match) {
          const token = await createToken({ id: admin._id, role: admin.role });
          res.cookie("accessToken", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          });
          responseReturn(res, 200, { token, message: "Login Success" });
        } else {
          responseReturn(res, 400, { error: "Password not match" });
        }
      } else {
        responseReturn(res, 404, { error: "Email not Found" });
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  // ? Get User
  getUser = async (req, res) => {
    const { id, role } = req;
    try {
      if (role === "admin") {
        const user = await AdminModel.findById(id);
        if (user) {
          responseReturn(res, 200, { userInfo: user });
        } else {
          responseReturn(res, 400, { error: "User not found" });
        }
      } else {
        responseReturn(res, 400, { error: "User not found" });
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
}

module.exports = new AuthController();
