const AdminModel = require("../models/AdminModel");
const { responseReturn } = require("../utils/response");
const bcrypt = require("bcrypt");
const { createToken } = require("../utils/createToken");

class AuthController {
  AdminLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
      const admin = await AdminModel.findOne({ email }).select("+password");
      console.log(admin);
      if (admin) {
        const match = await bcrypt.compare(password, admin.password);
        if (match) {
          const token = await createToken({ id: admin._id, role: admin.role });
          res.cookie("accessToken", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          });
          responseReturn(res, 200, { message: "Login Success" });
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
}

module.exports = new AuthController();
