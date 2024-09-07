import express from "express";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
import { isAdmin } from "../middleware/isAdmin.js";
import {
    createBrand,
    getAllBrands,
    getSingleBrand,
    updateBrand,
    deleteBrand,
} from "../controller/brandCtrl.js";

const brandRouter = express.Router();

brandRouter.post("/create", isLoggedIn, isAdmin, createBrand);
brandRouter.get("/all", isLoggedIn, getAllBrands);
brandRouter.get("/:id", isLoggedIn, getSingleBrand);
brandRouter.put("/:id", isLoggedIn, isAdmin, updateBrand);
brandRouter.delete("/:id", isLoggedIn, isAdmin, deleteBrand);

export default brandRouter