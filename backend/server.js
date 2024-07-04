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
const addUser = (customerId, userInfo, socketId) => {
  const checkUser = allCustomer.some((user) => user.customerId === customerId);
  if (!checkUser) {
    allCustomer.push({ customerId, userInfo, socketId });
  } else {
    allCustomer = allCustomer.map((user) =>
      user.customerId === customerId ? { customerId, userInfo, socketId } : user
    );
  }
};

io.on("connection", (socket) => {
  console.log("Socket connected: ", socket.id);

  socket.on("add_user", (customerId, userInfo) => {
    addUser(customerId, userInfo, socket.id);
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
