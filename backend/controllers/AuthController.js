const cloudinary = require("cloudinary").v2;
const formidable = require("formidable");
const bcrypt = require("bcryptjs");
const { createToken } = require("../utils/createToken");
const { responseReturn } = require("../utils/response");
const AdminModel = require("../models/AdminModel");
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
        const user = await AdminModel.findById(id).select("-password");
        if (user) {
          responseReturn(res, 200, { userInfo: user });
        } else {
          responseReturn(res, 400, { error: "User not found" });
        }
      } else {
        const seller = await SellerModel.findById(id).select("-password");
        if (seller) {
          responseReturn(res, 200, { userInfo: seller });
        } else {
          responseReturn(res, 400, { error: "User not found" });
        }
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
  // ? Profile Image Upload
  ProfileImageUpload = async (req, res) => {
    const { id } = req;
    const form = formidable({ multiples: true });
    form.parse(req, async (err, _, files) => {
      cloudinary.config({
        cloud_name: process.env.CLOUD_DINARY_NAME,
        api_key: process.env.CLOUD_DINARY_API_KEY,
        api_secret: process.env.CLOUD_DINARY_API_SECRET,
        secure: true,
      });
      const { image } = files;
      try {
        const result = await cloudinary.uploader.upload(image.filepath, {
          folder: "profile",

          transformation: [
            { width: 250, crop: "scale" },
            { quality: 35 },
            { fetch_format: "auto" },
          ],
        });
        if (result) {
          await SellerModel.findByIdAndUpdate(id, {
            image: result.secure_url,
          });
          const userInfo = await SellerModel.findById(id).select("-password");
          responseReturn(res, 200, {
            userInfo,
            message: "Image Uploaded Successfully",
          });
        } else {
          responseReturn(res, 400, { error: "Failed to upload image" });
        }
      } catch (error) {
        responseReturn(res, 500, { error: "Internal Server Error" });
      }
    });
  };
  // ? Profile Info Add
  ProfileInfoAdd = async (req, res) => {
    const { id } = req;
    const { division, district, shopName, sub_district } = req.body;
    try {
      await SellerModel.findByIdAndUpdate(id, {
        shopInfo: {
          division,
          district,
          shopName,
          sub_district,
        },
      });
      const userInfo = await SellerModel.findById(id).select("-password");
      responseReturn(res, 200, {
        userInfo,
        message: "Profile Info Added Successfully",
      });
    } catch (error) {
      responseReturn(res, 500, { error: "Internal Server Error" });
    }
  };
  Logout = async (req, res) => {
    try {
      res.cookie("accessToken", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });
      responseReturn(res, 200, { message: "Logout Successfully" });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
}

module.exports = new AuthController();
