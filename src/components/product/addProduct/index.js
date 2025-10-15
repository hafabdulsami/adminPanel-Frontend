import React from "react";
import ProductForm from "../productForm";
import H2 from "../../common/H2";
import { useAuth } from "../../../context/AuthContext";
import { createProduct } from "../../../endpoint/postCall";
import { showSuccessToast, showErrorToast } from "../../common/Toast";
import { useNavigate } from "react-router-dom";
import { Route } from "../../../routes/path";
const Product = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const handleSubmit = async (data) => {
    console.log(user?.token);
    console.log("Product data submitted:", data);
    try {
      const response = await createProduct(data, "Bearer " + user?.token);
      showSuccessToast(response.message || "Product created successfully!!!!!");
      navigate(Route.DASHBOARD);
      console.log("Product created successfully:", response);
    } catch (error) {
      showErrorToast(
        error.response?.data?.message || "Failed to create product."
      );
      console.error("Error creating product:", error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-4 w-full max-w-md">
      <H2 data={"New Product"} />
      <ProductForm onSubmit={handleSubmit} />
    </div>
  );
};

export default Product;
