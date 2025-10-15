import React from "react";
import PropTypes from "prop-types";

const Table = ({ columns, data, actions, onSort, sortConfig }) => {
  return (
    <div className="overflow-x-auto rounded-xl shadow-md bg-white">
      <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                style={{
                  width: col.width || "auto",
                  cursor: col.sortable ? "pointer" : "default",
                }}
                onClick={() => col.sortable && onSort(col.accessor)}
                className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap select-none"
              >
                <div className="flex items-center gap-1">
                  {col.header}
                  {col.sortable && sortConfig.key === col.accessor && (
                    <span>{sortConfig.direction === "asc" ? "▲" : "▼"}</span>
                  )}
                </div>
              </th>
            ))}

            {actions && actions.length > 0 && (
              <th
                style={{ width: "120px" }}
                className="px-6 py-3 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider"
              >
                Actions
              </th>
            )}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {data && data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50 transition">
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    style={{ width: col.width || "auto" }}
                    className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap"
                  >
                    {col.render ? col.render(row) : row[col.accessor]}
                  </td>
                ))}

                {actions && actions.length > 0 && (
                  <td className="px-6 py-4 text-center flex gap-2 justify-center">
                    {actions.map((action, index) => (
                      <button
                        key={index}
                        onClick={() => action.onClick(row)}
                        className={`px-3 py-1 text-sm rounded-lg font-medium transition ${
                          action.type === "edit"
                            ? "bg-blue-500 text-white hover:bg-blue-600"
                            : action.type === "delete"
                            ? "bg-red-500 text-white hover:bg-red-600"
                            : action.type === "view"
                            ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                            : "bg-green-500 text-white hover:bg-green-600"
                        }`}
                      >
                        {action.label}
                      </button>
                    ))}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length + (actions ? 1 : 0)}
                className="text-center py-6 text-gray-500"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string.isRequired,
      accessor: PropTypes.string,
      render: PropTypes.func,
      width: PropTypes.string, // NEW: optional width e.g. "150px", "20%", "10rem"
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      type: PropTypes.oneOf(["edit", "delete", "view", "custom"]),
      onClick: PropTypes.func.isRequired,
    })
  ),
  onSort: PropTypes.func,
  sortConfig: PropTypes.object,
};

export default Table;
