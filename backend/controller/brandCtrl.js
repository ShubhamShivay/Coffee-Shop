import Brand from "../model/Brand.js";
import asyncHandler from "express-async-handler";
import lowerCaseExceptPassword from "../utils/lowerCaseExceptPassword.js";

// ! @desc      create brand
// ! @route     /api/brand/create
// ! @access    Admin only

export const createBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;

  //! check if brand already exists
  const brandExists = await Brand.findOne({ name: name.toLowerCase() });
  if (brandExists) {
    throw new Error("Brand already exists");
  }
  // console.log(req.user._id)
  const brand = await Brand.create({
    name: name.toLowerCase(),
    user: req.user._id,
  });

  res.json({
    status: "Success",
    message: "Brand created successfully",
    brand,
  });
});

// ! @desc      get all brands
// ! @route     /api/brand
// ! @access    Public

export const getAllBrands = asyncHandler(async (req, res) => {
  const brands = await Brand.find();
  res.json({
    status: "Success",
    message: "All brands fetched sucessfully",
    brands,
  });
});

// ! @desc      get single brand
// ! @route     /api/brand/:id
// ! @access    Public

export const getSingleBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);
  // console.log("brand: ", brand);

  if (!brand) {
    throw new Error("Brand not found.");
  }
  res.json({
    status: "Success",
    message: "Brand fetched successful",
    data: brand,
  });
});

// ! @desc      update brand
// ! @route     /api/brand/:id
// ! @access    Admin only

export const updateBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);

  if (!brand) {
    throw new Error("Brand not found.");
  }

  const data = lowerCaseExceptPassword(req.body);
  console.log("Data: ", data);

  const updatedBrand = await Brand.findByIdAndUpdate(
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
    message: "Brand updated successfully",
    brand: updatedBrand,
  });
});

// ! @desc      delete brand
// ! @route     /api/brand/:id
// ! @access    Admin only

export const deleteBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.findByIdAndDelete(req.params.id);
  // console.log(brand);

  if (!brand) {
    throw new Error("Brand not found.");
  }

  // await brand.deleteOne();

  res.json({
    status: "Success",
    message: "Brand deleted successfully",
    brand,
  });
});
