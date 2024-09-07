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

dbConnect();
const app = express();

app.use(cors());

// Pass incoming Data
app.use(express.json());

app.use("/", userRoute);

//! Error Handling
app.use(notFound);
app.use(globalErrorHandler);

export default app;
