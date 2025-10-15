import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
  useMemo,
} from "react";
import Table from "../../common/table";
import { getProduct } from "../../../endpoint/getCall";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { showSuccessToast, showErrorToast } from "../../common/Toast";
import { deleteProduct } from "../../../endpoint/deleteCall";
import ConfirmDialog from "../../common/confirmDialog";

const DashboardTable = forwardRef((props, ref) => {
  const { onEdit } = props;
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Sorting state
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const navigate = useNavigate();

  // ✅ Fetch all products
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

  // 🔁 Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ Expose refresh function to parent (for Add/Edit refresh)
  useImperativeHandle(ref, () => ({
    refreshData: fetchProducts,
  }));

  // 🗑 Handle Delete
  const handleDelete = async () => {
    try {
      await deleteProduct(selectedProduct.id, "Bearer " + user.token);
      setShowDialog(false);
      showSuccessToast("Product deleted successfully!");
      fetchProducts();
    } catch (error) {
      console.error(error);
      showErrorToast(
        error.response?.data?.message || "Failed to delete product."
      );
    }
  };

  // 🧩 Table columns
  const columns = [
    { header: "Name", accessor: "name", width: "150px", sortable: true },
    { header: "Price", accessor: "price", width: "100px", sortable: true },
    {
      header: "Category",
      accessor: "category",
      width: "120px",
      sortable: true,
    },
    {
      header: "Created By",
      accessor: "createdBy.name",
      width: "120px",
      sortable: true,
      render: (row) => row.createdBy?.name || "-",
    },
    {
      header: "Created At",
      accessor: "createdAt",
      width: "150px",
      sortable: true,
      render: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
  ];

  const actions = [
    {
      label: "Edit",
      type: "edit",
      onClick: (row) => onEdit(row),
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

  // 🔽 Sorting logic
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = useMemo(() => {
    let sortableItems = [...products];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        const getValue = (obj, path) =>
          path.split(".").reduce((o, i) => (o ? o[i] : ""), obj);

        const aValue = getValue(a, sortConfig.key);
        const bValue = getValue(b, sortConfig.key);

        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [products, sortConfig]);

  // 🧮 Pagination logic (applied after sorting)
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="p-6 relative bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">
        Product List
      </h2>

      <Table
        columns={columns}
        data={paginatedData}
        actions={actions}
        onSort={handleSort}
        sortConfig={sortConfig}
      />

      {/* Pagination */}
      {sortedData.length > itemsPerPage && (
        <div className="flex justify-center items-center mt-4 gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50 hover:bg-gray-300 transition"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50 hover:bg-gray-300 transition"
          >
            Next
          </button>
        </div>
      )}

      <ConfirmDialog
        isOpen={showDialog}
        title="Confirm Deletion"
        message={`Are you sure you want to delete "${selectedProduct?.name}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setShowDialog(false)}
      />
    </div>
  );
});

export default DashboardTable;
