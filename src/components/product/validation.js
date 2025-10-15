import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be at most 100 characters")
    .required("Name is required"),
  price: yup
    .number()
    .min(0, "Price must be a positive number")
    .required("Price is required"),
  category: yup
    .string()
    .max(100, "Category must be at most 100 characters")
    .required("Category is required"),
});

export default yupResolver(schema);
