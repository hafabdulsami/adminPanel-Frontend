import { BASE_URL } from "./URL";
import axios from "axios";

const config = (data, URL, header = null) => {
  return {
    method: "get",
    url: BASE_URL + URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: header,
    },
    data: data,
  };
};

export const getProduct = async (header) => {
  try {
    const response = await axios(config(null, "/products", header));
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProductById = async (id, header) => {
  try {
    const response = await axios(config(null, `/products/${id}`, header));
    return response.data;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error;
  }
};

export const getDashboardData = async (header) => {
  try {
    const response = await axios(config(null, `/dashboard`, header));
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
};
