import Cart from "../model/Cart.js";
import asyncHandler from "express-async-handler";
import Product from "../model/Product.js";
import User from "../model/User.js";

// ! @desc    Add product to cart
// ! @route   POST /api/v1/carts
// ! @access  Private
export const addProductToCart = asyncHandler(async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    //   console.log(productId);

    // ! Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }
    // ! Check if user exists
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
    console.log(user);

    // ! Check if the cart exists for this user
    let cart = await Cart.findOne({ user: req.user._id });
    if (cart) {
      // ! Check if the product is already in the cart
      const productIndex = cart.products.findIndex(
        (p) => p.product.toString() === productId
      );

      if (productIndex > -1) {
        cart.products[productIndex].quantity += Number(quantity);
      } else {
        cart.products.push({ product: productId, quantity });
      }
    } else {
      cart = await Cart.create({
        user: req.user._id,
        products: [{ product: productId, quantity }],
      });
    }
    await cart.save();
    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
});

// ! @desc    Get user cart
// ! @route   GET /api/v1/carts
// ! @access  Private
export const getUserCart = async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate(
    "products.product"
  );

  if (!cart) {
    return res.status(400).json({
      success: false,
      message: "Cart not found",
    });
  }

  res.status(200).json({
    success: true,
    cart,
  });
};

//! @desc    Remove product from cart
//! @route   DELETE /api/v1/carts
//! @access  Private
export const removeProductFromCart = async (req, res, next) => {
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({
      success: false,
      message: "Product ID is required",
    });
  }

  const cart = await Cart.findOneAndUpdate(
    { user: req.user._id },
    {
      $pull: { products: { product: productId } },
    },
    { new: true }
  ).populate("products.product");

  if (!cart) {
    return res.status(400).json({
      success: false,
      message: "Cart not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Product removed from cart",
    cart,
  });
};
