import User from "../model/User.js";
import asyncHandler from "express-async-handler";
import { getTokenFromHeader } from "../utils/getTokenFromHeader.js";
import { verifyToken } from "../utils/verifyToken.js";

export const isAdmin = asyncHandler(async (req, res, next) => {
  const token = getTokenFromHeader(req);
  const decoded = verifyToken(token);
  const user = await User.findById(decoded?._id);
  if (user?.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
});
