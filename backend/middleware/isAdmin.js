import User from "../model/User.js";

export const isAdmin = async (req, res, next) => {
  //! find the login user
  // console.log(req.user.payload);
  // console.log(req.user._id);
  const user = await User.findById(req.user._id);
  // console.log(user);
  //! Check user is Admin
  if (!user.isAdmin) {
    return res.status(401).json({
      status: "Failed",
      message: "Unauthorized, Access Denied, Admin only",
    });
  }

  return next();
};
