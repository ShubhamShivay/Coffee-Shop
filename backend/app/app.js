import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import dbConnect from "../config/dbConnect.js";
import {
  globalErrorHandler,
  notFound,
} from "../middleware/globalErrorHandler.js";
import userRoute from "../routes/userRoute.js";
import productRouter from "../routes/productRoute.js";
import brandRouter from "../routes/brandRoute.js";
import categoryRouter from "../routes/categoryRoute.js";
import cartRoute from "../routes/cartRoute.js";

dbConnect();
const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Pass incoming Data
app.use(express.json());

app.use("/api/user", userRoute);
app.use("/api/product", productRouter);
app.use("/api/brand", brandRouter);
app.use("/api/category", categoryRouter);
app.use("/api/cart", cartRoute);

//! Error Handling
app.use(notFound);
app.use(globalErrorHandler);

export default app;
