import express from "express";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
import { isAdmin } from "../middleware/isAdmin.js";
import {
  createCategoryCtrl,
  getAllCategoriesCtrl,
  getSingleCategoryCtrl,
  updateCategoryCtrl,
  deleteCategoryCtrl,
} from "../controller/categoryCtrl.js";

const categoryRouter = express.Router();

categoryRouter.post("/create", isLoggedIn, isAdmin, createCategoryCtrl);
categoryRouter.get("/all", isLoggedIn, getAllCategoriesCtrl);
categoryRouter.get("/:id", isLoggedIn, getSingleCategoryCtrl);
categoryRouter.put("/:id", isLoggedIn, isAdmin, updateCategoryCtrl);
categoryRouter.delete("/:id", isLoggedIn, isAdmin, deleteCategoryCtrl);

export default categoryRouter;

