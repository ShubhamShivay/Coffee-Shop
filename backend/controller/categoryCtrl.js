import category from "../model/Category";
import asyncHandler from "express-async-handler";
import lowerCaseExceptPassword from "../utils/lowerCaseExceptPassword";

// ! @desc      create category
// ! @route     /api/category/create
// ! @access    Admin only

export const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  //! check if category already exists
  const categoryExists = await category.findOne({ name: name.toLowerCase() });
  if (categoryExists) {
    throw new Error("Category already exists");
  }

  const category = await category.create({
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
  const categories = await category.find();
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
  const category = category.findById(req.params.id);

  if (!category) {
    throw new Error("Category not found.");
  }
  res.json({
    status: "Success",
    message: "Category fetched successful",
    category,
  });
});

// ! @desc      update category
// ! @route     /api/category/:id
// ! @access    Admin only

export const updateCategory = asyncHandler(async (req, res) => {
  const category = await category.findById(req.params.id);

  if (!category) {
    throw new Error("Category not found.");
  }

  const data = lowerCaseExceptPassword(req.body);

  const updatedCategory = await category.findByIdAndUpdate(
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
  const category = await category.findById(req.params.id);

  if (!category) {
    throw new Error("Category not found.");
  }

  await category.findByIdAndDelete(req.params.id);

  res.json({
    status: "Success",
    message: "Category deleted successfully",
    category,
  });
});
