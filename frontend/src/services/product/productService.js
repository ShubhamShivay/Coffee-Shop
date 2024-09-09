import axios from "axios";
import { Base_URL } from "../../utils/url";
import { getUserFromStorage } from "../../utils/getUserFromStorage";

const token = getUserFromStorage();

export const addProductsAPI = async () => {
  const response = await axios.post(`${Base_URL}/product`);

  return response.data;
};

//! lists
export const getProductsAPI = async () => {
  const response = await axios.get(`${Base_URL}/product/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
