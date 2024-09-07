import category from "../model/Category";
import asyncHandler from "express-async-handler";

// ! @desc      create category
// ! @route     /api/category/create
// ! @access    Admin only

export const createCategory = asyncHandler(async (req, res) => {
    const { name } = req.body;

    //! check if category already exists
    const categoryExists = await category.findOne({ name });
    if (categoryExists) {
        throw new Error("Category already exists");
    }

    const category = await category.create({
        name,
    });

    res.json({
        status: "Success",
        message: "Category created successfully",
        category,
    });
})

