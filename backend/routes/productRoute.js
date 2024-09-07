import express from "express";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
import {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} from "../controller/productCtrl";

const productRouter = express.Router();

productRouter.post("/api/product/create", isLoggedIn, createProduct);
productRouter.get("/api/product", isLoggedIn, getAllProducts);
productRouter.get("/api/product/:id", isLoggedIn, getSingleProduct);
productRouter.put("/api/product/:id", isLoggedIn, updateProduct);
productRouter.delete("/api/product/:id", isLoggedIn, deleteProduct);

export default productRouter;
