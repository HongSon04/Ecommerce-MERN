const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { dbConnect } = require("./utils/db");
require("dotenv").config();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // ? Cho phép gửi cookie từ client
  })
);

app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api", require("./routes/authRoutes"));

// ? Port
const port = process.env.PORT || 5000;
dbConnect();
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
