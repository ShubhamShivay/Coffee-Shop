import Product from "../model/Product.js";
import asyncHandler from "express-async-handler";
import lowerCaseExceptPassword from "../utils/lowerCaseExceptPassword.js";

// ! @desc      create product
// ! @route     /api/product/create
// ! @access    Admin only

export const createProduct = asyncHandler(async (req, res) => {
  const { name, image, brand, category, description, price, countInStock } =
    req.body;

  //! Check if product exists

  const productExists = await Product.findOne({ name: name.toLowerCase() });
  if (productExists) {
    res.status(400);
    throw new Error("Product already exists");
  }

  const product = await Product.create({
    name: name.toLowerCase(),
    image,
    brand: brand.toLowerCase(),
    category: category.toLowerCase(),
    description: description.toLowerCase(),
    price,
    countInStock, 
  });

  res.json({
    status: "success",
    message: "Product created successfully",
    product,
  });
});

// ! @desc      get all products
// ! @route     /api/product
// ! @access    Public

export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.json({
    status: "Success",
    message: "All products fetched sucessfully",
    products,
  });
});

// ! @desc      get single product
// ! @route     /api/product/:id
// ! @access    Public

export const getSingleProduct = asyncHandler(async (req, res) => {
  const product = Product.findById(req.params.id);

  if (!product) {
    throw new Error("Product not found.");
  }
  res.json({
    status: "Success",
    message: "Product fetched successful",
    product,
  });
});

// ! @desc      Update product
// ! @route     /api/product/:id
// ! @Access    Admin

export const updateProduct = asyncHandler(async (req, res) => {
  const { name, image, brand, category, description, price, countInStock } =
    req.body;
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new Error("Product not found.");
  }

  //! Convet input to lowercase
  const data = lowerCaseExceptPassword(req.body);

  const updatedProduct = await Product.findByIdAndUpdate(
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
    message: "Product updated successfully",
    updatedProduct,
  });
});

// ! @desc      Delete product
// ! @route     /api/product/:id
// ! @Access    Admin

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new Error("Product not found.");
  }

  await product.remove();

  res.json({
    status: "Success",
    message: "Product deleted successfully",
    product,
  });
});
