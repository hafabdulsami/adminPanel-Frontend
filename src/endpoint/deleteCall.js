import { BASE_URL } from "./URL";
import axios from "axios";

const config = (data, URL, header = null) => {
  return {
    method: "delete",
    url: BASE_URL + URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: header,
    },
    data: {},
  };
};
export const deleteProduct = async (id, header) => {
  try {
    const response = await axios(config(null, `/products/${id}`, header));
    return response.data;
  } catch (error) {
    throw error;
  }
};
