// src/utils/toastHelper.js
import { toast } from "react-toastify";

const defaultOptions = {
  theme: "colored",
  position: "bottom-left",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

export const showSuccessToast = (message, options = {}) => {
  toast.success(message, { ...defaultOptions, ...options });
};

export const showErrorToast = (message, options = {}) => {
  toast.error(message, { ...defaultOptions, ...options });
};

export const showInfoToast = (message, options = {}) => {
  toast.info(message, { ...defaultOptions, ...options });
};

export const showWarningToast = (message, options = {}) => {
  toast.warn(message, { ...defaultOptions, ...options });
};
