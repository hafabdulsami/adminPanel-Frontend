import React from "react";
import ProductForm from "./productForm";
import H2 from "../common/H2";
const Product = () => {
  const handleSubmit = (data) => {
    console.log("Product data submitted:", data);
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-4 w-full max-w-md">
      <H2 data={"New Product"} />
      <ProductForm onSubmit={handleSubmit} />
    </div>
  );
};

export default Product;
