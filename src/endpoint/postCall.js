import { BASE_URL } from "./URL";
import axios from "axios";

const config = (data, URL, header = null) => {
  return {
    method: "post",
    url: BASE_URL + URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: header,
    },
    data: data,
  };
};
export const login = async (data) => {
  try {
    const response = await axios(config(data, "/auth/login"));
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const Signup = async (data) => {
  try {
    const response = await axios(config(data, "/auth/register"));
    return response.data;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};

export const sendOTP = async (data) => {
  try {
    const response = await axios(config(data, "/auth/send-otp"));
    return response.data;
  } catch (error) {
    console.error("Send OTP error:", error);
    throw error;
  }
};

export const verifyOTP = async (data) => {
  try {
    const response = await axios(config(data, "/auth/verify-otp"));
    return response.data;
  } catch (error) {
    console.error("Verify OTP error:", error);
    throw error;
  }
};

export const resetPassword = async (data, header) => {
  try {
    const response = await axios(config(data, "/auth/reset-password", header));
    return response.data;
  } catch (error) {
    console.error("Reset Password error:", error);
    throw error;
  }
};
