import { BASE_URL } from "./URL";
import axios from "axios";

const config = (data, URL, header = null) => {
  return {
    method: "put",
    url: BASE_URL + URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: header,
    },
    data: data,
  };
};

export const updateProduct = async (id, data, header) => {
  try {
    const response = await axios(config(data, `/products/${id}`, header));
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};
