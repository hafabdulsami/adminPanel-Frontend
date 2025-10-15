import React, { useState, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import DashboardTable from "./listProduct";
import ProductForm from "./productForm";
import { createProduct } from "../../endpoint/postCall";
import { updateProduct } from "../../endpoint/putCall";
import { showSuccessToast, showErrorToast } from "../common/Toast";
import { Plus } from "lucide-react";
import DialogBox from "../common/dialogBox";
import Button from "../common/button";
const Product = () => {
  const { user } = useAuth();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const tableRef = useRef();

  const handleAddSubmit = async (data) => {
    try {
      const response = await createProduct(data, "Bearer " + user?.token);
      showSuccessToast(response.message || "Product created successfully!");
      tableRef.current?.refreshData?.();
      setIsAddOpen(false);
    } catch (error) {
      showErrorToast(error.response?.data?.message || "Failed to add product.");
    }
  };

  const handleEditSubmit = async (data) => {
    try {
      const response = await updateProduct(
        editData.id,
        { name: data.name, price: data.price, category: data.category },
        "Bearer " + user?.token
      );
      showSuccessToast(response.message || "Product updated successfully!");
      setIsEditOpen(false);
      tableRef.current?.refreshData?.();
    } catch (error) {
      showErrorToast(
        error.response?.data?.message || "Failed to update product."
      );
    }
  };

  const handleEditClick = (product) => {
    setEditData(product);
    setIsEditOpen(true);
  };

  return (
    <div className=" bg-white flex flex-col items-center p-8 w-full max-w-6xl  rounded-2xl shadow-lg border border-gray-100">
      {/* Header */}
      <div className="w-full max-w-6xl flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
          🛍️ Product Management
        </h1>

        <Button
          onClick={() => setIsAddOpen(true)}
          size={20}
          text="Add Product"
        />
      </div>

      {/* Pass edit handler to table */}
      <DashboardTable onEdit={handleEditClick} ref={tableRef} />

      {isAddOpen && (
        <DialogBox title="Add New Product" onClose={() => setIsAddOpen(false)}>
          <ProductForm onSubmit={handleAddSubmit} />
        </DialogBox>
      )}

      {isEditOpen && editData && (
        <DialogBox title="Edit Product" onClose={() => setIsEditOpen(false)}>
          <ProductForm
            onSubmit={handleEditSubmit}
            isEdit={true}
            initialData={editData}
          />
        </DialogBox>
      )}
    </div>
  );
};

// 🌟 Reusable Modal Component

export default Product;
