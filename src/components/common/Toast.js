import { toast } from "react-toastify";

export const Toast = (message, type) => {
  if (type === "error") {
    toast.error(message, {
      position: "bottom-left",
      theme: "colored", // You might want to use "colored" for error themes
    });
  } else if (type === "success") {
    toast.success(message, {
      position: "bottom-left",
      theme: "colored", // You might want to use "colored" for success themes
    });
  } else {
    console.log("Unsupported toast type:", type);
  }
};
