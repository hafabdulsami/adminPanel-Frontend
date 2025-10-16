import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const noSpecialChars = /^[a-zA-Z0-9\s_-]+$/;
const schema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(10, "Name must be at most 10 characters")
    .matches(noSpecialChars, "Special characters are not allowed")
    .required("Name is required"),
  price: yup
    .number()
    .min(0, "Price must be a positive number")
    .required("Price is required"),
  category: yup
    .string()
    .max(15, "Category must be at most 15 characters")
    .matches(noSpecialChars, "Special characters are not allowed")
    .required("Category is required"),
});

export default yupResolver(schema);
