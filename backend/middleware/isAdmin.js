import User from "../model/User.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";

export const isAdmin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
});
