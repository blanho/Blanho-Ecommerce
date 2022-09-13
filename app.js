require("express-async-errors");
require("dotenv").config();

const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

// database
const connectDB = require("./db/connection");

// Router
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const shipperRouter = require("./routes/shipperRoutes");
const supplierRouter = require("./routes/supplierRoutes");

// Middleware
const notFound = require("./middleware/404");
const errorHandling = require("./middleware/errors");

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET_KEY));
app.use(fileUpload());
app.use(express.static("./public"));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/shipper", shipperRouter);
app.use("/api/v1/supplier", supplierRouter);

// Port
const PORT = process.env.PORT || 5000;

// Error handling
app.use(notFound);
app.use(errorHandling);

const startServer = async (req, res, next) => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server is listening on ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
