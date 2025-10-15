import React, { useEffect, useState } from "react";
import Table from "../../common/table";
import { getProduct } from "../../../endpoint/getCall";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { showSuccessToast, showErrorToast } from "../../common/Toast";
const DashboardTable = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
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
      onClick: (row) => navigate(`/product/edit/${row.id}`),
    },
    {
      label: "Delete",
      type: "delete",
      onClick: (row) => alert(`Delete ${row.name}`),
    },
  ];
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProduct("Bearer" + user.token);
        setProducts(products.data);
        showSuccessToast(products.message || "Products fetched successfully!");
        console.log(products.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        showErrorToast(
          error.response?.data?.message || "Failed to fetch products."
        );
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">User List</h2>
      <Table columns={columns} data={products} actions={actions} />
    </div>
  );
};

export default DashboardTable;
