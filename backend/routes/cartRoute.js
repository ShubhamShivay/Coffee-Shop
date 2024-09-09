import express from "express";

import {
  getUserCart,
  addProductToCart,
  removeProductFromCart,
} from "../controller/cartsCtrl.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";

const router = express.Router();

router.get("/all", isLoggedIn, getUserCart);
router.post("/", isLoggedIn, addProductToCart);
router.delete("/", isLoggedIn, removeProductFromCart);

export default router;
