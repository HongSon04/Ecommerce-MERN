const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { dbConnect } = require("./utils/db");
require("dotenv").config();
const socket = require("socket.io");
const http = require("http");
const server = http.createServer(app);

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true, // ? Cho phép gửi cookie từ client
  })
);

const io = socket(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

var allCustomer = [];
var allSeller = [];
var admin = {};
const addUser = (customerId, userInfo, socketId) => {
  const checkUser = allCustomer.some((user) => user.customerId === customerId);
  if (!checkUser) {
    allCustomer.push({ customerId, userInfo, socketId });
  }
};

const addSeller = (sellerId, userInfo, socketId) => {
  const checkUser = allSeller.some((user) => user.sellerId === sellerId);
  if (!checkUser) {
    allSeller.push({ sellerId, userInfo, socketId });
  }
};

const findCustomer = (customerId) => {
  return allCustomer.find((customer) => customer.customerId === customerId);
};

const findSeller = (sellerId) => {
  return allSeller.find((seller) => seller.sellerId === sellerId);
};

const remove = (socketId) => {
  allCustomer = allCustomer.filter(
    (customer) => customer.socketId !== socketId
  );
  allSeller = allSeller.filter((seller) => seller.socketId !== socketId);
};

io.on("connection", (socket) => {
  socket.on("add_user", (customerId, userInfo) => {
    addUser(customerId, userInfo, socket.id);
    io.emit("activeSeller", allSeller);
    io.emit("activeCustomer", allCustomer);
  });

  socket.on("add_seller", (sellerId, userInfo) => {
    addSeller(sellerId, userInfo, socket.id);
    io.emit("activeSeller", allSeller);
    io.emit("activeCustomer", allCustomer);
  });
  socket.on("send_seller_message", (msg) => {
    const customer = findCustomer(msg.receverId);
    if (customer !== undefined) {
      socket.to(customer.socketId).emit("seller_message", msg);
    }
  });
  socket.on("send_customer_message", (msg) => {
    const seller = findSeller(msg.receverId);
    if (seller !== undefined) {
      socket.to(seller.socketId).emit("customer_message", msg);
    }
  });
  socket.on("send_msg_admin_to_seller", (msg) => {
    const seller = findSeller(msg.receverId);
    if (seller !== undefined) {
      socket.to(seller.socketId).emit("recever_admin_message", msg);
    }
  });
  socket.on("send_msg_seller_to_admin", (msg) => {
    if (admin.socketId) {
      console.log(msg);
      socket.to(admin.socketId).emit("recever_admin_message", msg);
    }
  });

  socket.on("add_admin", (adminInfo) => {
    delete adminInfo.email;
    delete adminInfo.password;
    admin = adminInfo;
    admin.socketId = socket.id;
    io.emit("activeSeller", allSeller);
    io.emit("activeCustomer", allCustomer);
  });

  socket.on("disconnect", () => {
    remove(socket.id);
    io.emit("activeSeller", allSeller);
    io.emit("activeCustomer", allCustomer);
  });
});

app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api", require("./routes/index"));

// ? Port
const port = process.env.PORT || 5000;
dbConnect();
server.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
