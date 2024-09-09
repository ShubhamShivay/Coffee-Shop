import express from "express";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
import { isAdmin } from "../middleware/isAdmin.js";
import {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
} from "../controller/categoryCtrl.js";

const categoryRouter = express.Router();

categoryRouter.post("/create", isLoggedIn, isAdmin, createCategory);
categoryRouter.get("/all", isLoggedIn, getAllCategories);
categoryRouter.get("/:id", isLoggedIn, getSingleCategory);
categoryRouter.put("/:id", isLoggedIn, isAdmin, updateCategory);
categoryRouter.delete("/:id", isLoggedIn, isAdmin, deleteCategory);

export default categoryRouter;
