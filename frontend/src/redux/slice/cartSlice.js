// features/cart/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity } = action.payload;
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.product._id === product._id
      );

      if (existingItemIndex >= 0) {
        // If the product already exists in the cart, update the quantity
        state.cartItems[existingItemIndex].quantity += quantity;
      } else {
        // If the product doesn't exist in the cart, add it
        state.cartItems.push({ product, quantity });
      }

      state.totalQuantity += quantity;
      state.totalPrice += product.price * quantity;
    },
    removeFromCart: (state, action) => {
      const { productId } = action.payload;
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.product._id === productId
      );

      if (existingItemIndex >= 0) {
        const item = state.cartItems[existingItemIndex];
        state.totalQuantity -= item.quantity;
        state.totalPrice -= item.product.price * item.quantity;

        state.cartItems.splice(existingItemIndex, 1);
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },

    // ! Get Cart Items
    getCartItems: (state) => {
      state.cartItems;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
