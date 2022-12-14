require("express-async-errors");
require("dotenv").config();

const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");

// database
const connectDB = require("./db/connection");

// Router
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const shipperRouter = require("./routes/shipperRoutes");
const supplierRouter = require("./routes/supplierRoutes");
const productRouter = require("./routes/productRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const orderRoutes = require("./routes/orderRoutes");

// Middleware
const notFound = require("./middleware/404");
const errorHandling = require("./middleware/errors");

app.use("/public", express.static("public"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET_KEY));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/shippers", shipperRouter);
app.use("/api/v1/suppliers", supplierRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/orders", orderRoutes);

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
