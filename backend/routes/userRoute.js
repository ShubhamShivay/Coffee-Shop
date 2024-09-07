import express from "express";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
import { isAdmin } from "../middleware/isAdmin.js";
import {
  registerUserCtrl,
  loginUserCtrl,
  getAllUsersCtrl,
  getUserCtrl,
  updateUserCtrl,
  deleteUserCtrl,
} from "../controller/userCtrl.js";

const userRouter = express.Router();

userRouter.post("/register", registerUserCtrl);
userRouter.post("/login", loginUserCtrl);
userRouter.get("/all", isLoggedIn, isAdmin, getAllUsersCtrl);
userRouter.get("/:id", isLoggedIn, getUserCtrl);
userRouter.put("/:id", isLoggedIn, updateUserCtrl);
userRouter.delete("/:id", isLoggedIn, isAdmin, deleteUserCtrl);

export default userRouter;
