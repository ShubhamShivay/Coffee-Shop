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

dbConnect();
const app = express();

app.use(cors());

// Pass incoming Data
app.use(express.json());

app.use("/api/user", userRoute);
app.use("/api/product", productRouter);
app.use("/api/brand", brandRouter);
app.use("/api/category", categoryRouter);

//! Error Handling
app.use(notFound);
app.use(globalErrorHandler);

export default app;
