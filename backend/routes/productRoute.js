import express from "express";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
import {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} from "../controller/productCtrl.js";
import { isAdmin } from "../middleware/isAdmin.js";

const productRouter = express.Router();

productRouter.post("/create", isLoggedIn, isAdmin, createProduct);
productRouter.get("/all", isLoggedIn, getAllProducts); 
productRouter.get("/:id", isLoggedIn, getSingleProduct);
productRouter.put("/:id", isLoggedIn, isAdmin, updateProduct);
productRouter.delete("/:id", isLoggedIn, isAdmin, deleteProduct);

export default productRouter;
