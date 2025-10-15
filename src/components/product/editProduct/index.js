import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import H2 from "../../common/H2";
import ProductForm from "../productForm";
import { useAuth } from "../../../context/AuthContext";
import { getProductById } from "../../../endpoint/getCall";
import { updateProduct } from "../../../endpoint/putCall";
import { showSuccessToast, showErrorToast } from "../../common/Toast";
const EditProduct = () => {
  const { id } = useParams(); // Get product ID from URL
  const { user } = useAuth();
  const navigate = useNavigate();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🧠 Fetch product details on mount
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log("Fetching product with ID:", id);
        const response = await getProductById(id, "Bearer " + user?.token);
        console.log("Fetched product data:", response);
        setProductData(response.data);
        showSuccessToast(response.message || "Product fetched successfully!");
      } catch (error) {
        console.error("Error fetching product:", error);
        showErrorToast(
          error.response?.data?.message || "Failed to fetch product."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id && user?.token) {
      fetchProduct();
    }
  }, [id, user?.token]);

  // 📝 Handle update
  const handleUpdate = async (data) => {
    try {
      const response = await updateProduct(
        id,
        { name: data.name, price: data.price, category: data.category },
        "Bearer " + user?.token
      );
      console.log("Product updated successfully:", response);
      showSuccessToast(response.message || "Product updated successfully!");
      navigate("/dashboard"); // Redirect to dashboard after update
    } catch (error) {
      console.error("Error updating product:", error);
      showErrorToast(
        error.response?.data?.message || "Failed to update product."
      );
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-600">Loading product...</div>
    );
  }

  if (!productData) {
    return (
      <div className="text-center py-10 text-red-500">
        Product not found or failed to load.
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-2xl p-4 w-full max-w-md">
      <H2 data={"Edit Product"} />
      <ProductForm
        onSubmit={handleUpdate}
        isEdit={true}
        initialData={productData}
      />
    </div>
  );
};

export default EditProduct;
