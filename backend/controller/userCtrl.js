import User from "../model/User.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import lowerCaseExceptPassword from "../utils/lowerCaseExceptPassword.js";

export const registerUserCtrl = asyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body;

  if (!fullname || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if user exists
  const userExists = await User.findOne({ email: email.toLowerCase() });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    fullname: fullname.toLowerCase(),
    email: email.toLowerCase(),
    password: hashedPassword,
  });

  res.status(201).json({
    message: "Register User",
    user: user,
    token: generateToken(user),
  });
});

//! @desc Login user
//! @route POST /api/users/login
//! @access Public

export const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if user exists
  const user = await User.findOne({ email: email.toLowerCase() });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      message: "Login User",
      user: user,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

//! @desc Get all user data
//! @route GET /api/users/me
//! @access Private/Admin

export const getAllUsersCtrl = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

//! @desc Get single user data
//! @route GET /api/users/:id
//! @access Private/Admin

export const getUserCtrl = asyncHandler(async (req, res) => {
  // console.log(req.params.id);
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.json({
    status: "Success",
    message: "Get User",
    data: user,
  });
});

//! @desc Update user
//! @route PUT /api/users/:id
//! @access Private/Admin

export const updateUserCtrl = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  let data = lowerCaseExceptPassword(req.body);
  // console.log(data);

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      ...data,
    },
    {
      new: true,
    }
  );

  res.json({
    message: "Update User",
    data: updatedUser,
  });
});

//! @desc Delete user
//! @route DELETE /api/users/:id
//! @access Private/Admin

export const deleteUserCtrl = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  await user.deleteOne();
  res.json({
    message: "Delete User",
    data: user,
  });
});
