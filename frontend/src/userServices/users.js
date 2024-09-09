import { Base_URL } from "../utils/url";
import axios from "axios";

//! Login

export const loginAPI = async ({ email, password }) => {
  const response = await axios.post(`${Base_URL}/user/login`, {
    email,
    password,
  });

  return response.data;
};

export const registerAPI = async ({ fullname, email, password }) => {
  const response = await axios.post(`${Base_URL}/user/register`, {
    fullname,
    email,
    password,
  });

  return response.data;
};
