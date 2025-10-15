import React, { useEffect, useState } from "react";
import Table from "../../common/table";
import { getProduct } from "../../../endpoint/getCall";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { showSuccessToast, showErrorToast } from "../../common/Toast";
import { deleteProduct } from "../../../endpoint/deleteCall";
import ConfirmDialog from "../../common/confirmDialog";

const DashboardTable = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const products = await getProduct("Bearer " + user.token);
      setProducts(products.data);
      showSuccessToast(products.message || "Products fetched successfully!");
    } catch (error) {
      console.error("Error fetching products:", error);
      showErrorToast(
        error.response?.data?.message || "Failed to fetch products."
      );
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async () => {
    try {
      console.log("Deleting product with ID:", selectedProduct.id);
      await deleteProduct(selectedProduct.id, "Bearer " + user.token);
      setShowDialog(false);
      showSuccessToast("Product deleted successfully!");
      fetchProducts(); // refresh list
    } catch (error) {
      console.error(error);
      showErrorToast(
        error.response?.data?.message || "Failed to delete product."
      );
    }
  };

  const columns = [
    { header: "Name", accessor: "name", width: "100px" },
    { header: "Price", accessor: "price", width: "150px" },
    { header: "Category", accessor: "category", width: "100px" },
    {
      header: "Created By",
      accessor: "createdBy",
      width: "100px",
      render: (row) => row.createdBy?.name,
    },
    {
      header: "Created At",
      accessor: "createdAt",
      width: "150px",
      render: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
  ];

  const actions = [
    {
      label: "Edit",
      type: "edit",
      onClick: (row) => navigate(`/product/edit/${row._id}`),
    },
    {
      label: "Delete",
      type: "delete",
      onClick: (row) => {
        setSelectedProduct(row);
        setShowDialog(true);
      },
    },
  ];

  return (
    <div className="p-6 relative">
      <h2 className="text-xl font-bold mb-4">Product List</h2>
      <Table columns={columns} data={products} actions={actions} />

      <ConfirmDialog
        isOpen={showDialog}
        title="Confirm Deletion"
        message={`Are you sure you want to delete "${selectedProduct?.name}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setShowDialog(false)}
      />
    </div>
  );
};

export default DashboardTable;
