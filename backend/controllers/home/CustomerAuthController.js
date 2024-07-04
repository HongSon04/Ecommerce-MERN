const SellerCustomerModel = require("../../models/chat/SellerCustomerModel");
const CustomerModel = require("../../models/CustomerModel");
const { createToken } = require("../../utils/createToken");
const { responseReturn } = require("../../utils/response");
const bcrypt = require("bcryptjs");

class CustomerAuthController {
  CustomerRegister = async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const customer = await CustomerModel.findOne({ email });
      if (customer) {
        responseReturn(res, 400, { error: "Email already exists" });
      } else {
        const newCustomer = await CustomerModel.create({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password: await bcrypt.hash(password, 10),
          method: "manualy",
        });
        await SellerCustomerModel.create({
          myId: newCustomer._id,
        });
        const token = await createToken({
          id: newCustomer._id,
          name: newCustomer.name,
          email: newCustomer.email,
          method: newCustomer.method,
        });
        res.cookie("customerToken", token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
       
        responseReturn(res, 201, {
          token,
          message: "User Register successfully",
        });
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  CustomerLogin = async (req, res) => {
    let { email, password } = req.body;
    try {
      const customer = await CustomerModel.findOne({ email }).select(
        "+password"
      );
      if (!customer) {
        responseReturn(res, 400, { error: "Email Not Found" });
      } else {
        const passwordMatch = await bcrypt.compare(password, customer.password);
        if (!passwordMatch) {
          responseReturn(res, 400, { error: "Password Not Match" });
        } else {
          const token = await createToken({
            id: customer._id,
            name: customer.name,
            email: customer.email,
            method: customer.method,
          });
          res.cookie("customerToken", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          });
          responseReturn(res, 200, {
            token,
            message: "User Login Successfully",
          });
        }
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
  CustomerLogout = async (req, res) => {
    try {
      res.clearCookie("customerToken");
      responseReturn(res, 200, { message: "Logout Successfully" });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
}

module.exports = new CustomerAuthController();
