import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const noSpecialChars = /^[a-zA-Z0-9\s_-]+$/;
const schema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(25, "Name must be at most 25 characters")
    .matches(noSpecialChars, "Special characters are not allowed")
    .required("Name is required"),
  price: yup
    .number()
    .min(0, "Price must be a positive number")
    .required("Price is required"),
  category: yup
    .string()
    .max(30, "Category must be at most 30 characters")
    .matches(noSpecialChars, "Special characters are not allowed")
    .required("Category is required"),
});

export default yupResolver(schema);
