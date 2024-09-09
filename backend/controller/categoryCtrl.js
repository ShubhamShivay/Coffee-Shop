import Category from "../model/Category.js";
import asyncHandler from "express-async-handler";
import lowerCaseExceptPassword from "../utils/lowerCaseExceptPassword.js";

// ! @desc      create category
// ! @route     /api/category/create
// ! @access    Admin only

export const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  //! check if category already exists
  const categoryExists = await Category.findOne({ name: name.toLowerCase() });
  if (categoryExists) {
    throw new Error("Category already exists");
  }
  // console.log(req.user._id)
  const category = await Category.create({
    name: name.toLowerCase(),
    user: req.user._id,
  });

  res.json({
    status: "Success",
    message: "Category created successfully",
    category,
  });
});

// ! @desc      get all categories
// ! @route     /api/category
// ! @access    Public

export const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.json({
    status: "Success",
    message: "All categories fetched sucessfully",
    categories,
  });
});

// ! @desc      get single category
// ! @route     /api/category/:id
// ! @access    Public

export const getSingleCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  // console.log(category);
  if (!category) {
    throw new Error("Category not found.");
  }
  res.json({
    status: "Success",
    message: "Category fetched successful",
    data: category,
  });
});

// ! @desc      update category
// ! @route     /api/category/:id
// ! @access    Admin only

export const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    throw new Error("Category not found.");
  }

  const data = lowerCaseExceptPassword(req.body);

  const updatedCategory = await Category.findByIdAndUpdate(
    req.params.id,
    {
      ...data,
    },
    {
      new: true,
    }
  );

  res.json({
    status: "Success",
    message: "Category updated successfully",
    category: updatedCategory,
  });
});

// ! @desc      delete category
// ! @route     /api/category/:id
// ! @access    Admin only

export const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    throw new Error("Category not found.");
  }

  await category.deleteOne();

  res.json({
    status: "Success",
    message: "Category deleted successfully",
    category,
  });
});
