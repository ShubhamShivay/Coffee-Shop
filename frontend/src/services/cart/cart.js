import axios from "axios";
import { Base_URL } from "../../utils/url";

// ? Add to cart
export const addToCartAPI = async (productId) => {
  const response = await axios.post(`${Base_URL}/cart`, {
    productId,
  });
  return response.data;
};

// ? Remove from cart
export const removeFromCartAPI = async (productId) => {
  const response = await axios.delete(`${Base_URL}/cart/${productId}`);
  return response.data;
};

// ? Clear cart
export const clearCartAPI = async () => {
  const response = await axios.delete(`${Base_URL}/cart`);
  return response.data;
};

// ? Get cart
export const getCartAPI = async () => {
  const response = await axios.get(`${Base_URL}/cart`);
  return response.data;
};

// ? Update cart
export const updateCartAPI = async (productId, quantity) => {
  const response = await axios.put(`${Base_URL}/cart/${productId}`, {
    quantity,
  });
  return response.data;
};