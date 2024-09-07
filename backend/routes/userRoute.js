import express from "express";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
import { isAdmin } from "../middleware/isAdmin.js";
import {
  registerUserCtrl,
  loginUserCtrl,
  getAllUsersCtrl,
  getUserCtrl,
  updateUserCtrl,
} from "../controller/userCtrl.js";

const userRouter = express.Router();

userRouter.post("/api/users/register", registerUserCtrl);
userRouter.post("/api/users/login", loginUserCtrl);
userRouter.get("/api/users/all", isLoggedIn, isAdmin, getAllUsersCtrl);
userRouter.get("/api/users/:id", isLoggedIn, getUserCtrl);
userRouter.post("/api/users/:id", isLoggedIn, updateUserCtrl);

export default userRouter;
