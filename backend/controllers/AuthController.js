const AdminModel = require("../models/AdminModel");
const { responseReturn } = require("../utils/response");
const bcrypt = require("bcryptjs");
const { createToken } = require("../utils/createToken");
const SellerModel = require("../models/SellerModel");
const SellerCustomerModel = require("../models/chat/SellerCustomerModel");

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
      // ? Admin
      if (role === "admin") {
        const user = await AdminModel.findById(id);
        if (user) {
          responseReturn(res, 200, { userInfo: user });
        } else {
          responseReturn(res, 400, { error: "User not found" });
        }
      } else if (role === "seller") {
        const seller = await SellerModel.findById(id);
        if (seller) {
          responseReturn(res, 200, { userInfo: seller });
        } else {
          responseReturn(res, 400, { error: "User not found" });
        }
      } else {
        responseReturn(res, 400, { error: "User not found" });
      }
    } catch (error) {
      responseReturn(res, 500, { error: "Internal Server Error" });
    }
  };

  // ? Register Seller
  SellerRegister = async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const getSeller = await SellerModel.findOne({ email });
      if (getSeller) {
        responseReturn(res, 400, { error: "Email already exist" });
      } else {
        const hashPassword = await bcrypt.hashSync(password, 10);

        const seller = await SellerModel.create({
          name,
          email,
          password: hashPassword,
          method: "manual",
        });

        await SellerCustomerModel.create({
          myId: seller.id,
        });

        const token = await createToken({ id: seller.id, role: seller.role });
        res.cookie("accessToken", token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });

        if (seller) {
          responseReturn(res, 200, { token, message: "Register Success" });
        } else {
          responseReturn(res, 400, { error: "Failed to create seller" });
        }
      }
    } catch (error) {
      responseReturn(res, 500, { error: "Internal Server Error" });
    }
  };

  // ? Login Seller
  SellerLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
      const getSeller = await SellerModel.findOne({ email }).select(
        "+password"
      );
      if (getSeller) {
        const match = await bcrypt.compareSync(password, getSeller.password);
        if (match) {
          const token = await createToken({
            id: getSeller._id,
            role: getSeller.role,
          });
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
      responseReturn(res, 500, { error: "Internal Server Error" });
    }
  };
}

module.exports = new AuthController();
